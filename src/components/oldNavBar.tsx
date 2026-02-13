import { useState, useEffect, type ComponentProps } from 'react';
import { Layers, Server, Code, Terminal, Database, Bot, Globe, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { Language, Mode } from '../types';

const navContainerVariants = tv({
  base: 'fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 border-b',
  variants: {
    theme: {
      dark: 'bg-dark-bg/60 backdrop-blur-xl border-white/10',
      light: 'bg-apple-card/80 backdrop-blur-xl border-apple-border shadow-sm'
    }
  }
});

const modeButtonVariants = tv({
  base: 'relative px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 uppercase tracking-wider cursor-pointer',
  variants: {
    active: {
      true: '',
      false: 'opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5',
    },
    mode: {
      [Mode.FULLSTACK]: 'bg-brand-600 text-white',
      [Mode.BACKEND]: 'bg-green-600 text-black border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      [Mode.FRONTEND]: 'bg-pink-500 text-white border-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]',
      [Mode.DEVOPS]: 'bg-orange-600 text-white border-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.5)]',
      [Mode.DATABASE]: 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]',
      [Mode.AI]: 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]',
    }
  },
  compoundVariants: Object.values(Mode).map((m) => ({
    active: true,
    mode: m,
    class: '',
  })),
  defaultVariants: {
    active: false,
  }
});

interface NavBarProps extends ComponentProps<'nav'> {
  currentLang: Language;
  currentMode: Mode;
  ui: any;
}

export function NavBar({ className, currentLang, currentMode, ui, ...props }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Determine if we are in "Light Mode" (Frontend) or "Dark Mode" (Others)
  const isLight = currentMode === Mode.FRONTEND;

  useEffect(() => {
    const pref = localStorage.getItem('audioEnabled');
    if (pref === 'true') setAudioEnabled(true);
  }, []);

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem('audioEnabled', String(newState));
    window.dispatchEvent(new CustomEvent('audioToggle', { detail: newState }));
  };

  const switchPath = (newLang: Language, newMode: Mode) => {
    navigate(`/${newLang}/${newMode}`);
    setIsOpen(false);
  };

  const toggleThemeMode = () => {
    // If currently Light (Frontend), go to Dark (Fullstack)
    // If currently Dark (Anything else), go to Light (Frontend)
    if (isLight) {
      switchPath(currentLang, Mode.FULLSTACK);
    } else {
      switchPath(currentLang, Mode.FRONTEND);
    }
  };

  const ModeIcon = {
    [Mode.FULLSTACK]: Layers,
    [Mode.FRONTEND]: Code,
    [Mode.BACKEND]: Server,
    [Mode.DEVOPS]: Terminal,
    [Mode.DATABASE]: Database,
    [Mode.AI]: Bot,
  }[currentMode];

  return (
    <nav data-slot="navbar" className={twMerge(navContainerVariants({ theme: isLight ? 'light' : 'dark' }), className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <ModeIcon className={`w-8 h-8 relative z-10 transition-transform group-hover:rotate-12 ${isLight ? 'text-black' : 'text-white'}`} />
              <div className={`absolute inset-0 blur-lg rounded-full ${isLight ? 'bg-black/10' : 'bg-white/30'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight tracking-wider transition-colors ${isLight ? 'text-black group-hover:text-blue-600' : 'text-white group-hover:text-brand-400'}`}>
                JÔNATAS<span className="opacity-50">.DEV</span>
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] opacity-60 ${isLight ? 'text-black' : 'text-white'}`}>Multiverse Portfolio</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full transition-all cursor-pointer ${isLight ? 'text-black/60 hover:bg-black/5' : 'text-white/70 hover:bg-white/10'}`}
              title={ui?.ambientAudio}
            >
              {audioEnabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </button>

            {/* Mode Selector */}
            <div className={`flex backdrop-blur-md rounded-xl p-1.5 border ${isLight ? 'bg-white/50 border-black/5' : 'bg-black/30 border-white/10'}`}>
              {(Object.values(Mode) as Mode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => switchPath(currentLang, mode)}
                  className={twMerge(
                    modeButtonVariants({ active: currentMode === mode, mode: currentMode === mode ? mode : undefined }),
                    currentMode === mode ? '' : (isLight ? 'text-black/60 hover:text-black hover:bg-black/5' : 'text-white/40 hover:text-white hover:bg-white/5')
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Theme / Mode Toggle (New Animated Component) */}
            <div className="flex items-center gap-4">
              <AnimatedThemeToggle isDark={!isLight} onToggle={toggleThemeMode} />
            </div>

            {/* Language Selector */}
            <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-black/60' : 'text-white/50'}`}>
              <Globe className="size-4" />
              <select
                value={currentLang}
                onChange={(e) => switchPath(e.target.value as Language, currentMode)}
                className={`bg-transparent border-none outline-none focus:ring-0 cursor-pointer font-mono p-1 ${isLight ? 'text-black' : 'text-white'}`}
              >
                <option value={Language.EN} className="bg-white text-black dark:bg-dark-card dark:text-white">EN</option>
                <option value={Language.PT} className="bg-white text-black dark:bg-dark-card dark:text-white">PT</option>
              </select>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 cursor-pointer ${isLight ? 'text-black' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Simplified for brevity, ensuring dark/light contrast) */}
      {isOpen && (
        <div className={`lg:hidden p-6 fixed inset-0 top-20 z-40 overflow-y-auto ${isLight ? 'bg-white/95 border-b border-black/5' : 'bg-black/95 border-b border-white/10'}`}>
          {/* Mobile content implementation would mirror desktop logic roughly */}
          <div className={`text-center py-10 ${isLight ? 'text-black' : 'text-white'}`}>
            Mobile Menu Content
          </div>
        </div>
      )}

    </nav>
  );
}
