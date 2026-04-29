export default function Footer() {
  return (
    <footer className="border-t border-card-border py-8 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-[18px] font-semibold text-[#1c1c1e]">operon</span>
          <span className="text-shade-50 text-[14px]">San Francisco Bay Area</span>
        </div>
        <p className="text-shade-50 text-[13px]">
          &copy; {new Date().getFullYear()} Operon. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
