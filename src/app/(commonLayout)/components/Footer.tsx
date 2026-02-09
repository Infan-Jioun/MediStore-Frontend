"use client";
import { cn } from "@/lib/utils";

import { Logo, LogoImage, LogoText } from "@/app/(dashboardLayout)/components/logo";
import Link from "next/link";
import { Pill } from "lucide-react";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  className,
  menuItems = [
    {
      title: "Available Shop",
      links: [
        { text: "Shop", url: "#" },
        { text: "Pricing", url: "#" },
     
      ],
    },
    {
      title: "Manufacturer",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },

      ],
    },
    {
      title: "Category",
      links: [
        { text: "Digestive Health", url: "#" },
        { text: "Vitamins & Supplements", url: "#" },
        { text: "Cold & Flu", url: "#" },
        { text: "Pain Relief", url: "#" },
        
      ],
    },
    {
      title: "Shipping Area",
      links: [
        { text: "Dhaka", url: "#" },
        { text: "Chittagong", url: "#" },
        { text: "Khulna", url: "#" },
        { text: "Rajshahi", url: "#" },
        { text: "Sylhet", url: "#" }
      ],
    },
  ],
  copyright = "© 2026 MediStore. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/seller-dashboard")) {
    return null;
  }
  return (
    <section className={cn("py-10", className)}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-red-500">
                  <Pill className="size-6" />
                  MediStore
                </Link>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-red-500">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
