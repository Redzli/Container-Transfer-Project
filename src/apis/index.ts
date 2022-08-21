import { containerList, nodeList, TEST_CONTAINER_LIST } from "../containers";
import { transfers } from "../transfers";
import {
  GetContainerInfoRequest,
  // ContainerRequest,
  // EditContainerRequest,
  EditContainerResponse,
} from "../../api-definition";
import { resolve } from "path";

interface INode {
  id: number;
}

export function getContainerInfo(id: number, originalNodes: INode[]) {
  // console.log("DATA ", data);
  // const { id } = data;
  if (!id)
    return {
      msg: "invalid parameter",
      code: 10000,
    };

  return originalNodes.filter((container) => container.id == id);
}

export function editContainer<EditContainerResponse>(
  data: any,
  originalNodes: INode[]
) {
  return new Promise((resolve, reject) => {
    const {
      id,
      operator_note,
      solution_name,
      solution_initial_volume_mL,
      inventory_location,
      solution_description,
    } = data;

    if (!id)
      reject({
        msg: "invalid parameter",
        code: 10000,
      });

    const targetContainers = originalNodes?.map((container) => {
      if (container.id == id) {
        return {
          ...container,
          operator_note,
          solution_description,
          solution_name,
          solution_initial_volume_mL,
          inventory_location,
        };
      } else {
        return container;
      }
    });

    console.log("LIST API", targetContainers);
    resolve(targetContainers);
  });
}
