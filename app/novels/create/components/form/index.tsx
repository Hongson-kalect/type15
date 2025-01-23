import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddNovelValue } from "@/interface/type/novel";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { UseMutateFunction } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";

export interface ICreateParaFormProps {
  createNovel: UseMutateFunction<unknown, Error, AddNovelValue, unknown>;
}

export default function CreateParaForm(props: ICreateParaFormProps) {
  const { userInfo } = mainLayoutStore();
  const [novelValue, setParaValue] = React.useState<AddNovelValue>({
    name: "",
    desc: "",
  });

  const handleCreate = () => {
    if (!userInfo?.id) return toast.error("Please login to use this function");
    props.createNovel(novelValue);
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
            htmlFor="name"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={novelValue.name}
            onChange={(e) =>
              setParaValue({ ...novelValue, name: e.target.value })
            }
            className="mt-1 w-full rounded-md  sm:text-sm"
          />
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
            value={novelValue.desc}
            onChange={(e) =>
              setParaValue({ ...novelValue, desc: e.target.value })
            }
            rows={3}
            className="mt-1 w-full rounded-md sm:text-sm"
          ></Textarea>
        </div>
        <div>
          <Button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus />
            Add Novel
          </Button>
        </div>
      </form>
    </div>
  );
}
