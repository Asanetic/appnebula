
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultProjectportfolioStateDefaults = {

  //state management for list page
  projectportfolioListData : [],
  projectportfolioListPageCount : 1,
  projectportfolioLoading: true,  
  parentUseEffectKey : 'loadProjectportfolioList',
  localEventSignature: 'loadProjectportfolioList',
  projectportfolioQuerySearchStr: '',

  
  //for profile page
  projectsNode : {},
  projectportfolioActionStatus : 'add_projects',
  paramprojectportfolioUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  projectportfolioUptoken:'',
  projectportfolioNode : {},
  activeScrollId : 'ProjectportfolioProfileTray',
  
  //dataScript
  projectportfolioCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useProjectportfolioState(overrides = {}) {
  const combinedDefaults = { ...defaultProjectportfolioStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

