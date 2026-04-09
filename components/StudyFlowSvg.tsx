export default function StudyFlowSvg() {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
      <video
        className="aspect-21/9 w-full bg-slate-950 object-contain"
        controls
        playsInline
        preload="metadata"
      >
        <source src="/videos/how-works.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
