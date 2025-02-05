import React, { useMemo } from "react";
import { Element as SlateElement, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

export const withEmbeds = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;
};

const allowedSchemes = ["http:", "https:"];

export const VideoElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const { url } = element;

  const safeUrl = useMemo(() => {
    let parsedUrl: URL = null;
    try {
      parsedUrl = new URL(url);
      // eslint-disable-next-line no-empty
    } catch {}
    if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
      return parsedUrl.href;
    }
    return "about:blank";
  }, [url]);

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className="flex flex-col items-center justify-center"
      >
        <div
          className="w-2/3 h-[500px]"
          style={{
            // padding: "75% 0 0 0",
            position: "relative",
          }}
        >
          <iframe
            src={`${safeUrl}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <UrlInput
          url={url}
          onChange={(val) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              url: val,
            };
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: path,
            });
          }}
        />
      </div>
      {children}
    </div>
  );
};

const UrlInput = ({ url, onChange }) => {
  const [value, setValue] = React.useState(url);
  return (
    <input
      value={value}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: "5px",
        boxSizing: "border-box",
      }}
      onChange={(e) => {
        const newUrl = e.target.value;
        setValue(newUrl);
        onChange(newUrl);
      }}
    />
  );
};
