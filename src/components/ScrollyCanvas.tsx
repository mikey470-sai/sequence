"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ScrollyCanvas({
  children,
}: {
  children?: React.ReactNode | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const totalFrames = 120;

  // Track window scroll progress over the 500vh parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Draw a specific frame index on the canvas
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover-fit calculation
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    
    if (imgWidth === 0 || imgHeight === 0) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload all WebP frames
  useEffect(() => {
    let loaded = 0;
    const tempImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === totalFrames) {
        setIsLoading(false);
        // Force immediate render of the first frame once loaded
        requestAnimationFrame(() => drawImage(0));
      }
    };

    const handleImageError = (e: any) => {
      console.error(`Failed to load image frame`, e);
      loaded++;
      setLoadedCount(loaded);
      setHasError(true);
      if (loaded === totalFrames) {
        setIsLoading(false);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Files are named frame_000_delay-0.067s.webp ... frame_119_delay-0.067s.webp
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      tempImages.push(img);
    }

    imagesRef.current = tempImages;

    return () => {
      // Clean up loaders
      tempImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Handle canvas sizing and high-DPI scaling
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Re-draw current frame after resizing
    const currentProgress = scrollYProgress.get();
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(currentProgress * (totalFrames - 1)))
    );
    drawImage(frameIndex);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Initial size setup
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoading]);

  // Hook scroll updates to animate frames
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLoading) return;
    
    // Map latest scroll progress (0-1) to frame index (0-119)
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(latest * totalFrames))
    );
    
    requestAnimationFrame(() => drawImage(frameIndex));
  });

  const percentage = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] scrolly-container">
      {/* Sticky viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          style={{ width: "100vw", height: "100vh" }}
        />
        
        {/* Child overlays (e.g. parallax text blocks) */}
        {!isLoading && children && (typeof children === "function" ? children(scrollYProgress) : children)}
      </div>

      {/* Luxury Preloader Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] select-none transition-opacity duration-1000">
          <div className="flex flex-col items-center max-w-md w-full px-6">
            <Loader2 className="w-10 h-10 text-brand-cyan animate-spin mb-6" />
            <h2 className="font-display font-bold text-2xl tracking-widest text-white mb-2 uppercase">
              Initializing Experience
            </h2>
            <p className="text-zinc-500 font-sans text-xs tracking-wider mb-8 uppercase">
              Preloading digital canvas...
            </p>
            
            {/* Elegant Progress bar */}
            <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-300 ease-out shadow-glow-cyan"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between w-full text-zinc-400 font-mono text-sm tracking-widest">
              <span>{percentage}%</span>
              <span>{loadedCount} / {totalFrames} FRAMES</span>
            </div>
            
            {hasError && (
              <p className="text-brand-accent font-sans text-xs mt-6 tracking-wide text-center">
                Warning: Some frames failed to load. The experience will run with available frames.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
