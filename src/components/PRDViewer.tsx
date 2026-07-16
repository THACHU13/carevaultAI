import React, { useState } from 'react';
import { prdData } from '../data';
import { Search, BookOpen, Layers, ShieldCheck, ChevronRight, CheckCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function PRDViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('goals');

  const filteredData = prdData.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] bg-slate-900 text-slate-100 overflow-hidden text-left" id="prd-viewer">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-80 bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col h-1/3 lg:h-full">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search specifications..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          </div>
        </div>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider font-mono">Table of Contents</div>
          {filteredData.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full text-left px-3 py-3 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer select-none ${
                activeTab === section.id
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                {section.id === 'goals' && <BookOpen className="h-4 w-4" />}
                {section.id === 'architecture' && <Layers className="h-4 w-4" />}
                {section.id === 'modules' && <Zap className="h-4 w-4" />}
                {section.id === 'ai-ml' && <RefreshCw className="h-4 w-4" />}
                {section.id === 'security' && <ShieldCheck className="h-4 w-4" />}
                {section.id === 'privacy' && <ShieldCheck className="h-4 w-4" />}
                {section.id === 'nfr' && <CheckCircle className="h-4 w-4" />}
                {section.id === 'roadmap' && <ArrowRight className="h-4 w-4" />}
                <span className="truncate">{section.title.substring(3)}</span>
              </div>
              <ChevronRight className={`h-4 w-4 opacity-50 transition-transform ${activeTab === section.id ? 'translate-x-1' : ''}`} />
            </button>
          ))}
          {filteredData.length === 0 && (
            <div className="text-slate-500 text-center py-8 text-xs">No matching specifications found.</div>
          )}
        </div>

        {/* BAA Compliant Notice Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5 text-teal-400 font-bold mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-wider font-mono">HIPAA BAA COMPLIANT SPEC</span>
          </div>
          Fits within standard HIPAA, GDPR, DPDP, and ABDM security and privacy frameworks.
        </div>
      </div>

      {/* Main Content Viewer */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-900">
        {prdData.map((section) => {
          if (section.id !== activeTab) return null;
          return (
            <div key={section.id} className="max-w-4xl mx-auto space-y-6 animate-fade-in text-left">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs text-teal-400 uppercase font-bold tracking-widest font-mono">CareVault AI Specification</span>
                <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white mt-1">{section.title}</h1>
              </div>
              <div className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
                {/* Manual formatting of content block to ensure elegant presentation */}
                {section.content.split('\n\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // Markdown Headings
                  if (trimmed.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-lg font-bold text-white mt-8 mb-4 border-l-4 border-teal-500 pl-3">
                        {trimmed.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('####')) {
                    return (
                      <h4 key={index} className="text-sm font-semibold text-slate-200 mt-6 mb-2">
                        {trimmed.replace('####', '').trim()}
                      </h4>
                    );
                  }

                  // Bullet lists
                  if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                    const items = trimmed.split('\n').map(item => item.replace(/^[\s*-]+/, '').trim());
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 pl-4 text-xs text-slate-300">
                        {items.map((item, i) => {
                          // Support basic italic parsing for *Needs:* *Key Pain Points:*
                          const parts = item.split('*');
                          if (parts.length >= 3) {
                            return (
                              <li key={i}>
                                <span className="font-bold text-slate-250">{parts[1]}</span>
                                {parts.slice(2).join('')}
                              </li>
                            );
                          }
                          return <li key={i}>{item}</li>;
                        })}
                      </ul>
                    );
                  }

                  // Numbered lists
                  if (/^\d+\./.test(trimmed)) {
                    const items = trimmed.split('\n').map(item => item.replace(/^\d+\.\s*/, '').trim());
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 pl-4 text-xs text-slate-300">
                        {items.map((item, i) => {
                          const parts = item.split('*');
                          if (parts.length >= 3) {
                            return (
                              <li key={i}>
                                <span className="font-bold text-slate-250">{parts[1]}</span>
                                {parts.slice(2).join('')}
                              </li>
                            );
                          }
                          return <li key={i}>{item}</li>;
                        })}
                      </ol>
                    );
                  }

                  // Table support
                  if (trimmed.includes('|')) {
                    const rows = trimmed.split('\n').filter(row => row.trim() !== '');
                    const tableRows = rows.map(row => 
                      row.split('|').map(cell => cell.trim()).filter((_, i) => i > 0 && i < row.split('|').length - 1)
                    );

                    const isHeader = (rowIndex: number) => rowIndex === 0;
                    const isSeparator = (rowIndex: number) => tableRows[rowIndex].every(cell => cell.startsWith('---') || cell.startsWith(':---'));

                    return (
                      <div key={index} className="overflow-x-auto my-6 border border-slate-800 rounded-xl">
                        <table className="min-w-full divide-y divide-slate-800 text-xs">
                          <thead className="bg-slate-950">
                            {tableRows.map((cols, rIndex) => {
                              if (!isHeader(rIndex)) return null;
                              return (
                                <tr key={rIndex}>
                                  {cols.map((col, cIndex) => (
                                    <th key={cIndex} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              );
                            })}
                          </thead>
                          <tbody className="bg-slate-950/30 divide-y divide-slate-850">
                            {tableRows.map((cols, rIndex) => {
                              if (isHeader(rIndex) || isSeparator(rIndex)) return null;
                              return (
                                <tr key={rIndex} className="hover:bg-slate-850/30 transition-colors">
                                  {cols.map((col, cIndex) => (
                                    <td key={cIndex} className="px-4 py-3 text-slate-300 max-w-md whitespace-normal break-words font-sans text-xs">
                                      {/* Parse inline backticks for code blocks in table cells */}
                                      {col.split('`').map((part, pIdx) => 
                                        pIdx % 2 === 1 ? <code key={pIdx} className="bg-slate-800 px-1 py-0.5 rounded text-teal-300 font-mono text-[10px]">{part}</code> : part
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Standard paragraph text
                  // Parse inline backticks for standard text paragraphs too
                  return (
                    <p key={index} className="text-slate-300 text-xs leading-relaxed font-sans">
                      {trimmed.split('`').map((part, pIdx) => 
                        pIdx % 2 === 1 ? <code key={pIdx} className="bg-slate-800 px-1.5 py-0.5 rounded text-teal-300 font-mono text-[10px]">{part}</code> : part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
