import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseNotification } from '@app/components/common/BaseNotification/BaseNotification';
import * as S from './NotificationsOverlay.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import NotificationAPI from '@app/api/notifications';
import { NotificationItemResponse } from '@app/api/notifications/type';

export const NotificationsOverlay: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationItemResponse[]>([]);
  const { isLoading: isLoadingNotifications, refetch: refetchNotifications } = useQuery(
    ['notifications'],
    NotificationAPI.getNotificationsList,
    {
      enabled: false,
      onSuccess: (response: NotificationItemResponse[]) => setNotifications(response),
    },
  );

  useEffect(() => {
    refetchNotifications();
  }, []);

  return (
    <S.NoticesOverlayMenu>
      <Spin spinning={isLoadingNotifications}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            {notifications.length > 0 ? (
              <BaseSpace className="w-full relative " direction="vertical" size={10} split={<S.SplitDivider />}>
                {notifications.map((notification, index) => {
                  return (
                    <BaseNotification
                      key={index}
                      type={'info'}
                      title={notification.title}
                      description={notification.content}
                      time={notification.createdTime}
                      isRead={notification.isRead}
                    />
                  );
                })}
              </BaseSpace>
            ) : (
              <S.Text>{t('header.notifications.noNotifications')}</S.Text>
            )}
          </BaseCol>
        </BaseRow>
      </Spin>
    </S.NoticesOverlayMenu>
  );
};
