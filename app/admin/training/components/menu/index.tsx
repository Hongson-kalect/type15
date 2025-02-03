"use client";

import * as React from "react";
import { ITraining } from "@/interface/schema/schema.interface";
import { useTrainingStore } from "@/store/training.store";
import useAppParams from "@/hooks/useAppParam";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMenuList } from "../../utils";
import { Plus, PlusCircle } from "lucide-react";

export interface ITrainingMenuProps {
  trainingList: ITraining[];
}

export default function TrainingMenu({ trainingList }: ITrainingMenuProps) {
  //   const { selectedTraining, setSelectedTraining, setIsAdd, isAdd } =
  const { selectedTraining, setSelectedTraining, setIsAdd, isAdd } =
    useTrainingStore();
  const [menu, setMenu] = React.useState<ITraining[]>([]);

  const params = useAppParams();

  // Get the 'id' parameter
  const id = params("id");
  const trainingId = params("trainingId");

  const handleAddTraining = (item?: ITraining) => {
    setIsAdd(true);
    setSelectedTraining(
      item || {
        title: "",
        content: "",
        qill: "",
      }
    );
  };

  React.useEffect(() => {
    if (trainingList?.length) setMenu(createMenuList(trainingList));
  }, [trainingList]);

  React.useEffect(() => {
    if (trainingId && trainingList) {
      const training = trainingList.find(
        (item) => item.id === Number(trainingId)
      );
      if (training) {
        setSelectedTraining(training);
      }
      setSelectedTraining(training);
    }
  }, [trainingId, trainingList]);

  const renderItem = (item: ITraining, navIndex: number = 0) => {
    const selected = selectedTraining?.id === item?.id;
    // let navIndex = 0;

    // if (item.children?.length > 0) {
    if (!item.children || !item.children.length) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            params("trainingId", item?.id?.toString());
            setIsAdd(false);
            setSelectedTraining(item);
          }}
          className={`px-2 !py-2  cursor-pointer ${
            navIndex === 0
              ? "text-blue-800  hover:bg-orange-100 font-bold text-lg py-4"
              : navIndex === 1
              ? "text-orange-600  hover:bg-gray-100 font-medium text-base py-2"
              : "text-gray-600  hover:bg-slate-100 text-sm py-1"
          } ${selected ? "bg-blue-200 " : ""}`}
        >
          <p>{item.title}</p>
          <div
            className="hover:opacity-100 duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdd(true);
              setSelectedTraining(item);
            }}
          >
            <PlusCircle className="opacity-70" />
          </div>
        </div>
      );
    }

    return (
      <AccordionItem value={`item-${item.id}`}>
        <AccordionTrigger
          onClick={(e) => {
            e.stopPropagation();
            setIsAdd(false);
            params("trainingId", item?.id?.toString());
            setSelectedTraining(item);
          }}
          className={`px-2 py-2 ${
            navIndex === 0
              ? "text-blue-800 font-bold text-lg"
              : navIndex === 1
              ? "text-orange-600 font-medium text-base"
              : "text-gray-600 text-sm"
          } ${selected ? "bg-blue-200 " : ""}`}
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="px-2">
          {item.children?.map((item, index) => {
            return (
              <div
                className=""
                style={{ borderLeft: "1px solid #ccc" }}
                key={index}
              >
                {renderItem(item, navIndex + 1)}
              </div>
            );
          })}
          <div
            onClick={() => handleAddTraining(item)}
            className={`py-1 hover:opacity-100 duration-200 cursor-pointer italic pl-2 flex gap-2 items-center opacity-80 ${
              navIndex === 0
                ? " text-orange-600 hover:bg-orange-100 text-sm"
                : navIndex === 1
                ? " text-gray-600 hover:bg-gray-100 text-xs"
                : " text-gray-400 hover:bg-slate-100 text-[10px]"
            }`}
          >
            <Plus />
            <p>Add menu</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="bg-white  px-2 py-1 overflow-auto w-[320px] rounded-lg h-full">
      {/* <div className="text-xl font-light">Training Menu</div> */}

      <Accordion
        type="multiple"
        // collapsible={true}
        className=" bg-white px-4 py-3 rounded-lg h-full overflow-auto"
      >
        <h2 className="text-center border-b text-xl pb-2 mb-3">
          Training menu
        </h2>
        {!menu ? (
          <div>Loading...</div>
        ) : (
          menu?.map((item, index) => {
            if (item?.parentId) return;
            return <div key={index}>{renderItem(item, 0)}</div>;
          })
        )}

        <div
          onClick={() => handleAddTraining()}
          className="text-blue-800 font-bold text-lg py-4 flex gap-2 items-center italic opacity-60 cursor-pointer hover:opacity-100 duration-200"
        >
          <PlusCircle />
          <p>Add Training</p>
        </div>
      </Accordion>

      {/* <Accordion type="multiple" className="mt-3">
        {menu.map((item) => {
          return renderItem(item);
        })}
      </Accordion> */}
    </div>
  );
}
