import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Type, 
  Wand2, 
  Clock, 
  Download, 
  Layers,
  Eye,
  Maximize2,
  Volume2,
  ChevronRight,
  Monitor,
  Smartphone,
  Info,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoName, format } = location.state || { videoName: "Demo_Video.mp4", format: "vertical" };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [enhancements, setEnhancements] = useState({
    upscale: true,
    sharpness: 60,
    brightness: 50,
    saturation: 40,
    glow: 30,
    blur: 0,
    motionBlur: false,
    hdr: true
  });

  const filters = [
    { id: "none", name: "Original", color: "bg-gray-800" },
    { id: "cyber", name: "Cyberpunk", color: "bg-blue-600" },
    { id: "nature", name: "Autumn Glow", color: "bg-orange-500" },
    { id: "bw", name: "B&W Noir", color: "bg-white" },
    { id: "anime", name: "Anime Style", color: "bg-pink-400" },
    { id: "hdr", name: "HDR Ultra", color: "bg-neon-blue" },
    { id: "cinematic", name: "Deep Cinema", color: "bg-indigo-900" },
  ];

  const subtitles = [
    { time: 0, text: "Hey everyone! Check out this amazing place." },
    { time: 3, text: "The lighting here is just incredible." },
    { time: 6, text: "I can't believe how clear this shot is!" },
    { time: 9, text: "Stay tuned for more epic content." },
  ];

  const activeSubtitle = subtitles.findLast(s => currentTime >= s.time)?.text || "";

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(t => (t >= 12 ? 0 : t + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleExport = () => {
    setIsProcessing(true);
    setProcessingStep(1);
    
    // Simulate multi-step processing
    setTimeout(() => setProcessingStep(2), 1500); // Upscaling
    setTimeout(() => setProcessingStep(3), 3000); // Color Grading
    setTimeout(() => setProcessingStep(4), 4500); // Finalizing
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Video exported successfully in 4K!");
      navigate("/dashboard");
    }, 6000);
  };

  return (
    <div className="pt-20 h-screen overflow-hidden flex flex-col md:flex-row bg-[#020202]">
      {/* Sidebar - Controls */}
      <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col h-[40vh] md:h-full bg-dark-bg">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Settings</h2>
          </div>
          <Badge variant="outline" className="text-[10px] border-neon-blue/30 text-neon-blue">
            PRO ENGINE
          </Badge>
        </div>

        <ScrollArea className="flex-grow p-6">
          <Tabs defaultValue="enhance" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-white/5 p-1 rounded-xl">
              <TabsTrigger value="enhance" className="rounded-lg data-[state=active]:bg-neon-blue data-[state=active]:text-black font-bold text-xs uppercase transition-all">Enhance</TabsTrigger>
              <TabsTrigger value="effects" className="rounded-lg data-[state=active]:bg-neon-blue data-[state=active]:text-black font-bold text-xs uppercase transition-all">Effects</TabsTrigger>
            </TabsList>

            <TabsContent value="enhance" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neon-blue" />
                    AI 4K Upscaling
                  </label>
                  <Switch 
                    checked={enhancements.upscale} 
                    onCheckedChange={(v) => setEnhancements(e => ({ ...e, upscale: v }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-neon-purple" />
                    HDR Multi-Pass
                  </label>
                  <Switch 
                    checked={enhancements.hdr} 
                    onCheckedChange={(v) => setEnhancements(e => ({ ...e, hdr: v }))}
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs uppercase text-gray-500 font-bold">
                    <span>Sharpness</span>
                    <span className="text-neon-blue">{enhancements.sharpness}%</span>
                  </div>
                  <Slider 
                    value={[enhancements.sharpness]} 
                    onValueChange={(val: number[]) => setEnhancements(e => ({ ...e, sharpness: val[0] }))} 
                    max={100} 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs uppercase text-gray-500 font-bold">
                    <span>Glow Amount</span>
                    <span className="text-neon-pink">{enhancements.glow}%</span>
                  </div>
                  <Slider 
                    value={[enhancements.glow]} 
                    onValueChange={(val: number[]) => setEnhancements(e => ({ ...e, glow: val[0] }))} 
                    max={100} 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs uppercase text-gray-500 font-bold">
                    <span>Saturation</span>
                    <span className="text-neon-blue">{enhancements.saturation}%</span>
                  </div>
                  <Slider 
                    value={[enhancements.saturation]} 
                    onValueChange={(val: number[]) => setEnhancements(e => ({ ...e, saturation: val[0] }))} 
                    max={100} 
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="space-y-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Neural Filters</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {filters.map((f) => (
                     <button
                       key={f.id}
                       onClick={() => setSelectedFilter(f.id)}
                       className={cn(
                         "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                         selectedFilter === f.id 
                           ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,242,254,0.1)]" 
                           : "border-white/5 bg-white/2 hover:border-white/10 text-gray-500"
                       )}
                     >
                       <div className={cn("w-full aspect-video rounded-lg opacity-20", f.color)} />
                       <span className="text-[10px] font-bold uppercase">{f.name}</span>
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                       <Clock className="w-4 h-4 text-orange-400" />
                       Slow Motion AI
                    </label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                       <RotateCcw className="w-4 h-4 text-pink-500" />
                       Motion Blur
                    </label>
                    <Switch 
                      checked={enhancements.motionBlur}
                      onCheckedChange={(v) => setEnhancements(e => ({...e,运动模糊: v}))}
                    />
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-white/2">
          <Button 
            onClick={handleExport}
            className="w-full h-12 bg-neon-blue text-black font-black hover:bg-neon-blue/90 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all active:scale-95"
          >
            <Download className="w-4 h-4 mr-2" />
            EXPORT 4K
          </Button>
        </div>
      </div>

      {/* Main content - Player */}
      <div className="flex-grow flex flex-col bg-[#050505] relative">
        <div className="p-4 flex items-center justify-between border-b border-white/5 glass">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-[10px] border-white/10 uppercase tracking-widest px-3 py-1 font-mono">
              Output: 4K • {format === "vertical" ? "9:16" : "16:9"} • 60FPS
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-neon-blue" onClick={() => setShowSubtitles(!showSubtitles)}>
              <Type className={cn("w-5 h-5", showSubtitles ? "text-neon-blue" : "")} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Eye className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center p-8 relative overflow-hidden bg-dot-white/[0.05]">
          {/* Animated Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />

          {/* Player Mockup */}
          <div className={cn(
            "relative glass rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10 bg-black overflow-hidden group transition-all duration-500",
            format === "vertical" ? "h-[80%] aspect-[9/16]" : "w-[90%] aspect-video"
          )}>
            {/* The "Video" content (using placeholder image) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center transition-all duration-700" 
                 style={{ 
                   filter: `${selectedFilter !== "none" ? "hue-rotate(200deg) brightness(1.2) saturate(1.5)" : ""} contrast(1.1) brightness(${enhancements.brightness / 40})`,
                 }}
            />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-dark-bg/20 opacity-0 group-hover:opacity-100 transition-opacity border-neon-blue/10 border-[0.5px]" />
            
            {/* AI Subtitles Overlay */}
            <AnimatePresence mode="wait">
              {showSubtitles && activeSubtitle && (
                <motion.div
                  key={activeSubtitle}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute bottom-16 inset-x-0 flex justify-center px-8 z-20 pointer-events-none"
                >
                  <p className="text-center font-black text-2xl md:text-3xl uppercase tracking-tighter drop-shadow-2xl text-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-white text-black px-4 py-1 skew-x-[-10deg]">
                    {activeSubtitle}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                <Button 
                  size="icon" 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-neon-blue text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,242,254,0.5)]"
                >
                  <Play className="w-8 h-8 fill-black" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Area */}
        <div className="h-40 border-t border-white/5 glass p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-6">
                 <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="hover:text-neon-blue">
                   {isPlaying ? <Pause className="w-6 h-6 fill-neon-blue text-neon-blue" /> : <Play className="w-6 h-6 fill-white" />}
                 </Button>
                 <div className="text-sm font-mono text-gray-400">
                   <span className="text-white font-bold">{currentTime.toFixed(1).padStart(4, '0')}s</span> / 12.0s
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <Badge variant="secondary" className="bg-white/5 border-none text-[10px] text-gray-500">ZOOM 1X</Badge>
               </div>
            </div>
            
            <div className="relative h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden group cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setCurrentTime((x / rect.width) * 12);
            }}>
              {/* Timeline markers */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-grow border-r border-white-[0.03] flex items-end pb-1 justify-center text-[8px] text-gray-700 font-mono">
                    {i}s
                  </div>
                ))}
              </div>
              
              {/* Track */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 flex items-center px-1">
                <div className="w-full h-full bg-neon-blue/20 rounded border border-neon-blue/30 relative">
                   {/* Subtitle markers */}
                   {subtitles.map((s, i) => (
                     <div 
                       key={i} 
                       className="absolute h-full w-1 origin-left bg-neon-pink shadow-[0_0_10px_rgba(255,0,193,0.5)]" 
                       style={{ left: `${(s.time / 12) * 100}%` }} 
                     />
                   ))}
                </div>
              </div>
              
              {/* Playhead */}
              <motion.div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_white] z-30"
                style={{ left: `${(currentTime / 12) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Processing Modal Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="relative w-48 h-48 mb-12">
                {/* Circular Progress Loader */}
                <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-t-neon-blue border-r-neon-purple border-b-neon-pink border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <div className="absolute inset-4 rounded-full glass flex flex-col items-center justify-center">
                  <span className="text-4xl font-black gradient-text">
                    {Math.min(Math.round((processingStep / 4) * 100), 99)}%
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rendering</span>
                </div>
              </div>

              <div className="space-y-4 max-w-md w-full">
                <h3 className="text-2xl font-black tracking-tight uppercase">
                  {processingStep === 1 && "Initializing Neural Engine..."}
                  {processingStep === 2 && "Upscaling to 4K Ultra..."}
                  {processingStep === 3 && "Applying Color Grading..."}
                  {processingStep === 4 && "Finalizing Metadata..."}
                </h3>
                <p className="text-gray-500 font-light text-sm">
                  Please hold on. We're using deep learning models to reinvent your pixels. 
                  Don't close this tab for maximum acceleration.
                </p>
                <div className="flex flex-col gap-2 mt-8">
                  <div className={cn("flex items-center gap-3 p-3 rounded-xl glass border-white/5 transition-opacity", processingStep >= 1 ? "opacity-100" : "opacity-30")}>
                    <CheckCircle2 className={cn("w-5 h-5", processingStep > 1 ? "text-neon-blue" : "text-gray-700")} />
                    <span className="text-xs font-medium text-left">Initialization complete</span>
                  </div>
                  <div className={cn("flex items-center gap-3 p-3 rounded-xl glass border-white/5 transition-opacity", processingStep >= 2 ? "opacity-100" : "opacity-30")}>
                    <CheckCircle2 className={cn("w-5 h-5", processingStep > 2 ? "text-neon-blue" : "text-gray-700")} />
                    <span className="text-xs font-medium text-left">4K Spatial Upscaling</span>
                  </div>
                  <div className={cn("flex items-center gap-3 p-3 rounded-xl glass border-white/5 transition-opacity", processingStep >= 3 ? "opacity-100" : "opacity-30")}>
                    <CheckCircle2 className={cn("w-5 h-5", processingStep > 3 ? "text-neon-blue" : "text-gray-700")} />
                    <span className="text-xs font-medium text-left">Neural Color Correction</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
