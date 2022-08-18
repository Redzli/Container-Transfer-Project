// @ts-nocheck
import React, { useState, useMemo, useCallback } from "react";
import Tree from "react-d3-tree";
import { version } from "react-d3-tree/package.json";
import treeData from "./tree-data.json";
import { getContainerInfo } from "./apis/apis";
import { Modal } from "antd";
import ContainerInfoModal from "./components/container-info-modal/index";
import {
  GetContainerInfoRequest,
  GetContainerInfoResponse,
} from "../api-definition";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

interface CustomNodeDatum extends RawNodeDatum {
  id?: number;
}

const App = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [containerId, setContainerId] = useState<number | string>(0);
  const [containerData, setContainerData] = useState<any>();

  const getContainerData = (node: RawNodeDatum) => {
    console.log("YOYOYOYOYO", node);
    if (!node.data?.id) return;
    const data = getContainerInfo({ id: node.data?.id });
    setContainerData(data);
    setVisible(true);
  };

  return (
    <div className="container">
      <Tree
        // onNodeMouseOver={(node, evt) => {
        // console.log('onNodeMouseOver' );
        // }}
        onNodeClick={getContainerData}
        data={treeData}
      />

      <Modal
        title="Container Information"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <ContainerInfoModal data={containerData} />
      </Modal>
    </div>
  );
};

export default App;
