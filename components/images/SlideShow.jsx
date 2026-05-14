"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./SlideShow.module.css";

export default function ImageSlideshow({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {currentImageIndex}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={title}
          fill
        />
      ))}
    </div>
  );
}
