import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  ShieldCheck, 
  Info, 
  Users, 
  Search, 
  Activity, 
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Language, SocialGraphData, SocialNode } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface SocialGraphPageProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SocialGraphPage: React.FC<SocialGraphPageProps> = ({ lang, onNavigate, onToast }) => {
  const t = translations[lang];

  const [graph, setGraph] = useState<SocialGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<SocialNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGraph = async () => {
    try {
      setLoading(true);
      const res = await api.getSocialGraph();
      setGraph(res);
      // Auto-select an isolated node to showcase
      const isolated = res.nodes.find(n => n.isolation_score >= 70);
      if (isolated) setSelectedNode(isolated);
    } catch (e: any) {
      onToast(e.message || 'Failed to load social graph', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  if (loading || !graph) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-96 bg-slate-200 rounded-3xl"></div>
      </div>
    );
  }

  // Node color helper
  const getNodeColor = (n: SocialNode) => {
    if (n.isolation_score >= 75) return '#ef4444'; // Red (Isolated)
    if (n.isolation_score >= 45) return '#f59e0b'; // Amber (Peripheral)
    return '#10b981'; // Green (Connected)
  };

  // Node radius
  const getNodeRadius = (n: SocialNode) => {
    if (selectedNode?.id === n.id) return 12;
    return Math.max(7, Math.min(14, 6 + n.degree * 1.5));
  };

  const filteredNodeIds = new Set(
    graph.nodes
      .filter(n => n.id.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(n => n.id)
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Wellness Command Center
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.communityGraphTitle}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              NetworkX Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.communityGraphSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Node search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Student (e.g. CG-1042)..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none w-48 sm:w-56"
            />
          </div>

          <button
            onClick={fetchGraph}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
            title="Recalculate NetworkX Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* NetworkX Metric Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Cohort Nodes</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{graph.summary.total_nodes}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Peer Interactions</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{graph.summary.total_edges}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800">Connected Hubs</span>
          <p className="text-xl font-bold text-emerald-900 mt-0.5">{graph.summary.connected_nodes_count}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">Peripheral Nodes</span>
          <p className="text-xl font-bold text-amber-900 mt-0.5">{graph.summary.peripheral_nodes_count}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/70 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-800">Isolated / At-Risk</span>
          <p className="text-xl font-bold text-rose-900 mt-0.5">{graph.summary.isolated_nodes_count}</p>
        </div>
      </div>

      {/* Interactive Graph Canvas + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SVG Graph Viewport */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-card lg:col-span-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <span>Spring Layout Projection (NetworkX 2D coordinates)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Connected
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Peripheral
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Isolated
              </span>
            </div>
          </div>

          <div className="w-full h-[420px] sm:h-[480px] bg-slate-50/70 rounded-2xl border border-slate-100 overflow-hidden relative">
            <svg viewBox="0 0 800 500" className="w-full h-full select-none">
              
              {/* Edges */}
              <g className="edges">
                {graph.edges.map((edge, idx) => {
                  const sourceNode = graph.nodes.find(n => n.id === edge.source);
                  const targetNode = graph.nodes.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const isHighlighted = 
                    selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

                  return (
                    <line
                      key={idx}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? '#4f46e5' : '#cbd5e1'}
                      strokeWidth={isHighlighted ? 2.2 : 1}
                      strokeOpacity={isHighlighted ? 0.9 : 0.45}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {graph.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isMatch = filteredNodeIds.has(node.id);
                  const fill = getNodeColor(node);
                  const r = getNodeRadius(node);

                  return (
                    <g 
                      key={node.id} 
                      className="cursor-pointer transition-transform"
                      onClick={() => setSelectedNode(node)}
                      opacity={searchQuery && !isMatch ? 0.25 : 1}
                    >
                      {/* Pulse halo if isolated */}
                      {node.isolation_score >= 75 && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 6}
                          fill="#ef4444"
                          opacity={0.25}
                          className="animate-ping"
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r}
                        fill={fill}
                        stroke={isSelected ? '#0f172a' : '#ffffff'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />

                      {/* Node text label */}
                      <text
                        x={node.x}
                        y={node.y - (r + 4)}
                        textAnchor="middle"
                        fontSize={isSelected ? "11" : "9"}
                        fontWeight={isSelected ? "bold" : "normal"}
                        fill={isSelected ? "#0f172a" : "#64748b"}
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {t.networkXNotice}
            </span>
          </div>
        </div>

        {/* Selected Node Inspector Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Node Analysis
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                NetworkX
              </span>
            </div>

            {selectedNode ? (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedNode.id}
                  </h3>
                  <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                    selectedNode.isolation_score >= 75
                      ? 'bg-rose-100 text-rose-800'
                      : selectedNode.isolation_score >= 45
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedNode.status}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Degree (Direct Connections)</span>
                    <span className="font-bold text-slate-900">{selectedNode.degree} peers</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Degree Centrality</span>
                    <span className="font-bold text-slate-900">{selectedNode.centrality}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-500">Clustering Coefficient</span>
                    <span className="font-bold text-slate-900">{selectedNode.clustering}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Calculated Isolation Index
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold text-slate-900">
                        {selectedNode.isolation_score.toFixed(0)}
                      </span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                  </div>
                </div>

                {selectedNode.isolation_score >= 75 && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Low Peer Connectivity Alert
                    </p>
                    <p className="text-[11px] text-rose-800">
                      Node shows 0 or 1 voluntary interaction signals. Recommend peer mentor outreach or invitation to campus social circles.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Click any node on the graph to inspect its NetworkX centrality and isolation metrics.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Voluntary signals include study circles and campus events. Zero invasive surveillance or communication tapping.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
