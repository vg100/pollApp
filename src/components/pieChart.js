import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function Pie(props) {
  return (
    <PieChart
      animate={true}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
      background={String}
      data={props.data}
    />
  );
}
