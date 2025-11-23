
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { 
  Download, 
  ChevronRight, 
  Layers, 
  Zap, 
  Music, 
  Cpu, 
  Disc, 
  Sliders, 
  Check,
  Play,
  Menu,
  X,
  User,
  Terminal,
  ArrowRight,
  LayoutTemplate,
  FileText,
  Search,
  BookOpen,
  LifeBuoy,
  CreditCard,
  Shield,
  Activity,
  GitCommit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Design System & Utilities ---

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// --- Components ---

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  icon: Icon,
  ...props 
}: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-violet-500",
    secondary: "bg-white/5 text-zinc-100 hover:bg-white/10 border border-white/10 backdrop-blur-sm",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
    outline: "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10 p-0"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && <Icon className={cn("w-4 h-4", children ? "mr-2" : "")} />}
      {children}
    </motion.button>
  );
};

const Badge = ({ children, variant = "default", className }: any) => {
  const styles = variant === "outline" 
    ? "border border-violet-500/30 text-violet-300 bg-violet-500/10" 
    : "bg-violet-600 text-white";
    
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles, className)}>
      {variant === "outline" && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2 animate-pulse" />}
      {children}
    </span>
  );
};

const Card = ({ children, className }: any) => (
  <div className={cn("bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden", className)}>
    {children}
  </div>
);

// --- Sections ---

const Navbar = ({ activePage, setPage }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Docs", id: "docs" },
    { name: "Pricing", id: "pricing" },
    { name: "Changelog", id: "changelog" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-[#09090b]/80 backdrop-blur-md border-[#27272a] py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setPage("home")} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-violet-500/20 transition-all">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Nomad</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => setPage(link.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-violet-400",
                activePage === link.id ? "text-white" : "text-zinc-400"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setPage("login")}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </button>
          <Button size="sm" onClick={() => setPage("download")} icon={Download}>
            Download v1.0.4
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#18181b] border-b border-[#27272a] overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => { setPage(link.id); setMobileOpen(false); }}
                  className="text-left text-zinc-300 hover:text-violet-400"
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-[#27272a]" />
              <button onClick={() => setPage("login")} className="text-left text-zinc-300">Sign in</button>
              <Button className="w-full" onClick={() => setPage("download")}>Download Trial</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setPage }: any) => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="outline">Nomad v1.0.4 Stable is now live</Badge>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          The DAW for those who <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            live inside the audio.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Brutally optimized for speed and flow state. <br className="hidden md:block" />
          No bloat. Instant startup. Pure signal.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" onClick={() => setPage("download")} icon={Download}>
            Start Free Trial
          </Button>
          <Button variant="secondary" size="lg" onClick={() => setPage("features")}>
            Explore Features <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Abstract DAW Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        className="mt-20 max-w-6xl mx-auto relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-b from-violet-500/20 to-transparent rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
        <div className="relative rounded-xl border border-[#27272a] bg-[#09090b] shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
           {/* Mock Window Header */}
           <div className="h-10 border-b border-[#27272a] bg-[#18181b] flex items-center px-4 gap-2">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/20" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
               <div className="w-3 h-3 rounded-full bg-green-500/20" />
             </div>
             <div className="ml-4 h-4 w-32 bg-[#27272a] rounded-sm" />
           </div>
           {/* Mock DAW UI */}
           <div className="flex-1 flex">
             {/* Sidebar */}
             <div className="w-16 border-r border-[#27272a] bg-[#121215] flex flex-col items-center py-4 gap-6">
                <div className="w-8 h-8 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center"><Layers size={18} /></div>
                <div className="w-8 h-8 rounded hover:bg-[#27272a] text-zinc-600 flex items-center justify-center transition-colors"><Disc size={18} /></div>
                <div className="w-8 h-8 rounded hover:bg-[#27272a] text-zinc-600 flex items-center justify-center transition-colors"><Sliders size={18} /></div>
             </div>
             {/* Timeline */}
             <div className="flex-1 bg-[#09090b] relative">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="h-16 border-b border-[#27272a] relative flex items-center px-2 group/track">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover/track:bg-violet-500 transition-colors" />
                   <div className="ml-32 h-10 rounded-md bg-[#18181b] border border-[#27272a] flex items-center overflow-hidden w-64" style={{ marginLeft: `${i * 60 + 20}px` }}>
                     <div className="w-full h-full opacity-30 flex items-center gap-0.5">
                        {[...Array(40)].map((_, j) => (
                          <div key={j} className="w-1 bg-violet-400" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                     </div>
                   </div>
                 </div>
               ))}
               {/* Playhead */}
               <div className="absolute top-0 bottom-0 left-1/3 w-px bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10">
                 <div className="absolute -top-1 -left-1.5 text-red-500"><Play size={12} fill="currentColor" className="rotate-90" /></div>
               </div>
             </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl bg-[#121214] border border-[#27272a] hover:border-violet-500/50 transition-colors group"
  >
    <div className="w-12 h-12 rounded-lg bg-violet-900/10 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => (
  <section className="py-32 px-6 bg-[#09090b]">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineered for <span className="text-violet-500">Flow State</span></h2>
        <p className="text-xl text-zinc-400 max-w-2xl">
          We stripped away the clutter found in traditional DAWs. 
          Nomad gives you exactly what you need to create, mix, and ship.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Cpu} 
          title="Brutally Optimized" 
          description="Runs flawlessly on everything from a high-end Mac Studio to a 5-year-old laptop. Zero latency engine written in Rust."
          delay={0}
        />
        <FeatureCard 
          icon={Zap} 
          title="Instant Startup" 
          description="Opens in under 800ms. No scanning for plugins on every launch. Get from desktop to recording in seconds."
          delay={0.1}
        />
        <FeatureCard 
          icon={Layers} 
          title="Sandboxed Plugins" 
          description="A single crashing VST will never take down your session again. Nomad isolates plugins so your work remains safe."
          delay={0.2}
        />
        <FeatureCard 
          icon={Sliders} 
          title="Unified Modulation" 
          description="Drag-and-drop LFOs and Envelopes onto ANY parameter. Third-party plugins, mixer faders, internal effects—everything is modulatable."
          delay={0.3}
        />
        <FeatureCard 
          icon={Terminal} 
          title="Scriptable API" 
          description="Build your own tools with Lua. The entire engine is exposed to developers who want to customize their workflow."
          delay={0.4}
        />
        <FeatureCard 
          icon={Disc} 
          title="Sampler Grade A" 
          description="A world-class sampler built directly into the timeline. Time-stretch, pitch-shift, and slice with surgical precision."
          delay={0.5}
        />
      </div>
    </div>
  </section>
);

