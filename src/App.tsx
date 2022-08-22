// @ts-nocheck
// file contents: renders the whole graph
import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  GraphView, // required
} from "react-digraph";
import { Modal, Button, Drawer } from "antd";
import { transferList, nodeList } from "./coding-challenge";
import ContainerInfoDrawer from "./components/container/container-info-drawer/index";
import "antd/dist/antd.css";
import TransferInfoDrawer from "./components/transfers/transfer-info-drawer";
import TransferEditModal from "./components/transfers/transfer-edit-modal";
import { OperationMode } from "./apis/api-definition";
import { GraphConfig } from "./utils";
import styles from "./index.module.scss";
import TransferTooltip from "./components/transfers/transfer-tooltip";

export const ContainerContext = createContext(null);
export const TransferContext = createContext(null);

const App = () => {
  // initial data to render nodes and edges
  const [nodes, setNodes] = useState<any>(nodeList);
  const [edges, setEdges] = useState<any>(transferList);

  // visibility to container information modal
  const [containerVisible, setContainerVisible] = useState<boolean>(false);
  // visibility to transfer information modal
  const [transferVisible, setTransferVisible] = useState<boolean>(false);
  // visibility to transfer creation modal
  const [transferModalVisible, setTransferModalVisible] = useState<boolean>(
    false
  );

  const [containerId, setContainerId] = useState<number>(-1);
  const [transferId, setTransferId] = useState<number>(-1);

  const [edgeConfig, setEdgeConfig] = useState({ left: -999, top: -999 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<any>({});

  // on selecting a node or an edge
  const onSelectNodeOrEdge = (node: any) => {
    // if node selected
    if (node.nodes) {
      // get the first key-value pair in the map
      const [id] = node.nodes.keys();
      setContainerId(id);
      setContainerVisible(true);
      return;
    }

    // if edge selected
    if (node.edges) {
      const [transferData] = node.edges.values();
      setTransferId(transferData?.id);
      setTransferVisible(true);
    }
  };

  // when hovering on edges
  const afterRenderEdge = (_, __, data, instance) => {
    instance.addEventListener("mouseenter", () => {
      const rect = instance.getBoundingClientRect();
      setEdgeConfig({ left: rect.left, top: rect.top });
      setTooltipVisible(true);
      setTooltipData(data);
    });

    instance.addEventListener("mouseleave", () => {
      setTooltipVisible(false);
    });
  };

  const tooltipStyle = useMemo(() => {
    return {
      zIndex: 12,
      position: "fixed",
      height: 200,
      width: 350,
      ...edgeConfig,
    };
  }, [edgeConfig]);

  return (
    <div className={styles.container}>
      {tooltipVisible && (
        <div id="tooltipEdges" style={tooltipStyle}>
          <TransferTooltip transferData={tooltipData} />
        </div>
      )}

      <Button
        onClick={() => setTransferModalVisible(true)}
        className={styles.transferButton}
      >
        {" "}
        Create Transfer
      </Button>

      {/* Graph */}
      <GraphView
        nodes={nodes}
        afterRenderEdge={afterRenderEdge}
        readOnly
        layoutEngineType="VerticalTree"
        edges={edges}
        edgeTypes={GraphConfig.EdgeTypes}
        nodeKey={"id"}
        allowMultiselect={false}
        nodeSubtypes={GraphConfig.NodeSubtypes}
        nodeTypes={GraphConfig.NodeTypes}
        onSelect={onSelectNodeOrEdge}
      />

      <ContainerContext.Provider value={setNodes}>
        <Drawer
          title="Container Information"
          visible={containerVisible}
          onClose={() => setContainerVisible(false)}
          destroyOnClose
        >
          <ContainerInfoDrawer nodes={nodes} containerId={containerId} />
        </Drawer>
      </ContainerContext.Provider>

      <TransferContext.Provider value={setEdges}>
        <Drawer
          title="Transfer Information"
          visible={transferVisible}
          onClose={() => setTransferVisible(false)}
        >
          <TransferInfoDrawer transfers={edges} transferId={transferId} />
        </Drawer>

        <Modal
          title="Create a new Transfer"
          visible={transferModalVisible}
          onCancel={() => setTransferModalVisible(false)}
          onOk={() => setTransferModalVisible(false)}
          destroyOnClose
          footer={null}
        >
          <TransferEditModal
            closeModal={() => setTransferModalVisible(false)}
            operationMode={OperationMode.CREATE}
            transfers={edges}
          />
        </Modal>
      </TransferContext.Provider>
    </div>
  );
};

export default App;
