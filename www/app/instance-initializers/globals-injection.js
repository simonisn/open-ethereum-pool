export function initialize(appInstance) {  
    appInstance.inject('route', 'globals', 'service:globals');
    appInstance.inject('controller', 'globals', 'service:globals');
    appInstance.inject('component', 'globals', 'service:globals');    
}

export default { initialize };
