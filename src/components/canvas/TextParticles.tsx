"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  text: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // Initial random velocity
    this.baseVx = (Math.random() - 0.5) * 1.5;
    this.baseVy = (Math.random() - 0.5) * 1.5;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    
    this.scale = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    
    this.opacity = Math.random() * 0.15 + 0.05; // 0.05 to 0.2
    
    // Choose between a few subtle colors (brand colors)
    const colors = ["#5B21B6", "#22d3a8", "#1D4ED8", "#9ca3af"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    this.text = "InXfinia";
  }

  update(canvasWidth: number, canvasHeight: number, scrollVelocityMultiplier: number) {
    // Scroll modifies velocity
    this.x += this.vx * scrollVelocityMultiplier;
    this.y += this.vy * scrollVelocityMultiplier;
    this.rotation += this.rotationSpeed * scrollVelocityMultiplier;

    // Wrap around screen
    if (this.x < -100) this.x = canvasWidth + 100;
    if (this.x > canvasWidth + 100) this.x = -100;
    if (this.y < -100) this.y = canvasHeight + 100;
    if (this.y > canvasHeight + 100) this.y = -100;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = "800 32px 'Syne', sans-serif"; // Using the Syne font from globals
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, 0, 0);
    
    ctx.restore();
  }
}

export function TextParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const numParticles = 35; // Number of text particles floating around
    
    let animationFrameId: number;

    // Handle High-DPI displays
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
      
      // Re-initialize particles on major resize to fill screen
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width, height));
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial setup

    // GSAP ScrollTrigger to alter the global velocity smoothly
    // We use a proxy object that GSAP can animate
    const scrollProxy = { velocity: 1 };
    
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // self.getVelocity() returns pixels per second
        // We map it to a multiplier. E.g. resting is 1, scrolling fast could be 3-8
        const velocity = Math.abs(self.getVelocity() / 300);
        const targetVelocity = 1 + velocity;
        
        // Smoothly tween the proxy object
        gsap.to(scrollProxy, {
          velocity: targetVelocity,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
        
        // Return back to 1 shortly after scroll stops
        gsap.to(scrollProxy, {
          velocity: 1,
          duration: 1.0,
          delay: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    // Render loop
    const render = () => {
      if (!ctx || !canvas) return;
      
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      
      // Clear canvas correctly considering scale
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => {
        p.update(width, height, scrollProxy.velocity);
        p.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
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
