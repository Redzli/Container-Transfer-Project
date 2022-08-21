// @ts-nocheck
import React, { useState, createContext } from "react";
import {
  GraphView, // required
} from "react-digraph";
import { Modal, Button, Drawer } from "antd";
import { nodeList } from "./containers";
import { transferList } from "./transfers";
import ContainerInfoDrawer from "./components/container/container-info-drawer/index";
import "antd/dist/antd.css";
import TransferInfoDrawer from "./components/transfers/transfer-info-drawer";
import TransferEditModal from "./components/transfers/transfer-edit-modal";
import { OperationMode } from "./apis/api-definition";
import { GraphConfig } from "./utils";
import styles from "./index.module.scss";

export const ContainerContext = createContext();
export const TransferContext = createContext();

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

  // on selecting a node or an edge
  const onSelectNodeOrEdge = (node) => {
    console.log("WHAT IS NODES", node);
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

  return (
    <div className={styles.container}>
      <Button
        onClick={() => setTransferModalVisible(true)}
        className={styles.transferButton}
      >
        {" "}
        Create Transfer
      </Button>

      <GraphView
        initialBBox={true}
        nodes={nodes}
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
          onOk={() => setContainerVisible(false)}
        >
          <ContainerInfoDrawer
            nodes={nodes}
            containerId={containerId}
            setNodes={setNodes}
          />
        </Drawer>
      </ContainerContext.Provider>

      <TransferContext.Provider value={setEdges}>
        <Drawer
          title="Transfer Information"
          visible={transferVisible}
          onClose={() => setTransferVisible(false)}
          onOk={() => setTransferVisible(false)}
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
