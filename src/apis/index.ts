import { randomIntFromInterval } from "../utils";

interface INode {
  id: number;
}

interface ITransfer {
  id: number;
  source: number;
  target: number;
}

/**
 * @description endpoints for getting information of a container
 * @param GetContainerInfoRequest
 * @returns GetContainerInfoResponse
 */
export function getContainerInfo(id: number, originalNodes: INode[]) {
  if (!id)
    return {
      msg: "invalid parameter",
      code: 10000,
    };

  return originalNodes.filter((container) => container.id == id);
}

/**
 * @description endpoints for getting information of a transfer
 * @param GetTransferInfoRequest
 * @returns GetTransferInfoResponse
 */
export function getTransferInfo(id: number, originalTransfers: ITransfer[]) {
  if (!id)
    return {
      msg: "invalid parameter",
      code: 10000,
    };

  return originalTransfers.filter((transfer) => transfer.id == id);
}

/**
 * @description endpoints for editing information of a transfer
 * @param EditTransferInfoRequest
 * @returns EditTransferInfoResponse
 */
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

    resolve(updatedTranfsers);
  });
}

/**
 * @description endpoints for editing or creating a transfer
 * @param EditTransferRequest
 * @returns EditTransferResponse
 */
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
