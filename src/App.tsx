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
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Tree from "react-d3-tree";
import { version } from "react-d3-tree/package.json";
import {randomIntFromInterval} from './utils';
// import treeData from "./tree-data.json";
// import graphData from "./tree-data.json";
import {graphData} from "./graph-data";
import { getContainerInfo } from "./apis/apis";
import { Modal } from "antd";
import {containerList, TEST_CONTAINER_LIST} from './containers'
import {transfers} from './transfers'
import ContainerInfoModal from "./components/container-info-modal/index";
import {
  GetContainerInfoRequest,
  GetContainerInfoResponse,
} from "../api-definition";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import { RawNodeDatum, TreeLinkDatum } from "react-d3-tree/lib/types/common";

interface CustomNodeDatum extends RawNodeDatum {
  id?: number;
}

const App = () => {
  const [containerVisible, setContainerVisible] = useState<boolean>(false);
  const [containerData, setContainerData] = useState<any>();
  const [tranferData, setTransferData] = useState<any>();
  const [nodes, setNodes] = useState<any>(TEST_CONTAINER_LIST);
  const [edges, setEdges] = useState<any>(transfers);
  // const [testData, setTestData] = useState<any>(treeData);

  // useEffect(() => {
  //   const data = linkContainer();
  //   setTestData(data);
  // }, []);

  const getContainerData = (node ) => {
    // get the first key-value pair in the map
    const [id] = node.nodes.keys();
    const data = getContainerInfo({ id });
    setContainerData(data);
    setContainerVisible(true);
  };

  // const getTransferData = (node: RawNodeDatum) => {
  //   if (!node.data?.id) return;
  //   const data = getContainerInfo({ id: node.data?.id });
  //   setContainerData(data);
  //   setContainerVisible(true);
  // };


const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      typeText: "None",
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
          {/* <circle cx="25" cy="25" r="8" fill="currentColor"> </circle> */}
        </symbol>
      )
    }
  }
}

useEffect(()=> {
  const edgeList = transfers.map(transfer => {
    // const x = randomIntFromInterval(200, 1000);
    // const y = randomIntFromInterval(200, 1000);
    return {
      type: "emptyEdge",
      source: transfer.source_container_id,
      target: transfer.destination_container_id,
    }
  })


  setEdges(edgeList)
}, [])

useEffect(() => {
  const nodeList = containerList.map(container => {
    const x = randomIntFromInterval(200, 1000);
    const y = randomIntFromInterval(200, 1000);
    return {
      ...container,
      type: 'empty',
      x,
      y
    }
  })

  console.log("NODE LIST?", nodeList)

  setNodes(nodeList)

},[] )


  return (
    <div className="container">
      <GraphView  
        // nodes={graphData.nodes}
        nodes={nodes}
        edges={edges}
        edgeTypes={GraphConfig.EdgeTypes} 
        nodeKey={'id'} 
        allowMultiselect={false}
        nodeSubtypes={GraphConfig.NodeSubtypes} 
        nodeTypes={GraphConfig.NodeTypes}
        onSelect={getContainerData}
      />
      {/* <Tree
        // onNodeMouseOver={(node, evt) => {
        // console.log('onNodeMouseOver' );
        // }}
        onLinkMouseOver={getTransferData}
        onNodeClick={getContainerData}
        // data={treeData}
        data={testData}
      /> */}

      <Modal
        title="Container Information"
        visible={containerVisible}
        onCancel={() => setContainerVisible(false)}
        onOk={() => setContainerVisible(false)}
      >
        <ContainerInfoModal data={containerData} />
      </Modal>
    </div>
  );
};

export default App;
