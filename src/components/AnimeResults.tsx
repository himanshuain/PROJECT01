/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CardsWithHoverEffect } from "@/components/ui/CardsWithHoverEffect";
import { ImageInputContainer } from "./ImageInputContainer";
import { useEffect, useMemo, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { SearchBar } from "./SearchBar";
export function AnimeResults() {
  const [data, setData] = useState(null);
  const [isMediaDataLoading, setIsMediaDataLoading] = useState(false);
  const [isLoadingUrlData, setIsUrlDataLoading] = useState(false);
  const isLoading = isMediaDataLoading || isLoadingUrlData;
  const frameCount = data?.frameCount;
  const result = useMemo(() => data?.result || [], [data]);
  const apiTookTime = data?.apiTookTime;

  const resultRef = useRef<null | HTMLDivElement>(null);

  // Scroll to the result section when data is available and there are no errors
  useEffect(() => {
    if ((resultRef.current && result.length > 0) || isLoading) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, isLoading]);

  // console.log("showing data", data);
  return (
    <div className="max-w-5xl mx-auto px-8">
      <SearchBar setData={setData} setIsLoading={setIsUrlDataLoading} />
      <div className="flex h-full items-center justify-center p-6">
        <ImageInputContainer setData={setData} setIsLoading={setIsMediaDataLoading} />
      </div>

      {!isLoading && frameCount && apiTookTime && (
        <TypewriterEffectSmooth
          words={[
            {
              text: "Searched",
            },
            {
              text: `${frameCount}`,
            },
            {
              text: "frames in",
            },

            {
              text: `${apiTookTime}`,
              className: "text-green-500 dark:text-green-600",
            },
            {
              text: "seconds.",
            },
          ]}
        />
      )}
      <div className="flex flex-col">
        {/* {selectedCardId && <AnimeInfoDialog selectedCardId={selectedCardId} />} */}
        <div className="flex justify-center items-center h-full flex-wrap" ref={resultRef}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`w-full ${isLoading ? "opacity-50" : ""}`}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : result.length > 0 ? (
            <CardsWithHoverEffect items={result} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-x-3 mt-2">
      <Skeleton className="h-[125px] w-[250px] rounded-xl mt-2" />
      <div className="space-y-2">
        <Skeleton className="h-6 my-2 w-[220px]" />
        <Skeleton className="h-4 my-2 w-[200px]" />
      </div>
    </div>
  );
}
