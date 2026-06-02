import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ScreenshotSliderProps = {
  images: string[];
  altPrefix?: string;
};

export default function ScreenshotSlider({
  images,
  altPrefix = "Gasmovil captura",
}: ScreenshotSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para izquierda, 1 para derecha
  const pointerStartX = useRef<number | null>(null);
  const swipeThreshold = 40;

  const goToPrevious = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Variantes para la animación
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Manejo de puntero (Swipe)
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;

    if (Math.abs(deltaX) >= swipeThreshold) {
      deltaX < 0 ? goToNext() : goToPrevious();
    }
    pointerStartX.current = null;
  };

  if (!images?.length) return null;

  return (
    <div className="relative pt-8 w-full max-w-md mx-auto">
      <div
        className="relative touch-pan-y select-none  overflow-hidden rounded-xl "
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStartX.current = null)}
        style={{ aspectRatio: "9/16" }} // Ajusta según el formato de tus imágenes
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            alt={`${altPrefix} ${current + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

        {/* Controles */}
        <button
          onClick={goToPrevious}
          className="z-10 absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ArrowLeft />
        </button>

        <button
          onClick={goToNext}
          className="z-10 absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Indicadores */}
      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`h-2 transition-all duration-300 rounded-full ${
              current === idx
                ? "w-6 bg-[var(--client-500)]"
                : "w-2 bg-slate-300"
            }`}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
