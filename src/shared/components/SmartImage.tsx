import React, { useEffect, useMemo } from "react";
import { ImageOff } from "lucide-react";

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
   file?: File;
   url?: string | null;
   iconClassName?: string;
}

const SmartImage = ({ file, url, iconClassName, ...imgProps }: SmartImageProps) => {
   const objectUrl = useMemo(() => {
      return file ? URL.createObjectURL(file) : undefined;
   }, [file]);

   // Liberamos el objeto URL cuando el componente se desmonta o cambia el file
   useEffect(() => {
      return () => {
         if (objectUrl) URL.revokeObjectURL(objectUrl);
      }
   }, [objectUrl]);

   const src = objectUrl ?? url;

   return src
      ? <img src={src} {...imgProps} />
      : <ImageOff className={iconClassName ?? 'w-9 h-9 text-slate-400'} />;
}

export default SmartImage;