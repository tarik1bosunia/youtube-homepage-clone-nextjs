import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";


type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMMOUNT = 200;

export const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisiable, setIsLeftVisiable] = useState(false);
  const [isRightVisiable, setIsRightVisiable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(containerRef.current == null) return;

    const observer = new ResizeObserver(entres => {
        const container = entres[0]?.target
        if(container == null) return

        setIsLeftVisiable(translate > 0)
        setIsRightVisiable(translate + container.clientWidth < container.scrollWidth)

    })
    observer.observe(containerRef.current)

    return () => {
        observer.disconnect()
    }

  }, [categories, translate])

  return (
    <div ref={containerRef}   className="overflow-x-hidden relative">
      <div
      
      className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{transform: `translateX(-${translate}px)`}}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => {
              onSelect(category);
            }}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 whitespace-nowrap rounded-lg"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisiable && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            onClick={() => {setTranslate(translate => {
                const newTranslate = translate - TRANSLATE_AMMOUNT
                if(newTranslate <= 0) return 0;
                return newTranslate
            })}}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {isRightVisiable && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            onClick={() => { 
                setTranslate((translate) => {
                    
                    if(containerRef?.current == null) return translate;
                    const newTranslate = translate + TRANSLATE_AMMOUNT
                    const edge = containerRef.current.scrollWidth
                    const width = containerRef.current.clientWidth
                    if(newTranslate + width >= edge) {
                        return edge-width
                    };
                    return newTranslate
                })
           }}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};
