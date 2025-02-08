import React, { useCallback, useMemo, useState } from "react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import isHotkey from "is-hotkey";
import {
  Transforms,
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
  ReactEditor,
  useSlate,
} from "slate-react";

import { withHistory } from "slate-history";
import {
  AArrowDown,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  PaintBucket,
  Quote,
  Square,
  SquareCheckBig,
  Underline,
} from "lucide-react";

import { FaBold } from "react-icons/fa";

import { css } from "@emotion/css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { Button, Icon, Toolbar } from "./components";
import { ImageElement } from "./customType";
import { colors, fonts } from "./color";
import { HoveringToolbar } from "./hoverToolbar";
import {
  AddLinkButton,
  BadgeComponent,
  EditableButtonComponent,
  LinkComponent,
  RemoveLinkButton,
  withInlines,
} from "./hyper-link";
import { CheckListItemElement, withChecklists } from "./checkList";
import {
  ImageQill,
  insertImage,
  InsertImageButton,
  InsertImageLinkButton,
} from "./image";
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const ImagesExample = ({
  slate,
  setSlate,
}: {
  slate: Descendant[];
  setSlate: (val: Descendant[]) => void;
}) => {
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    []
  );
  const renderLeaf = useCallback((props) => <RenderLeaf {...props} />, []);
  const [editor] = useState(() => {
    return withInlines(withImages(withChecklists(withReact(createEditor()))));
  });
  const [selectionState, setSelectionState] = useState({
    color: "#000",
    background: "#000",
    align: "left",
    font: "system-ui",
  });

  return (
    <div className="slate-quill">
      <Slate
        key={slate.length}
        editor={editor}
        onValueChange={(value) => setSlate(value)}
        initialValue={slate}
      >
        <div className="px-8 py-2 bg-white border border-gray-700 flex items-center">
          <Toolbar>
            <MarkButton format="bold" icon={<FaBold size={14} />} />
            <MarkButton format="italic" icon={<Italic size={14} />} />
            <MarkButton format="underline" icon={<Underline size={16} />} />
            <MarkButton format="code" icon={<Code size={16} />} />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className="border"
                    style={{ color: selectionState.color }}
                  >
                    <Baseline className="cursor-pointer" size={18} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-wrap gap-2 w-[190px] justify-center">
                    {colors.map((color) => (
                      <RadioButton
                        formats={colors}
                        key={color}
                        prefix="color-"
                        format={color}
                        icon={
                          <Square
                            className="border"
                            style={{ backgroundColor: color }}
                            size={16}
                            color={"transparent"}
                          />
                        }
                      />
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className="border"
                    style={{ color: selectionState.background }}
                  >
                    <PaintBucket className="cursor-pointer" size={18} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-wrap gap-2 w-[190px] justify-center">
                    {colors.map((color) => (
                      <RadioButton
                        formats={colors}
                        key={color}
                        format={color}
                        prefix="bg-"
                        icon={
                          <Square
                            className="border"
                            style={{ backgroundColor: color }}
                            size={16}
                            color={"transparent"}
                          />
                        }
                      />
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div>
                    <div className="!flex underline gap-1 ">
                      <p className="text-xs w-16 text-ellipsis overflow-hidden text-nowrap   text-gray-500">
                        {selectionState.font}
                      </p>

                      <AArrowDown size={18} />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-2 justify-center">
                    {fonts.map((font) => (
                      <RadioButton
                        formats={fonts}
                        key={font}
                        format={font}
                        prefix="font-"
                        icon={font}
                      />
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <BlockButton format="heading-1" icon={<Heading1 size={18} />} />
            <BlockButton format="heading-2" icon={<Heading2 size={18} />} />
            <BlockButton format="heading-3" icon={<Heading3 size={18} />} />
            <BlockButton format="heading-4" icon={<Heading4 size={18} />} />
            <BlockButton format="heading-4" icon={<Heading4 size={18} />} />
            <BlockButton format="heading-4" icon={<Heading4 size={18} />} />
            <BlockButton format="block-quote" icon={<Quote size={16} />} />
            <BlockButton
              format="numbered-list"
              icon={<ListOrdered size={16} />}
            />
            <BlockButton format="bulleted-list" icon={<List size={18} />} />
            <BlockButton format="left" icon={<AlignLeft size={18} />} />
            <BlockButton format="center" icon={<AlignCenter size={18} />} />
            <BlockButton format="right" icon={<AlignRight size={18} />} />
            <BlockButton format="justify" icon={<AlignJustify size={18} />} />
            <BlockButton
              format="check-list-item"
              icon={<SquareCheckBig size={16} />}
            />
            <InsertImageButton />
            <InsertImageLinkButton />

            <AddLinkButton />
            <RemoveLinkButton />
            {/* <ToggleEditableButtonButton /> thằng này thấy lỗi điêu lắm, lúc lỗi lúc ko*/}

            {/* <div
              onClick={() =>
                editor.insertNode({
                  type: "video",
                  url: "https://th.bing.com/th/id/OIP.yLf7kQVaLpxqCZX1VRHw-wHaEK?w=296&h=180&c=7&r=0&o=5&pid=1.7",
                  children: [{ text: "" }],
                })
              }
            >
              qq
            </div>
            <BlockButton format="video" icon={<SquareCheckBig size={20} />} /> */}
          </Toolbar>
        </div>
        <div className="mt-2 p-2 border border-gray-300">
          <HoveringToolbar
            slate={slate}
            setSelectionState={setSelectionState}
          />
          <Editable
            className="outline-gray-300 px-1 py-2"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="What you want to say?"
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
            onDOMBeforeInput={(event: InputEvent) => {
              switch (event.inputType) {
                case "formatBold":
                  event.preventDefault();
                  return toggleMark(editor, "bold");
                case "formatItalic":
                  event.preventDefault();
                  return toggleMark(editor, "italic");
                case "formatUnderline":
                  event.preventDefault();
                  return toggleMark(editor, "underlined");
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
};

export const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageQill {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// const Image = ({ attributes, children, element }) => {
//   const editor = useSlateStatic();
//   const path = ReactEditor.findPath(editor, element);

//   const selected = useSelected();
//   const focused = useFocused();
//   return (
//     <div {...attributes}>
//       {children}
//       <div
//         contentEditable={false}
//         className={css`
//           position: relative;
//         `}
//       >
//         <img
//           src={element.url}
//           className={css`
//             display: block;
//             max-width: 100%;
//             max-height: 20em;
//             box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
//           `}
//         />
//         <Button
//           active
//           onClick={() => Transforms.removeNodes(editor, { at: path })}
//           className={css`
//             display: ${selected && focused ? "inline" : "none"};
//             position: absolute;
//             top: 0.5em;
//             left: 0.5em;
//             background-color: white;
//           `}
//         >
//           <Icon>delete</Icon>
//         </Button>
//       </div>
//     </div>
//   );
// };

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const RenderElement = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    // case "video":
    //   return <VideoElement {...props} />;
    case "image":
      return <ImageQill {...props} />;

    case "check-list-item":
      return <CheckListItemElement {...props} />;
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "heading-3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "heading-4":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );

    case "link":
      return <LinkComponent {...props} />;
    case "button":
      return <EditableButtonComponent {...props} />;
    case "badge":
      return <BadgeComponent {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export const RenderLeaf = ({ attributes, children, leaf }) => {
  // Object.entries(leaf).map(([key]) => {
  //   if (key === "bold") children = <strong>{children}</strong>;
  //   if (key === "code") children = <code>{children}</code>;
  //   if (key === "italic") children = <em>{children}</em>;
  //   if (key.includes("color-"))
  //     children = <span style={{ color: key.split("-")[1] }}>{children}</span>;
  //   if (key.includes("bg-"))
  //     children = (
  //       <span style={{ backgroundColor: key.split("-")[1] }}>{children}</span>
  //     );
  //   if (key.includes("font-"))
  //     children = (
  //       <span style={{ fontFamily: key.split("-")[1] }}>{children}</span>
  //     );
  //   if (key === "underline") children = <u>{children}</u>;
  //   switch (key) {
  //     case "bold":
  //       children = <strong>{children}</strong>;
  //       break;
  //   }
  // });

  // console.log('"leaf" :>> ', leaf);

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf)
    fonts.forEach((fonts) => {
      if (leaf?.["font-" + fonts]) {
        children = <span style={{ fontFamily: fonts }}>{children}</span>;
      }
    });

  colors.forEach((color) => {
    if (leaf?.["color-" + color]) {
      children = <span style={{ color }}>{children}</span>;
    }
  });
  colors.forEach((color) => {
    if (leaf?.["bg-" + color]) {
      children = <span style={{ backgroundColor: color }}>{children}</span>;
    }
  });

  return <span {...attributes}>{children}</span>;
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();

  return imageExtensions.includes(ext);
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const RadioButton = ({ format, formats, icon, prefix = "" }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, prefix + format)}
      onMouseDown={(event) => {
        event.preventDefault();
        formats.map((f) => {
          Editor.removeMark(editor, prefix + f);
        });
        toggleMark(editor, prefix + format);
      }}
    >
      {icon}
    </Button>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "You can delete images with the cross in the top left. Try deleting this sheep:",
      },
    ],
  },
  {
    type: "image",
    url: "https://source.unsplash.com/zOwZKwZOZq8",
    children: [{ text: "" }],
  },
];

export default ImagesExample;