const Downloads = ({ setPage }: any) => {
  const builds = [
    { os: "macOS", arch: "Apple Silicon", ver: "1.0.4", date: "Oct 24", type: "Stable" },
    { os: "macOS", arch: "Intel", ver: "1.0.4", date: "Oct 24", type: "Stable" },
    { os: "Windows", arch: "x64", ver: "1.0.4", date: "Oct 24", type: "Stable" },
    { os: "Linux", arch: "Ubuntu/Debian", ver: "1.1.0-beta", date: "Today", type: "Beta" },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <button onClick={() => setPage("home")} className="text-zinc-400 hover:text-white mb-8 flex items-center text-sm">
        <ArrowRight className="rotate-180 mr-2 w-4 h-4" /> Back to Home
      </button>
      
      <h1 className="text-4xl font-bold text-white mb-4">Downloads</h1>
      <p className="text-zinc-400 mb-12">Select your platform. All builds include the full feature set.</p>

      <div className="space-y-4">
        {builds.map((build, i) => (
          <Card key={i} className="p-6 flex items-center justify-between hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                 {build.os === "Windows" ? <LayoutTemplate size={20} /> : <Cpu size={20} />}
               </div>
               <div>
                 <h3 className="text-white font-medium">{build.os} <span className="text-zinc-500 text-sm">({build.arch})</span></h3>
                 <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs bg-zinc-800 text-zinc-300 px-1.5 rounded">{build.ver}</span>
                   <span className="text-xs text-zinc-500">{build.date}</span>
                 </div>
               </div>
            </div>
            <div className="flex items-center gap-4">
              {build.type === "Beta" && <Badge variant="outline">Beta</Badge>}
              <Button size="sm" variant="secondary" icon={Download}>Download</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// --- New MVP Pages ---

const Pricing = ({ setPage }: any) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, honest pricing</h1>
        <p className="text-xl text-zinc-400">Own your tools. No subscriptions. No hidden fees.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <Card className="p-8 border-zinc-800 flex flex-col relative">
          <div className="mb-8">
            <h3 className="text-xl font-medium text-white mb-2">Nomad Evaluation</h3>
            <div className="text-4xl font-bold text-white mb-2">$0</div>
            <p className="text-zinc-400 text-sm">Infinite trial period. WinRAR style.</p>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {["Full feature set", "Unlimited tracks", "All native plugins", "Save & Export enabled", "Nag screen on startup"].map((feat, i) => (
              <li key={i} className="flex items-center text-zinc-300 text-sm">
                <Check className="w-4 h-4 text-zinc-500 mr-3" />
                {feat}
              </li>
            ))}
          </ul>
          <Button variant="secondary" className="w-full" onClick={() => setPage("download")}>Download Trial</Button>
        </Card>

        {/* Paid Tier */}
        <Card className="p-8 border-violet-500/50 bg-[#121214] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
          <div className="absolute inset-0 bg-violet-500/5 pointer-events-none" />
          
          <div className="mb-8 relative z-10">
            <h3 className="text-xl font-medium text-white mb-2">Nomad Studio</h3>
            <div className="text-4xl font-bold text-white mb-2">$199</div>
            <p className="text-violet-300 text-sm">Perpetual license. Lifetime updates.</p>
          </div>
          <ul className="space-y-4 mb-8 flex-1 relative z-10">
            {["Everything in Evaluation", "No startup nag screen", "Priority support", "Early access to Beta builds", "Support independent dev"].map((feat, i) => (
              <li key={i} className="flex items-center text-white text-sm">
                <Check className="w-4 h-4 text-violet-400 mr-3" />
                {feat}
              </li>
            ))}
          </ul>
          <Button variant="primary" className="w-full relative z-10" onClick={() => setPage("account")}>Buy License</Button>
        </Card>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-zinc-500 text-sm">
          Looking for educational or bulk pricing? <button className="text-violet-400 hover:underline">Contact us</button>.
        </p>
      </div>
    </div>
  );
};

const Changelog = ({ setPage }: any) => {
  const versions = [
    {
      ver: "1.0.4",
      date: "Oct 24, 2024",
      type: "Stable",
      changes: [
        { type: "fix", text: "Fixed audio engine dropout on high buffer sizes (>2048 samples)." },
        { type: "new", text: "Added 'Vintage Warmth' saturation module to the Mixer strip." },
        { type: "perf", text: "Improved Piano Roll scrolling performance by 40% on 4K displays." }
      ]
    },
    {
      ver: "1.0.3",
      date: "Oct 10, 2024",
      type: "Stable",
      changes: [
        { type: "new", text: "New Sampler interpolation modes (Sinc, Linear, Nearest)." },
        { type: "fix", text: "VST3 scanning is now multi-threaded (3x faster startup)." },
        { type: "change", text: "Moved 'Export' button to main toolbar for easier access." }
      ]
    },
    {
      ver: "1.0.0",
      date: "Sep 15, 2024",
      type: "Major",
      changes: [
        { type: "new", text: "Initial public release." },
        { type: "new", text: "Complete Lua scripting API for custom tools." }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case "new": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "fix": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "perf": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-white">Changelog</h1>
        <div className="flex items-center text-sm text-zinc-500">
          <Activity className="w-4 h-4 mr-2" />
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          All systems operational
        </div>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 space-y-12">
        {versions.map((release, i) => (
          <div key={i} className="relative pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-violet-600 ring-4 ring-[#09090b]" />
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">v{release.ver}</h2>
              <div className="flex items-center gap-3">
                 <span className="text-sm text-zinc-500 font-mono">{release.date}</span>
                 <Badge variant="outline" className="uppercase text-[10px] tracking-wider">{release.type}</Badge>
              </div>
            </div>

            <ul className="space-y-4">
              {release.changes.map((change, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase mt-0.5", getTypeColor(change.type))}>
                    {change.type}
                  </span>
                  <span className="text-zinc-300 text-sm leading-relaxed">{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Docs = ({ setPage }: any) => {
  return (
    <div className="pt-24 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-24 bottom-0 border-r border-[#27272a] bg-[#09090b] hidden md:block overflow-y-auto">
        <div className="p-6">
          <div className="relative mb-6">
             <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
             <input type="text" placeholder="Search manual..." className="w-full bg-[#18181b] border border-[#27272a] rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:ring-2 focus:ring-violet-500/50 focus:outline-none" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Getting Started</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="text-violet-400 font-medium">Introduction</button></li>
                <li><button className="text-zinc-400 hover:text-white transition-colors">Installation</button></li>
                <li><button className="text-zinc-400 hover:text-white transition-colors">Audio Setup</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Core Concepts</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="text-zinc-400 hover:text-white transition-colors">The Timeline</button></li>
                <li><button className="text-zinc-400 hover:text-white transition-colors">Mixer Routing</button></li>
                <li><button className="text-zinc-400 hover:text-white transition-colors">Automation Clips</button></li>
                <li><button className="text-zinc-400 hover:text-white transition-colors">Plugin Sandboxing</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 md:ml-64 p-8 md:p-12 max-w-4xl">
        <div className="mb-4 text-sm text-violet-400 font-medium">Getting Started / Introduction</div>
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Nomad</h1>
        
        <div className="prose prose-invert prose-violet max-w-none">
          <p className="text-lg text-zinc-300 leading-relaxed mb-6">
            Nomad is a digital audio workstation designed for speed, stability, and flow. 
            Unlike other DAWs that try to be everything to everyone, Nomad focuses purely on 
            the music creation process.
          </p>
          
          <Card className="p-6 mb-8 bg-violet-900/10 border-violet-500/20">
            <h4 className="flex items-center text-violet-300 font-bold mb-2">
              <Zap className="w-4 h-4 mr-2" /> Quick Tip
            </h4>
            <p className="text-sm text-zinc-300">
              Press <code className="bg-black/30 px-1.5 py-0.5 rounded text-white font-mono text-xs">Cmd + K</code> anywhere in the app to open the Command Palette. 
              You can access every single feature of Nomad without lifting your hands from the keyboard.
            </p>
          </Card>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Philosophy</h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            We believe that your tools should be invisible. When you are in the creative zone, 
            you shouldn't be fighting with windows, waiting for plugins to scan, or dealing with crashes.
          </p>
          <ul className="space-y-2 list-disc list-inside text-zinc-400 mb-8">
            <li><strong className="text-white">Performance First:</strong> Every feature is benchmarked.</li>
            <li><strong className="text-white">Crash Protection:</strong> Plugins run in separate processes.</li>
            <li><strong className="text-white">Keyboard Centric:</strong> Mouse-free workflow is a first-class citizen.</li>
          </ul>

          <div className="flex gap-4 mt-12 pt-8 border-t border-[#27272a]">
             <Button variant="secondary" className="w-full justify-between group">
               <span className="text-zinc-400">Previous: None</span>
             </Button>
             <Button variant="secondary" className="w-full justify-between group">
               <span className="text-white group-hover:text-violet-400 transition-colors">Next: Installation</span>
               <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Mock Dashboard Page ---

const Dashboard = ({ setPage }: any) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#27272a] bg-[#121214] hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-12 text-white font-bold text-xl cursor-pointer" onClick={() => setPage("home")}>
          <Music className="text-violet-500" /> Nomad
        </div>
        <div className="space-y-1">
          <button onClick={() => setActiveTab("overview")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3", activeTab === "overview" ? "bg-violet-600/10 text-violet-400" : "text-zinc-400 hover:text-white")}>
            <LayoutTemplate size={16} /> Overview
          </button>
          <button onClick={() => setActiveTab("licenses")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3", activeTab === "licenses" ? "bg-violet-600/10 text-violet-400" : "text-zinc-400 hover:text-white")}>
            <Shield size={16} /> Licenses
          </button>
          <button onClick={() => setActiveTab("plugins")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3", activeTab === "plugins" ? "bg-violet-600/10 text-violet-400" : "text-zinc-400 hover:text-white")}>
            <Zap size={16} /> My Plugins
          </button>
          <button onClick={() => setActiveTab("support")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3", activeTab === "support" ? "bg-violet-600/10 text-violet-400" : "text-zinc-400 hover:text-white")}>
            <LifeBuoy size={16} /> Support
          </button>
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#18181b] border border-[#27272a]">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
            <div className="text-xs">
              <div className="text-white">John Doe</div>
              <div className="text-zinc-500">Pro Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white capitalize">{activeTab}</h1>
            <Button size="sm" variant="outline" onClick={() => setPage("home")}>Sign Out</Button>
          </div>
          
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Active License</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Active</div>
                  <span className="text-zinc-500 text-sm">Expires Dec 2025</span>
                </div>
                <div className="bg-black/50 border border-dashed border-[#27272a] rounded p-3 font-mono text-zinc-300 text-sm flex justify-between items-center group cursor-pointer hover:border-violet-500/50 transition-colors">
                  <span>XXXX-XXXX-XXXX-8921</span>
                  <Check className="w-3 h-3 text-zinc-600 group-hover:text-violet-500" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-zinc-400 text-sm font-medium mb-2">Latest Build</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-medium">Nomad v1.0.4</div>
                  <div className="text-xs text-zinc-500">Released 2 days ago</div>
                </div>
                <Button className="w-full" icon={Download}>Download Installer</Button>
              </Card>

               <div className="md:col-span-2 mt-4">
                <h3 className="text-white font-medium mb-4">Installation History</h3>
                <div className="rounded-xl border border-[#27272a] overflow-hidden">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#121214] border-b border-[#27272a] last:border-0 hover:bg-[#18181b] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#18181b] flex items-center justify-center text-zinc-500"><Cpu size={14} /></div>
                        <div>
                          <div className="text-sm text-zinc-200">macOS Installer (Apple Silicon)</div>
                          <div className="text-xs text-zinc-500">v1.0.{4-i} • Downloaded via Web</div>
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500">Oct {25-i}, 2024</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "plugins" && (
            <div className="text-center py-20">
               <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Zap className="text-zinc-500" />
               </div>
               <h3 className="text-white text-lg font-medium mb-2">Cloud Plugin Sync</h3>
               <p className="text-zinc-400 max-w-md mx-auto mb-6">
                 Nomad will soon support syncing your VST favorites and presets across devices.
               </p>
               <Badge variant="outline">Coming in v1.1</Badge>
            </div>
          )}

          {activeTab === "support" && (
             <div className="space-y-6">
               <Card className="p-6">
                 <h3 className="text-white font-medium mb-4">Open a Ticket</h3>
                 <textarea className="w-full h-32 bg-black/50 border border-[#27272a] rounded-lg p-4 text-zinc-300 focus:outline-none focus:border-violet-500 mb-4" placeholder="Describe your issue..." />
                 <Button>Submit Request</Button>
               </Card>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Footer ---

const Footer = ({ setPage }: any) => (
  <footer className="bg-[#050507] border-t border-[#27272a] py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center"><Music size={12} className="text-white" /></div>
          <span className="text-lg font-bold text-white">Nomad</span>
        </div>
        <p className="text-zinc-500 text-sm max-w-sm mb-6">
          The DAW for people who actually live inside their music. 
          Built by obsessed engineers for obsessed producers.
        </p>
        <div className="text-zinc-600 text-xs">
          © 2024 Nomad Audio Inc.
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-medium mb-4">Product</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li><button onClick={() => setPage("features")} className="hover:text-violet-400">Features</button></li>
          <li><button onClick={() => setPage("pricing")} className="hover:text-violet-400">Pricing</button></li>
          <li><button onClick={() => setPage("changelog")} className="hover:text-violet-400">Changelog</button></li>
          <li><button onClick={() => setPage("download")} className="hover:text-violet-400">Download</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-medium mb-4">Resources</h4>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li><button onClick={() => setPage("docs")} className="hover:text-violet-400">Documentation</button></li>
          <li><button className="hover:text-violet-400">Community Forum</button></li>
          <li><button className="hover:text-violet-400">Developer SDK</button></li>
          <li><button className="hover:text-violet-400">Support</button></li>
        </ul>
      </div>
    </div>
  </footer>
);

// --- Main App Entry ---

const App = () => {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Simple Router
  const renderPage = () => {
    switch(page) {
      case "home":
        return (
          <>
            <Navbar activePage="home" setPage={setPage} />
            <Hero setPage={setPage} />
            <Features />
            <Footer setPage={setPage} />
          </>
        );
      case "features":
        return (
           <>
            <Navbar activePage="features" setPage={setPage} />
            <div className="pt-32 pb-20 px-6 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Deep Dive</h1>
              <p className="text-zinc-400">Feature details coming soon.</p>
              <Button className="mt-8" onClick={() => setPage("home")}>Back Home</Button>
            </div>
            <Footer setPage={setPage} />
           </>
        );
      case "pricing":
        return (
          <>
            <Navbar activePage="pricing" setPage={setPage} />
            <Pricing setPage={setPage} />
            <Footer setPage={setPage} />
          </>
        );
      case "changelog":
        return (
          <>
            <Navbar activePage="changelog" setPage={setPage} />
            <Changelog setPage={setPage} />
            <Footer setPage={setPage} />
          </>
        );
      case "docs":
        return (
          <>
            <Navbar activePage="docs" setPage={setPage} />
            <Docs setPage={setPage} />
          </>
        );
      case "download":
        return (
          <>
            <Navbar activePage="download" setPage={setPage} />
            <Downloads setPage={setPage} />
            <Footer setPage={setPage} />
          </>
        );
      case "login":
      case "account":
        return <Dashboard setPage={setPage} />;
      default:
        return (
          <>
            <Navbar setPage={setPage} />
            <div className="pt-40 text-center text-white">Page not found</div>
          </>
        );
    }
  };

  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-violet-500/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
