// @ts-nocheck
// file contents: renders the whole graph
import React, { useState, createContext, useRef, useEffect } from "react";
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

  useEffect(() => {
    console.log("EDGES", ref.current.getEdgeComponent);
  }, []);

  // on selecting a node or an edge
  const onSelectNodeOrEdge = (node: any) => {
    console.log("WHAT IS NODES", node);
    console.log("WHAT IS ref", ref.current);
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

  const afterRenderEdge = (a, b, c, d) => {
    console.log("HEYHEY", a, b, c, d);
  };

  const ref = useRef(null);

  return (
    <div className={styles.container}>
      <Button
        onClick={() => setTransferModalVisible(true)}
        className={styles.transferButton}
      >
        {" "}
        Create Transfer
      </Button>

      {/* Graph */}
      <GraphView
        ref={ref}
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
