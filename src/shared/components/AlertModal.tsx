export default function AlertModal({ text }: { text: string }) {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/40">
         <div className="bg-white border-[1.5px] border-zinc-900 rounded-2xl px-10 py-8 flex flex-col items-center gap-5 shadow-[3px_3px_0px_#1a1a1a] min-w-[280px] max-w-sm">
            <div className="w-12 h-12 rounded-full border-[3px] border-zinc-200 border-t-green-500 animate-spin" />

            <p className="text-zinc-900 text-sm font-medium text-center leading-relaxed tracking-tight">
               {text}
            </p>
         </div>
      </div>
   )
}