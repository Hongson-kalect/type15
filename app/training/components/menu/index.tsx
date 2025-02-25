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

export interface ITrainingMenuProps {
  trainingList: ITraining[];
}

export default function TrainingMenu({ trainingList }: ITrainingMenuProps) {
  //   const { selectedTraining, setSelectedTraining, setIsAdd, isAdd } =
  const { selectedTraining, setSelectedTraining } = useTrainingStore();
  const [menu, setMenu] = React.useState<ITraining[]>([]);

  const params = useAppParams();

  // Get the 'id' parameter
  const id = params("id");
  const trainingId = params("trainingId");
  console.log("Current ID:", id);
  console.log("Current Training ID:", trainingId);

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

  React.useEffect(() => {
    const input = document.getElementById("input-text") as HTMLTextAreaElement;
    if (input) input.focus();
  }, [selectedTraining]);

  const renderItem = (item: ITraining, navIndex: number = 0) => {
    const selected = selectedTraining?.id === item?.id;
    if (!item.children || !item.children.length) {
      return (
        <div
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            params("trainingId", item?.id?.toString());
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
        </div>
      );
    }

    return (
      <AccordionItem key={item.id} value={`item-${item.id}`}>
        <AccordionTrigger
          onClick={(e) => {
            e.stopPropagation();
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
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="bg-white  px-2 py-1 overflow-auto w-[320px] rounded-lg h-full">
      <div className="text-xl font-light">Training Menu</div>

      <Accordion type="multiple" className="mt-3">
        {/* {menu.map((item) => {
          return renderItem(item);
        })} */}
        {menu.map((item) => {
          return renderItem(item);
        })}
      </Accordion>
    </div>
  );
}
