import { ITraining } from "@/interface/schema/schema.interface";

export const createMenuList = (trainings: ITraining[]) => {
  const data: ITraining[] = [];

  trainings
    .sort((a, b) => a?.title?.localeCompare(b?.title))
    .map((item: ITraining) => {
      if (item?.parentId) {
        const parent = trainings.find(
          (parent: ITraining) => item.parentId === parent.id
        );
        if (parent) {
          if (!parent?.children) parent.children = [];

          parent.children.push(item);
        }
      } else {
        data.push(item);
      }
    });
  return data.sort((a, b) => a?.title?.localeCompare(b?.title));
};
