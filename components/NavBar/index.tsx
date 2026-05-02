import Link from "next/link";

const links = [
  { label: "Home",                    href: "/" },
  { label: "Education",               href: "/education" },
  { label: "Experience/Volunteering", href: "/experience" },
  { label: "Projects",                href: "/projects" },
  { label: "Awards",                  href: "/awards" },
  { label: "Gallery",                 href: "/gallery" },
];

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <span className="font-semibold tracking-tight text-neutral-900">
        Daniela Bordeianu
      </span>
      <ul className="flex items-center gap-6">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
