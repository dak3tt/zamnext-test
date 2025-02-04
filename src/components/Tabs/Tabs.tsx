"use client";

import { useState, useEffect } from "react";
import Tab from "../Tab/Tab";
import "./Tabs.scss";
import Data from "../Data/Data";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(() => {
    return Number(sessionStorage.getItem("activeTab")) || 0;
  });

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    sessionStorage.setItem("activeTab", index.toString());
    setActiveTab(index);
  };

  const categories = [
    { category: "task-tracker", label: "Таск-трекеры" },
    { category: "videocontact", label: "Видеозвонки" },
    { category: "messenger", label: "Корпоративные мессенджеры" },
  ];

  return (
    <div>
      <div className="tabs--container">
        <div className="tab--group">
          {categories.map((item, index) => (
            <Tab
              key={item.category}
              label={item.label}
              isActive={activeTab === index}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </div>

        <div className="tab--content">
          <Data category={categories[activeTab].category} />
        </div>
      </div>
    </div>
  );
}
