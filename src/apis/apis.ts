import { containerList } from '../containers';
import { transfers } from '../transfers';
import { GetContainerInfoRequest, GetContainerInfoResponse } from './../../api-definition';

export function getContainerInfo  <GetContainerInfoResponse> (data: GetContainerInfoRequest) {
  const {id} = data;
  if(!id) return {
    msg: 'invalid parameter',
    code: 10000
  }
   return containerList.filter(container => container.id == id);
}