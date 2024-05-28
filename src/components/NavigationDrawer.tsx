"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { HamburgerButton } from "../app/(features)/hamburgermenu/HamburgerButton";

export function NavigationDrawer() {
  return (
    <Sheet>
      <SheetTrigger className="fixed top-6 left-6">
        <HamburgerButton className="size-12" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Experiments</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col">
          <Link href="/">Home</Link>
          <Link href="/hamburgermenu">Hamburger Menu</Link>
          <Link href="/fluidsim">Fluid Simulation</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
