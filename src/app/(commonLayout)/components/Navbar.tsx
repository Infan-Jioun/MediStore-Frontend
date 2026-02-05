"use client";

import {
  Menu,
  Pill,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Roles } from "@/constant/roles";
import { UserRole } from "@/app/type/user";

const Navbar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/seller-dashboard")
  ) {
    return null;
  }

  const { data: session, isPending } = authClient.useSession();
  const userRole = (session?.user as any)?.role?.toUpperCase() as UserRole || "CUSTOMER";
  const isLoggedIn = !!session;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <section
      className={cn(
        "border-b py-4 bg-background sticky top-0 z-50",
        className
      )}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-red-500"
            >
              <Pill className="size-6" />
              MediStore
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavLink title="Home" url="/" />
                <NavLink title="Shop" url="/shop" />
                <NavLink title="AllCategory" url="/category" />
                <NavLink
                  title="Dashboard"
                  url={
                    userRole === "ADMIN"
                      ? "/admin-dashboard"
                      : userRole === "SELLER"
                        ? "/seller-dashboard"
                        : "/dashboard"
                  }
                />
                <NavLink title="About" url="/about" />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            {isPending ? (
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
              <UserActions
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )}
          </div>
        </nav>

        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Pill className="size-5 text-primary" />
            MediStore
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="size-4" />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px]">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Pill className="size-5 text-primary" />
                    MediStore
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col justify-between h-[90%] py-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="main" className="border-none">
                      <AccordionTrigger className="font-semibold">
                        Menu
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <MobileLink title="Home" url="/" />
                        <MobileLink title="Shop" url="/shop" />
                        <MobileLink title="Orders" url="/orders" />
                        <MobileLink
                          title="Prescriptions"
                          url="/prescriptions"
                        />
                        <MobileLink title="Cart" url="/cart" />
                        <MobileLink title="Profile" url="/profile" />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="border-t pt-6">
                    {isPending ? (
                      <div className="flex justify-center">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <MobileUserActions
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                      />
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const UserActions = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  if (!isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login" className="flex items-center gap-2">
            <LogIn className="size-4" /> Login
          </Link>
        </Button>
        <Button asChild className="bg-red-500 hover:bg-rose-600">
          <Link href="/signup">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" asChild>
        <Link href="/cart">
          <ShoppingCart className="size-5" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href="/profile">
          <User className="size-5" />
        </Link>
      </Button>
      <Button variant="destructive" size="sm" onClick={onLogout}>
        <LogOut className="size-4" /> Logout
      </Button>
    </div>
  );
};

const MobileUserActions = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  if (!isLoggedIn) {
    return (
      <div className="space-y-3">
        <Button className="w-full" variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href="/signup">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button className="w-full" variant="outline" asChild>
        <Link href="/profile">Profile</Link>
      </Button>
      <Button
        className="w-full"
        variant="destructive"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};

const NavLink = ({ title, url }: { title: string; url: string }) => (
  <NavigationMenuItem className="list-none">
    <Link href={url} legacyBehavior passHref>
      <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:text-primary">
        {title}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const MobileLink = ({ title, url }: { title: string; url: string }) => (
  <Link
    href={url}
    className="block py-2 text-base font-medium hover:text-primary"
  >
    {title}
  </Link>
);

export { Navbar };
