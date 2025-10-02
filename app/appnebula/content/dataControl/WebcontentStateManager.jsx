
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultWebcontentStateDefaults = {

  //state management for list page
  webcontentListData : [],
  webcontentListPageCount : 1,
  webcontentLoading: true,  
  parentUseEffectKey : 'loadWebcontentList',
  localEventSignature: 'loadWebcontentList',
  webcontentQuerySearchStr: '',

  
  //for profile page
  web_contentNode : {},
  webcontentActionStatus : 'add_web_content',
  paramwebcontentUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  webcontentUptoken:'',
  webcontentNode : {},
  activeScrollId : 'WebcontentProfileTray',
  
  //dataScript
  webcontentCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useWebcontentState(overrides = {}) {
  const combinedDefaults = { ...defaultWebcontentStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

