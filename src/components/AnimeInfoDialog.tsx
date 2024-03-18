import { useAnimeInfo } from "@/Service/queries";
import { useState } from "react";
import { Loader } from "./Loader";
import ReactPlayer from "react-player/lazy";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Result, graphQLAnimeInfoProps } from "@/InterfaceTypes";

export function AnimeInfoDialog({
  children,
  selectedCardInfo,
}: {
  selectedCardInfo: Result;
  children: React.ReactNode;
}) {
  const { refetch, isLoading, data } = useAnimeInfo(selectedCardInfo?.anilist.id);
  const animeInfo: graphQLAnimeInfoProps = data?.data?.Page?.media[0];

  const linkColors = {
    Twitter: "text-blue-500",
    YouTube: "text-red-500",
    Crunchyroll: "text-violet-500",
    "Bilibili TV": "text-pink-500",
    "Official Site": "text-blue-700",
    Netflix: "text-red-500",
    Instagram: "text-pink-500",
  };
  const HeaderDiv = (
    <DialogHeader className="flex-col">
      {selectedCardInfo?.video && <VideoPlayer videoUrl={`${selectedCardInfo.video}&size=l`} />}
      {selectedCardInfo?.episode && (
        <Label className="py-4">
          Searched scene is from {selectedCardInfo?.episode || null}th episode.
        </Label>
      )}

      <div className="flex gap-2 flex-col pb-4">
        <div className="flex gap-2 py-4 flex-wrap">
          {animeInfo?.isAdult && <h2 className="text-purple-800 border-2 px-2 rounded-md">NSFW</h2>}
          {animeInfo?.genres &&
            animeInfo?.genres?.map((genre: string) => (
              <h2 key={genre} className="text-rose-600 border-2 px-2 rounded-md">
                {genre}
              </h2>
            ))}
        </div>
        <a
          href={animeInfo?.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 self-start text-md border-2 px-2 rounded-md"
        >
          Check on anilist.co
        </a>
      </div>
    </DialogHeader>
  );

  return (
    <Dialog>
      <DialogTrigger onClick={() => refetch()} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex justify-around pt-10 m-0 max-w-5xl h-[40rem] rounded-lg bg-slate-950">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="hidden md:block">{HeaderDiv}</div>

            <ScrollArea className="overflow-y-auto bg-black rounded-xl py-2 px-4 min-w-[25rem]">
              <div className="block md:hidden">{HeaderDiv}</div>
              <div className="flex flex-col gap-2 mb-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
                  {animeInfo?.title?.english ||
                    animeInfo?.title?.romaji ||
                    animeInfo?.title?.native}
                </h4>

                <h2 className="text-xs text-muted-foreground">
                  Romaji : {animeInfo?.title?.romaji}
                </h2>

                <h2 className="text-xs text-muted-foreground">
                  Native : {animeInfo?.title?.native}
                </h2>
              </div>

              {animeInfo?.bannerImage ? (
                <img
                  key={animeInfo?.bannerImage}
                  src={animeInfo?.bannerImage}
                  alt="Banner"
                  className="w-96 h-auto rounded-lg"
                />
              ) : animeInfo?.coverImage?.large ? (
                <img
                  key={animeInfo?.coverImage?.large}
                  src={animeInfo?.coverImage?.large}
                  alt="Cover"
                  className="w-96 h-auto rounded-lg"
                />
              ) : null}

              <div className="py-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">About the Anime</h2>
                <Separator className="mb-1" />
                <h2 className="text-sm">
                  This Anime has
                  <span className="font-bold text-blue-400"> {animeInfo?.episodes}</span>{" "}
                  episode(s).
                </h2>
                <p className="text-sm text-muted-foreground">
                  Anime released on: {animeInfo?.startDate.year}-{animeInfo?.startDate.month}-
                  {animeInfo?.startDate.day}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ended on: {animeInfo?.endDate.year}-{animeInfo?.endDate.month}-
                  {animeInfo?.endDate.day}
                </p>
                <p className="text-xs text-muted-foreground">Current status: {animeInfo?.status}</p>
              </div>
              {animeInfo?.externalLinks.length > 0 && (
                <div className="py-2 mx-2 items-end">
                  <p className="text-3xl text-orange-300">Links</p>
                  <Separator className="my-2" />
                  <ul>
                    {animeInfo?.externalLinks.map(
                      (link: { id: number; site: string; url: string }) => (
                        <li
                          key={link?.id}
                          className={
                            linkColors[link?.site as keyof typeof linkColors] || "text-blue-500"
                          }
                        >
                          <a href={link?.url} target="_blank" rel="noopener noreferrer">
                            {link?.site}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [error, setError] = useState(false);
  return error ? (
    <p className="text-sm text-muted-foreground pt-4">Clip for this scene is not available.</p>
  ) : (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        aspectRatio: "16/9",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <ReactPlayer
        onError={() => {
          setError(true);
        }}
        loop
        muted
        playing
        controls
        url={videoUrl}
        width="100%"
        height="auto"
      />
    </div>
  );
};
