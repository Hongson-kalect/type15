import { ScoreType } from "@/interface/type/typing";
import { mainLayoutStore } from "@/store/mainLayout.store";
import axios from "axios";
import { toast } from "react-toastify";
export const addSpeedTestScore = async ({ score }: { score: ScoreType }) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = { ...score, type: "speed-test", userId: userId };
    const res = await axios.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("failed to add score");
  }
};

export const addTrainingScore = async ({ score }: { score: ScoreType }) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = { ...score, type: "training", userId: userId };
    const res = await axios.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("failed to add score");
  }
};

export const addParagraphScore = async ({ score }: { score: ScoreType }) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = { ...score, type: "paragraph", userId: userId };
    const res = await axios.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("failed to add score");
  }
};

export const getScores = async ({
  page,
}: {
  page: "training" | "speed-test" | "paragraph";
}) => {
  const res = await axios.get(`/api/score`, { params: { type: page } });
  return res.data;
};
