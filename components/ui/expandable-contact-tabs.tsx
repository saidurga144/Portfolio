"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContactTab {
  title: string;
  icon: LucideIcon;
  href: string;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

type ContactTabItem = ContactTab | Separator;

interface ExpandableContactTabsProps {
  tabs: ContactTabItem[];
  className?: string;
  activeColor?: string;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableContactTabs({
  tabs,
  className,
  activeColor = "text-orange-400",
}: ExpandableContactTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
  });

  const handleSelect = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-slate-600" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-2 shadow-lg",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isExternal = tab.href.startsWith("http");

        return (
          <motion.a
            key={tab.title}
            href={tab.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            onMouseEnter={() => setSelected(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 cursor-pointer",
              selected === index
                ? cn("bg-slate-700/50", activeColor)
                : "text-slate-300 hover:bg-slate-700/30 hover:text-orange-400"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
    </div>
  );
}
