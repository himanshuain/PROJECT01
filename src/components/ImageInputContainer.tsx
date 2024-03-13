import { useState, useEffect } from "react";
import * as R from "ramda";
import { useExtractAnimeUsingMediaUploadQuery } from "@/Service/queries";
import FileUpload from "./FileUploadDnD";
import { filterDataByUniqueIds } from "@/lib/utils";
import { data } from "@/InterfaceTypes";

export function ImageInputContainer({
  setData,
  setIsLoading,
}: {
  setData: (data: {
    result: data;
    frameCount: number | null;
    apiTookTime: number | undefined;
  }) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fileFormatError, setFileFormatError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  function checkFileTypeOnDnD(file: File) {
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

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const {
    refetch: extractAnimeUsingMediaUpload,
    isLoading: isLoadingMediaUploadData,
    data: dataUsingMediaUpload,
  } = useExtractAnimeUsingMediaUploadQuery(file);

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

  // Filter the data based on the anilist ids and top 6 results
  useEffect(() => {
    if (isDataLoaded && dataUsingMediaUpload && !dataUsingMediaUpload?.error) {
      const { data } = dataUsingMediaUpload;
      const filteredData = R.pipe(filterDataByUniqueIds("anilist"), R.take(6))(data?.data?.result);
      setData({
        result: filteredData as data,
        frameCount: dataUsingMediaUpload?.data?.data?.frameCount,
        apiTookTime: dataUsingMediaUpload.tookTime,
      });
    }
  }, [dataUsingMediaUpload, isDataLoaded, setData, isLoadingMediaUploadData]);

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
            className="my-4 object-cover rounded-xl self-center"
          />
        )}
      </div>
    </div>
  );
}
