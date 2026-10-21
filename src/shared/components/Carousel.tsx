import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { CAROUSEL_SLIDES } from "../../ui/data/carousel.data";

export default function Carousel() {
   const [current, setCurrent] = useState(0);
   const [dragging, setDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [dragDelta, setDragDelta] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);

   const trackRef = useRef<HTMLDivElement | null>(null);
   const autoRef = useRef<any>(null);

   const slides = CAROUSEL_SLIDES;
   const slide = slides[current];
   const total = slides.length;

   const goTo = useCallback(
      (index: number) => {
         if (isAnimating) return;
         setIsAnimating(true);
         setCurrent((index + total) % total);
         setTimeout(() => setIsAnimating(false), 600);
      },
      [isAnimating, total]
   );

   const next = useCallback(() => goTo(current + 1), [current, goTo]);
   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

   // Auto-play
   useEffect(() => {
      autoRef.current = setInterval(next, 4500);
      return () => clearInterval(autoRef.current);
   }, [next]);

   const resetAuto = () => {
      clearInterval(autoRef.current);
      autoRef.current = setInterval(next, 4500);
   }

   // Drag / swipe
   const onPointerDown = (e: any) => {
      setDragging(true);
      setStartX(e.clientX ?? e.touches?.[0]?.clientX);
      setDragDelta(0);
   }

   const onPointerMove = (e: any) => {
      if (!dragging) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      setDragDelta(x - startX);
   }

   const onPointerUp = () => {
      if (!dragging) return;
      setDragging(false);
      if (dragDelta < -60) { next(); resetAuto(); }
      else if (dragDelta > 60) { prev(); resetAuto(); }
      setDragDelta(0);
   }

   return (
      <div className="carousel-root">
         <div className="carousel-wrapper">
            <div className="flex items-center gap-2">
               <button
                  className="nav-btn-prev nav-btn"
                  onClick={() => { prev(); resetAuto(); }}
                  aria-label="Anterior"
               >
                  <ChevronLeft />
               </button>

               {/* Main card */}
               <div
                  ref={trackRef}
                  className="carousel-card"
                  onMouseDown={onPointerDown}
                  onMouseMove={onPointerMove}
                  onMouseUp={onPointerUp}
                  onMouseLeave={onPointerUp}
                  onTouchStart={onPointerDown}
                  onTouchMove={onPointerMove}
                  onTouchEnd={onPointerUp}
               >
                  {/* Background */}
                  <div
                     className="card-bg"
                     style={{ background: slide.bg }}
                  />

                  {/* Orb */}
                  <div
                     className="card-orb"
                     style={{ background: slide.accent }}
                  />

                  {/* Noise */}
                  <div className="card-noise" />

                  {/* Content */}
                  <div className="card-content slide-enter" key={current}>
                     <span className="card-category">{slide.category}</span>
                     <span className="card-emoji">{slide.emoji}</span>
                     <h2 className="card-title">{slide.title}</h2>
                     <p className="card-desc">{slide.description}</p>
                  </div>

                  <span className="card-counter">
                     {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>

                  <div className="card-dots">
                     {slides.map((_, i) => (
                        <div
                           key={i}
                           className={`dot ${i === current ? "active" : ""}`}
                           onClick={() => { goTo(i); resetAuto(); }}
                        />
                     ))}
                  </div>
               </div>

               <button
                  className="nav-btn-next nav-btn"
                  onClick={() => { next(); resetAuto(); }}
                  aria-label="Siguiente"
               >
                  <ChevronRight />
               </button>
            </div>

            {/* Thumbnail strip */}
            <div className="thumbs">
               {slides.map((s, i) => (
                  <div
                     key={s.id}
                     className={`thumb ${i === current ? "active" : ""}`}
                     onClick={() => { goTo(i); resetAuto(); }}
                  >
                     <div className="thumb-bg" style={{ background: s.bg }}>
                        {s.emoji}
                     </div>
                     <span className="thumb-label">{s.category}</span>
                  </div>
               ))}
            </div>

            {/* Bottom controls */}
            <div className="carousel-bottom">
               <div className="dots">
                  {slides.map((_, i) => (
                     <div
                        key={i}
                        className={`dot ${i === current ? "active" : ""}`}
                        onClick={() => { goTo(i); resetAuto(); }}
                     />
                  ))}
               </div>

               <span className="counter">
                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
               </span>

               <div className="nav-arrows">
                  <button className="nav-btn" onClick={() => { prev(); resetAuto(); }} aria-label="Anterior">
                     ←
                  </button>
                  <button className="nav-btn" onClick={() => { next(); resetAuto(); }} aria-label="Siguiente">
                     →
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}