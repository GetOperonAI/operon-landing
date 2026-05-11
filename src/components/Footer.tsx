export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 bg-[#07120f]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-[18px] font-semibold text-white">operon</span>
          <span className="text-white/45 text-[14px]">San Francisco Bay Area</span>
        </div>
        <p className="text-white/40 text-[13px]">
          &copy; {new Date().getFullYear()} Operon. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
