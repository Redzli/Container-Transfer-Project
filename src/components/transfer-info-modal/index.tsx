// @ts-nocheck

import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import DisplayInfo, { DisplayProps } from "../display-info";
import { TreeNodeProps } from "antd";
import { TreeLinkDatum } from "react-d3-tree/lib/types/common";

interface IProps {
  data: TreeLinkDatum[];
}

const ContainerInfoModal = (props: IProps) => {
  const { data } = props;
  const {} = data[0];

  // const displayData: DisplayProps[] = [
  //   {
  //     label: "Tranfer ID",
  //     value: id,
  //   },
  //   {
  //     label: "Destination Container ID",
  //     value: operator_note,
  //   },
  //   {
  //     label: "Container Type ID",
  //     value: container_type_id,
  //   },
  //   {
  //     label: "Solution Name",
  //     value: solution_name,
  //   },
  //   {
  //     label: "Solution Initial Volume in ml",
  //     value: solution_initial_volume_mL,
  //   },
  //   {
  //     label: "Inventory Location",
  //     value: inventory_location,
  //   },
  //   {
  //     label: "Solution Description",
  //     value: solution_description,
  //   },
  // ];

  if (!data) return null;

  // return displayData.map((data: DisplayProps) => {
  //   return <DisplayInfo label={data.label} value={data.value} />;
  // });
};

export default ContainerInfoModal;
