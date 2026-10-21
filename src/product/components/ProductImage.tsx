import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import Image from "../../shared/components/Image";

interface ProductImageProps {
   label: string;
   url?: string;
   alt?: string,
   children?: React.ReactElement;
   onFileChange: (file: File) => void;
}

const ProductImage = ({ label, url, alt = 'image', onFileChange, children }: ProductImageProps) => {
   const [file, setFile] = useState<File | null>(null);

   useEffect(() => { file && onFileChange(file) }, [file]);

   return (
      <label className="relative aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition group">
         {file
            ?
            <Image file={file} alt="Producto" />
            :
            url
               ?
               <img
                  className="aspect-square object-cover w-full h-full rounded-xl"
                  src={url}
                  alt={alt}
               />
               :
               <>
                  <ImagePlus
                     className="text-slate-400 group-hover:text-slate-600 mb-1"
                     width={24}
                     height={24}
                  />

                  <span className="text-[10px] uppercase font-bold text-slate-400 italic">
                     {label}
                  </span>
               </>
         }

         <input
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            className="hidden"
            name="file"
            accept="image/*"
            type="file"
         />

         {children}
      </label>
   )
}

export default ProductImage;