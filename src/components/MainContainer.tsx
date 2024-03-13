// import { AnimeResults } from "./AnimeResults";
// import { Sparkles } from "./TopLanding";
// import { ScrollArea } from "./ui/scroll-area";
// export function MainContainer() {
//   return (
//     <ScrollArea className="rounded-md border max-h-full h-screen overflow-y-auto dark:bg-black">
//       <div className="flex-1 overflow-y-auto ">
//         <Sparkles />
//         <div className="flex flex-col items-center justify-center my-10 mx-4">
//           <h2 className="scroll-m-20 pb-2 md:text-xl lg:text-3xl font-semibold tracking-tight first:mt-0">
//             Your Anime Awaits! Search for anime with Image-Extraction!
//           </h2>
//           <p className="text-md text-muted-foreground">Use a screenshot, image or GIF.</p>
//         </div>
//         <AnimeResults />
//       </div>
//     </ScrollArea>
//   );
// }

import React, { Suspense, lazy } from "react";
import { AnimeResults } from "./AnimeResults";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "./Loader";

// Lazy load the Sparkles component
const Sparkles = lazy(() => import("./TopLanding"));

export function MainContainer(): JSX.Element {
  return (
    <ScrollArea className="rounded-md border max-h-full h-screen overflow-y-auto dark:bg-black">
      <div className="flex-1 overflow-y-auto ">
        <Suspense fallback={<Loader />}>
          <Sparkles />
        </Suspense>
        <div className="flex flex-col items-center justify-center my-10 mx-4">
          <h2 className="scroll-m-20 pb-2 md:text-xl lg:text-3xl font-semibold tracking-tight first:mt-0">
            Your Anime Awaits! Search for anime with Image-Extraction!
          </h2>
          <p className="text-md text-muted-foreground">Use a screenshot, image, or GIF.</p>
        </div>
        <AnimeResults />
      </div>
    </ScrollArea>
  );
}
