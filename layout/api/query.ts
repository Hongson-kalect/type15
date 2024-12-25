import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { UserSessionDTO } from "./dto";

export const useGetUser = (session: UserSessionDTO) => {
  useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(session),
  });
};
export const useGetLanguages = (session: UserSessionDTO) => {
  useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(session),
  });
};
