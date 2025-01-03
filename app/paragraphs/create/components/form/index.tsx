import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddParagraphValue } from "@/interface/type/paragraph";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { UseMutateFunction } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";

export interface ICreateParaFormProps {
  createParagraph: UseMutateFunction<
    unknown,
    Error,
    AddParagraphValue,
    unknown
  >;
}

export default function CreateParaForm(props: ICreateParaFormProps) {
  const { userInfo } = mainLayoutStore();
  const [paraValue, setParaValue] = React.useState<AddParagraphValue>({
    title: "",
    content: "",
    desc: "",
    ps: "",
  });

  const handleCreate = () => {
    if (!userInfo?.id) return toast.error("Please login to use this function");
    props.createParagraph(paraValue);
  };
  return (
    <div className="bg-white p-4 rounded-lg flex-1">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={paraValue.title}
            onChange={(e) =>
              setParaValue({ ...paraValue, title: e.target.value })
            }
            className="mt-1 w-full rounded-md  sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="content"
          >
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            value={paraValue.content}
            onChange={(e) =>
              setParaValue({ ...paraValue, content: e.target.value })
            }
            rows={5}
            className="mt-1 rounded-md sm:text-sm"
          ></Textarea>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="desc"
          >
            Description
          </label>
          <Textarea
            id="desc"
            name="desc"
            value={paraValue.desc}
            onChange={(e) =>
              setParaValue({ ...paraValue, desc: e.target.value })
            }
            rows={3}
            className="mt-1 w-full rounded-md sm:text-sm"
          ></Textarea>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="ps"
          >
            P/S
          </label>
          <Input
            type="text"
            id="ps"
            name="ps"
            value={paraValue.ps}
            onChange={(e) => setParaValue({ ...paraValue, ps: e.target.value })}
            className="mt-1 w-full rounded-md sm:text-sm"
          />
        </div>
        <div>
          <Button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus />
            Add Paragraph
          </Button>
        </div>
      </form>
    </div>
  );
}
