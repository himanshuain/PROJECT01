import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Skeleton } from "./skeleton";
import { AnimeInfoDialog } from "../AnimeInfoDialog";
// import { CardTitle } from "@/components/ui/card";

export const CardsWithHoverEffect = ({
  items,
  // apiTookTime,
  className,
}: // setSelectedCardId,
{
  items: {
    anilist: {
      id: number;
      isAdult: boolean;
      title: {
        romaji: string;
        native: string;
        english: string;
      };
    };
    episode: number | null;
    image: string;
    similarity: number;
    video: string;
    // description: string;
    // link: string;
    // imageUrl?: string; // New property for image URL
  }[];
  className?: string;
  // apiTookTime?: number;
  // setSelectedCardId: (id: number | null) => void;
}) => {
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<{
    id: number | null;
    videoUrl?: string;
    episode: number | null;
  }>({
    id: null,
    videoUrl: "",
    episode: null,
  });

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items &&
        items.map((item, idx) => (
          <span
            // href={item.link}
            onClick={() => {
              // setSelectedCardId(item.anilist.id);
              setSelectedCard({
                id: item.anilist.id,
                videoUrl: `${item.video}&size=l`,
                episode: item.episode,
              });
              // console.log(item.anilist.id);
            }}
            key={`${item.anilist.id}-${idx}`}
            className="relative group block p-2 h-full w-full"
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
              imageUrl={`${item.image}&size=l`}
              // videoUrl={}
              // cardId={item.anilist.id}
              selectedCardInfo={selectedCard}
              header={
                <div className="pb-4 flex items-baseline justify-between mx-2">
                  {/* <div className="text-xl">{apiTookTime}</div> */}
                  {/* <div className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-green-600 bg-black text-white text-md">
                    {Math.round(item.similarity * 1000) / 10}
                  </div> */}
                  <div className="flex items-center">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-green-600 bg-black text-white text-xs">
                      {Math.round(item.similarity * 1000) / 10}
                    </div>
                    <div className="text-sm pl-1 text-gray-400">percent similarity</div>
                  </div>
                  {/* <AnimeInfoDialog selectedCardId={item.anilist.id} /> */}
                  {item.anilist.isAdult && (
                    <h2 className="text-purple-800 border-2 px-2 rounded-md">NSFW</h2>
                  )}
                </div>
              }
            >
              <div className="flex flex-col gap-2">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
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
              {/* <CardDescription>{item.description}</CardDescription> */}
            </Card>
          </span>
        ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  imageUrl,
  // videoUrl,
  header,
  selectedCardInfo,
}: // cardId,
{
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  imageUrl?: string;
  videoUrl?: string;
  selectedCardInfo: { id: number | null; videoUrl?: string; episode: number | null };
  // cardId: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AnimeInfoDialog selectedCardInfo={selectedCardInfo}>
      <div
        className={cn(
          "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer",
          className
        )}
      >
        <div className="relative z-50">
          {header}
          {imageError ? (
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
          )}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </AnimeInfoDialog>
  );
};
