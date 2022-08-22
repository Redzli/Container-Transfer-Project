import React from "react";
import "antd/dist/antd.css";
import DisplayInfo, { DisplayProps } from "../../display-info";
import styles from "./index.module.scss";

interface IProps {
  transferData: any;
}

const TransferTooltip = (props: IProps) => {
  const { transferData } = props;

  const displayData: DisplayProps[] = [
    {
      label: "Transfer ID",
      value: transferData?.id,
    },
    {
      label: "Destination Container ID",
      value: transferData?.target,
    },
    {
      label: "Source Container ID",
      value: transferData?.source,
    },
    {
      label: "Amount Transferred Unit",
      value: transferData?.amount_transferred_unit,
    },
    {
      label: "Amount Transferred",
      value: transferData?.amount_transferred,
    },
  ];

  return (
    <div className={styles.container}>
      {displayData?.map((data: DisplayProps) => {
        return (
          <DisplayInfo key={data.label} label={data.label} value={data.value} />
        );
      })}
    </div>
  );
};

export default TransferTooltip;
