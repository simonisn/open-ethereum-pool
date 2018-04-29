import PoolStatsParser from '../objects/pool-stats-parser';

export function initialize(application) {  
  application.register('object:pool-stats-parser', PoolStatsParser);
}

export default { initialize };
