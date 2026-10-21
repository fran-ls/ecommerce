export const readUploadFile = (file: File, callback: (url: string) => any) => {
   if (!file) return;

   const reader = new FileReader();

   reader.onload = (ev) => {
      const url = ev.target?.result as string;
      callback(url);
   }

   reader.readAsDataURL(file);
}