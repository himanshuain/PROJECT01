import React, { Suspense, lazy } from "react";
import { AnimeResults } from "./AnimeResults";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "./Loader";
import { Button } from "@mui/material";
import { Github } from "lucide-react";

// Lazy load the Sparkles component
const Sparkles = lazy(() => import("./TopLanding"));

export function MainContainer(): JSX.Element {
  return (
    <ScrollArea className="rounded-md border max-h-full h-screen overflow-y-auto dark:bg-black">
      <div className="m-2">
        <Button
          startIcon={<Github />}
          className="hover:text-white"
          href="https://github.com/himanshuain/PROJECT01"
          target="_blank"
        ></Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Suspense
          fallback={
            <div className="flex p-8 h-[30rem] justify-center items-center">
              <Loader />
            </div>
          }
        >
          <Sparkles />
        </Suspense>
        <div className="flex flex-col items-center justify-center my-10 mx-4">
          <h2 className="scroll-m-20 pb-2 text-sm md:text-xl lg:text-3xl font-semibold tracking-tight first:mt-0">
            Image-Extraction Search engine for anime!
          </h2>
          <p className="text-md text-muted-foreground">Use a screenshot, image, or GIF.</p>
        </div>
        <AnimeResults />
        <h2 className="text-accent py-2 px-4 text-sm">
          <span className="text-yellow-700">Info : </span>Sometimes results may not be correct. And
          It may show results even if provided image or url doen't contain any anime content.
        </h2>
      </div>
    </ScrollArea>
  );
}
