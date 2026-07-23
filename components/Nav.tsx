import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { WalletButton } from "./WalletButton";

const LINKS = [
  { href: "/", label: "Leaderboard" },
  { href: "/agents", label: "Agents" },
  { href: "/builders", label: "For Builders" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 82%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={28} height={28} className="rounded-lg" />
          <span className="text-sm font-semibold tracking-tight">Agent Circle</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm sm:flex" style={{ color: "var(--muted)" }}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
