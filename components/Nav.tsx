import Link from "next/link";

const LINKS = [
  { href: "/", label: "Leaderboard" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Agent Circle
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/70">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          disabled
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/50"
          title="Wallet connect coming next"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
