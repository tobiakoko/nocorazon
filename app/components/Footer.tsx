import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h4 className="font-display text-xl font-bold uppercase mb-2">
            Music Made <br />
            To Move You.
          </h4>
          <p className="text-xs text-white/30">© 2026 Nocorazon Music.</p>
        </div>

        <div className="text-center">
          <p className="font-display font-bold tracking-[0.2em] text-white/30 mb-4">
            NOCORAZON
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
              Management
            </p>
            <a
              href="mailto:booking@nocorazonmusic.com"
              className="text-sm hover:text-brand-pink transition-colors"
            >
              booking@nocorazonmusic.com
            </a>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/40">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
