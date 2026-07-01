import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

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
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <Container className="py-10 md:py-12">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Midgard Studios
            </h3>

            <p className="text-sm text-muted-foreground">
              AI-powered tools for game creators.
            </p>
          </div>

          <div className="flex items-center gap-5">
            {socials.map(({ name, href, icon: Icon }) => {
              const external = name !== "Email";

              return (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  title={name}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-primary"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>

            <FaHeart className="text-red-500" size={14} />

            <span>by</span>

            <a
              href="https://www.linkedin.com/in/rohit-jaliminchi-98555224b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-primary"
            >
              Rohit Jaliminchi
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}