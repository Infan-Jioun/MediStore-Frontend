"use client";

import { Menu, Pill, ShoppingCart, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/commonLayout/components/ui/accordion";

import { Button } from "@/app/commonLayout/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/commonLayout/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/commonLayout/components/ui/sheet";
import Link from "next/link";

type Role = "GUEST" | "CUSTOMER" | "SELLER" | "ADMIN";

const CURRENT_ROLE: Role = "GUEST";


const Navbar = ({ className }: { className?: string }) => {
  return (
    <section className={cn("border-b py-4", className)}>
      <div className="container max-w-8xl mx-auto">
        {/* Desktop */}
        <nav className="hidden lg:flex  items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Pill className="size-6" />
            MediStore
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavLink title="Home" url="/" />
              <NavLink title="Shop" url="/shop" />

              {/* {CURRENT_ROLE === "CUSTOMER" && (
                <>
                  <NavLink title="Cart" url="/cart" />
                  <NavLink title="Orders" url="/orders" />
                  <NavLink title="Profile" url="/profile" />
                </>
              )} */}

              {/* {CURRENT_ROLE === "SELLER" && (
                <NavDropdown
                  title="Seller"
                  items={[
                    { title: "Dashboard", url: "/seller/dashboard" },
                    { title: "Medicines", url: "/seller/medicines" },
                    { title: "Orders", url: "/seller/orders" },
                  ]}
                />
              )} */}

              {/* {CURRENT_ROLE === "ADMIN" && (
                <NavDropdown
                  title="Admin"
                  items={[
                    { title: "Dashboard", url: "/admin" },
                    { title: "Users", url: "/admin/users" },
                    { title: "Categories", url: "/admin/categories" },
                    { title: "Orders", url: "/admin/orders" },
                  ]}
                />
              )} */}
            </NavigationMenuList>
          </NavigationMenu>

          {CURRENT_ROLE === "GUEST" ? (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Register</Link>
              </Button>
            </div>
          ) : (
            <Button variant="outline">Logout</Button>
          )}
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="font-bold">MediStore</Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>MediStore</SheetTitle>
              </SheetHeader>

              <Accordion type="single" collapsible className="mt-6 space-y-4">
                <MobileLink title="Home" url="/" />
                <MobileLink title="Shop" url="/shop" />

                {/* {CURRENT_ROLE === "CUSTOMER" && (
                  <>
                    <MobileLink title="Cart" url="/cart" />
                    <MobileLink title="Orders" url="/orders" />
                    <MobileLink title="Profile" url="/profile" />
                  </>
                )} */}

                {/* {CURRENT_ROLE === "SELLER" && (
                  <MobileGroup
                    title="Seller"
                    items={[
                      { title: "Dashboard", url: "/seller/dashboard" },
                      { title: "Medicines", url: "/seller/medicines" },
                      { title: "Orders", url: "/seller/orders" },
                    ]}
                  />
                )} */}

                {/* {CURRENT_ROLE === "ADMIN" && (
                  <MobileGroup
                    title="Admin"
                    items={[
                      { title: "Dashboard", url: "/admin" },
                      { title: "Users", url: "/admin/users" },
                      { title: "Categories", url: "/admin/categories" },
                      { title: "Orders", url: "/admin/orders" },
                    ]}
                  />
                )} */}

                {CURRENT_ROLE === "GUEST" && (
                  <>
                    <MobileLink title="Login" url="/login" />
                    <MobileLink title="Register" url="/signup" />
                  </>
                )}
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { Navbar };



const NavLink = ({ title, url }: { title: string; url: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink
      href={url}
      className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
    >
      {title}
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const NavDropdown = ({
  title,
  items,
}: {
  title: string;
  items: { title: string; url: string }[];
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
    <NavigationMenuContent className="p-2">
      {items.map((item) => (
        <NavigationMenuLink key={item.title} href={item.url} className="block px-4 py-2 hover:bg-muted rounded-md">
          {item.title}
        </NavigationMenuLink>
      ))}
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const MobileLink = ({ title, url }: { title: string; url: string }) => (
  <Link href={url} className="block text-md font-semibold">
    {title}
  </Link>
);

const MobileGroup = ({
  title,
  items,
}: {
  title: string;
  items: { title: string; url: string }[];
}) => (
  <AccordionItem value={title} className="border-none">
    <AccordionTrigger className="font-semibold">{title}</AccordionTrigger>
    <AccordionContent className="space-y-2">
      {items.map((item) => (
        <Link key={item.title} href={item.url} className="block pl-4">
          {item.title}
        </Link>
      ))}
    </AccordionContent>
  </AccordionItem>
);
