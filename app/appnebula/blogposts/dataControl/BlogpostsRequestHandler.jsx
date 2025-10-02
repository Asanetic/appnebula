'use client';
//hive / data utils
import { mosyPostFormData, mosyGetData, mosyUrlParam, mosyUpdateUrlParam , deleteUrlParam, magicRandomStr, mosyGetLSData  } from '../../../MosyUtils/hiveUtils';

//action modals 
import { MosyNotify , closeMosyModal, MosyAlertCard } from '../../../MosyUtils/ActionModals';

//filter util
import { MosyFilterEngine } from '../../DataControl/MosyFilterEngine';

//custom event manager 
import { customEventHandler } from '../../DataControl/customDataFunction';

//routes manager
///handle routes 
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();

//insert data
export async function insertBlogposts() {
 //console.log(`Form blog_posts insert sent `)

  return await mosyPostFormData({
    formId: 'blog_posts_profile_form',
    url: apiRoutes.blogposts.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateBlogposts() {

  //console.log(`Form blog_posts update sent `)

  return await mosyPostFormData({
    formId: 'blog_posts_profile_form',
    url: apiRoutes.blogposts.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateBlogpostsFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('blog_posts_mosy_action');
 
 //console.log(`Form blog_posts submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_blog_posts') {

      actionMessage ='Record added succesfully!';

      result = await insertBlogposts();
    }

    if (actionType === 'update_blog_posts') {

      actionMessage ='Record updated succesfully!';

      result = await updateBlogposts();
    }

    if (result?.status === 'success') {
      
      const blog_postsUptoken = btoa(result.blog_posts_uptoken || '');

      //set id key
      setters.setBlogpostsUptoken(blog_postsUptoken);
      
      //update url with new blog_postsUptoken
      mosyUpdateUrlParam('blog_posts_uptoken', blog_postsUptoken)

      setters.setBlogpostsActionStatus('update_blog_posts')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: blog_postsUptoken,
        actionName : actionType,
        actionType : 'blog_posts_form_submission'
      };
            
      
    } else {
      MosyNotify({message:"A small error occured. Kindly try again", iconColor :'text-danger'})
      
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
    }

  } catch (error) {
    console.error('Form error:', error);
    
    MosyNotify({message:`A small error occured.  ${error}`, iconColor :'text-danger'})
    
      return {
        status: 'error',
        message: result,
        actionName: actionType,
        newToken: null
      };
      
  } 
}


export async function initBlogpostsProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
     
  }
  

  MosyNotify({message : 'Refreshing Blog Posts' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.blogposts.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initBlogpostsProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('blogposts Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching blogposts data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteBlogposts(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.blogposts.delete,
        params: { 
          _blog_posts_delete_record: (token), 
          },
      });

      console.log('Token DeleteBlogposts '+token)
      if (response.status === 'success') {

        closeMosyModal();

        return response.data; // ✅ Return the data
      } else {
        console.error('Error deleting systemusers data:', response.message);
        closeMosyModal();
        
        return []; // Safe fallback
      }
    } catch (err) {
      console.error('Error:', err);
      closeMosyModal();
      
      return []; //  Even safer fallback
    }

}


export async function getBlogpostsListData(qstr = "") {
   let fullWhere = true
  if(qstr=='')
  {
   fullWhere = false 
   qstr=btoa(``)
  }
  
  //add the following data in response
  const rawMutations = {
     
  }
  
  const encodedMutations = btoa(JSON.stringify(rawMutations));

  //manage pagination 
  const pageNo = mosyUrlParam('qblog_posts_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.blogposts.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qblog_posts_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getBlogpostsListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('blogposts Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching blogposts data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadBlogpostsListData(customQueryStr, setters) {

    const gftBlogposts = MosyFilterEngine('blog_posts', true);
    let finalFilterStr = btoa(gftBlogposts);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setBlogpostsLoading(true);
    
    const blogpostsListData = await getBlogpostsListData(finalFilterStr);
    
    setters.setBlogpostsLoading(false)
    setters.setBlogpostsListData(blogpostsListData?.data)

    setters.setBlogpostsListPageCount(blogpostsListData?.page_count)


    return blogpostsListData

}
  
  
export async function blogpostsProfileData(customQueryStr, setters, router, customProfileData={}) {

    const blogpostsTokenId = mosyUrlParam('blog_posts_uptoken');
    
    const deleteParam = mosyUrlParam('blog_posts_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedBlogpostsToken = '0';
    if (blogpostsTokenId) {
      
      decodedBlogpostsToken = atob(blogpostsTokenId); // Decode the record_id
      setters.setBlogpostsUptoken(blogpostsTokenId);
      setters.setBlogpostsActionStatus('update_blog_posts');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawBlogpostsQueryStr =`where primkey ='${decodedBlogpostsToken}'`
    if(customQueryStr!='')
    {
      // if no blog_posts_uptoken set , use customQueryStr
      if (!blogpostsTokenId) {
       rawBlogpostsQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initBlogpostsProfileData(rawBlogpostsQueryStr)

    if(deleteParam){
      popDeleteDialog(blogpostsTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setBlogpostsNode(finalProfileData)
    
    
}
  
  

export function InteprateBlogpostsEvent(data) {
     
  //console.log('🎯 Blogposts Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_blog_posts){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setBlogpostsCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('BlogpostsProfileTray')

    
    mosyUpdateUrlParam('blog_posts_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_blog_posts){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add blog_posts `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('BlogpostsProfileTray')
      }
    }
     
  }

  if(childActionName.update_blog_posts){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update blog_posts `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('BlogpostsProfileTray')
        
      }
    }
  }

  if(childActionName.delete_blog_posts){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../blogposts/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteBlogposts(deleteToken).then(data=>{
  
        childSetters?.setSnackMessage("Record deleted succesfully!")
        childSetters?.setParentUseEffectKey(magicRandomStr());
        childSetters?.setLocalEventSignature(magicRandomStr());

        if(router){
          router.push(`${afterDeleteUrl}?snack_alert=Record Deleted successfully!`)
        }
                  
      })
  
    },
  
    onNo: () => {
  
      // Remove the param from the URL
       closeMosyModal()
       deleteUrlParam('blog_posts_delete');
        
    }
  
  });

}