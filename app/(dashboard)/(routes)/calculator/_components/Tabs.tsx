"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
interface Tab {
  label: string;
  children: React.ReactNode;
  id: string;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0].id);

  const changeTab = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div>
      <div className="flex space-x-4">
        {tabs?.map((tab) => (
          <div key={tab.id} className="flex flex-col gap-1">
            <button className="text-sm" onClick={() => changeTab(tab.id)}>
              {tab.label}
            </button>
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="border border-primary-600"
              />
            )}
          </div>
        ))}
      </div>
      <Separator />
      <div>
        {tabs?.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? "" : "hidden"}>
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
