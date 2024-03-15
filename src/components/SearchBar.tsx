import { useEffect, useState } from "react";
import * as R from "ramda";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useExtractAnimeUsingUrlQuery } from "@/Service/queries";
import { Loader } from "./Loader";
import { filterDataByUniqueIds } from "@/lib/utils";
import { data } from "@/InterfaceTypes";

interface SearchBarProps {
  setData: (data: {
    result: data;
    frameCount: number | null;
    apiTookTime: number | undefined;
  }) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const SearchBar = ({ setData, setIsLoading }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const {
    refetch: fetchAnimeUsingUrl,
    isLoading: isLoadingUrlData,
    data: dataUsingUrl,
  } = useExtractAnimeUsingUrlQuery(searchInput);

  const handleSearch = () => {
    setSearchClicked(true);
    setLoading(true);
    fetchAnimeUsingUrl();
  };

  useEffect(() => {
    if (dataUsingUrl && !dataUsingUrl?.error) {
      const filteredData = R.pipe(
        // R.prop(0),
        filterDataByUniqueIds("anilist"),
        R.take(6)
      )(dataUsingUrl?.data?.result);

      setData({
        result: filteredData as data,
        // result: dataUsingUrl?.data?.result,
        frameCount: dataUsingUrl?.data?.frameCount,
        apiTookTime: dataUsingUrl?.tookTime,
      });
      setImageUrl(searchInput);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUsingUrl, setData]);

  useEffect(() => {
    setIsLoading(isLoadingUrlData);
  }, [isLoadingUrlData, setIsLoading]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 py-4 px-4 flex items-center space-x-2 shadow rounded-lg">
        <Input
          type="text"
          placeholder="Enter an image url"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <Button disabled={!searchInput} onClick={handleSearch}>
          {!isLoading ? <SearchIcon /> : <Loader size={24} />}
        </Button>
      </div>
      {dataUsingUrl?.error && <p className="text-red-500 px-4 mb-10">{dataUsingUrl?.error}</p>}
      {searchClicked && imageUrl && (
        <img
          src={imageUrl}
          className="w-1/2 h-1/2 mb-4 object-cover rounded-xl self-center"
          alt="No image found for this Url."
        />
      )}
    </div>
  );
};
