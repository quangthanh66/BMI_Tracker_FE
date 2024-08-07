import { StatisticAPI } from "@app/api/statistic";
import {
  TotalAdvisor,
  TotalCommissionSummary,
  TotalMenuItem,
  TotalSubscriptionItem,
  TotalWorkoutItem,
} from "@app/api/statistic/types";
import { VisitorsPieChart } from "@app/components/charts/VisitorsPieChart";
import { BaseCard } from "@app/components/common/BaseCard/BaseCard";
import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { Card, Spin, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const ChartsPage: React.FC = () => {
  const { t } = useTranslation();
  const [totalWorkout, setTotalWorkout] = useState<TotalWorkoutItem[]>([]);
  const [totalSubscription, setTotalSubscription] = useState<
    TotalSubscriptionItem[]
  >([]);
  const [totalMenu, setTotalMenu] = useState<TotalMenuItem[]>([]);
  const [totalCommission, setTotalCommission] = useState<
    TotalCommissionSummary[]
  >([]);

  const [totalAdvisorMember, setTotalAdvisorMember] = useState<TotalAdvisor>();

  const { isLoading: isLoadingTotalWorkout, refetch: getTotalWorkout } =
    useQuery(["total-workout"], StatisticAPI.getTotalWorkout, {
      enabled: false,
      onSuccess: (response: TotalWorkoutItem[]) => {
        setTotalWorkout(response);
      },
    });

  const {
    isLoading: isLoadingTotalSubscription,
    refetch: getTotalSubscription,
  } = useQuery(["total-subscription"], StatisticAPI.getTotalSubscription, {
    enabled: false,
    onSuccess: (response: TotalSubscriptionItem[]) => {
      setTotalSubscription(response);
    },
  });

  const { isLoading: isLoadingTotalMenu, refetch: getTotalMenu } = useQuery(
    ["total-menu"],
    StatisticAPI.getTotalMenu,
    {
      enabled: false,
      onSuccess: (response: TotalMenuItem[]) => {
        setTotalMenu(response);
      },
    }
  );

  const { isLoading: isLoadingCommissionSummary, refetch: getTotalCommission } =
    useQuery(["total-commission"], StatisticAPI.getTotalCommissionSummary, {
      enabled: false,
      onSuccess: (response: TotalCommissionSummary[]) => {
        setTotalCommission(response);
      },
    });

  const { isLoading: isLoadingTotalAdvisor, refetch: getTotalAdvisor } =
    useQuery(["total-advisor"], StatisticAPI.getTotalAdvisorMember, {
      enabled: false,
      onSuccess: (response: TotalAdvisor) => {
        setTotalAdvisorMember(response);
      },
    });

  useEffect(() => {
    getTotalWorkout();
    getTotalSubscription();
    getTotalMenu();
    getTotalCommission();
    getTotalAdvisor();
  }, []);

  console.log(totalSubscription);

  return (
    <Spin
      spinning={
        isLoadingTotalWorkout ||
        isLoadingTotalSubscription ||
        isLoadingTotalMenu ||
        isLoadingCommissionSummary ||
        isLoadingTotalAdvisor
      }
    >
      <PageTitle>{t("common.charts")}</PageTitle>

      <div className="grid grid-cols-2 gap-6 w-full ">
        <div className="grid grid-cols-2 gap-6">
          <Card
            size="small"
            className="flex  items-center justify-between gap-2 bg-white text-black max-h-[150px]"
          >
            <div className="flex flex-col gap-y-4 justify-between">
              <h6 className="">Total Advisor</h6>
              <h1 className="text-[32px]">{totalAdvisorMember?.totalAvisor}</h1>
            </div>
          </Card>
          <Card
            size="small"
            className="flex  items-center justify-between gap-2 bg-white text-black max-h-[150px]"
          >
            <div className="flex flex-col gap-y-4 justify-between">
              <h6>Total Members</h6>
              <h1 className="text-[32px]">{totalAdvisorMember?.totalMember}</h1>
            </div>
          </Card>
        </div>

        <div />

        {totalWorkout.length > 0 && (
          <VisitorsPieChart totalWorkout={totalWorkout} />
        )}
        {totalCommission.length > 0 && (
          <BaseCard title="Total Commission" className="!p-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={[...totalCommission].reverse()}
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
                <Area
                  type="monotone"
                  dataKey="totalCommission"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </BaseCard>
        )}

        {totalMenu.length > 0 && (
          <BaseCard title="Total Menu" className="p-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={[...totalMenu].reverse()}
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
                  <Line
                    type="monotone"
                    dataKey="totalMenu"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BaseCard>
        )}

        {totalSubscription.length > 0 && (
          <BaseCard title="Total Subscription" className="p-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={[...totalSubscription].reverse()}
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
                  <Bar
                    dataKey="totalSubscription"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </BaseCard>
        )}
      </div>
    </Spin>
  );
};

export default ChartsPage;
