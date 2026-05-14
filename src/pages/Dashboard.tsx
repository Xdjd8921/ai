import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Video, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const projects = [
    {
      id: 1,
      name: "Cinematic_Nature_4K",
      status: "completed",
      date: "2 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400",
      resolution: "4K",
      duration: "0:12"
    },
    {
      id: 2,
      name: "TikTok_Vlog_03",
      status: "processing",
      date: "15 mins ago",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      resolution: "1080p",
      duration: "0:45"
    },
    {
      id: 3,
      name: "Gaming_Highlights_Pro",
      status: "failed",
      date: "Yesterday",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
      resolution: "1080p",
      duration: "1:20"
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight text-white">MY PROJECTS</h1>
          <p className="text-gray-500 font-light text-sm">Welcome back! You have 3 active projects in your neural workspace.</p>
        </div>
        <Link to="/upload">
          <Button className="h-12 px-8 bg-neon-blue text-black hover:bg-neon-blue/90 font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <Plus className="w-5 h-5 mr-2" />
            NEW PROJECT
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input className="pl-10 glass border-white/5 focus:border-neon-blue/50" placeholder="Search projects..." />
        </div>
        <Button variant="outline" className="glass border-white/5">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <Card className="glass border-white/5 overflow-hidden group-hover:border-neon-blue/30 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                
                <div className="absolute top-4 right-4">
                  {project.status === "completed" && <Badge className="bg-green-500/20 text-green-400 border-none px-3"><CheckCircle2 className="w-3 h-3 mr-1" /> Ready</Badge>}
                  {project.status === "processing" && <Badge className="bg-blue-500/20 text-blue-400 border-none px-3 animate-pulse">Processing</Badge>}
                  {project.status === "failed" && <Badge className="bg-red-500/20 text-red-400 border-none px-3"><AlertCircle className="w-3 h-3 mr-1" /> Error</Badge>}
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-black/60 text-[10px] font-mono border-white/10">{project.resolution}</Badge>
                  <Badge variant="secondary" className="bg-black/60 text-[10px] font-mono border-white/10">{project.duration}</Badge>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Link to={project.status === "completed" ? "/editor" : "#"}>
                    <Button size="icon" className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90">
                      <Video className="w-6 h-6" />
                    </Button>
                   </Link>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-sm truncate text-white">{project.name}</h3>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {project.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-grow h-8 text-[10px] font-bold border-white/5 hover:border-white/10 glass">
                    <Download className="w-3 h-3 mr-2" />
                    DOWNLOAD
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-white/5 hover:border-white/10 glass">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Empty project card */}
        <Link to="/upload" className="group h-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="h-full min-h-[250px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 group-hover:border-neon-blue transition-all group-hover:bg-neon-blue/5"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-neon-blue/10 transition-colors">
              <Plus className="w-8 h-8 text-gray-600 group-hover:text-neon-blue transition-colors" />
            </div>
            <h3 className="font-bold text-gray-500 group-hover:text-white transition-colors">START NEW PROJECT</h3>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
