const slider = (slider: HTMLDivElement) => {
   // const slider = document.querySelector('.slider');

   const track = slider.querySelector('.track') as HTMLDivElement;
   const prev = slider.querySelector('.prev') as HTMLButtonElement;
   const next = slider.querySelector('.next') as HTMLButtonElement;

   if (!track || !prev || !next) return;

   // Tamaño de un paso: el ancho visible (un slide)
   const step = () => track?.clientWidth ?? 0;

   // Navegación con botones
   prev.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
   });

   next.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
   });

   // Teclado: flechas izquierda/derecha
   track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
         track.scrollBy({ left: -step(), behavior: 'smooth' });
         e.preventDefault();
      } else if (e.key === 'ArrowRight') {
         track.scrollBy({ left: step(), behavior: 'smooth' });
         e.preventDefault();
      }
   });

   // Mejora: wheel horizontal suave (Shift+wheel o pad)
   track.addEventListener('wheel', (e) => {
      // Scroll horizontal si hay desplazamiento vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
         track.scrollBy({ left: e.deltaY, behavior: 'smooth' });
         e.preventDefault();
      }
   });

   // Opcional: actualizar botones (deshabilitar al inicio/fin)
   const updateNav = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= max - 1;
   }

   updateNav();

   // track.addEventListener('scroll', () => {
   //    // Throttle básico
   //    clearTimeout(track._t);
   //    track._t = setTimeout(updateNav, 80);
   // });

   window.addEventListener('resize', updateNav);
}

export default slider;