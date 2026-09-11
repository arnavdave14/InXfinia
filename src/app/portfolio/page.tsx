import { TedyScroll } from "@/components/TedyScroll";
import { ParallaxGallery } from "@/components/ParallaxGallery";
import ParticleText from "@/components/ParticleText";

export const metadata = {
  title: "Our Work | InXfinia",
  description: "Explore our selected works and portfolio.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Animated mesh gradient background — same as homepage */}
      <div className="mesh-bg fixed inset-0 z-[-1]" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <main className="relative z-10 min-h-screen bg-transparent">
        
        {/* Hero Section of Portfolio */}
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-black/60 uppercase tracking-widest">InXfinia Studios</span>
          </div>
          
          <h1 className="text-[clamp(1.5rem,8vw,5rem)] md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text tracking-tighter mb-6 leading-tight" 
              style={{ 
                fontFamily: "var(--font-syne)",
                backgroundImage: "linear-gradient(135deg, #111111 0%, #444444 100%)"
              }}>
            Crafting Digital
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}>Masterpieces</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/50 font-medium max-w-2xl mb-16">
            A curated selection of our finest work, pushing the boundaries of design and engineering.
          </p>

          <div className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-xs font-mono text-black/40 uppercase tracking-widest">Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-black/40 to-transparent" />
          </div>
        </div>

        <TedyScroll />

        <ParallaxGallery />

        <div className="py-12 md:py-0 md:h-[60vh] flex flex-col items-center justify-center bg-transparent relative z-50 overflow-hidden">
          {/* Desktop Particle Text */}
          <div className="hidden md:block w-full h-full">
            <ParticleText
              text="Ready to build?"
              particleSize={3}
              density={4}
              color="#090A0F"
              highlightColor="#5B21B6"
              scatter={180}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={60}
              repelRadius={150}
              idleDrift={0.7}
              trigger="click"
              fontSize="clamp(4rem, 15vw, 10rem)"
              fontWeight={900}
              fontFamily="'Syne', sans-serif"
              glow={false}
            />
          </div>
          {/* Mobile Fallback Text */}
          <div className="md:hidden w-full text-center px-4 py-8">
            <h2 className="text-5xl font-black text-black tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
              Ready to build?
            </h2>
          </div>
        </div>

        <div className="py-12 pb-16 md:py-20 md:pb-32 relative z-20 flex flex-col items-center justify-center">
          <p className="text-black/50 font-mono text-sm uppercase tracking-[0.3em] mb-8 text-center px-4 leading-relaxed">
            Let's create something extraordinary
          </p>
          <a href="/contact" className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 ease-out bg-[#090A0F] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(91,33,182,0.4)] overflow-hidden">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-3 font-mono tracking-widest uppercase text-sm">
              Start your project
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 border border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 rounded-full transition-colors duration-300 blur-[2px]"></div>
          </a>
        </div>
      </main>
    </>
  );
}
