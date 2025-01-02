import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import * as React from "react";

export interface ICreateParaFormProps {}

export default function CreateParaForm(props: ICreateParaFormProps) {
  return (
    <div className="bg-white p-4 rounded-lg flex-1">
      <form className="space-y-4">
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
            rows={5}
            className="mt-1 rounded-md sm:text-sm"
          ></Textarea>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
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
