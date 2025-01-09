export type MessageType = {
  message: string;
  userId: number;
  targetField?: string;
  targetColumn?: number;
  createdAt?: Date;
};
