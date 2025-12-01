import { Pen, Trash } from "lucide-react";
import { ZodObject } from "zod";

import { ComponentProps, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export type ProfilePictureUploadProps = ComponentProps<"div"> &
  Readonly<{
    file?: File | string | null;
    onFileChange?: (file: File | null) => void;
  }>;

export function ProfilePictureUpload({
  file,
  onFileChange,
  className,
  ...props
}: ProfilePictureUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (selectedFile && onFileChange) {
      onFileChange(selectedFile);
    }
  };

  const handleUploadFileClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleRemoveFileClick = () => {
    if (onFileChange) onFileChange(null);
  };

  const DEFAULT_IMG = "/placeholder-logo.svg";

  /**
   * Determine the source of the profile picture.
   * If 'file' is a string, use it as the URL.
   * If 'file' is a File object, create a temporary URL for it.
   * If 'file' is null or undefined, use the default placeholder image.
   */
  const src =
    typeof file === "string"
      ? file
      : file
        ? URL.createObjectURL(file)
        : DEFAULT_IMG;

  return (
    <div className={cn("relative w-max", className)} {...props}>
      <img src={src} className="rounded-2xl size-36 object-cover border" />
      <div className="flex flex-col gap-4 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
        <Button
          type="button"
          variant="muted"
          onClick={handleUploadFileClick}
          className="aspect-square px-0"
        >
          <Pen />
        </Button>
        {file && (
          <Button
            type="button"
            variant="destructive-medium"
            onClick={handleRemoveFileClick}
            className="aspect-square px-0"
          >
            <Trash />
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
