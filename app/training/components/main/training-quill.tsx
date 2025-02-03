import * as React from "react";

export interface ITrainingQuillProps {
  quill: string;
}

export default function TrainingQuill(props: ITrainingQuillProps) {
  return (
    <div className="mt-4 mb-2 bg-white px-4 py-2 rounded-lg shadow">
      <div dangerouslySetInnerHTML={{ __html: props.quill }} />
    </div>
  );
}
