"use client";

import React from 'react';
import { BookOpen, Server, CheckCircle, Code } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
          <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Reference</h1>
      </div>

      <div className="space-y-12">
        {/* Endpoint Info */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-100 dark:border-gray-800 p-6 bg-gray-50/50 dark:bg-black/20">
                <h2 className="text-xl font-bold flex items-center">
                    <Server className="w-5 h-5 mr-2 text-gray-500" />
                    Process Hierarchies Endpoint
                </h2>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-md text-sm">POST</span>
                    <code className="text-lg text-gray-700 dark:text-gray-300 font-mono">/api/bfhl</code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    The endpoint accepts an array of string relationships in the format <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-red-500">A-&gt;B</code> and computes isolated independent tree hierarchies, structural depth, cycles, and validates data.
                </p>
            </div>
        </section>

        {/* Request Schema */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-100 dark:border-gray-800 p-6 bg-gray-50/50 dark:bg-black/20">
                <h2 className="text-xl font-bold flex items-center">
                    <Code className="w-5 h-5 mr-2 text-gray-500" />
                    Request Schema
                </h2>
            </div>
            <div className="p-6">
                <pre className="bg-gray-50 dark:bg-[#0A0A0A] p-4 rounded-xl text-sm font-mono text-gray-800 dark:text-gray-300 border border-gray-100 dark:border-gray-800 overflow-x-auto">
{`{
  "data": [
    "A->B",
    "A->C",
    "B->D"
  ]
}`}
                </pre>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Ensure headers contain <code className="text-gray-800 dark:text-gray-200">Content-Type: application/json</code></li>
                        <li>Supports Cross-Origin Resource Sharing (CORS) from any origin.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Response Example */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-100 dark:border-gray-800 p-6 bg-gray-50/50 dark:bg-black/20">
                <h2 className="text-xl font-bold flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-gray-500" />
                    Response Success
                </h2>
            </div>
            <div className="p-6">
                <pre className="bg-gray-50 dark:bg-[#0A0A0A] p-4 rounded-xl text-sm font-mono text-emerald-600 dark:text-emerald-400 border border-gray-100 dark:border-gray-800 overflow-x-auto">
{`{
  "user_id": "dhuban_17091999",
  "email_id": "dhuban@college.edu",
  "college_roll_number": "21CS1001",
  "hierarchies": [{
      "root": "A",
      "tree": {
        "A": {
          "B": { "D": {} },
          "C": {}
        }
      },
      "depth": 3
  }],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": { "total_trees": 1, "total_cycles": 0, "largest_tree_root": "A" }
}`}
                </pre>
            </div>
        </section>

      </div>
    </div>
  );
}
