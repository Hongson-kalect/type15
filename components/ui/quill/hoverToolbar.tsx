import { css } from "@emotion/css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Descendant, Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";

import { Button, Icon, Menu, Portal } from "./components";
import { Bold, Italic, Underline } from "lucide-react";

export const HoveringToolbar = ({
  slate,
  setSelectionState,
}: {
  slate: Descendant[];
  setSelectionState: Dispatch<
    SetStateAction<{
      color: string;
      background: string;
      align: string;
      font: string;
    }>
  >;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();
  const coloringIcon = (selection) => {
    console.log("slate :>> ", slate);
    if (!selection) return;

    const startPointArray = slate[selection.anchor.path[0]];
    const startPoint = startPointArray?.children?.[selection.anchor.path[1]];

    if (startPoint) {
      let color = "#000";
      let bg = "#000";
      let font = "system-ui";
      let align = "left";
      Object.entries(startPoint).map(([key]) => {
        if (key.startsWith("color-")) {
          color = key.split("-")[1];
        }
        if (key.startsWith("bg-")) {
          bg = key.split("-")[1];
        }
        if (key.startsWith("font-")) {
          font = key.split("-")[1];
        }
        if (key.startsWith("align-")) {
          align = key.split("-")[1];
        }
      });

      const obj = {
        color,
        background: bg,
        font,
        align,
      };

      setSelectionState((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(obj)) return prev;
        return obj;
      });
      // Object.entries(startPoint).find(([key]) => {});
      // const colorIcon = document.querySelector(
      //   ".quill-text-color"
      // ) as HTMLDivElement;
      // const backgroundIcon = document.querySelector(
      //   ".quill-background-color"
      // ) as HTMLDivElement;

      // if (colorIcon) {
      //   colorIcon.style.color = color || "#000";
      // }

      // if (backgroundIcon) {
      //   backgroundIcon.style.color = bg || "#000";
      // }
    }
  };

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    coloringIcon(selection);

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
          display: flex;
          align-items: center;
          gap: 8px;
        `}
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <FormatButton format="bold" icon={<Bold size={16} />} />
        <FormatButton format="italic" icon={<Italic size={16} />} />
        <FormatButton format="underline" icon={<Underline size={16} />} />
      </Menu>
    </Portal>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isMarkActive(editor, format)}
      onClick={() => toggleMark(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
