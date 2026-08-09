// Archived unmounted alternative. Retained for design history only.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "Github", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Figma", href: "https://figma.com" },
  ];

  return (
    <footer className="w-full border-t border-hairline py-10 bg-transparent mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="font-mono text-xs text-muted-dark">
          &copy; {currentYear} ASHADUL. ALL RIGHTS RESERVED. static_build_v1.0
        </p>

        {/* Social Links */}
        <div className="flex items-center space-x-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-primary uppercase tracking-wider transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
