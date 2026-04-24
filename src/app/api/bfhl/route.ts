import { NextResponse } from 'next/server';

const USER_ID = "kamali_16052002";
const EMAIL_ID = "kamzz1605@gmail.com";
const ROLL_NUMBER = "21CS1001";

export async function OPTIONS() {
    const res = new NextResponse(null, { status: 204 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const rawData = body.data;

        if (!rawData || !Array.isArray(rawData)) {
            return new NextResponse(JSON.stringify({ error: "Invalid input. Expected 'data' as array." }), {
                status: 400,
                headers: { "Access-Control-Allow-Origin": "*" }
            });
        }

        const validEntries: string[] = [];
        const invalidEntries: string[] = [];

        // 1. Validation — trim first, then validate
        for (const item of rawData) {
            if (typeof item !== 'string') {
                invalidEntries.push(String(item));
                continue;
            }
            const trimmed = item.trim();
            if (/^[A-Z]->[A-Z]$/.test(trimmed)) {
                const [u, v] = trimmed.split('->');
                if (u === v) {
                    // Self-loop is invalid
                    invalidEntries.push(trimmed);
                } else {
                    validEntries.push(trimmed);
                }
            } else {
                // Store trimmed version in invalid_entries (consistent with spec example)
                invalidEntries.push(trimmed);
            }
        }

        // 2. Deduplicate — first occurrence wins, subsequent go to duplicate_edges (once each)
        const seen = new Set<string>();
        const duplicateEdgesSet = new Set<string>();
        const uniqueValidEntries: string[] = [];

        for (const entry of validEntries) {
            if (seen.has(entry)) {
                duplicateEdgesSet.add(entry);
            } else {
                seen.add(entry);
                uniqueValidEntries.push(entry);
            }
        }

        // 3. Build directed graph — multi-parent: first-encountered parent wins
        const parentToChildren = new Map<string, string[]>();
        const childToParent = new Map<string, string>();
        const nodesSet = new Set<string>();

        for (const edge of uniqueValidEntries) {
            const [parent, child] = edge.split('->');
            if (!childToParent.has(child)) {
                childToParent.set(child, parent);
                if (!parentToChildren.has(parent)) parentToChildren.set(parent, []);
                parentToChildren.get(parent)!.push(child);
                nodesSet.add(parent);
                nodesSet.add(child);
            }
            // silently discard subsequent parent edges for same child
        }

        // 4. Find weakly connected components via undirected BFS
        const undirAdj = new Map<string, Set<string>>();
        for (const node of nodesSet) undirAdj.set(node, new Set());
        for (const [child, parent] of childToParent.entries()) {
            undirAdj.get(parent)!.add(child);
            undirAdj.get(child)!.add(parent);
        }

        const globalVisited = new Set<string>();
        const components: string[][] = [];

        for (const node of nodesSet) {
            if (!globalVisited.has(node)) {
                const comp: string[] = [];
                const queue = [node];
                globalVisited.add(node);
                while (queue.length > 0) {
                    const curr = queue.shift()!;
                    comp.push(curr);
                    for (const neighbor of undirAdj.get(curr)!) {
                        if (!globalVisited.has(neighbor)) {
                            globalVisited.add(neighbor);
                            queue.push(neighbor);
                        }
                    }
                }
                components.push(comp);
            }
        }

        // 5. Cycle detection using DFS on directed graph
        const hasCycleInComponent = (compNodes: string[]): boolean => {
            const WHITE = 0, GRAY = 1, BLACK = 2;
            const color = new Map<string, number>();
            for (const n of compNodes) color.set(n, WHITE);

            const dfs = (node: string): boolean => {
                color.set(node, GRAY);
                for (const child of (parentToChildren.get(node) || [])) {
                    if (color.get(child) === GRAY) return true;
                    if (color.get(child) === WHITE && dfs(child)) return true;
                }
                color.set(node, BLACK);
                return false;
            };

            for (const n of compNodes) {
                if (color.get(n) === WHITE && dfs(n)) return true;
            }
            return false;
        };

        // 6. Build nested tree object + compute depth
        const buildTree = (root: string): { tree: Record<string, any>; depth: number } => {
            let maxDepth = 0;

            const dfs = (node: string, currentDepth: number): Record<string, any> => {
                if (currentDepth > maxDepth) maxDepth = currentDepth;
                const children = (parentToChildren.get(node) || []).slice().sort();
                const obj: Record<string, any> = {};
                for (const child of children) {
                    obj[child] = dfs(child, currentDepth + 1);
                }
                return obj;
            };

            const inner = dfs(root, 1);
            const tree: Record<string, any> = {};
            tree[root] = inner;
            return { tree, depth: maxDepth };
        };

        // 7. Process each component
        const hierarchies: any[] = [];
        let totalTrees = 0;
        let totalCycles = 0;
        let maxTreeDepth = -1;
        let largestTreeRoot = "";

        for (const comp of components) {
            const hasCycle = hasCycleInComponent(comp);

            if (hasCycle) {
                totalCycles++;
                // Root = node with no parent in this component, or lexicographically smallest
                const roots = comp.filter(n => !childToParent.has(n));
                const cycleRoot = roots.length > 0
                    ? roots.sort()[0]
                    : comp.slice().sort()[0];
                hierarchies.push({ root: cycleRoot, tree: {}, has_cycle: true });
            } else {
                totalTrees++;
                const roots = comp.filter(n => !childToParent.has(n));
                // Should always be exactly 1 for a valid DAG component
                const root = roots.length > 0 ? roots.sort()[0] : comp.slice().sort()[0];
                const { tree, depth } = buildTree(root);
                hierarchies.push({ root, tree, depth });

                if (depth > maxTreeDepth || (depth === maxTreeDepth && root < largestTreeRoot)) {
                    maxTreeDepth = depth;
                    largestTreeRoot = root;
                }
            }
        }

        const response = {
            user_id: USER_ID,
            email_id: EMAIL_ID,
            college_roll_number: ROLL_NUMBER,
            hierarchies,
            invalid_entries: invalidEntries,
            duplicate_edges: Array.from(duplicateEdgesSet),
            summary: {
                total_trees: totalTrees,
                total_cycles: totalCycles,
                largest_tree_root: largestTreeRoot || null
            }
        };

        const res = NextResponse.json(response);
        res.headers.set("Access-Control-Allow-Origin", "*");
        return res;

    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({ error: err.message || "Internal server error" }),
            { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
        );
    }
}
