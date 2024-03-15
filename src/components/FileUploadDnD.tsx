/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ handleFileChange }) => {
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      handleFileChange(acceptedFiles[0]);
      // Call your backend API endpoint to upload files
    },
  });

  // const handleFileChange = event => {
  //   // Add your file change handling logic here
  // };

  return (
    <div
      {...getRootProps()}
      className="border-2 border-gray-300 border-dashed rounded-md p-4 text-center cursor-pointer"
    >
      <input
        {...getInputProps()}
        // onChange={handleFileChange}
        // className="hidden"
        // type="file"
        // accept="image/*"
        // name="media"
        // id="media"
      />
      <label htmlFor="media" className="cursor-pointer">
        {/* Add your uploader icon here if needed */}
        <svg
          className="mx-auto w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Drag and drop an Image here or click to browse.
        </p>
      </label>
      {/* <ul className="list-disc text-left">
        {uploadedFiles.map(file => (
          <li key={file.name} className="text-gray-600">
            {file.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default FileUpload;
