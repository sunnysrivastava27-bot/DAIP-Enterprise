export default function DepartmentBar() {
  return (
    <div className="px-6 pb-4">
      <div className="flex items-center justify-between rounded-full border border-cyan-400/15 bg-slate-950/25 px-5 py-2 text-xs uppercase tracking-[0.35em] text-slate-400 shadow-[0_8px_24px_rgba(2,132,199,0.08)] backdrop-blur-xl">
        <span>Urban Governance</span>
        <span>Digital Infrastructure</span>
        <span>Citizen Services</span>
      </div>
    </div>
  );
}