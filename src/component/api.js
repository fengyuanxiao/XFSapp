import {get, post} from './http'

export function getNewPublish() {
  const result = get('/ad/newestPublishAdMaterialInfo1');
  return result;
}

export default api
