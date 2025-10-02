
import {mosyStateManager} from '../../../MosyUtils/hiveUtils';

const defaultBlogpostsStateDefaults = {

  //state management for list page
  blogpostsListData : [],
  blogpostsListPageCount : 1,
  blogpostsLoading: true,  
  parentUseEffectKey : 'loadBlogpostsList',
  localEventSignature: 'loadBlogpostsList',
  blogpostsQuerySearchStr: '',

  
  //for profile page
  blog_postsNode : {},
  blogpostsActionStatus : 'add_blog_posts',
  paramblogpostsUptoken  : '',
  snackMessage : '',
  snackOnDone : ()=>()=>{},
  blogpostsUptoken:'',
  blogpostsNode : {},
  activeScrollId : 'BlogpostsProfileTray',
  
  //dataScript
  blogpostsCustomProfileQuery : '',
  
  
  // ... other base defaults
};

export function useBlogpostsState(overrides = {}) {
  const combinedDefaults = { ...defaultBlogpostsStateDefaults, ...overrides };
  return mosyStateManager(combinedDefaults);
}

