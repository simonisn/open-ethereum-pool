import PoolStats from '../models/shared/pool-stats';

export function initialize(application) {  
  application.register('object:pool-stats', PoolStats);
}

export default { initialize };
