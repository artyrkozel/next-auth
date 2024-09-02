"use client";

import { usePathname } from "next/navigation";
import { memo, useMemo, useState } from "react";
import Button from "../Button/Button";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/utils/cn";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Logo } from "../Logo/Logo";
import { menuIconsMap } from "@/public/icons";
import { SidebarItemType } from "@/types/types";
import { Logout } from "@/app/api/auth-actions";

interface SidebarProps {
  className?: string;
}

const sidebarItemsList: SidebarItemType[] = [
  {
    path: "/",
    text: "Dashboard",
    Icon: menuIconsMap.Dashboard,
  },
  {
    path: "/watches",
    text: "Trade",
    Icon: menuIconsMap.Trade,
  },
  {
    path: "/ssrwatches",
    text: "Actions",
    Icon: menuIconsMap.Market,
  },
];

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed]
  );

  if (pathName === "/login") {
    return null;
  }

  return (
    <aside
      data-testid="sidebar"
      className={cn(
        "h-screen w-[310px] bg-secondary relative py-[30px] px-8 flex flex-col justify-between",
        collapsed && "w-28",
        className
      )}
    >
      <div>
        <Logo className="mb-[70px]" collapsed={collapsed} />
        <div className="flex flex-col">{itemsList}</div>
      </div>
      <div className="flex flex-col gap-4">
        <ThemeSwitcher />
        <Button
          variant="primary"
          onClick={onToggle}
          //   className={styles.collapseBtn}
        >
          {collapsed ? ">" : "<"}
        </Button>
        <form action={Logout} className="w-full">
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </aside>
  );
});
