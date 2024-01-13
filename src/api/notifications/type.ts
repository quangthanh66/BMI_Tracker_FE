export type TNotifyItemState = {
  notificationId: string;
  notificationName: string;
  content: string;
  type: 'available-noti' | 'hidden';
  status: string;
  userId: string;
};

export type TAddNewNotifyState = {
  notificationName: string;
  content: string;
  userId: string;
  type: number;
};

export type TUpdateNotifyState = {
  notiId: string;
  notificationName: string;
  content: string;
  type: number;
};
