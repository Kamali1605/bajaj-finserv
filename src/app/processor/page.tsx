"use client";

import React, { useState } from 'react';
import { Network, AlertCircle, Copy, ArrowRight, TerminalSquare, Database, Sparkles, CheckCircle2, TrendingUp, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_INPUTS = {
  default: '["A->B", "A->C", "B->D", "C->E", "E->F", "X->Y", "Y->Z", "Z->X", "P->Q", "Q->R", "G->H", "G->H", "G->I", "hello", "1->2", "A->"]',
  simpleTree: '["A->B", "A->C", "B->D", "C->E"]',
  pureCycle: '["A->B", "B->C", "C->D", "D->A"]'
};

export default function Processor() {
  const [inputVal, setInputVal] = useState(SAMPLE_INPUTS.default);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    let parsedData = [];
    try {
      parsedData = JSON.parse(inputVal);
      if (!Array.isArray(parsedData)) parsedData = [parsedData];
    } catch (err) {
      const splits = inputVal.split(/[\n,]/);
      parsedData = splits
        .map(s => s.trim())
        .map(s => s.replace(/^"|"$/g, '').replace(/^'|'$/g, ''))
        .filter(s => s !== "");
    }

    try {
      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedData })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'API Compilation Failed');
      }

      const data = await res.json();
      setResult(data);
      setActiveTab('visual');
    } catch (err: any) {
      setError(err.message || 'Fatal backend connection error.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Enhanced HTML Flowchart Graph Renderer using CSS layout
   */
  const renderGraph = (nodeKey: string, treeNode: any) => {
      const childrenKeys = Object.keys(treeNode);
      const isLeaf = childrenKeys.length === 0;
      
      return (
          <div className="flex flex-col items-center">
              {/* Node Card */}
              <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className={`
                    flex items-center justify-center font-extrabold text-lg px-6 py-3 rounded-2xl shadow-xl z-20 relative border-2 
                    ${isLeaf ? 'bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900 shadow-violet-500/10' : 'bg-gradient-to-br from-violet-600 to-orange-500 text-white border-white/20 shadow-orange-500/30'}
                 `}
              >
                  {nodeKey}
              </motion.div>
              
              {/* Children Connections */}
              {childrenKeys.length > 0 && (
                  <div className="flex flex-col items-center w-full relative">
                      {/* Central Drop Line */}
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-violet-400 dark:from-orange-600 dark:to-violet-600 opacity-60 z-10" />
                      
                      {/* Horizontal Spreader for Branches — only when multiple children */}
                      {childrenKeys.length > 1 && (
                          <div className="relative h-1 bg-violet-400 dark:bg-violet-600 z-10 opacity-60 rounded-full"
                               style={{ width: `calc(100% - ${Math.round(100 / childrenKeys.length)}%)` }}
                          />
                      )}
                      
                      <div className="flex justify-around w-full mt-0 z-10 gap-x-4">
                          {childrenKeys.map((child, idx) => (
                              <div key={child} className="flex flex-col items-center w-full">
                                  {/* Individual Drop Line to Child */}
                                  {childrenKeys.length > 1 && (
                                     <div className="w-1 h-6 bg-violet-400 dark:bg-violet-600 opacity-60" />
                                  )}
                                  <div className={childrenKeys.length === 1 ? 'mt-0' : ''}>
                                     {renderGraph(child, treeNode[child])}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      );
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#07070B] text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans pt-32 overflow-x-hidden pb-24">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/20 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-orange-500/20 dark:bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        
      <div className="relative max-w-7xl mx-auto space-y-8 z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/50">
          <div>
            <div className="flex items-center">
              <Network className="w-10 h-10 mr-4 text-violet-500 shrink-0" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-orange-500 py-1">
                Graph Computing Unit
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
               Compile isolated valid trees, project flowchart graphs, and discover cyclic structures instantly.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-3 shadow-md backdrop-blur-md">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-widest">
                System Active
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Input Panel */}
            <div className="xl:col-span-4 flex flex-col space-y-4 shadow-2xl">
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] p-6 shadow-xl flex flex-col h-full sticky top-32">
                    
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-black uppercase tracking-wider text-gray-800 dark:text-white flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
                            Graph Payload
                        </span>
                    </div>

                    <div className="flex space-x-2 mb-6 bg-gray-100 dark:bg-black/40 p-1.5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-x-auto shrink-0 shadow-inner">
                        <button onClick={() => setInputVal(SAMPLE_INPUTS.simpleTree)} className="text-[11px] font-bold uppercase px-4 py-2 rounded-xl bg-transparent text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 transition-colors shrink-0">Tree Gen</button>
                        <button onClick={() => setInputVal(SAMPLE_INPUTS.pureCycle)} className="text-[11px] font-bold uppercase px-4 py-2 rounded-xl bg-transparent text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 transition-colors shrink-0">Cyclic Edge</button>
                        <button onClick={() => setInputVal(SAMPLE_INPUTS.default)} className="text-[11px] font-bold uppercase px-4 py-2 rounded-xl bg-white dark:bg-white/10 text-violet-600 dark:text-violet-400 shadow-sm shrink-0 shadow-violet-500/10 border border-violet-100 dark:border-violet-900/50">Full Core</button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-6">
                        <textarea
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            className="w-full flex-1 min-h-[300px] p-5 text-sm font-mono leading-relaxed bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-y transition-colors shadow-inner"
                            spellCheck="false"
                            placeholder='e.g. ["A->B", "A->C"]'
                        />
                        <button
                            type="submit"
                            disabled={loading || !inputVal.trim()}
                            className="w-full py-5 bg-gradient-to-r from-violet-600 to-orange-500 disabled:opacity-50 hover:scale-[1.03] text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all flex justify-center items-center shadow-xl shadow-orange-500/30"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full" />
                            ) : (
                                <>Deploy Pipeline <ArrowRight className="w-5 h-5 ml-3" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Output Panel */}
            <div className="xl:col-span-8 flex flex-col min-h-[600px] shadow-2xl">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="p-8 rounded-[2rem] border border-red-500/30 bg-red-50/80 dark:bg-red-950/40 backdrop-blur-md text-red-600 dark:text-red-400 font-medium flex items-center shadow-2xl mb-8"
                        >
                            <AlertCircle className="w-10 h-10 mr-5 flex-shrink-0" />
                            <div><strong className="block mb-2 text-red-700 dark:text-red-500 uppercase text-xs font-black tracking-widest">Compiler Failure</strong>{error}</div>
                        </motion.div>
                    )}

                    {!result && !error && !loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="h-full w-full border-2 border-dashed border-gray-300 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white/30 dark:bg-black/20 backdrop-blur-sm"
                        >
                            <Cpu className="w-20 h-20 mb-6 opacity-20" />
                            <span className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Environment Standby</span>
                        </motion.div>
                    )}

                    {result && !error && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col space-y-6">
                            
                            <div className="flex bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] p-2 shadow-xl w-full max-w-md mx-auto xl:mx-0">
                                <button onClick={() => setActiveTab('visual')} className={`flex-1 px-4 py-3 text-xs font-black uppercase tracking-widest rounded-3xl transition-all ${activeTab === 'visual' ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Intelligence Graph</button>
                                <button onClick={() => setActiveTab('json')} className={`flex-1 px-4 py-3 text-xs font-black uppercase tracking-widest rounded-3xl transition-all ${activeTab === 'json' ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Raw JSON Specs</button>
                            </div>

                            {activeTab === 'json' ? (
                                <pre className="text-sm font-mono bg-white/80 dark:bg-black/60 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-x-auto text-gray-800 dark:text-gray-300 flex-1">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                            ) : (
                                <div className="space-y-6">
                                    
                                    {/* Credentials Card Layout */}
                                    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-widest">Authorized Identity</span>
                                            <span className="text-lg font-black text-violet-700 dark:text-violet-400">{result.user_id}</span>
                                        </div>
                                        <div className="w-[1px] h-10 bg-gray-200 dark:bg-white/10 hidden sm:block" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-widest">Email Designation</span>
                                            <span className="text-lg font-black text-gray-800 dark:text-gray-200">{result.email_id}</span>
                                        </div>
                                        <div className="w-[1px] h-10 bg-gray-200 dark:bg-white/10 hidden sm:block" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-widest">Registrar Roll</span>
                                            <span className="text-lg font-black text-orange-600 dark:text-orange-400">{result.college_roll_number}</span>
                                        </div>
                                    </div>

                                    {/* Advanced Metrics Graph Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 shadow-xl flex flex-col relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl group-hover:bg-violet-500/40 transition-all" />
                                            <TrendingUp className="w-8 h-8 text-violet-500 mb-4" />
                                            <span className="text-xs uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 mb-2">Valid Trees Resolved</span>
                                            <span className="text-6xl font-black text-gray-900 dark:text-white drop-shadow-sm">{result.summary?.total_trees || 0}</span>
                                        </div>
                                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 shadow-xl flex flex-col relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-all" />
                                            <Activity className="w-8 h-8 text-orange-500 mb-4" />
                                            <span className="text-xs uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 mb-2">Cycles Terminated</span>
                                            <span className="text-6xl font-black text-gray-900 dark:text-white drop-shadow-sm">{result.summary?.total_cycles || 0}</span>
                                        </div>
                                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 shadow-xl flex flex-col relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl group-hover:bg-fuchsia-500/40 transition-all" />
                                            <Network className="w-8 h-8 text-fuchsia-500 mb-4" />
                                            <span className="text-xs uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 mb-2">Maximum Hierarchy Root</span>
                                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">{result.summary?.largest_tree_root || "N/A"}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl p-6 border border-red-500/30 shadow-lg">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-500 mb-4 flex items-center">
                                                <AlertCircle className="w-5 h-5 mr-3" /> Syntax Rejections
                                            </h3>
                                            {result.invalid_entries?.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {result.invalid_entries.map((item: string, idx: number) => (
                                                        <span key={idx} className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-black text-red-600 dark:text-red-400 rounded-xl shadow-sm border border-red-200 dark:border-red-900/50">{item}</span>
                                                    ))}
                                                </div>
                                            ) : <p className="text-xs font-bold text-gray-500">Perfect Syntax. No rejections.</p>}
                                        </div>
                                        <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl p-6 border border-amber-500/30 shadow-lg">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-4 flex items-center">
                                                <Copy className="w-5 h-5 mr-3" /> Structural Duplicates Filtered
                                            </h3>
                                            {result.duplicate_edges?.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {result.duplicate_edges.map((item: string, idx: number) => (
                                                        <span key={idx} className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-black text-amber-600 dark:text-amber-500 rounded-xl shadow-sm border border-amber-200 dark:border-amber-900/50">{item}</span>
                                                    ))}
                                                </div>
                                            ) : <p className="text-xs font-bold text-gray-500">No duplicate graphs detected.</p>}
                                        </div>
                                    </div>

                                    {/* Built Trees Visualization - FLOWCHART STYLE */}
                                    <div className="bg-white/80 dark:bg-[#0C0C14]/90 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-2xl">
                                        
                                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 dark:text-white mb-8 flex items-center border-b border-gray-200 dark:border-white/10 pb-4">
                                            <Network className="w-6 h-6 mr-3 text-orange-500" />
                                            Rendered Architecture Flowcharts
                                        </h3>

                                        {result.hierarchies?.length > 0 ? (
                                            <div className="flex flex-col space-y-12">
                                                {result.hierarchies.map((hier: any, idx: number) => (
                                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                                        key={idx} className={`rounded-[2rem] p-8 border relative group ${hier.has_cycle ? 'bg-red-50/50 dark:bg-red-950/20 border-red-500/30' : 'bg-gray-50/50 dark:bg-black/40 border-gray-200 dark:border-white/5 shadow-xl'}`}
                                                    >
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-white/10 gap-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg ${hier.has_cycle ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700'}`}>
                                                                    {hier.root}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Root Node Hierarchy</span>
                                                                    {hier.has_cycle ? (
                                                                        <span className="text-xs uppercase font-black tracking-widest text-red-500 mt-1">Cyclic Dependency Terminated</span>
                                                                    ) : (
                                                                        <span className="text-xs uppercase font-black tracking-widest text-emerald-500 flex items-center mt-1">
                                                                            <CheckCircle2 className="w-4 h-4 mr-1" /> Verified Directed Acyclic Graph (DAG)
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {!hier.has_cycle && (
                                                                <div className="bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-sm font-black shadow-lg shadow-emerald-500/20">
                                                                    Max Node Depth: {hier.depth}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex justify-center overflow-x-auto pb-4">
                                                            {hier.has_cycle ? (
                                                                <div className="text-sm font-bold text-red-600 dark:text-red-400 bg-white dark:bg-red-950/50 px-8 py-6 rounded-2xl border border-red-200 dark:border-red-900/50 flex flex-col items-center justify-center text-center shadow-lg">
                                                                    <TerminalSquare className="w-8 h-8 mb-3" />
                                                                    Flowchart Cannot Render: Recursive Cycle Interlocking
                                                                </div>
                                                            ) : (
                                                                <div className="w-full flex justify-center py-4 px-2 min-w-max">
                                                                    {hier.tree && hier.tree[hier.root] && (
                                                                        renderGraph(hier.root, hier.tree[hier.root])
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-20 text-center bg-white/40 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/20">
                                                <Network className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                                                <p className="text-base font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">No valid topological outputs parsed</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}
