import { ITraining } from "@/interface/schema/schema.interface";
import { create } from "zustand";

type IStrainingStore = {
  selectedTraining?: ITraining;
  setSelectedTraining: (training?: ITraining) => void;
  isAdd: boolean;
  setIsAdd: (isAdd: boolean) => void;
};

export const useTrainingStore = create<IStrainingStore>((set) => ({
  selectedTraining: undefined,
  setSelectedTraining: (training) =>
    set(() => {
      if (!training) return { selectedTraining: undefined };
      return { selectedTraining: { ...training } };
    }),

  isAdd: false,
  setIsAdd: (isAdd) => set(() => ({ isAdd })),
}));
