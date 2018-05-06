import AccountStats from '../models/shared/account-stats';

export function initialize(application) {  
  application.register('object:account-stats', AccountStats);
}

export default { initialize };