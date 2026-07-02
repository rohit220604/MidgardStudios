import { memo } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";

import { Container } from "./container";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/rohit220604",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-jaliminchi-98555224b/",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    href: "mailto:rjrohit2264@gmail.com",
    icon: FaEnvelope,
  },
] as const;

const FooterInner = memo(function FooterInner() {
  const brand = useTranslations("brand");
  const footer = useTranslations("footer");

  const getAriaLabel = (name: string) => {
    const key = name === "LinkedIn" ? "linkedin" : name.toLowerCase();
    return footer(key);
  };

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40" role="contentinfo">
      <Container className="py-12 md:py-16">
        {/* Top section: brand + socials */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="space-y-2.5">
            <h3 className="text-lg font-semibold text-foreground">
              {brand("name")}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand("tagline")}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ name, href, icon: Icon }) => {
              const external = name !== "Email";

              return (
                <a
                  key={name}
                  href={href}
                  aria-label={getAriaLabel(name)}
                  title={getAriaLabel(name)}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom section: copyright */}
        <div className="mt-10 border-t border-border/60 pt-8">
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <span>{footer("madeWith")}</span>
            <FaHeart className="text-red-500" size={14} aria-hidden="true" />
            <span>{footer("by")}</span>
            <a
              href="https://www.linkedin.com/in/rohit-jaliminchi-98555224b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
            >
              {footer("author")}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
});

export { FooterInner as Footer };