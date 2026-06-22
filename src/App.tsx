import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, Copy, Check, Lock, Unlock, Sliders, Type, Sparkles, 
  Plus, Minus, Hash, Fingerprint, FolderClosed, FolderOpen, ArrowRight, CheckCircle2,
  Cpu, ShieldCheck, Terminal, Binary, Server, Database, Key
} from 'lucide-react';
import { PasswordConfig, SavedPassword } from './types';
import { generatePassword, calculateStrength } from './utils';
import StrengthIndicator from './components/StrengthIndicator';
import HistoryPanel from './components/HistoryPanel';
import FloatingTechIcons from './components/FloatingTechIcons';
import PasswordHighlighter from './components/PasswordHighlighter';
import Footer from './components/Footer';

const DEFAULT_CONFIG: PasswordConfig = {
  length: 16,
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true,
  excludeSimilar: true,
  excludeAmbiguous: false,
  customInclude: '',
  customExclude: '',
  passwordType: 'random',
  passphraseWordCount: 4,
  passphraseSeparator: '-',
  passphraseCapitalize: true,
  pronounceableSyllables: 4,
};

export default function App() {
  const [config, setConfig] = useState<PasswordConfig>(DEFAULT_CONFIG);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [showMainPassword, setShowMainPassword] = useState(true);
  const [history, setHistory] = useState<SavedPassword[]>([]);
  const [activePreset, setActivePreset] = useState<string>('CUSTOM');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('keysmith_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      } else {
        const seedData: SavedPassword[] = [
          {
            id: 'seed-1',
            password: 'portal-galaxy-beacon-secure',
            type: 'passphrase',
            strengthLabel: 'SECURE',
            timestamp: Date.now() - 3600000,
            tag: 'Server Access key'
          },
          {
            id: 'seed-2',
            password: 'kapt-zob-vun-pelt',
            type: 'pronounceable',
            strengthLabel: 'MEDIUM',
            timestamp: Date.now() - 18000000,
            tag: 'Memory Wi-Fi'
          }
        ];
        setHistory(seedData);
        localStorage.setItem('keysmith_history', JSON.stringify(seedData));
      }
    } catch (e) {
      console.warn("Storage isolated", e);
    }
  }, []);

  const forgePassword = (customConfig = config, addToHistory = false) => {
    const password = generatePassword(customConfig);
    setGeneratedPassword(password);
    setIsCopied(false);

    if (addToHistory) {
      const strength = calculateStrength(password, customConfig.passwordType);
      const newSaved: SavedPassword = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        password,
        type: customConfig.passwordType,
        strengthLabel: strength.label,
        timestamp: Date.now(),
      };
      
      const updatedHistory = [newSaved, ...history].slice(0, 50);
      setHistory(updatedHistory);
      saveHistoryToLocalStorage(updatedHistory);
    }
  };

  const saveHistoryToLocalStorage = (newHistory: SavedPassword[]) => {
    try {
      localStorage.setItem('keysmith_history', JSON.stringify(newHistory));
    } catch (e) {
      console.warn(e);
    }
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    saveHistoryToLocalStorage(updated);
  };

  const clearAllHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('keysmith_history');
    } catch (e) {
      console.warn(e);
    }
  };

  const updateHistoryTag = (id: string, newTag: string) => {
    const updated = history.map(item => {
      if (item.id === id) {
        return { ...item, tag: newTag };
      }
      return item;
    });
    setHistory(updated);
    saveHistoryToLocalStorage(updated);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedNotification("Password copied to clipboard");
      setIsCopied(true);
      setTimeout(() => {
        setCopiedNotification(null);
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Clipboard blocked", err);
    }
  };

  useEffect(() => {
    if (!generatedPassword) {
      forgePassword(DEFAULT_CONFIG, false);
    }
  }, []);

  const handleConfigChange = (updater: Partial<PasswordConfig>) => {
    const nextConfig = { ...config, ...updater };
    setConfig(nextConfig);
    setActivePreset('CUSTOM');
    forgePassword(nextConfig, false);
  };

  const applyPreset = (name: string) => {
    setActivePreset(name);
    let updated: PasswordConfig = { ...config };
    
    switch (name) {
      case 'PIN':
        updated = {
          ...config,
          length: 5,
          passwordType: 'random',
          useNumbers: true,
          useLowercase: false,
          useUppercase: false,
          useSymbols: false,
          customInclude: '',
          customExclude: '',
        };
        break;
      case 'STANDARD':
        updated = {
          ...config,
          length: 12,
          passwordType: 'random',
          useLowercase: true,
          useUppercase: true,
          useNumbers: true,
          useSymbols: false,
          excludeSimilar: true,
          excludeAmbiguous: false,
          customInclude: '',
          customExclude: '',
        };
        break;
      case 'SECURE':
        updated = {
          ...config,
          length: 24,
          passwordType: 'random',
          useLowercase: true,
          useUppercase: true,
          useNumbers: true,
          useSymbols: true,
          excludeSimilar: false,
          excludeAmbiguous: false,
          customInclude: '',
          customExclude: '',
        };
        break;
      case 'MEMORABLE':
        updated = {
          ...config,
          passwordType: 'passphrase',
          passphraseWordCount: 4,
          passphraseSeparator: '-',
          passphraseCapitalize: true,
        };
        break;
    }
    
    setConfig(updated);
    forgePassword(updated, false);
  };

  const strength = calculateStrength(generatedPassword, config.passwordType);

  const getPasswordFontSizeClass = (len: number) => {
    if (len > 36) return 'text-xs sm:text-sm';
    if (len > 24) return 'text-sm sm:text-base';
    if (len > 18) return 'text-base sm:text-lg';
    return 'text-lg sm:text-xl md:text-2xl';
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#070708] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400 overflow-hidden">
      
      {/* Cyber dot matrix grid background overlay */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none z-0"></div>
      
      <FloatingTechIcons />

      {/* Top Banner & Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-start">
        
        {/* Main Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3 select-none">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner cursor-pointer"
            >
              <Fingerprint className="w-5 h-5 text-emerald-400 animate-pulse" />
            </motion.div>
            <div>
              <h1 className="text-lg font-semibold tracking-wider text-zinc-150 uppercase leading-none">
                Keysmith
              </h1>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-1.5">
                Simple Password Forge
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-950/40 border border-zinc-800/80 font-mono text-[10px] relative">
            <span className="text-zinc-500 px-2 uppercase tracking-widest hidden sm:inline select-none">Presets</span>
            {[
              { id: 'PIN', label: 'PIN' },
              { id: 'STANDARD', label: 'Standard' },
              { id: 'SECURE', label: 'Secure' },
              { id: 'MEMORABLE', label: 'Phrase' },
            ].map(preset => (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                onClick={() => applyPreset(preset.id)}
                className={`relative py-1.5 px-3.5 rounded-lg text-[10px] tracking-wider transition-colors duration-300 uppercase cursor-pointer z-10 ${
                  activePreset === preset.id
                    ? 'text-emerald-400 font-bold glow-text-emerald'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {activePreset === preset.id && (
                  <motion.div
                    layoutId="activePresetBackground"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {preset.label}
              </button>
            ))}
          </div>
        </header>

        {/* Password Output Area */}
        <section id="forge-output-panel" className="mb-6 z-10 relative">
          <div className="glass-panel pb-5 pt-6 px-5 sm:px-6 rounded-xl flex flex-col md:flex-row items-stretch justify-between gap-4 border border-zinc-800/80">
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 block mb-2 uppercase">
                Generated Key
              </span>
              
              <div 
                onClick={() => handleCopy(generatedPassword)}
                className="relative group/key bg-zinc-950/65 border border-zinc-805 hover:border-emerald-500/35 py-4 px-4.5 rounded-xl flex items-center justify-between min-h-[64px] overflow-hidden cursor-pointer transition-all duration-300 shadow-inner"
              >
                <div className={`w-full overflow-hidden ${getPasswordFontSizeClass(generatedPassword.length)}`}>
                  <PasswordHighlighter password={generatedPassword} visible={showMainPassword} />
                </div>
                
                {/* Hover to copy visual helper */}
                <div className="absolute inset-0 bg-emerald-500/[0.01] opacity-0 group-hover/key:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-4 pointer-events-none">
                  <span className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-850 text-zinc-400 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover/key:opacity-100 translate-x-2 group-hover/key:translate-x-0 transition-all duration-300">
                    <Copy className="w-3 h-3 text-emerald-400" />
                    Click to Copy
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end md:pl-4 md:border-l border-zinc-900/80">
              
              {/* Mask/Unmask */}
              <button
                id="toggle-main-password-visibility-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMainPassword(!showMainPassword);
                }}
                className="flex-1 md:flex-none py-2 px-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-850/60 text-zinc-450 hover:text-zinc-200 transition font-mono text-[10px] tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                title={showMainPassword ? "Mask Password" : "Show Password"}
              >
                {showMainPassword ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{showMainPassword ? 'Mask' : 'Show'}</span>
              </button>

              {/* Secure Copy Button */}
              <button
                id="copy-to-clipboard-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(generatedPassword);
                }}
                className="flex-1 md:flex-none py-2 px-4 rounded-xl border border-zinc-800 hover:border-emerald-500/35 bg-zinc-900/40 hover:bg-zinc-850/60 text-zinc-300 hover:text-emerald-400 transition font-mono text-[10px] tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Save & Forge Button */}
              <button
                id="save-vault-regenerate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  forgePassword(config, true);
                }}
                className="flex-1 md:flex-none py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-450 hover:to-teal-400 text-zinc-950 font-mono text-[10px] font-bold tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Save & Forge</span>
              </button>
            </div>
          </div>
        </section>

        {/* Configuration Parameter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Settings Column */}
          <section id="settings-config" className="md:col-span-7 flex flex-col gap-5 glass-panel p-5 rounded-xl border border-zinc-800/85">
            <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3">
              <div className="flex items-center gap-2 select-none">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Configuration</h2>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Offline</span>
            </div>

            {/* Type Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-zinc-950/45 p-1 rounded-xl border border-zinc-900/85">
              {[
                { id: 'random', label: 'Random', icon: Sparkles },
                { id: 'passphrase', label: 'Phrase', icon: Type },
                { id: 'pronounceable', label: 'Vocal', icon: RefreshCw },
              ].map(type => {
                const Icon = type.icon;
                const isDisabled = activePreset === 'PIN' && (type.id === 'passphrase' || type.id === 'pronounceable');
                const isSelected = config.passwordType === type.id;
                return (
                  <button
                    key={type.id}
                    id={`type-selector-${type.id}`}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;
                      const updated = { ...config, passwordType: type.id as any };
                      if (type.id === 'passphrase') {
                        updated.length = 16;
                      }
                      setConfig(updated);
                      forgePassword(updated, false);
                    }}
                    className={`relative py-2.5 px-1 text-center rounded-lg transition-colors duration-300 flex flex-col items-center gap-1 z-10 ${
                      isDisabled 
                        ? 'opacity-30 cursor-not-allowed text-zinc-600'
                        : isSelected 
                          ? 'text-emerald-400 font-semibold glow-text-emerald' 
                          : 'text-zinc-500 hover:text-zinc-300 cursor-pointer'
                    }`}
                  >
                    {isSelected && !isDisabled && (
                      <motion.div
                        layoutId="activeTypeHighlight"
                        className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/15 rounded-lg -z-10 shadow-[0_0_10px_rgba(16,185,129,0.02)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Length Control Panel */}
            <div className="bg-zinc-950/35 border border-zinc-900/80 p-4 rounded-xl font-mono">
              <div className="flex items-center justify-between mb-2 select-none">
                <span className="text-[10px] text-zinc-400 tracking-wider uppercase flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-zinc-600" />
                  {config.passwordType === 'passphrase' ? 'Word count' : 'Character count'}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    id="decrement-length-btn"
                    onClick={() => {
                      if (config.passwordType === 'passphrase') {
                        if (config.passphraseWordCount > 2) handleConfigChange({ passphraseWordCount: config.passphraseWordCount - 1 });
                      } else {
                        if (config.length > 4) handleConfigChange({ length: config.length - 1 });
                      }
                    }}
                    className="w-6 h-6 border border-zinc-800 rounded-md bg-zinc-900/60 flex items-center justify-center hover:bg-zinc-800 hover:text-emerald-400 text-zinc-400 text-xs transition cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="text-xs font-bold text-emerald-400 px-2 w-8 text-center bg-zinc-950/80 py-0.5 rounded border border-zinc-900">
                    {config.passwordType === 'passphrase' ? config.passphraseWordCount : config.length}
                  </span>

                  <button
                    id="increment-length-btn"
                    onClick={() => {
                      if (config.passwordType === 'passphrase') {
                        if (config.passphraseWordCount < 12) handleConfigChange({ passphraseWordCount: config.passphraseWordCount + 1 });
                      } else {
                        if (config.length < 100) handleConfigChange({ length: config.length + 1 });
                      }
                    }}
                    className="w-6 h-6 border border-zinc-800 rounded-md bg-zinc-900/60 flex items-center justify-center hover:bg-zinc-800 hover:text-emerald-400 text-zinc-400 text-xs transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Slider inputs */}
              {config.passwordType === 'passphrase' ? (
                <input
                  id="passphrase-word-count-slider"
                  type="range"
                  min="2"
                  max="12"
                  value={config.passphraseWordCount}
                  onChange={(e) => handleConfigChange({ passphraseWordCount: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 bg-zinc-850 h-1 rounded cursor-pointer"
                />
              ) : config.passwordType === 'pronounceable' ? (
                <input
                  id="pronounceable-syllables-slider"
                  type="range"
                  min="2"
                  max="12"
                  value={config.pronounceableSyllables}
                  onChange={(e) => handleConfigChange({ pronounceableSyllables: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 bg-zinc-855 h-1 rounded cursor-pointer"
                />
              ) : (
                <input
                  id="random-length-slider"
                  type="range"
                  min="4"
                  max="64"
                  value={config.length}
                  onChange={(e) => handleConfigChange({ length: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 bg-zinc-855 h-1 rounded cursor-pointer"
                />
              )}
            </div>

            {/* Parameter Settings Panels */}
            <div>
              {config.passwordType === 'random' && (
                <div id="random-param-settings" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Lowercase, Uppercase, Numbers, Symbols */}
                    {[
                      { id: 'useLowercase', label: 'Lowercase (a-z)', prop: 'useLowercase' },
                      { id: 'useUppercase', label: 'Uppercase (A-Z)', prop: 'useUppercase' },
                      { id: 'useNumbers', label: 'Numbers (0-9)', prop: 'useNumbers' },
                      { id: 'useSymbols', label: 'Symbols (!@#$)', prop: 'useSymbols' },
                    ].map(chk => (
                      <label key={chk.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
                        config[chk.prop as keyof PasswordConfig]
                          ? 'border-emerald-500/30 bg-emerald-500/[0.02] text-zinc-150'
                          : 'border-zinc-800/60 bg-zinc-950/20 text-zinc-400 hover:border-zinc-700/65'
                      }`}>
                        {/* Custom Checkbox */}
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                          config[chk.prop as keyof PasswordConfig]
                            ? 'border-emerald-500 bg-emerald-500 text-zinc-950 shadow-[0_0_8px_rgba(16,185,129,0.35)]'
                            : 'border-zinc-700 bg-zinc-900'
                        }`}>
                          {config[chk.prop as keyof PasswordConfig] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="font-mono text-xs font-medium">{chk.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Clean styling option settings */}
                  <div className="space-y-2 border-t border-zinc-900/60 pt-4">
                    <label className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      config.excludeSimilar 
                        ? 'border-emerald-500/20 bg-emerald-500/[0.01]' 
                        : 'border-transparent hover:bg-zinc-950/15'
                    }`}>
                      <div className="font-mono text-xs pr-4 select-none">
                        <span className="text-zinc-250 block font-medium leading-relaxed">Avoid similar characters</span>
                        <span className="text-zinc-550 text-[10px] block mt-0.5 leading-normal">Exclude easily confused letters (e.g. i, l, 1, o, 0)</span>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                        config.excludeSimilar
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {config.excludeSimilar && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      config.excludeAmbiguous 
                        ? 'border-emerald-500/20 bg-emerald-500/[0.01]' 
                        : 'border-transparent hover:bg-zinc-950/15'
                    }`}>
                      <div className="font-mono text-xs pr-4 select-none">
                        <span className="text-zinc-250 block font-medium leading-relaxed">Avoid special character issues</span>
                        <span className="text-zinc-550 text-[10px] block mt-0.5 leading-normal">Exclude characters that can break CLI arguments (e.g. " ' ` \)</span>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                        config.excludeAmbiguous
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {config.excludeAmbiguous && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </label>
                  </div>

                  {/* Force Custom Characters input fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-zinc-800 pt-3.5 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block mb-1 uppercase">Always include:</span>
                      <input
                        id="custom-include-characters-input"
                        type="text"
                        value={config.customInclude}
                        placeholder="e.g. @#$%"
                        onChange={(e) => handleConfigChange({ customInclude: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 p-2 rounded focus:outline-none focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block mb-1 uppercase">Always exclude:</span>
                      <input
                        id="custom-exclude-characters-input"
                        type="text"
                        value={config.customExclude}
                        placeholder="e.g. xyz"
                        onChange={(e) => handleConfigChange({ customExclude: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 p-2 rounded focus:outline-none focus:border-emerald-500/40"
                      />
                    </div>
                  </div>
                </div>
              )}

              {config.passwordType === 'passphrase' && (
                <div id="passphrase-param-settings" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Delimiter block */}
                    <div className="bg-zinc-950/25 border border-zinc-800 p-3 rounded-lg flex flex-col justify-between">
                      <span className="font-mono text-[10px] text-zinc-500 mb-1.5 uppercase block">Delimiter:</span>
                      <div className="grid grid-cols-4 gap-1">
                        {['-', '.', '_', ' '].map(sep => (
                          <button
                            key={sep}
                            id={`separator-btn-${sep === ' ' ? 'space' : sep}`}
                            onClick={() => handleConfigChange({ passphraseSeparator: sep })}
                            className={`py-1 rounded border font-mono text-xxs tracking-wider ${
                              config.passphraseSeparator === sep 
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' 
                                : 'border-zinc-850 bg-zinc-950 text-zinc-500 hover:text-zinc-350'
                            }`}
                          >
                            {sep === ' ' ? 'SPACE' : sep}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 p-3 bg-zinc-950/10 border border-zinc-800 rounded-lg hover:bg-zinc-950/20 transition cursor-pointer">
                      <input
                        id="checkbox-passphrase-capitalize"
                        type="checkbox"
                        checked={config.passphraseCapitalize}
                        onChange={(e) => handleConfigChange({ passphraseCapitalize: e.target.checked })}
                        className="w-4 h-4 accent-emerald-500 rounded border-zinc-800"
                      />
                      <div className="font-mono text-xs">
                        <span className="text-zinc-200 block font-medium leading-none mb-1">Capitalize Words</span>
                        <span className="text-zinc-500 text-[10px]">Capitalize the first letter of each word</span>
                      </div>
                    </label>
                  </div>

                  <div className="font-mono text-2xs bg-zinc-950/50 p-3 rounded-lg border border-zinc-850 text-zinc-500">
                    Assembles multiple vocabulary words sequentially. Highly memorable and robust against modern brute-forcing models.
                  </div>
                </div>
              )}

              {config.passwordType === 'pronounceable' && (
                <div id="vocal-param-settings" className="space-y-3">
                  <div className="font-mono text-2xs bg-zinc-950/50 p-3 rounded-lg border border-zinc-850 text-zinc-500">
                    Generates pseudo-random syllables assembled into phonetically natural and easy-to-read groupings. Excellent when manual readback is needed.
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-2xs font-mono">
                    <div className="p-2.5 bg-zinc-950/35 border border-zinc-850 rounded">
                      <span className="text-zinc-500 block mb-0.5">Vowels:</span>
                      <span className="text-emerald-400 font-medium tracking-widest">A E I O U</span>
                    </div>
                    <div className="p-2.5 bg-zinc-950/35 border border-zinc-850 rounded">
                      <span className="text-zinc-500 block mb-0.5">Consonants:</span>
                      <span className="text-emerald-400 font-medium tracking-wide">B C D F G H J K L M N P R S T V W X Z</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Strength Guard Diagnostics Column */}
          <section id="diagnostics" className="md:col-span-5 flex flex-col justify-start">
            <StrengthIndicator strength={strength} />
          </section>

        </div>

      </div>

      {/* Footer */}
      <Footer />

      {/* FIXED BUTTON IN BOTTOM-RIGHT FOR FORGED KEY VAULT */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="vault-trigger-floating"
          onClick={() => setIsVaultOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg select-none cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
          title="Open Password Vault"
        >
          {isVaultOpen ? <FolderOpen className="w-4.5 h-4.5" /> : <FolderClosed className="w-4.5 h-4.5" />}
          <span className="text-xs font-bold leading-none select-none">Forged Key Vault</span>
          
          {history.length > 0 && (
            <span className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-black text-emerald-400 font-mono">
              {history.length}
            </span>
          )}
        </button>
      </div>

      {/* SLIDE-OUT VAULT VIEW OVERLAY (SEPARATE DRAWER/PAGE) */}
      <AnimatePresence>
        {isVaultOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop dark shadow block */}
            <motion.div
              id="vault-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVaultOpen(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />
            
            {/* Slide-out Panel Page Container */}
            <motion.div
              id="vault-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-zinc-900/90 backdrop-blur-xl shadow-2xl border-l border-zinc-805 flex flex-col"
            >
              <div className="p-1 h-full">
                <HistoryPanel 
                  history={history}
                  onCopy={handleCopy}
                  onDelete={deleteHistoryItem}
                  onClearAll={clearAllHistory}
                  onUpdateTag={updateHistoryTag}
                  onClose={() => setIsVaultOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Copy notification overlay block banner */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-22 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 py-2.5 px-5 bg-zinc-900 border border-emerald-500/30 rounded-xl flex items-center gap-2 shadow-xl text-xs font-mono text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
