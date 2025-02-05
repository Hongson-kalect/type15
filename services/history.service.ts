import { HistoryDTO } from "@/interface/dto/history.dto";
import api from "./axios.instance";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { IHistory } from "@/interface/schema/schema.interface";
import { storage } from "@/constant/localStorage";

export const getHistoryService = async (
  params: HistoryDTO
): Promise<IHistory[]> => {
  const userId = mainLayoutStore.getState().userInfo?.id;
  if (!userId) return []; //Lấy lịch sử trong localstorage

  try {
    const res = await api.get("/api/history", {
      params: {
        ...params,
        userId,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử:", error);
    throw error; // Ném lỗi để component gọi hàm có thể xử lý
  }
};

export const createHistoryService = async (
  data: HistoryDTO
): Promise<IHistory> => {
  const userId = mainLayoutStore.getState().userInfo?.id;
  //   if (!userId) {
  //     //Hình như chưa đăng nhập thì userId = 0
  //     const historyJSON = localStorage.getItem(storage.history);
  //     const history: IHistory[] = historyJSON ? JSON.parse(historyJSON) : [];

  //     const matchHistory = history.find((h) => h.trainingId === data.trainingId);
  //     history.push({
  //       ...data,
  //       isDeleted: false,
  //       createdAt: new Date(),
  //       userId: 0,
  //     });
  //     localStorage.setItem(storage.history, JSON.stringify(history));
  //   }
  // Định thêm history cho người dùng chưa đăng nhập nhưng mà sợ nó quá dung lượng cúa localstorage
  if (!userId) return;
  try {
    const res = await api.post("/api/history", {
      ...data,
      userId: mainLayoutStore.getState().userInfo?.id,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tạo lịch sử:", error);
    throw error; // Ném lỗi để component gọi hàm có thể xử lý
  }
};

export const deleteHistoryService = async (
  historyId: string | number
): Promise<void> => {
  try {
    await api.delete(`/api/history/${historyId}`);
  } catch (error) {
    console.error("Lỗi khi xóa lịch sử:", error);
    throw error; // Ném lỗi để component gọi hàm có thể xử lý
  }
};
