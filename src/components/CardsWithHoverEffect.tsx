import { cn } from "@/lib/utils";
import React from "react";
// import { Skeleton } from "./ui/skeleton";
import { AnimeInfoDialog } from "./AnimeInfoDialog";
import { Result } from "@/InterfaceTypes";

export const CardsWithHoverEffect = ({
  items,
  className,
}: {
  items: Result[];
  className?: string;
}) => {
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4", className)}>
      {items &&
        items.map((item, idx) => (
          <span
            // href={item.link}
            key={`${item.anilist.id}-${idx}`}
            className="relative group block m-2 h-full w-full"
            // onMouseEnter={() => setHoveredIndex(idx)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence> */}
            <Card
              // imageUrl={`${item.image}&size=l`}
              // cardIdx={idx}
              selectedCardInfo={item}
              header={
                <div className="pb-4 flex items-baseline justify-between mx-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-green-600 bg-black text-white text-xs">
                      {Math.round(item.similarity * 1000) / 10}
                    </div>
                    <div className="text-sm pl-1 text-gray-400">percent similarity</div>
                  </div>
                  {idx === 0 && (
                    <h2 className="text-yellow-600 border-2  rounded-md px-2 text-xs">Top Match</h2>
                  )}
                  {item.anilist.isAdult && (
                    <h2 className="text-purple-800 border-2 px-2 rounded-md">NSFW</h2>
                  )}
                </div>
              }
            >
              <div className="flex flex-col gap-2">
                <h4 className="scroll-m-20 text-xl font-semibold text-nowrap">
                  {item.anilist.title.english ||
                    item.anilist.title.romaji ||
                    item.anilist.title.native}
                </h4>

                <h2 className="text-xs text-muted-foreground">
                  Romaji : {item.anilist.title.romaji}
                </h2>

                <h2 className="text-xs text-muted-foreground">
                  Native : {item.anilist.title.native}
                </h2>
              </div>
            </Card>
          </span>
        ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  // imageUrl,
  header,
  selectedCardInfo,
}: {
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  // imageUrl?: string;
  videoUrl?: string;
  selectedCardInfo: Result;
}) => {
  // const [imageLoaded, setImageLoaded] = useState(false);
  // const [imageError, setImageError] = useState(false);

  // const handleImageLoad = () => {
  //   setImageLoaded(true);
  // };

  // const handleImageError = () => {
  //   setImageError(true);
  // };
  const cardClasses =
    "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer ";
  return (
    <AnimeInfoDialog selectedCardInfo={selectedCardInfo}>
      <div className={cn(cardClasses, className)}>
        <div className="relative z-50 py-2">
          {header}
          {/* {imageUrl && !imageError ? (
            <Skeleton className="flex rounded-xl" />
          ) : (
            <>
              <img
                src={imageUrl}
                alt="Card Image"
                className="w-full h-auto rounded-lg"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {!imageLoaded && <Skeleton className="flex rounded-xl absolute inset-0" />}
            </>
          )} */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </AnimeInfoDialog>
  );
};
