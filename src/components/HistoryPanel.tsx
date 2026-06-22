import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Eye, EyeOff, Trash2, Tag, Calendar, Filter, 
  Search, ShieldX, KeyRound, Type, Sparkles, Check, ChevronDown, CheckCircle2, X 
} from 'lucide-react';
import { SavedPassword, PasswordType } from '../types';

interface HistoryPanelProps {
  history: SavedPassword[];
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onUpdateTag: (id: string, tag: string) => void;
  onClose?: () => void;
}

export default function HistoryPanel({ 
  history, 
  onCopy, 
  onDelete, 
  onClearAll, 
  onUpdateTag,
  onClose
}: HistoryPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<PasswordType | 'all'>('all');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTagVal, setNewTagVal] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const triggerCopy = (id: string, text: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const toggleVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startEditing = (id: string, currentTag: string) => {
    setEditingId(id);
    setNewTagVal(currentTag || '');
  };

  const saveTag = (id: string) => {
    onUpdateTag(id, newTagVal.trim());
    setEditingId(null);
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      item.password.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.strengthLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStrengthColorClass = (label: string) => {
    switch (label) {
      case 'VERY WEAK': return 'text-rose-400 bg-rose-500/10 border-rose-500/10';
      case 'WEAK': return 'text-amber-400 bg-amber-500/10 border-amber-500/10';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/10';
      case 'STRONG': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10';
      case 'SECURE': return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25';
      default: return 'text-zinc-400 bg-zinc-805 bg-zinc-800';
    }
  };

  return (
    <div id="vault-key-history" className="glass-panel p-5 rounded-xl flex flex-col h-full relative overflow-hidden bg-zinc-950/45">
      
      {/* Header and Controls */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">Saved Keys</span>
          <span className="text-zinc-500 font-mono text-xs">({filteredHistory.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              id="clear-all-vault"
              onClick={() => setShowConfirmClear(true)}
              className="text-[10px] font-mono tracking-wider text-zinc-500 hover:text-rose-450 transition-colors py-1 px-2 border border-zinc-800 hover:border-rose-900/40 rounded bg-zinc-950/40 cursor-pointer"
            >
              Clear All
            </button>
          )}

          {onClose && (
            <button 
              id="close-vault-drawer"
              onClick={onClose}
              className="p-1 rounded bg-zinc-800/80 text-zinc-400 hover:text-zinc-250 hover:bg-zinc-700 transition"
              title="Close Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 font-mono text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            id="vault-search-input"
            type="text"
            placeholder="Search keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-zinc-950/50 hover:bg-zinc-950/80 focus:bg-zinc-950/95 text-zinc-200 border border-zinc-800/80 focus:border-emerald-500/40 placeholder:text-zinc-650 transition duration-200 focus:outline-none"
          />
        </div>
        
        {/* Type Filter Dropdown */}
        <div className="flex items-center gap-2 bg-zinc-950/50 hover:bg-zinc-950/80 transition duration-200 border border-zinc-800/80 rounded px-2 relative">
          <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <select
            id="vault-type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as PasswordType | 'all')}
            className="w-full py-1.5 bg-transparent text-zinc-300 border-none outline-none focus:ring-0 cursor-pointer appearance-none text-[11px]"
          >
            <option value="all">Filters: All Types</option>
            <option value="random">Type: Random</option>
            <option value="passphrase">Type: Passphrase</option>
            <option value="pronounceable">Type: Pronounceable</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 pointer-events-none absolute right-2" />
        </div>
      </div>

      {/* Vault Items List Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
        <AnimatePresence initial={false}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              const isVisible = visiblePasswords[item.id] || false;
              const isEditing = editingId === item.id;
              const isCopied = copiedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  className="border border-zinc-850 bg-zinc-950/20 p-3 rounded-lg flex flex-col justify-between gap-2.5 hover:border-zinc-750 hover:bg-zinc-900/10 transition-all duration-300 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Key Display & Tag */}
                    <div className="flex-1 min-w-0">
                      {/* Tag editing or displaying */}
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <input
                            id={`edit-tag-input-${item.id}`}
                            type="text"
                            value={newTagVal}
                            maxLength={30}
                            placeholder="Add tag or label..."
                            onChange={(e) => setNewTagVal(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveTag(item.id)}
                            className="bg-zinc-900 border border-emerald-500/40 rounded px-2 py-0.5 text-xs text-zinc-200 w-full focus:outline-none"
                            autoFocus
                          />
                          <button
                            id={`save-tag-btn-${item.id}`}
                            onClick={() => saveTag(item.id)}
                            className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          {item.tag ? (
                            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-1 max-w-[180px] truncate">
                              <Tag className="w-2.5 h-2.5 shrink-0" />
                              {item.tag}
                            </span>
                          ) : (
                            <button
                              id={`add-tag-prompt-${item.id}`}
                              onClick={() => startEditing(item.id, '')}
                              className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              Label
                            </button>
                          )}
                          
                          {/* Type Indicator */}
                          <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                            {item.type === 'random' && <Sparkles className="w-2.5 h-2.5" />}
                            {item.type === 'passphrase' && <Type className="w-2.5 h-2.5" />}
                            {item.type === 'pronounceable' && <Sparkles className="w-2.5 h-2.5" />}
                            {item.type}
                          </span>
                        </div>
                      )}

                      {/* Password Text */}
                      <p className="font-mono text-xs tracking-wider text-zinc-300 select-all truncate break-all pr-1">
                        {isVisible ? (
                          item.password
                        ) : (
                          <span className="text-zinc-650 select-none tracking-widest font-normal">
                            ••••••••••••••••
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        id={`hide-toggle-btn-${item.id}`}
                        onClick={() => toggleVisibility(item.id)}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
                        title={isVisible ? "Mask password" : "Show password"}
                      >
                        {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        id={`quick-copy-vault-btn-${item.id}`}
                        onClick={() => triggerCopy(item.id, item.password)}
                        className={`p-1 rounded transition-all cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400'
                        }`}
                        title="Copy password"
                      >
                        {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        id={`delete-vault-btn-${item.id}`}
                        onClick={() => onDelete(item.id)}
                        className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition-all opacity-40 group-hover:opacity-100 cursor-pointer"
                        title="Delete password"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Footer (Timestamp, Score) */}
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 text-[10px] font-mono text-zinc-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>

                    <span className={`px-1 py-0.2 border rounded text-[8px] font-mono font-bold tracking-wider ${getStrengthColorClass(item.strengthLabel)}`}>
                      {item.strengthLabel}
                    </span>

                    {!isEditing && (
                      <button
                        id={`edit-tag-btn-${item.id}`}
                        onClick={() => startEditing(item.id, item.tag || '')}
                        className="text-[9px] hover:text-emerald-400 transition-all cursor-pointer"
                      >
                        {item.tag ? "Edit tag" : "Add label"}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/20">
              <ShieldX className="w-8 h-8 text-zinc-750 mb-2 animate-pulse" />
              <p className="font-mono text-2xs text-zinc-500 uppercase tracking-wider">
                {searchQuery || filterType !== 'all' ? "No matches found." : "No saved passwords."}
              </p>
              <span className="font-mono text-[9px] text-zinc-650 block mt-1 uppercase">
                Passwords you vault will be listed here.
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm Clear Overlay Modal */}
      <AnimatePresence>
        {showConfirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 rounded-xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-2">Erase Saved Keys?</h3>
            <p className="text-2xs text-zinc-400 max-w-[220px] leading-relaxed mb-6">
              This action will permanently delete all saved entries from your local storage and cannot be undone.
            </p>
            <div className="flex items-center gap-2.5 w-full max-w-[220px]">
              <button
                id="cancel-clear-vault-btn"
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-2 px-3 border border-zinc-805 border-zinc-800 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-clear-vault-btn"
                onClick={() => {
                  onClearAll();
                  setShowConfirmClear(false);
                }}
                className="flex-1 py-2 px-3 bg-rose-600 rounded text-[10px] font-mono text-zinc-100 font-bold hover:bg-rose-550 hover:bg-rose-500 transition cursor-pointer"
              >
                Erase All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
