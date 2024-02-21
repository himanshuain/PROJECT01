import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  setInput: (input: string) => void;
}
export const SearchBar = ({ setInput }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="sticky top-0 z-10 bg-white py-4 px-6 flex items-center space-x-2 shadow">
      <Input type="text" placeholder="Search" onChange={e => setSearchInput(e.target.value)} />
      <Button onClick={() => setInput(searchInput)}>
        <Search />
      </Button>
    </div>
  );
};
