import React from "react";
import "antd/dist/antd.css";
import "./index.scss";

export interface DisplayProps {
  label: string;
  value: string;
}

export default (props: DisplayProps) => {
  const { label, value } = props;
  return (
    // use BEM for global components
    <div className="display-info">
      <div className="display-info__label">{label}: </div>
      <div className="display-info__value">{value || "-"}</div>
    </div>
  );
};
