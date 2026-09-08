"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The text characters to use as particles
const textSource = "Connect the whole ecosystem InXfinia";
const chars = textSource.replace(/\s+/g, "").split("");

// Colors for the particles
const colors = ["#5B21B6", "#1D4ED8", "#F43F5E", "#22d3a8", "#cbd5e1"];

export function TextParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let tweens: gsap.core.Tween[] = [];

    // 3D Engine Constants
    const fov = 300; 
    const numParticles = 80;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize particles and GSAP Tweens
    const initParticles = () => {
      // Clear old tweens
      tweens.forEach(t => t.kill());
      tweens = [];
      particles = [];

      for (let i = 0; i < numParticles; i++) {
        // Create Particle State
        const p = {
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * 600 + 100, // Distance from center
          z: Math.random() * 2000,           // Initial depth
          rotation: Math.random() * Math.PI * 2,
          char: chars[Math.floor(Math.random() * chars.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          fontSize: Math.random() * 20 + 20, // 20px to 40px
        };
        
        // Z-axis movement (tunnel effect coming towards camera)
        tweens.push(gsap.to(p, {
          z: -fov + 10, // Move past camera
          duration: 6 + Math.random() * 6,
          ease: "none",
          repeat: -1,
        }));
        
        // Orbit animation (around the center)
        tweens.push(gsap.to(p, {
          angle: p.angle + Math.PI * 2,
          duration: 15 + Math.random() * 15,
          ease: "none",
          repeat: -1,
        }));
        
        // Local spin (character rotating on itself)
        tweens.push(gsap.to(p, {
          rotation: p.rotation + Math.PI * 2,
          duration: 5 + Math.random() * 10,
          ease: "none",
          repeat: -1,
        }));
        
        particles.push(p);
      }
    };

    initParticles();

    // Modulate timeScale based on scroll velocity
    const scrollProxy = { velocity: 1 };
    
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() / 300);
        const targetVelocity = 1 + velocity * 2; // amplify scroll speed
        
        // Speed up the GSAP tweens
        gsap.to(tweens, {
          timeScale: targetVelocity,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        });
        
        // Slowly return to normal speed
        gsap.to(tweens, {
          timeScale: 1,
          duration: 1.5,
          delay: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    // Render loop
    const render = () => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      const cx = width / 2;
      const cy = height / 2;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Sort particles by Z so distant ones are drawn first (Painter's Algorithm)
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z);

      sortedParticles.forEach(p => {
        if (p.z <= -fov) return; // Behind camera, don't draw

        const scale = fov / (fov + p.z);
        
        // Polar to Cartesian
        const x3d = Math.cos(p.angle) * p.radius;
        const y3d = Math.sin(p.angle) * p.radius;
        
        // Project to 2D screen
        const x2d = cx + x3d * scale;
        const y2d = cy + y3d * scale;
        
        ctx.save();
        ctx.translate(x2d, y2d);
        ctx.scale(scale, scale);
        ctx.rotate(p.rotation);
        
        // Fade out very distant particles, fade out very close particles
        let alpha = 1;
        if (p.z > 1500) {
          alpha = 1 - ((p.z - 1500) / 500); // fade in from far distance
        } else if (p.z < 0) {
          alpha = (fov + p.z) / fov; // fade out as it hits camera
        }
        
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 0.8));
        ctx.fillStyle = p.color;
        ctx.font = `800 ${p.fontSize}px 'Syne', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      tweens.forEach(t => t.kill());
      st.kill();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-80"
      style={{ display: "block" }}
    />
  );
}
