// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import "./Data.scss";
import Image from "next/image";

interface Site {
  _id: string;
  title: string;
  link: string;
  image: string;
  created_at: string;
}

export default function Data() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/sites")
      .then((res) => res.json())
      .then((data) => {
        // Сортируем по дате перед сохранением
        const sortedData = data.sort((a: Site, b: Site) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA; // Сортировка по убыванию (новые записи сверху)
        });
        setSites(sortedData);
      });
  }, []);

  return (
    <>
      {sites.length > 0
        ? sites.map((site) => (
            <div key={site._id} className="site--card">
              <a href={site.link} rel="noopener noreferrer">
                <div className="site-item">
                  <Image
                    src={site.image}
                    alt={site.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    quality={90}
                  />
                  <h6>{site.title}</h6>
                </div>
              </a>
            </div>
          ))
        : null}
    </>
  );
}
