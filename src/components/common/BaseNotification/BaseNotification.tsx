import React from 'react';
import * as S from './BaseNotification.styles';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@app/utils/constant';

export type NotificationType = 'info' | 'mention' | 'success' | 'warning' | 'error';

interface BaseNotificationProps {
  type: NotificationType;
  title: React.ReactNode;
  description?: React.ReactNode;
  mentionIconSrc?: React.ReactNode;
  time: string;
  isRead: boolean;
}

export const BaseNotification: React.FC<BaseNotificationProps> = ({ title, description, time, isRead }) => {
  return (
    <button className="w-full flex flex-col gap-y-4 bg-transparent border-none outline-none p-2 ">
      <div className="flex items-center justify-between w-full">
        <S.Title>{title}</S.Title>
        <p className="text-gray-400 text-xs">{dayjs(time).format(DATE_TIME_FORMAT.FULL_DATE_TIME)}</p>
      </div>
      <S.Description>{description}</S.Description>

      {!isRead && <div className="absolute inset-0 bg-gray-500 opacity-20"></div>}
    </button>
  );
};
