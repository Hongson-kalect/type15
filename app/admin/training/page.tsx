"use client";

import { getTrainingService } from "@/services/training.service";
import * as React from "react";
import TrainingMain from "./components/main";
import { useQuery } from "@tanstack/react-query";
import TrainingMenu from "./components/menu";

export default function DefaultPage() {
  const { data: trainings } = useQuery({
    queryKey: ["trainings"],
    queryFn: async () => await getTrainingService(),
  });

  return (
    <div className="py-4 flex-1 flex px-6 gap-4 overflow-auto">
      <TrainingMain />
      <TrainingMenu trainingList={trainings} />
    </div>
  );
}
