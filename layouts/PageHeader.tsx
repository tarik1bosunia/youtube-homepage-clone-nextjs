"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/images/Logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { Button } from "@/components/Button";
import { useSidebarContext } from "@/contexts/sidebarContext";

export const PageHeader = () => {
  const [fullWidthSearch, setFullWithSerarch] = useState(false);

 

  return (
    <div className="flex justify-between gap-10 lg:gap-20  pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={fullWidthSearch} />
      <form
        action=""
        className={`gap-4 flex-grow justify-center ${
          fullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {fullWidthSearch && (
          <Button
            onClick={() => setFullWithSerarch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 ${
          fullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setFullWithSerarch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>

        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>

        <Button size="icon" variant="ghost">
          <Upload />
        </Button>

        <Button size="icon" variant="ghost">
          <Bell />
        </Button>

        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean
}

export function PageHeaderFirstSection({hidden = false}: PageHeaderFirstSectionProps) {

  const { toggle } = useSidebarContext();
  return (
    <div
      className={`flex gap-4 items-center  flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon" className="">
        <Menu />
      </Button>

      <Link href={"/"}>
        <Image className="h-6" src={logo} alt="Picture of Logo" />
      </Link>
    </div>
  );
}
