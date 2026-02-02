"use client";

import { Menu, Pill, ShoppingCart, User, LogIn, LogOut, Loader2 } from "lucide-react";
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/app/commonLayout/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/commonLayout/components/ui/sheet";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { UserRole } from "@/app/type/user";

const Navbar = ({ className }: { className?: string }) => {
  const router = useRouter();
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
    <section className={cn("border-b py-4 bg-background sticky top-0 z-50", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Pill className="size-6" />
              MediStore
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavLink title="Home" url="/" />
                <NavLink title="Shop" url="/shop" />
                {!isPending && renderRoleLinks(userRole)}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            {isPending ? (
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
              renderUserActions(isLoggedIn, userRole, handleLogout)
            )}
          </div>
        </nav>

        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Pill className="size-5 text-primary" />
            MediStore
          </Link>

          <div className="flex items-center gap-2">
            {!isPending && userRole === "CUSTOMER" && (
              <Button variant="outline" size="icon" asChild>
                <Link href="/cart"><ShoppingCart className="size-4" /></Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline"><Menu className="size-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Pill className="size-5 text-primary" /> MediStore
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-[90%] py-6">
                  <Accordion type="single" collapsible className="w-full">
                    <MobileLink title="Home" url="/" />
                    <MobileLink title="Shop" url="/shop" />
                    {!isPending && renderMobileRoleLinks(userRole)}
                  </Accordion>

                  <div className="border-t pt-6">
                    {isPending ? (
                      <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
                    ) : (
                      renderMobileUserActions(isLoggedIn, handleLogout)
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

const renderRoleLinks = (role: UserRole) => {
  switch (role) {
    case "CUSTOMER":
      return <NavLink title="My Orders" url="/orders" />;
    case "SELLER":
      return (
        <>
          <NavLink title="Dashboard" url="/seller/dashboard" />
          <NavLink title="Inventory" url="/seller/medicines" />
          <NavLink title="Orders" url="/seller/orders" />
        </>
      );
    case "ADMIN":
      return (
        <>
          <NavLink title="Admin Home" url="/admin" />
          <NavLink title="Users" url="/admin/users" />
          <NavLink title="Categories" url="/admin/categories" />
        </>
      );
    default:
      return null;
  }
};

const renderUserActions = (isLoggedIn: boolean, role: UserRole, onLogout: () => void) => {
  if (!isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
        <Button asChild><Link href="/register">Register</Link></Button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      {role === "CUSTOMER" && (
        <Button variant="outline" size="icon" asChild><Link href="/cart"><ShoppingCart className="size-5" /></Link></Button>
      )}
      <Button variant="outline" size="icon" asChild>
        <Link href="/profile"><User className="size-5" /></Link>
      </Button>
      <Button variant="destructive" size="sm" className="gap-2" onClick={onLogout}>
        <LogOut className="size-4" /> Logout
      </Button>
    </div>
  );
};

const renderMobileRoleLinks = (role: UserRole) => {
  switch (role) {
    case "CUSTOMER":
      return (
        <div className="mt-4 space-y-4 pt-4 border-t">
          <MobileLink title="My Orders" url="/orders" />
          <MobileLink title="Cart" url="/cart" />
          <MobileLink title="Profile" url="/profile" />
        </div>
      );
    case "SELLER":
      return <MobileGroup title="Seller Panel" items={[{ title: "Dashboard", url: "/seller/dashboard" }, { title: "Inventory", url: "/seller/medicines" }, { title: "Orders", url: "/seller/orders" }]} />;
    case "ADMIN":
      return <MobileGroup title="Admin Dashboard" items={[{ title: "Stats", url: "/admin" }, { title: "Users", url: "/admin/users" }, { title: "Categories", url: "/admin/categories" }]} />;
    default:
      return null;
  }
};

const renderMobileUserActions = (isLoggedIn: boolean, onLogout: () => void) => {
  if (!isLoggedIn) {
    return (
      <div className="space-y-3">
        <Button className="w-full" variant="outline" asChild><Link href="/login">Login</Link></Button>
        <Button className="w-full" asChild><Link href="/register">Register</Link></Button>
      </div>
    );
  }
  return <Button className="w-full" variant="destructive" onClick={onLogout}>Logout</Button>;
};

export { Navbar };

const NavLink = ({ title, url }: { title: string; url: string }) => (
  <NavigationMenuItem className="list-none">
    <Link href={url} legacyBehavior passHref>
      <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
        {title}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const MobileLink = ({ title, url }: { title: string; url: string }) => (
  <Link href={url} className="block py-2 text-base font-medium hover:text-primary">
    {title}
  </Link>
);

const MobileGroup = ({ title, items }: { title: string; items: { title: string; url: string }[] }) => (
  <AccordionItem value={title} className="border-none">
    <AccordionTrigger className="text-base font-semibold py-2 hover:no-underline">{title}</AccordionTrigger>
    <AccordionContent className="space-y-1 pb-4">
      {items.map((item) => (
        <Link key={item.title} href={item.url} className="block pl-4 py-2 text-sm text-muted-foreground hover:text-primary border-l ml-2">
          {item.title}
        </Link>
      ))}
    </AccordionContent>
  </AccordionItem>
);