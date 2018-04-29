import NetworkStats from '../models/shared/network-stats';

export function initialize(application) {  
  application.register('object:network-stats', NetworkStats);
}

export default { initialize };