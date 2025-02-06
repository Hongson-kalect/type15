import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { RenderElement, RenderLeaf, withImages } from "./slate-quill";
import { Editable, Slate, withReact } from "slate-react";
import { withChecklists } from "./checkList";

const SlateContentRenderer = ({ content }) => {
  const renderElement = useCallback(
    (props) => <RenderElement {...props} />,
    [content]
  );
  const renderLeaf = useCallback(
    (props) => <RenderLeaf {...props} />,
    [content]
  );
  const [editor] = useState(() => {
    return withImages(withChecklists(withReact(createEditor())));
  });

  return (
    <div className="slate-quill">
      <Slate key={content.length} editor={editor} initialValue={content}>
        <Editable
          className="outline-gray-300 px-1 py-2"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          readOnly
        />
      </Slate>
    </div>
  );
};

// Sử dụng SlateContentRenderer trong ứng dụng React của bạn
const SlateQuill = ({ content }: { content: any[] }) => {
  return (
    // <div className="bg-white">
    <SlateContentRenderer content={content} />
    // </div>
  );
};

export default SlateQuill;
