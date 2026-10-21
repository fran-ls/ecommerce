export const getDate = () => {
   const now = new Date();

   return now.toLocaleDateString('es-SV', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
   });
}

export const getFormatDate = (date: Date) => {
   const d = new Date(date).toLocaleDateString('es-SV', {
      dateStyle: 'medium'
   });
   const parts = d.split(' ');
   return `${parts[0].padStart(2, '0')}/${parts.slice(1).join('/')}`;
}