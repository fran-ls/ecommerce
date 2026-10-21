import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { readUploadFile } from "../utils/readUploadFile";

interface ImageProps {
   file: File;
   alt: string;
}

const Image = ({ file, alt }: ImageProps) => {
   const [url, setUrl] = useState<string>('');

   useEffect(() => {
      const getFileUrl = (url: string) => setUrl(url);
      file && readUploadFile(file, getFileUrl);
   }, [file]);

   if (!url) return (
      <ImageOff />
   )

   return (
      <img
         className="object-cover w-full h-full rounded-xl"
         src={url}
         alt={alt}
      />
   )
}

export default Image;