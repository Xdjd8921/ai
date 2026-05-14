import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Play, 
  Monitor, 
  Layers, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Video as VideoIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      title: "AI 4K Upscaling",
      description: "Enhance grainy footage to crystal clear 4K resolution using adaptive neural networks.",
      icon: Sparkles,
      color: "text-blue-400",
    },
    {
      title: "Cinematic Grade",
      description: "Apply professional color grading and HDR effects inspired by Hollywood blockbusters.",
      icon: Play,
      color: "text-purple-400",
    },
    {
      title: "Auto Subtitles",
      description: "Generate stylish, animated captions automatically with 99% accuracy in 40+ languages.",
      icon: Layers,
      color: "text-pink-400",
    },
    {
      title: "No Watermark",
      description: "Export high-resolution videos without any watermarks or hidden branding.",
      icon: ShieldCheck,
      color: "text-green-400",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-dark-bg">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 py-1 px-4 border-neon-blue/30 text-neon-blue glass rounded-full flex items-center gap-2">
            <Zap className="w-4 h-4 fill-neon-blue" />
            <span className="text-xs uppercase tracking-widest font-bold">New: V2.5 Neural Engine</span>
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
        >
          ENHANCE YOUR <br />
          <span className="gradient-text">VISUAL REALITY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
        >
          The ultimate AI video editor for creators. Upscale, color grade, and transform 
          your vertical videos for TikTok and Reels in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/upload">
            <Button className="h-14 px-10 bg-neon-blue text-black hover:bg-neon-blue/90 text-lg font-bold shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all hover:scale-105 active:scale-95">
              Start Enhancing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="h-14 px-10 glass border-white/10 hover:border-white/20 text-lg font-medium">
              View Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Video Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", bounce: 0.3 }}
          className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass border-white/10 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Play className="w-6 h-6 fill-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Cinematic_Nature_4K.mp4</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] bg-green-500/20 text-green-400 border-none px-2 h-4">UPSCALED</Badge>
                  <p className="text-[10px] text-gray-400">Processing Time: 2.4s</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-full h-full bg-neon-blue" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl glass border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={cn("w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-white/5 transition-colors group-hover:bg-white/10", feature.color)}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-16">READY TO GO PRO?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-10 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-md flex flex-col text-left">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">$0</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['720p Exports', 'Standard AI Engine', '2 Projects / mo', 'Basic Subtitles'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 className="w-5 h-5 text-gray-600" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full glass">Start Free</Button>
          </div>
          
          <div className="p-10 rounded-3xl neon-border bg-neon-blue/5 backdrop-blur-md flex flex-col text-left relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-blue/20 blur-3xl" />
            <Badge className="absolute top-6 right-6 bg-neon-blue text-black font-bold">MOST POPULAR</Badge>
            <h3 className="text-xl font-bold mb-2">Creator Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">$19</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['4K Unlimited Exports', 'Ultra Neural Engine', 'Priority Processing', 'Dynamic Subtitles V2', 'Personal Brand Presets'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-bold">Go Pro Now</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 md:px-8 border-t border-glass-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <VideoIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tighter gradient-text">CINEAI</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs font-light leading-relaxed">
              Empowering global content creators with cutting-edge AI video enhancement.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gray-300">Product</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/upload" className="hover:text-neon-blue transition-colors">AI Upscaler</Link></li>
              <li><Link to="/upload" className="hover:text-neon-blue transition-colors">Color Match</Link></li>
              <li><Link to="/upload" className="hover:text-neon-blue transition-colors">Subtitle Generator</Link></li>
              <li><Link to="/upload" className="hover:text-neon-blue transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gray-300">Resources</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">API Keys</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gray-300">Company</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-neon-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between text-gray-600 text-xs gap-4">
          <p>© 2026 CineAI Platforms Inc. All neural rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
