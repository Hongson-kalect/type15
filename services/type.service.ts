import { ScoreType } from "@/interface/type/typing";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { toast } from "react-toastify";
import api from "./axios.instance";
export const addSpeedTestScore = async ({
  score,
}: {
  score: ScoreType;
  targetId?: number;
}) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    const languageId = mainLayoutStore.getState().userInfo?.languageId;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = { ...score, type: "speed-test", userId, languageId };
    const res = await api.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    toast.error("failed to add score");
  }
};

export const addTrainingScore = async ({
  score,
  targetId,
}: {
  score: ScoreType;
  targetId?: number;
}) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    const languageId = mainLayoutStore.getState().userInfo?.languageId;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = {
      ...score,
      type: "training",
      userId,
      languageId,
      targetId,
    };
    const res = await api.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    toast.error("failed to add score");
  }
};

export const addParagraphScore = async ({
  score,
  targetId,
}: {
  score: ScoreType;
  targetId?: number;
}) => {
  try {
    const userId = mainLayoutStore.getState().userInfo?.id;
    const languageId = mainLayoutStore.getState().userInfo?.languageId;
    // if(!userId) return //cái này là nếu ko muốn người chưa đăng nhập cùng có thể lưu lại kết quả
    const paraScore = {
      ...score,
      type: "paragraph",
      userId,
      languageId,
      targetId,
    };
    const res = await api.post(`/api/score`, paraScore);
    return res.data;
  } catch (e) {
    toast.error("failed to add score");
  }
};

export const getScores = async ({
  page,
  id,
}: {
  page: "training" | "speed-test" | "paragraph";
  id?: number;
}) => {
  const res = await api.get(`/api/score`, {
    params: { type: page, targetId: id },
  });
  return res.data;
};
