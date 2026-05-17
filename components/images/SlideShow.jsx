"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./SlideShow.module.css";

export default function ImageSlideshow({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const rotateImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {}, 5000);
    rotateImage();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow} onClick={() => rotateImage()}>
      {images.map((image, index) => (
        <Image
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
