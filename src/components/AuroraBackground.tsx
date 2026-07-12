export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Lavender — top-left */}
      <div
        className="absolute -top-48 -left-48 h-[780px] w-[780px] rounded-full animate-blob"
        style={{ background: 'hsl(265 88% 76%)', opacity: 0.22, filter: 'blur(120px)' }}
      />
      {/* Pink — top-right */}
      <div
        className="absolute -top-24 -right-48 h-[660px] w-[660px] rounded-full animate-blob"
        style={{ background: 'hsl(326 82% 74%)', opacity: 0.2, filter: 'blur(115px)', animationDelay: '5s' }}
      />
      {/* Sky blue — bottom-left */}
      <div
        className="absolute bottom-0 -left-24 h-[580px] w-[580px] rounded-full animate-blob"
        style={{ background: 'hsl(199 90% 70%)', opacity: 0.16, filter: 'blur(115px)', animationDelay: '9s' }}
      />
      {/* Magenta — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[560px] rounded-full animate-blob"
        style={{ background: 'hsl(310 70% 72%)', opacity: 0.13, filter: 'blur(130px)', animationDelay: '14s' }}
      />
      {/* Bottom-right accent */}
      <div
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full animate-blob"
        style={{ background: 'hsl(265 88% 76%)', opacity: 0.17, filter: 'blur(105px)', animationDelay: '7s' }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(265 70% 82% / 0.14) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
