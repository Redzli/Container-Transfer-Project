// @ts-nocheck
import {
  GraphView, // required
  Edge, // optional
  type IEdge, // optional
  Node, // optional
  type INode, // optional
  type LayoutEngineType, // required to change the layoutEngineType, otherwise optional
  BwdlTransformer, // optional, Example JSON transformer
  GraphUtils // optional, useful utility functions
} from 'react-digraph';
import React, { useContext, useState, useMemo, useCallback, useEffect, createContext } from "react";
import Tree from "react-d3-tree";
import { version } from "react-d3-tree/package.json";
import {randomIntFromInterval,   isDrag} from './utils';
import { Modal, Button, Drawer } from "antd";
import { nodeList} from './containers'
import { transferList} from './transfers'
import ContainerInfoDrawer from "./components/container/container-info-drawer/index";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { RawNodeDatum, TreeLinkDatum } from "react-d3-tree/lib/types/common";
import TransferInfoDrawer from './components/transfers/transfer-info-drawer';
import { OperationMode } from "./apis/api-definition";
import TransferEditModal from './components/transfers/transfer-edit-modal'
import styles from './index.module.scss';


export const ContainerContext = createContext();
export const TransferContext = createContext();

const App = () => {
  const [containerVisible, setContainerVisible] = useState<boolean>(false);
  const [transferVisible, setTransferVisible] = useState<boolean>(false);
  const [transferModalVisible, setTransferModalVisible] = useState<boolean>(false);
  const [containerId, setContainerId] = useState<number>(-1);
  const [transferId, setTransferId] = useState<number>();
  const [nodes, setNodes] = useState<any>(nodeList);
  const [edges, setEdges] = useState<any>(transferList);

  const onSelectNodeOrEdge = (node ) => {
    console.log("WHAT IS NODES", node)
    // if node selected
    if(node.nodes){
      // get the first key-value pair in the map
      const [id] = node.nodes.keys();
      setContainerId(id);
      setContainerVisible(true);
      return;
    }

    // if edge selected 
    if(node.edges) {
      const [transferData] = node.edges.values();
      setTransferId(transferData?.id);
      setTransferVisible(true);
    }
  };


const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      // typeText: "Container",
      shapeId: "#empty", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    },
    custom: { // required to show empty nodes
      typeText: "Custom",
      shapeId: "#custom", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 50 25" id="custom" key="0">
          <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
        </symbol>
      )
    }
  }
}

  console.log("LIST APP", transferList)
  console.log("LIST Edge", edges)

  return (
    <div className={styles.container}>
      <Button onClick={()=>setTransferModalVisible(true)} className={styles.transferButton}> Create Transfer</Button>

        <GraphView  
          initialBBox={true}
          nodes={nodes}
          readOnly
          layoutEngineType='VerticalTree'
          edges={edges}
          edgeTypes={GraphConfig.EdgeTypes} 
          nodeKey={'id'} 
          allowMultiselect={false}
          nodeSubtypes={GraphConfig.NodeSubtypes} 
          nodeTypes={GraphConfig.NodeTypes}
          onSelect={onSelectNodeOrEdge}
        />

      <ContainerContext.Provider value={setNodes} >
        <Drawer
          title="Container Information"
          visible={containerVisible}
          onClose={() => setContainerVisible(false)}
          onOk={() => setContainerVisible(false)}
        >
          <ContainerInfoDrawer nodes={nodes} containerId={containerId} setNodes={setNodes}  />
        </Drawer>
      </ContainerContext.Provider>

      <TransferContext.Provider value={setEdges} >
        <Drawer
          title="Transfer Information"
          visible={transferVisible}
          onClose={() => setTransferVisible(false)}
          onOk={() => setTransferVisible(false)}
        >
          <TransferInfoDrawer transfers={edges} transferId={transferId}   />
        </Drawer>

        <Modal
          title="Create a new Transfer"
          visible={transferModalVisible}
          onCancel={()=> setTransferModalVisible(false)}
          onOk={()=> setTransferModalVisible(false)}
          destroyOnClose
          footer={null}
        >
          <TransferEditModal
            closeModal={()=> setTransferModalVisible(false)}
            operationMode={OperationMode.CREATE}
            transfers={edges}
            />
        </Modal>
      </TransferContext.Provider>
    </div>


  );
};

export default App;