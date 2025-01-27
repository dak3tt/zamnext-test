"use client";
import { useEffect, useRef, useState } from "react";
import "./LazyLoad.scss";

interface LazyImageProps {
  src: string;
  alt: string;
}

const loadedImages = new Set<string>(); // Кэш загруженных изображений

export default function LazyLoad({ src, alt }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(loadedImages.has(src)); // Проверяем, загружено ли изображение

  useEffect(() => {
    if (loadedImages.has(src)) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = src;
            imgRef.current.classList.add("lazyload");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleImageLoad = () => {
    loadedImages.add(src);
    setIsLoaded(true);
  };

  return (
    <div className="site--image">
      {!isLoaded && <div className="placeholder"></div>}
      <img
        ref={imgRef}
        srcSet={`${src}?w=400 400w, ${src}?w=800 800w`}
        sizes="(max-width: 600px) 400px, 800px"
        src={loadedImages.has(src) ? src : ""}
        alt={alt}
        loading="lazy"
        className={`content--image ${isLoaded ? "lazyload" : ""}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
