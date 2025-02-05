"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTrainingStore } from "@/store/training.store";
import { ITraining } from "@/interface/schema/schema.interface";
import {
  createTrainingService,
  deleteTrainingService,
  updateTrainingService,
} from "@/services/training.service";
import Editor from "@/components/ui/quill";
import SlateEditor from "@/components/ui/quill/slate-quill";

export default function TrainingModify() {
  const queryClient = useQueryClient();
  // const Editor = React.useMemo(
  //   () => React.lazy(() => import("@/components/ui/quill")),
  //   []
  // );
  const { selectedTraining, isAdd, setIsAdd, setSelectedTraining } =
    useTrainingStore();

  const [modifyTraining, setModifyTraining] = React.useState<
    ITraining | undefined
  >({
    title: "",
    content: "",
    qill: "",
  });

  const refreshTraining = async () => {
    await queryClient.refetchQueries({
      queryKey: ["trainings"],
    });
  };

  const deleteTrainingMutation = useMutation({
    mutationFn: async () => deleteTrainingService({ id: selectedTraining?.id }),
    mutationKey: ["deleteTraining"],
    onSuccess: () => {
      refreshTraining();
      setIsAdd(false);
      setSelectedTraining(undefined);
    },
  });

  const createTrainingMutation = useMutation<ITraining>({
    mutationFn: async () => {
      const parentId = selectedTraining.id;
      return createTrainingService({
        trainingInfo: { ...modifyTraining, parentId },
      });
    },
    mutationKey: ["createTraining"],
    onSuccess: (data) => {
      refreshTraining();
      setIsAdd(false);
      setSelectedTraining(data);
      toast.success("Create training success");
    },
  });

  const updateTrainingMutation = useMutation<ITraining>({
    mutationFn: async () =>
      updateTrainingService({ trainingInfo: { ...modifyTraining } }),
    mutationKey: ["updateTraining"],
    onSuccess: (data) => {
      refreshTraining();
      setSelectedTraining(data);
      toast.success("Update training success");
    },
  });

  const handleModifyTraining = async () => {
    if (isAdd) {
      createTrainingMutation.mutate();
    } else {
      if (!selectedTraining) return toast.error("Chưa chọn training");
      updateTrainingMutation.mutate();
    }
    // refreshTraining()
  };

  const handleDeleteTraining = async () => {
    if (selectedTraining) {
      deleteTrainingMutation.mutate();
    }
  };

  React.useEffect(() => {
    if (isAdd) {
      setModifyTraining({
        // ...modifyTraining,
        title: "",
        content: "",
        qill: "",
      });
    } else {
      setModifyTraining({ ...selectedTraining });
    }
  }, [selectedTraining]);

  console.log("selectedTraining :>> ", selectedTraining);

  if (!isAdd && !selectedTraining)
    return (
      <div className="flex-1 bg-white px-4 py-3 rounded-lg">
        Please select a training
      </div>
    );

  return (
    <div className="flex-1 bg-white px-4 py-3 rounded-lg overflow-auto">
      <h2 className="text-center font-medium text-xl pb-2 mb-3">
        {isAdd ? "Add training" : "Edit training"}
      </h2>

      <div>
        <p>Training title</p>
        <Input
          className="text-lg font-medium text-gray-800"
          value={modifyTraining?.title || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, title: e.target.value };
              //   return { title: e.target.value };
            })
          }
        />
      </div>
      <div className="mt-3">
        <p>Training content</p>
        <Input
          value={modifyTraining?.content || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, content: e.target.value };
              //   return { content: e.target.value };
            })
          }
        />
      </div>
      <div className="mt-3">
        <p>Training quill</p>
        {/* <Editor
          value={modifyTraining?.qill || ""}
          onChange={(value) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, qill: value };
              //   return { qill: value };
            })
          }
        /> */}
        <SlateEditor />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          className={`${
            isAdd
              ? "bg-green-500 hover:bg-green-700"
              : "bg-orange-500 hover:bg-orange-700"
          }`}
          size={"lg"}
          onClick={handleModifyTraining}
        >
          {isAdd ? <BiPlus /> : <BiEdit />}
          {isAdd ? "Add training" : "Edit training"}
        </Button>
        {/* <Button
          className={`bg-red-500`}
          size={"lg"}
          onClick={handleDeleteTraining}
        >
          <MdDelete />
          {isAdd ? "Add training" : "Edit training"}
        </Button> */}
      </div>
    </div>
  );
}
