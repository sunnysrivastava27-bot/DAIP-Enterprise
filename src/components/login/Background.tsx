import type { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const particles = [
  { left: "10%", top: "15%", size: 6, delay: "0s", duration: "16s" },
  { left: "18%", top: "72%", size: 4, delay: "2s", duration: "18s" },
  { left: "78%", top: "18%", size: 5, delay: "1s", duration: "20s" },
  { left: "84%", top: "70%", size: 7, delay: "3s", duration: "17s" },
  { left: "52%", top: "12%", size: 3, delay: "4s", duration: "14s" },
];

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#041527]">
      <style>{`
        @keyframes driftParticle {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: 0.25; }
          50% { transform: translate3d(10px,-18px,0) scale(1.18); opacity: 0.75; }
        }
      `}</style>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute left-1/2 top-1/2 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[200px]" />
      <div className="absolute right-0 top-0 h-[560px] w-[560px] rounded-full bg-blue-500/12 blur-[180px]" />
      <div className="absolute bottom-0 left-0 h-[520px] w-[520px] rounded-full bg-sky-400/10 blur-[180px]" />

      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: "rgba(125, 211, 252, 0.65)",
            boxShadow: "0 0 16px rgba(125, 211, 252, 0.35)",
            animation: `driftParticle ${particle.duration} ease-in-out infinite`,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}