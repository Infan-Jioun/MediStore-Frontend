"use client";

import {
  Menu,
  Pill,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";


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


  const getDashboardUrl = () => {
    if (userRole === "ADMIN") return "/admin-dashboard";
    if (userRole === "SELLER") return "/seller-dashboard";
    return "/customer-dashboard";
  };

  return (
    <section
      className={cn(
        "border-b py-3 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm",
        className
      )}
    >
      <div className="container max-w-7xl mx-auto px-4">
  
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-2xl text-red-600 tracking-tighter transition-transform hover:scale-105"
            >
              <div className="bg-red-600 p-1.5 rounded-xl shadow-lg shadow-red-200">
                <Pill className="size-6 text-white" />
              </div>
              MediStore
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavLink title="Home" url="/" />
                <NavLink title="Shop" url="/shop" />

                {isLoggedIn && (
                  <NavLink title="Dashboard" url={getDashboardUrl()} />
                )}

            
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            {isPending ? (
              <Loader2 className="size-5 animate-spin text-red-600" />
            ) : (
              <UserActions
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )}
          </div>
        </nav>

        <div className="lg:hidden flex items-center justify-between py-1">
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-red-600 tracking-tight">
            <Pill className="size-6 text-red-600 fill-red-100" />
            MediStore
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="relative hover:bg-red-50 text-slate-700">
              <Link href="/orders">
                <ShoppingCart className="size-5" />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="hover:bg-red-50">
                  <Menu className="size-6 text-slate-800" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] border-l-red-100">
                <SheetHeader className="text-left border-b border-red-50 pb-6 mt-4">
                  <SheetTitle className="flex items-center gap-2 text-red-600 font-black italic">
                    <Pill className="size-6 text-red-600" />
                    MediStore
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col justify-between h-[85%] py-6">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Main Menu</p>
                    <div className="space-y-1">
                      <MobileLink title="Home" url="/" />
                      <MobileLink title="Shop" url="/shop" />

                      {isLoggedIn && (
                        <MobileLink
                          title="Dashboard"
                          url={getDashboardUrl()}
                
                        />
                      )}

                    </div>

            
                  </div>

                  <div className="pt-6">
                    {isPending ? (
                      <div className="flex justify-center">
                        <Loader2 className="animate-spin text-red-600" />
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
      <div className="flex gap-3">
        <Button variant="ghost" asChild className="font-bold text-slate-600 hover:text-red-600 hover:bg-red-50">
          <Link href="/login" className="flex items-center gap-2">
            <LogIn className="size-4" /> Login
          </Link>
        </Button>
        <Button asChild className="bg-red-600 hover:bg-bg-900 transition-all shadow-lg shadow-red-200 rounded-xl font-bold px-6">
          <Link href="/signup">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-100">
      <Button variant="ghost" size="icon" asChild className="hover:bg-white hover:shadow-sm rounded-xl text-slate-600 hover:text-red-600">
        <Link href="/orders">
          <ShoppingCart className="size-5" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild className="hover:bg-white hover:shadow-sm rounded-xl text-slate-600 hover:text-red-600">
        <Link href="/profile">
          <User className="size-5" />
        </Link>
      </Button>
      <div className="h-6 w-[1px] bg-slate-200 mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogout}
        className="text-red-600 font-bold hover:bg-red-50 rounded-xl px-4"
      >
        <LogOut className="size-4 mr-2" /> Logout
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
      <div className="grid grid-cols-2 gap-3">
        <Button className="w-full rounded-xl font-bold border-red-100 text-red-600" variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button className="w-full rounded-xl font-bold bg-red-600 hover:bg-red-700 shadow-md shadow-red-100" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="w-full rounded-xl font-bold h-12 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all group"
      variant="ghost"
      onClick={onLogout}
    >
      <LogOut className="size-4 mr-2 group-hover:translate-x-1 transition-transform" />
      Sign Out
    </Button>
  );
};

const NavLink = ({ title, url }: { title: string; url: string }) => (
  <NavigationMenuItem className="list-none">
    <Link href={url} legacyBehavior passHref>
      <NavigationMenuLink className={cn(
        "px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
      )}>
        {title}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

const MobileLink = ({ title, url, icon }: { title: string; url: string; icon?: React.ReactNode }) => (
  <Link
    href={url}
    className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
  >
    {icon && <span className="text-red-500">{icon}</span>}
    {title}
  </Link>
);

export { Navbar };