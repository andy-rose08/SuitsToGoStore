"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
  isOpen: boolean;
  className: string;
}

const MainNav: React.FC<MainNavProps> = ({ data, className, isOpen }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.category_id}`,
    label: route.name,
    active: pathname === `/category/${route.category_id}`,
  }));
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 overflow-auto max-h-screen",
        className,
        isOpen ? "block" : "hidden"
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-[#ADD8E6] mx-2 sm:mx-0",
            route.active
              ? "text-[#9370DB] dark:text-[#1ABC9C]"
              : "text-[#FFD700]"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
