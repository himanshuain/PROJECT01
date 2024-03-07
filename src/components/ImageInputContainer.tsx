/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import * as R from "ramda";
import {
  useExtractAnimeUsingMediaUploadQuery,
  // getApiQuota,
  graphqlQueryOptions,
} from "@/Service/queries";
import { anilistUrl } from "@/Service/restUrls";
import FileUpload from "./FileUploadDnD";
// import { anilistGraphqlData } from "../MockData/anilistData";

const ColorPaletteFromImage = ({ imageUrl }) => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // const extractColors = imageElement => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = imageElement.width;
  //   canvas.height = imageElement.height;
  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  //   const colorMap = {};

  //   for (let i = 0; i < imageData.length; i += 4) {
  //     const r = imageData[i];
  //     const g = imageData[i + 1];
  //     const b = imageData[i + 2];
  //     const color = `${r},${g},${b}`;
  //     if (colorMap[color]) {
  //       colorMap[color]++;
  //     } else {
  //       colorMap[color] = 1;
  //     }
  //   }

  //   const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
  //   const dominantColors = sortedColors.slice(0, 5); // Get the top 5 dominant colors

  //   setColors(dominantColors);
  //   setLoading(false);
  // };

  const extractColors = imageElement => {
    const canvas = document.createElement("canvas");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorMap = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const color = `${r},${g},${b}`;
      if (colorMap[color]) {
        colorMap[color]++;
      } else {
        colorMap[color] = 1;
      }
    }

    const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
    const dominantColors = sortedColors.slice(0, 20); // Get the top dominant colors

    setColors(dominantColors);
    setLoading(false);
  };

  useEffect(() => {
    if (imageUrl) {
      setLoading(true);
      const image = new Image();
      // console.log(image.width, image.height);
      image.crossOrigin = "Anonymous";
      image.onload = () => extractColors(image);
      image.src = imageUrl;
      // return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: `rgb(${color})`,
            width: "15px",
            height: "50px",
            marginTop: "10px",
            display: "inline-block",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorPaletteFromImage;

export function ImageInputContainer({ setData, setIsLoading }) {
  const [file, setFile] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // console.log(file?.type);
  const [fileFormatError, setFileFormatError] = useState(false);
  // console.log(fileFormatError);
  // const [showPalette, setShowPalette] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  function checkFileTypeOnDnD(file) {
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const acceptedFormats = [".gif", ".jpg", ".jpeg", ".png"];

    if (acceptedFormats.some(format => fileName.endsWith(format))) {
      setFileFormatError(false);
      return true;
    } else {
      setFileFormatError(true);
      return false;
    }
  }

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }
  // TODO: for graphql response
  // const modifiedUrl = originalUrl.replace('/medium/', '/large/');

  // Function to handle the data
  function handleData() {
    // console.log(data?.Page?.media);
    // Handle the response data here
  }

  // Function to handle errors
  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
  const handleFileChange = file => {
    // const selectedFile = e[0];
    setFile(file);
  };
  // const {
  //   refetch: fetchAnimeUsingUrl,
  //   isLoading: isLoadingUrlData,
  //   data: dataUsingUrl,
  // } = useExtractAnimeUsingUrlQuery(inputUrl);

  const {
    refetch: extractAnimeUsingMediaUpload,
    isLoading: isLoadingMediaUploadData,
    data: dataUsingMediaUpload,
    // ...rest
  } = useExtractAnimeUsingMediaUploadQuery(file);

  useEffect(() => {
    if (file && checkFileTypeOnDnD(file)) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      // setShowPalette(true);
      // -------------------------
      // getData();
      // fetchAnimeUsingUrl();

      extractAnimeUsingMediaUpload();
      // console.log("dataUsingMediaUpload", dataUsingMediaUpload);
      // isDataLoaded && setData(dataUsingMediaUpload);
      setIsDataLoaded(true);
      // getApiQuota();

      // -------------------------
      //

      return () => URL.revokeObjectURL(objectUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isDataLoaded]);

  // Filter the data based on the anilist ids and top 6 results
  useEffect(() => {
    if (isDataLoaded && dataUsingMediaUpload && !dataUsingMediaUpload?.error) {
      const {
        data: { data },
      } = dataUsingMediaUpload;
      const filteredData = R.pipe(
        // R.prop(0),
        R.uniqBy(R.path(["anilist", "id"])),
        R.take(6)
      )(data?.result);
      setData({
        result: filteredData,
        frameCount: dataUsingMediaUpload?.data?.data?.frameCount,
        apiTookTime: dataUsingMediaUpload.tookTime,
      });
      // !R.isEmpty(inputUrl) &&
      // queryClient.invalidateQueries({ queryKey: ["extractAnimeUsingUrl", inputUrl] });
    }
  }, [dataUsingMediaUpload, isDataLoaded, setData, isLoadingMediaUploadData]);

  // todo: filter the url data also
  const getIds = useMemo(
    () =>
      (!isLoadingMediaUploadData &&
        dataUsingMediaUpload && [
          ...new Set(dataUsingMediaUpload?.data?.data?.result.map(record => record?.anilist?.id)),
        ]) ||
      [],
    [dataUsingMediaUpload, isLoadingMediaUploadData]
  );

  // console.log("ids", getIds);

  useEffect(() => {
    if (
      // eslint-disable-next-line no-constant-condition
      false && // disable for now
      getIds.length > 0 &&
      dataUsingMediaUpload &&
      !isLoadingMediaUploadData
      //  && !isLoadingUrlData
    ) {
      console.log("inside ids", getIds);
      fetch(anilistUrl, graphqlQueryOptions([15125]))
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getIds]);

  useEffect(() => {
    setIsLoading(isLoadingMediaUploadData);
  }, [isLoadingMediaUploadData, setIsLoading]);

  return (
    <div className="flex flex-col items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <FileUpload handleFileChange={handleFileChange} />
        {fileFormatError && (
          <p className="text-red-500">Selected file is not an image, screenshot or GIF.</p>
        )}
        {dataUsingMediaUpload?.error && (
          <p className="text-red-500 my-2">{dataUsingMediaUpload?.error}</p>
        )}
        {!R.isEmpty(imageUrl) && (
          <img
            src={imageUrl}
            alt="Wallpaper"
            key="imageUrl"
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {/* {showPalette && (
          <>
            <Label>Dominant Colors Palette</Label>
            <ColorPaletteFromImage imageUrl={imageUrl} />
          </>
        )} */}
        {/* <video controls width="100%" alt="video preview">
        <source
          src={
            "https://media.trace.moe/video/20665/%5BLeopard-Raws%5D%20Shigatsu%20wa%20Kimi%20no%20Uso%20-%2007%20RAW%20(CX%201280x720%20x264%20AAC).mp4?t=580.79&now=1709326800&token=YzJyHD3mx9Mm981LGKtSPZ78rMg&size=l"
          }
          type="video/mp4"
        />
        Sorry, your browser doesn't support embedded videos.
      </video> */}
      </div>
    </div>
  );
}

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   // AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

// export function AlertDialogDemo() {
//   return (
//     <AlertDialog>
//       {/* <AlertDialogTrigger asChild>
//         <Button variant="outline">Show Dialog</Button>
//       </AlertDialogTrigger> */}
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your account and remove your
//             data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction>Continue</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
