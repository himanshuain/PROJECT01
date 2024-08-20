import { useState, useEffect } from "react";
import * as R from "ramda";
import { useExtractAnimeUsingMediaUploadQuery } from "@/Service/queries";
import FileUpload from "./FileUploadDnD";
import img1 from "/examples/img1.jpeg";
import img2 from "/examples/img2.gif";
import { filterDataByUniqueIds } from "@/lib/utils";
import { Data } from "@/InterfaceTypes";
import { acceptedFileUploadFormats } from "@/Constants";

export function ImageInputContainer({
  setData,
  setIsLoading,
}: {
  setData: (data: Data) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fileFormatError, setFileFormatError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  function checkFileTypeOnDnD(file: File) {
    if (!file) return;

    if (acceptedFileUploadFormats.some(format => file.type === format)) {
      setFileFormatError(false);
      return true;
    } else {
      setFileFormatError(true);
      return false;
    }
  }
  const {
    refetch: extractAnimeUsingMediaUpload,
    isFetching: isLoadingMediaUploadData,
    data: dataUsingMediaUpload,
  } = useExtractAnimeUsingMediaUploadQuery(file);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleOnClickExamples = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const exampleFile = new File([blob], "example", { type: blob.type });
    setFile(exampleFile);
  };

  useEffect(() => {
    if (file && checkFileTypeOnDnD(file)) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      extractAnimeUsingMediaUpload();
      setIsDataLoaded(true);

      return () => URL.revokeObjectURL(objectUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded && dataUsingMediaUpload && !dataUsingMediaUpload?.error) {
      const { data } = dataUsingMediaUpload;
      const filteredData = R.pipe(filterDataByUniqueIds("anilist"), R.take(6))(data?.data?.result);
      setData({
        result: filteredData,
        frameCount: dataUsingMediaUpload?.data?.data?.frameCount,
        apiTookTime: dataUsingMediaUpload.tookTime,
      } as Data);
    }
  }, [dataUsingMediaUpload, isDataLoaded, setData, isLoadingMediaUploadData]);

  useEffect(() => {
    setIsLoading(isLoadingMediaUploadData);
  }, [isLoadingMediaUploadData, setIsLoading]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex flex-row gap-2 items-center justify-center mb-4 w-full">
          <img
            onClick={() => handleOnClickExamples(img1)}
            height={100}
            width={100}
            src={img1}
            alt="anime image"
            className="cursor-pointer object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 border-white hover:scale-110 duration-300"
          />
          <img
            onClick={() => handleOnClickExamples(img2)}
            height={100}
            width={100}
            src={img2}
            alt="anime image"
            className="cursor-pointer object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 border-white hover:scale-110 duration-300"
          />
          <p className="px-4 text-muted-foreground text-xs">
            <i>Try it</i>
          </p>
        </div>

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
            className="my-4 object-cover rounded-xl justify-self-stretch"
          />
        )}
      </div>
    </div>
  );
}
