import { css } from "@emotion/css";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Transforms } from "slate";
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";

import { Button, Icon } from "./components";
import { ImageElement } from "./customType";
import { Delete, Images, ImageUp, Trash2Icon } from "lucide-react";
import { useState } from "react";
import Compressor from "compressorjs";

// export const insertImage = (editor, url) => {
//   const text = { text: "" };
//   const image: ImageElement = { type: "image", url, children: [text] };
//   Transforms.insertNodes(editor, image);
//   Transforms.insertNodes(editor, {
//     type: "paragraph",
//     children: [{ text: "" }],
//   });
// };

export const insertImage = async (editor, url) => {
  const text = { text: "" };
  let image: ImageElement;

  try {
    const base64 = await urlToBase64(url);
    image = {
      type: "image",
      url: base64,
      children: [text],
    };
  } catch (error) {
    image = {
      type: "image",
      url,
      children: [text],
    };
  }
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

const urlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={css`
          position: relative;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          src={element.url}
          className={css`
            resize: both;
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
        <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={css`
            display: ${selected && focused ? "inline" : "none"};
            position: absolute;
            top: 0.5em;
            left: 50%;
            trasform: translateX(-50%);
            background-color: white;
            padding: 6px;
            border-radius: 50%;
            border: 2px solid pink;
          `}
        >
          <Icon>
            <Trash2Icon color="red" />
          </Icon>
        </Button>
      </div>
    </div>
  );
};

export const InsertImageButton = () => {
  const editor = useSlateStatic();
  const [url, setUrl] = useState("");

  const openFileExplorer = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        // const reader = new FileReader();
        // reader.onload = async (e) => {
        //   const base64 = e.target.result;
        //   setUrl(base64);
        //   insertImage(editor, base64);
        // };
        // reader.readAsDataURL(file);
        new Compressor(file, {
          quality: 0.2, // Adjust the quality as needed
          success(result) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target.result;
              insertImage(editor, base64);
            };
            reader.readAsDataURL(result);
          },
          error(err) {
            console.error(err.message);
          },
        });
      }
    };
    input.click();
  };

  const handleInsertImage = () => {
    if (url && !isImageUrl(url)) {
      alert("URL is not an image");
      return;
    }
    url && insertImage(editor, url);
  };

  return (
    <div>
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          openFileExplorer();
        }}
      >
        <ImageUp size={18} color="blue" />
      </Button>
    </div>
  );
};

export const InsertImageLinkButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          alert("URL is not an image");
          return;
        }
        url && insertImage(editor, url);
      }}
    >
      <Images size={18} color="blue" />
    </Button>
  );
};

const isImageUrl = (url) => {
  return true;
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
