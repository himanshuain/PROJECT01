/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { fetchCinemaData } from "@/Service/queries";
import { Loader } from "./Loader";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "./ui/alert-dialog";

export const CinemaContainer = ({ searchInput }) => {
  const [data, setData] = useState([]);
  //   const [pageLoad, setPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [paginationKey, setPaginationKey] = useState(0);
  const scrollAreaRef = useRef(null); // Create a ref for the scroll area

  const fetchData = async () => {
    try {
      setIsFetchingNextPage(true);
      const response = await fetchCinemaData({ pageParam: paginationKey, searchInput });
      const newData = response.results;
      setData(prevData => prevData.concat(newData));
      setHasNextPage(!!response.paginationKey);
      setIsLoading(false);
      setIsFetchingNextPage(false);
      setPaginationKey(Number(paginationKey) + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    fetchData(); // disabled for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleScroll = _.debounce(() => {
    if (scrollAreaRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollAreaRef.current;
      if (scrollTop + clientHeight >= scrollHeight * 0.7 && hasNextPage && !isFetchingNextPage) {
        fetchData();
      }
    }
  }, 300);

  if (isLoading && data.length === 0) {
    return <Loader />;
  }

  // TODO: Show a dialog for api error

  //   if (data) {
  //     console.log(data);
  //     return (
  //       <AlertDialog>
  //         <AlertDialogContent>
  //           <AlertDialogHeader>
  //             <AlertDialogTitle>Note</AlertDialogTitle>
  //             <AlertDialogDescription>{data.message}</AlertDialogDescription>
  //           </AlertDialogHeader>
  //         </AlertDialogContent>
  //       </AlertDialog>
  //     );
  //   }

  return (
    <ScrollArea
      className="rounded-md border max-h-full overflow-y-auto"
      ref={scrollAreaRef} // Attach the ref to the scroll area
      onScroll={handleScroll}
    >
      <div className="p-4">
        <>
          {data.map(
            (item, index) =>
              item.image && (
                <figure key={index} className="shrink-0">
                  <div className="overflow-hidden rounded-xl shadow-3xl">
                    <img
                      src={item?.image?.url}
                      alt={`Photo by ${item.title}`}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={item?.image?.width}
                      height={item?.image?.height}
                    />
                  </div>
                  <figcaption className="pt-2 pb-4 text-xs text-muted-foreground">
                    {_.startCase(_.toLower(item?.titleType))}
                    <span className="font-semibold text-foreground"> {item.title}</span>
                  </figcaption>
                </figure>
              )
          )}
          {isFetchingNextPage && <div>Loading more...</div>}
          {!hasNextPage && <div>No more data</div>}
        </>
      </div>
    </ScrollArea>
  );
};
