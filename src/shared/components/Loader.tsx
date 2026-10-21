import type { CSSProperties } from "react";

interface LoaderProps {
   className?: string;
   style?: CSSProperties;
   width?: string | number;
   height?: string | number;
   size?: string | number;
}

const Loader = (props: LoaderProps) => {
   const { className, style = {}, width, height, size = 4 } = props;

   const loaderSize = 48;

   const styles = {
      width: width ?? loaderSize,
      height: height ?? loaderSize,
      borderWidth: size,
      ...style
   }

   return (
      <div className="w-full h-full flex items-center justify-center">
         <div
            style={styles}
            className={className ?? 'w-12 h-12 border-4 border-zinc-200 border-t-green-500 rounded-full animate-spin'}
         ></div>
      </div>
   )
}

export default Loader;