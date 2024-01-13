import React, { useMemo, ReactNode, useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BaseNotification } from '@app/components/common/BaseNotification/BaseNotification';
import { capitalize } from '@app/utils/utils';
import { Mention, Notification as NotificationType } from 'api/notifications.api';
import { notificationsSeverities } from 'constants/notificationsSeverities';
import * as S from './NotificationsOverlay.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { TNotifyItemState } from '@app/api/notifications/type';
import { useQuery } from '@tanstack/react-query';
import NotificationAPI from '@app/api/notifications';
import { Spin, message } from 'antd';
import { UserItemTypes } from '@app/api/users/type';
import { useSelector } from 'react-redux';
import { NotificationsTypes } from '@app/components/profile/profileCard/profileFormNav/nav/notifications/NotificationsTypes/NotificationsTypes';

interface NotificationsOverlayProps {
  notifications: NotificationType[];
  setNotifications: (state: NotificationType[]) => void;
}

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({
  notifications,
  setNotifications,
  ...props
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);
  const [notify, setNotify] = useState<TNotifyItemState[]>([]);
  const { isLoading, refetch } = useQuery(['get-notifications'], NotificationAPI.getNotificationsList, {
    enabled: false,
    onSuccess: (response: TNotifyItemState[]) => {
      const notificationsUser = response.filter((notify) => notify.userId === userProfileState?.userId);
      setNotify(notificationsUser);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get notifications list',
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [userProfileState]);

  return (
    <S.NoticesOverlayMenu {...props}>
      {contextHolder}
      <Spin spinning={isLoading}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            {notify.length > 0 ? (
              <BaseSpace direction="vertical" size={10} split={<S.SplitDivider />}>
                {notify.map((notification, index) => {
                  return (
                    <BaseNotification
                      key={index}
                      type={'info'}
                      title={notification.notificationName}
                      description={notification.content}
                    />
                  );
                })}
              </BaseSpace>
            ) : (
              <S.Text>{t('header.notifications.noNotifications')}</S.Text>
            )}
          </BaseCol>
          {/* <BaseCol span={24}>
            <BaseRow gutter={[10, 10]}>
              {notifications.length > 0 && (
                <BaseCol span={24}>
                  <S.Btn type="ghost" onClick={() => setNotifications([])}>
                    {t('header.notifications.readAll')}
                  </S.Btn>
                </BaseCol>
              )}
              <BaseCol span={24}>
                <S.Btn type="link">
                  <Link to="/">{t('header.notifications.viewAll')}</Link>
                </S.Btn>
              </BaseCol>
            </BaseRow>
          </BaseCol> */}
        </BaseRow>
      </Spin>
    </S.NoticesOverlayMenu>
  );
};
