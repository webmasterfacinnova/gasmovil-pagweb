import { useRef, useState } from "react";

type MockupSliderProps = {
  images: string[];
  altPrefix?: string;
};

export default function MockupSlider({
  images,
  altPrefix = "Gasmovil mockup",
}: MockupSliderProps) {
  const [current, setCurrent] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const swipeThreshold = 40;

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) {
      return;
    }

    const deltaX = event.clientX - pointerStartX.current;

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    pointerStartX.current = null;
  };

  const resetPointer = () => {
    pointerStartX.current = null;
  };

  if (!images?.length) {
    return null;
  }

  return (
    <div className="relative">
      <div
        className="relative touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetPointer}
        onPointerLeave={resetPointer}
      >
        <img
          src={images[current]}
          alt={`${altPrefix} ${current + 1}`}
          className="rounded-xl object-cover transition-all duration-300"
          draggable={false}
        />

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white"
          aria-label="Imagen anterior"
        >
          <span aria-hidden="true">&#8592;</span>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white"
          aria-label="Imagen siguiente"
        >
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`h-2 w-2 rounded-full transition-colors ${
              current === idx ? "bg-(--client-600)" : "bg-slate-300"
            }`}
            aria-label={`Ver imagen ${idx + 1}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
