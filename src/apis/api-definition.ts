export interface ContainerRequest {
  id: number;
  operator_note?: string | null;
  solution_name?: string | null;
  solution_initial_volume_mL: number;
  inventory_location: string;
  solution_description?: string | null;
}

export interface EditContainerResponse {
  status_code: string;
  extra: Object;
}

/**
 * @description endpoints for editing or creating a transfer
 * @param EditTransferRequest
 * @returns EditTransferResponse
 */

export interface EditTransferRequest {
  type: number; // 1 for editing, 2 for creating
  id: number;
  destination_container_id?: number;
  amount_transferred_unit?: string;
  source_container_id?: number;
  amount_transferred?: number;
}

export interface EditTransferResponse {
  status_code: string;
  extra: Object;
}

/**
 * @description endpoints for getting information of a container
 * @param GetContainerInfoRequest
 * @returns GetContainerInfoResponse
 */

export interface GetContainerInfoRequest {
  id: number;
}

export interface GetContainerInfoResponse {
  id: number;
  operator_note?: string;
  solution_name?: string;
  solution_initial_volume_mL: number;
  inventory_location: string;
  solution_description?: string;
}

export interface EditContainerRequest {
  id: number;
  operator_note?: string;
  solution_name?: string;
  solution_initial_volume_mL: number;
  inventory_location: string;
  solution_description?: string;
}

/**
 * @description endpoints for getting information of a transfer
 * @param GetTransferInfoRequest
 * @returns GetTransferInfoResponse
 */
export interface GetTransferInfoRequest {
  id: number;
  type: number; // 1 for editing, 2 for creating
}

export interface GetTransferInfoResponse {
  type: number; // 1 for editing, 2 for creating
  id: number;
  destination_container_id: number;
  amount_transferred_unit: string;
  source_container_id: number;
  amount_transferred: number;
}

export const enum OperationMode {
  EDIT = 1,
  CREATE = 2,
}
