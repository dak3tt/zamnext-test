"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabaseClient";
import "./Data.scss";
import Image from "next/image";

interface DataProps {
  category: string;
}

interface SiteProps {
  uuid: string;
  image: string;
  title: string;
  link: string;
  category: string;
}

export default function Data({ category }: DataProps) {
  const [sites, setSites] = useState<SiteProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("sites")
          .select("*")
          .eq("category", category)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setSites(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setSites([]);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {sites.length > 0
        ? sites.map((site, index) => (
            <div key={index} className="site--card">
              <a href={site.link} target="_blank" rel="noopener noreferrer">
                <div className="site-item">
                  <Image
                    src={site.image}
                    alt={site.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    quality={80}
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
