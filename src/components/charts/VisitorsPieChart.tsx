import { TotalWorkoutItem } from "@app/api/statistic/types";
import { BaseCard } from "@app/components/common/BaseCard/BaseCard";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart } from "../common/charts/PieChart";

type PieChartProps = {
  totalWorkout: TotalWorkoutItem[];
};

export const VisitorsPieChart: React.FC<PieChartProps> = ({ totalWorkout }) => {
  const { t } = useTranslation();

  const name = t("charts.visitorsFrom");

  const convertPieChart = useMemo(
    () =>
      totalWorkout.length > 0 &&
      totalWorkout.map((item) => {
        return {
          value: item.totalWorkout,
          name: item.yearMonth,
        };
      }),
    [totalWorkout]
  );

  return (
    <BaseCard title={"Total Workouts"}>
      <PieChart data={convertPieChart} name={name} showLegend={true} />
    </BaseCard>
  );
};
