import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Upload as UploadIcon, 
  FileVideo, 
  X, 
  ArrowRight, 
  Sparkles,
  Smartphone,
  Monitor,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [format, setFormat] = useState<"vertical" | "horizontal">("vertical");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      toast.success("Video ready for processing!");
    } else {
      toast.error("Please upload a valid video file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
    disabled: isUploading,
  } as any);

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          toast.success("Analysis complete! Redirecting to editor...");
          navigate("/editor", { state: { videoName: file.name, format } });
        }, 500);
      }
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 min-h-screen max-w-5xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">UPLOAD VIDEO</h1>
        <p className="text-gray-400 font-light max-w-xl mx-auto">
          Start by uploading your source footage. Our neural engine will automatically 
          analyze the quality and suggest the best enhancements.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          {!file ? (
            <motion.div
              layoutId="dropzone"
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer aspect-video md:aspect-[21/9] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-10 overflow-hidden",
                isDragActive 
                  ? "border-neon-blue bg-neon-blue/5 scale-[0.99] shadow-[0_0_30px_rgba(0,242,254,0.2)]" 
                  : "border-white/10 hover:border-white/20 hover:bg-white/2"
              )}
            >
              <input {...getInputProps()} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-neon-blue/10 group-hover:text-neon-blue">
                  <UploadIcon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Drag & Drop Video</h3>
                <p className="text-gray-500 text-sm mb-6">MP4, MOV, WebM (Max 500MB)</p>
                <Button className="bg-white text-black hover:bg-gray-200 font-bold px-8">Browse Files</Button>
              </div>
              
              {/* Animated background lines */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.5)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_5s_infinite_linear]" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 border-white/10"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/10 flex items-center justify-center text-neon-blue">
                    <FileVideo className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold truncate max-w-[200px] md:max-w-md">{file.name}</h3>
                    <p className="text-gray-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready</p>
                  </div>
                </div>
                {!isUploading && (
                  <Button variant="ghost" size="icon" onClick={removeFile} className="text-gray-500 hover:text-white">
                    <X className="w-6 h-6" />
                  </Button>
                )}
              </div>

              {isUploading ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neon-blue font-bold animate-pulse">ANALYZING FOOTAGE...</span>
                    <span className="text-gray-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2 bg-white/5" indicatorClassName="bg-neon-blue shadow-[0_0_10px_rgba(0,242,254,0.5)] transition-all" />
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {['Scanning Pixels', 'Detecting Noise', 'Mapping Colors', 'Framerate Check'].map((task, i) => (
                      <div key={task} className="flex items-center gap-2 text-xs text-gray-500">
                        {uploadProgress > (i + 1) * 25 ? (
                          <CheckCircle2 className="w-3 h-3 text-neon-green" />
                        ) : (
                          <Clock className="w-3 h-3 animate-spin" />
                        )}
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Select Target Format</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setFormat("vertical")}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all",
                          format === "vertical" 
                            ? "border-neon-blue bg-neon-blue/5 text-neon-blue shadow-[0_0_20px_rgba(0,242,254,0.1)]" 
                            : "border-white/5 bg-white/2 hover:border-white/10"
                        )}
                      >
                        <Smartphone className="w-8 h-8 mb-3" />
                        <span className="font-bold">9:16 Vertical</span>
                        <span className="text-[10px] text-gray-500 mt-1">TikTok, Reels, Shorts</span>
                      </button>
                      <button 
                        onClick={() => setFormat("horizontal")}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all",
                          format === "horizontal" 
                            ? "border-neon-blue bg-neon-blue/5 text-neon-blue shadow-[0_0_20px_rgba(0,242,254,0.1)]" 
                            : "border-white/5 bg-white/2 hover:border-white/10"
                        )}
                      >
                        <Monitor className="w-8 h-8 mb-3" />
                        <span className="font-bold">16:9 Cinema</span>
                        <span className="text-[10px] text-gray-500 mt-1">YouTube, TV, Presentations</span>
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleUpload}
                    className="w-full h-14 bg-neon-blue text-black hover:bg-neon-blue/90 font-black text-lg shadow-[0_0_30px_rgba(0,242,254,0.3)] transition-all hover:scale-[1.02]"
                  >
                    CONTINUE TO EDITOR
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-blue" />
              AI Suggestions
            </h4>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                <p className="text-xs text-neon-blue font-bold mb-1 italic">PREMIUM TIP</p>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Our system detected low-light noise. We recommend using 
                  <strong> "Midnight Clear"</strong> filter in the next step.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                <p className="text-xs text-neon-purple font-bold mb-1 italic">FORMAT TIP</p>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  For TikTok monetization, use the vertical 9:16 format with AI dynamic subtitles.
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <VideoIcon className="w-20 h-20" />
             </div>
             <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Neural Stats</h4>
             <div className="space-y-2">
               <div className="flex justify-between text-[10px]">
                 <span className="text-gray-500 uppercase">Input Res</span>
                 <span className="text-gray-300 font-mono">1080 x 1920</span>
               </div>
               <div className="flex justify-between text-[10px]">
                 <span className="text-gray-500 uppercase">AI Upscale Path</span>
                 <span className="text-neon-blue font-mono font-bold">4K ULTRA</span>
               </div>
               <div className="flex justify-between text-[10px]">
                 <span className="text-gray-500 uppercase">Frame Interpolation</span>
                 <span className="text-gray-300 font-mono font-bold">60 FPS</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
      <rect width="16" height="18" x="2" y="3" rx="2" />
    </svg>
  );
}
