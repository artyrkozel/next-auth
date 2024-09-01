"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div>mo mounted</div>;

  if (resolvedTheme === "dark") {
    return <button onClick={() => setTheme("app_light_theme")}>dark</button>;
  }

  if (resolvedTheme === "app_light_theme") {
    return <button onClick={() => setTheme("dark")}>light</button>;
  }
};
