import { containerList, nodeList, TEST_CONTAINER_LIST } from "../containers";
import { transfers } from "../transfers";
import {
  GetContainerInfoRequest,
  // ContainerRequest,
  // EditContainerRequest,
  EditContainerResponse,
} from "./api-definition";
import { resolve } from "path";
import { randomIntFromInterval } from "../utils";

interface INode {
  id: number;
}

interface ITransfer {
  id: number;
  source: number;
  target: number;
}

export function getContainerInfo(id: number, originalNodes: INode[]) {
  if (!id)
    return {
      msg: "invalid parameter",
      code: 10000,
    };

  return originalNodes.filter((container) => container.id == id);
}

export function getTransferInfo(id: number, originalTransfers: ITransfer[]) {
  if (!id)
    return {
      msg: "invalid parameter",
      code: 10000,
    };

  return originalTransfers.filter((transfer) => transfer.id == id);
}

export function editContainer(data: any, originalNodes: INode[]) {
  return new Promise((resolve, reject) => {
    const { id } = data;

    if (!id)
      reject({
        msg: "invalid parameter",
        code: 10000,
      });

    const targetContainers = originalNodes?.map((container) => {
      if (container.id == id) {
        return {
          ...container,
          ...data,
        };
      } else {
        return container;
      }
    });

    console.log("LIST API", targetContainers);
    resolve(targetContainers);
  });
}

export function editTranfers(data: any, originalTransfers: ITransfer[]) {
  return new Promise((resolve, reject) => {
    const { id, target, source } = data;

    if (!id)
      reject({
        msg: "invalid parameter",
        code: 10000,
      });

    console.log("ORIGINAL TRANS", originalTransfers);

    const updatedTranfsers = originalTransfers?.map((transfer) => {
      if (transfer.id == id) {
        return {
          ...transfer,
          ...data,
          target: parseInt(target),
          source: parseInt(source),
        };
      } else {
        return {
          ...transfer,
        };
      }
    });

    console.log("LIST API", updatedTranfsers);
    resolve(updatedTranfsers);
  });
}

export function createTransfer(data: any, originalTransfers: ITransfer[]) {
  return new Promise((resolve) => {
    const { target, source } = data;

    const id = randomIntFromInterval(200, 1000);

    const newTransfer = {
      id,
      ...data,
      source: parseInt(source),
      target: parseInt(target),
      type: "emptyEdge",
    };

    const newTransfers = [...originalTransfers, { ...newTransfer }];

    resolve(newTransfers);
  });
}
