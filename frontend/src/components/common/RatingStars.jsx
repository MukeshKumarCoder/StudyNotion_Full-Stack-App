import { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function readViewportWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

function defaultStarSize(width) {
  if (width < 360) return 14;
  if (width < 480) return 16;
  if (width < 768) return 18;
  return 20;
}

function maxStarSizeForViewport(width) {
  if (width < 360) return 16;
  if (width < 480) return 18;
  if (width < 640) return 20;
  if (width < 1024) return 22;
  return 28;
}

const RatingStars = ({ Review_Count, Star_Size }) => {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });
  const [pixelSize, setPixelSize] = useState(() => {
    const w = readViewportWidth();
    if (Star_Size != null) {
      return Math.min(Star_Size, maxStarSizeForViewport(w));
    }
    return defaultStarSize(w);
  });

  useEffect(() => {
    const raw = Number(Review_Count);
    const count = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 5) : 0;
    const wholeStars = Math.min(Math.floor(count), 5);
    const hasHalf = !Number.isInteger(count) && wholeStars < 5;
    setStarCount({
      full: wholeStars,
      half: hasHalf ? 1 : 0,
      empty: Math.max(0, 5 - wholeStars - (hasHalf ? 1 : 0)),
    });
  }, [Review_Count]);

  useEffect(() => {
    const update = () => {
      const w = readViewportWidth();
      if (Star_Size != null) {
        setPixelSize(Math.min(Star_Size, maxStarSizeForViewport(w)));
      } else {
        setPixelSize(defaultStarSize(w));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [Star_Size]);

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-0.5 text-yellow-100 sm:gap-1">
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={`f-${i}`} size={pixelSize} />;
      })}
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={`h-${i}`} size={pixelSize} />;
      })}
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={`e-${i}`} size={pixelSize} />;
      })}
    </div>
  );
};

export default RatingStars;
