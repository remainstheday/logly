import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "pintura/pintura.css";
import { openDefaultEditor } from "pintura";

// This function is called when the user taps the edit button, it opens the editor and returns the modified file when done
const editImage = (image, done) => {
  const imageFile = image.pintura ? image.pintura.file : image;
  const imageState = image.pintura ? image.pintura.data : {};

  const editor = openDefaultEditor({
    src: imageFile,
    imageState,
    enableUtils: false,
  });

  editor.on("close", () => {});

  editor.on("process", ({ dest, imageState }) => {
    Object.assign(dest, {
      pintura: { file: imageFile, data: imageState },
    });
    done(dest);
  });
};

export default function ImageUploader({ onUpload }) {
  const [uploadedImage, setUploadedImage] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const fileToEdit = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      editImage(fileToEdit[0], (output) => {
        // revoke preview URL for old image
        if (fileToEdit[0].preview) URL.revokeObjectURL(fileToEdit[0].preview);

        // set new preview URL
        Object.assign(output, {
          preview: URL.createObjectURL(output),
        });
        onUpload([output]);
        setUploadedImage([output]);
      });
    },
  });

  const thumbs = uploadedImage.map((file) => (
    <div className="" key={file.name}>
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={file.preview}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      uploadedImage.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [uploadedImage]
  );

  return (
    <>
      {uploadedImage.length > 0 && <div>{thumbs}</div>}
      {uploadedImage.length === 0 && (
        <div {...getRootProps({ className: "dropzone" })}>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload an image</span>
                  <input {...getInputProps()} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
