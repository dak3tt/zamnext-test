"use client";

import { useState, useEffect, useRef } from "react";
import Tab from "../Tab/Tab";
import "./Tabs.scss";
import Data from "../Data/Data";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollPosition = useRef(0);

  const handleTabClick = (index: number) => {
    scrollPosition.current = window.scrollY;
    setActiveTab(index);
  };

  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [activeTab]);

  const categories = ["task-tracker", "videocontact", "messenger"];

  return (
    <div>
      <div className="tabs--container">
        <div className="tab--group">
          <Tab
            label="Таск трекеры"
            isActive={activeTab === 0}
            onClick={() => handleTabClick(0)}
          />
          <Tab
            label="Видеозвонки"
            isActive={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            label="Корпоративные мессенджеры"
            isActive={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </div>

        <div className="tab--content">
          {activeTab === 0 && <Data category={categories[0]} />}
          {activeTab === 1 && <Data category={categories[1]} />}
          {activeTab === 2 && <Data category={categories[2]} />}
        </div>
      </div>
    </div>
  );
}
