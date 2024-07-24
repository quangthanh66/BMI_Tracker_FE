import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VisitorsPieChart } from '@app/components/charts/VisitorsPieChart';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useQuery } from '@tanstack/react-query';
import { StatisticAPI } from '@app/api/statistic';
import { Spin } from 'antd';
import {
  TotalCommissionSummary,
  TotalMenuItem,
  TotalSubscriptionItem,
  TotalWorkoutItem,
} from '@app/api/statistic/types';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

const ChartsPage: React.FC = () => {
  const { t } = useTranslation();
  const [totalWorkout, setTotalWorkout] = useState<TotalWorkoutItem[]>([]);
  const [totalSubscription, setTotalSubscription] = useState<TotalSubscriptionItem[]>([]);
  const [totalMenu, setTotalMenu] = useState<TotalMenuItem[]>([]);
  const [totalCommission, setTotalCommission] = useState<TotalCommissionSummary[]>([]);

  const { isLoading: isLoadingTotalWorkout, refetch: getTotalWorkout } = useQuery(
    ['total-workout'],
    StatisticAPI.getTotalWorkout,
    {
      enabled: false,
      onSuccess: (response: TotalWorkoutItem[]) => {
        setTotalWorkout(response);
      },
    },
  );

  const { isLoading: isLoadingTotalSubscription, refetch: getTotalSubscription } = useQuery(
    ['total-subscription'],
    StatisticAPI.getTotalSubscription,
    {
      enabled: false,
      onSuccess: (response: TotalSubscriptionItem[]) => {
        setTotalSubscription(response);
      },
    },
  );

  const { isLoading: isLoadingTotalMenu, refetch: getTotalMenu } = useQuery(['total-menu'], StatisticAPI.getTotalMenu, {
    enabled: false,
    onSuccess: (response: TotalMenuItem[]) => {
      setTotalMenu(response);
    },
  });

  const { isLoading: isLoadingCommissionSummary, refetch: getTotalCommission } = useQuery(
    ['total-commission'],
    StatisticAPI.getTotalCommissionSummary,
    {
      enabled: false,
      onSuccess: (response: TotalCommissionSummary[]) => {
        setTotalCommission(response);
      },
    },
  );

  useEffect(() => {
    getTotalWorkout();
    getTotalSubscription();
    getTotalMenu();
    getTotalCommission();
  }, []);

  return (
    <Spin
      spinning={isLoadingTotalWorkout || isLoadingTotalSubscription || isLoadingTotalMenu || isLoadingCommissionSummary}
    >
      <PageTitle>{t('common.charts')}</PageTitle>
      <BaseRow gutter={[30, 30]}>
        <BaseCol id="total-menu" xs={24} lg={12}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={totalMenu}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalMenu" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </BaseCol>

        <BaseCol xs={24} lg={12}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={totalCommission}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="totalCommission" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </BaseCol>

        <BaseCol id="pie" xs={24} lg={12}>
          <VisitorsPieChart totalWorkout={totalWorkout} />
        </BaseCol>

        <BaseCol id="line-race" xs={24} lg={12}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={totalSubscription}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalSubscription"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />{' '}
            </BarChart>
          </ResponsiveContainer>
        </BaseCol>
      </BaseRow>
    </Spin>
  );
};

export default ChartsPage;
