import { Label } from "./ui/label";

interface PosterProps {
  cinemaName?: string;
  posterImg?: string;
}

export const Poster: React.FC<PosterProps> = ({
  cinemaName = "hell",
  posterImg = "https://github.com/shadcn.png",
}) => {
  return (
    <div className="w-full md:w-1/4 p-4 relative">
      <div className="w-full h-full min-w-[50px] min-h-[50px] p-4">
        <img src={posterImg} alt={cinemaName} className="w-full h-full object-cover rounded-xl" />
        <Label className="bg-white p-2 flex items-center justify-center">{cinemaName}</Label>
      </div>
    </div>
  );
};
