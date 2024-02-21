/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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

export function ShowColorPallette() {
  const [file, setFile] = useState(null);
  const [showPalette, setShowPalette] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setShowPalette(true);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileRemove = () => {
    setFile(null);
    setImageUrl("");
    setShowPalette(false);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {imageUrl && (
        <img src={imageUrl} alt="Wallpaper" className="w-full h-full object-cover rounded-xl" />
      )}
      <Label htmlFor="picture">Upload a Wallpaper</Label>
      <Input className="cursor-pointer" id="picture" type="file" onChange={handleFileChange} />
      {file && (
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleFileRemove} className="">
            <X />
          </Button>
        </div>
      )}

      {showPalette && (
        <>
          <Label>Dominant Colors Palette</Label>
          <ColorPaletteFromImage imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
}
