import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { site, developerConfig } from '@/config/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 pb-10 px-4">
      <div className="container max-w-5xl">
        <div className="liquid-glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 group w-fit">
                <div className="h-9 w-9 rounded-xl bg-aurora animate-aurora grid place-items-center shadow-[var(--shadow-glow)] overflow-hidden">
                  {site.bot.botAvatar ? (
                    <img src={site.bot.botAvatar} alt={site.bot.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white font-display font-bold text-sm">
                      {site.bot.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-display font-bold text-lg">Levitate</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {site.bot.description}
              </p>
              <div className="flex gap-2.5 mt-5">
                <a
                  href={site.bot.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="liquid-glass h-10 w-10 rounded-full grid place-items-center hover:scale-110 transition-transform"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={site.bot.supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="liquid-glass h-10 w-10 rounded-full grid place-items-center hover:scale-110 transition-transform"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.112 18.1.13 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigate */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-muted-foreground">Navigate</h4>
              <ul className="space-y-2.5">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      to={n.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-muted-foreground">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Add to Discord',  href: site.bot.inviteUrl, external: true },
                  { label: 'Support Server',  href: site.bot.supportUrl, external: true },
                  { label: 'GitHub',          href: site.bot.githubUrl, external: true },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                      {l.external && <ExternalLink className="h-3 w-3 opacity-50" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © {year} Levitate · Made with care by {developerConfig.name}
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <p className="text-xs text-muted-foreground">
                Prefix: <code className="font-mono text-primary">$</code>
                &nbsp;·&nbsp;{site.bot.uptime} uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
