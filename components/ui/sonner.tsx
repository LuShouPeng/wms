"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const [isVisible, setIsVisible] = React.useState(true);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-pointer text-sm"
        onClick={handleToggleVisibility}
      >
        点击显示通知
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer"
      onClick={handleToggleVisibility}
      title="点击隐藏通知"
    >
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
        {...props}
      />
    </div>
  );
};

export { Toaster };
