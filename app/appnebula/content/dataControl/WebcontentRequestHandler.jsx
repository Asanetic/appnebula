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
export async function insertWebcontent() {
 //console.log(`Form web_content insert sent `)

  return await mosyPostFormData({
    formId: 'web_content_profile_form',
    url: apiRoutes.webcontent.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateWebcontent() {

  //console.log(`Form web_content update sent `)

  return await mosyPostFormData({
    formId: 'web_content_profile_form',
    url: apiRoutes.webcontent.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateWebcontentFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('web_content_mosy_action');
 
 //console.log(`Form web_content submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_web_content') {

      actionMessage ='Record added succesfully!';

      result = await insertWebcontent();
    }

    if (actionType === 'update_web_content') {

      actionMessage ='Record updated succesfully!';

      result = await updateWebcontent();
    }

    if (result?.status === 'success') {
      
      const web_contentUptoken = btoa(result.web_content_uptoken || '');

      //set id key
      setters.setWebcontentUptoken(web_contentUptoken);
      
      //update url with new web_contentUptoken
      mosyUpdateUrlParam('web_content_uptoken', web_contentUptoken)

      setters.setWebcontentActionStatus('update_web_content')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: web_contentUptoken,
        actionName : actionType,
        actionType : 'web_content_form_submission'
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


export async function initWebcontentProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
     
  }
  

  MosyNotify({message : 'Refreshing Web content' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.webcontent.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initWebcontentProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('content Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching content data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteWebcontent(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.webcontent.delete,
        params: { 
          _web_content_delete_record: (token), 
          },
      });

      console.log('Token DeleteWebcontent '+token)
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


export async function getWebcontentListData(qstr = "") {
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
  const pageNo = mosyUrlParam('qweb_content_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.webcontent.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qweb_content_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getWebcontentListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('content Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching content data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadWebcontentListData(customQueryStr, setters) {

    const gftWebcontent = MosyFilterEngine('web_content', true);
    let finalFilterStr = btoa(gftWebcontent);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setWebcontentLoading(true);
    
    const webcontentListData = await getWebcontentListData(finalFilterStr);
    
    setters.setWebcontentLoading(false)
    setters.setWebcontentListData(webcontentListData?.data)

    setters.setWebcontentListPageCount(webcontentListData?.page_count)


    return webcontentListData

}
  
  
export async function webcontentProfileData(customQueryStr, setters, router, customProfileData={}) {

    const webcontentTokenId = mosyUrlParam('web_content_uptoken');
    
    const deleteParam = mosyUrlParam('web_content_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedWebcontentToken = '0';
    if (webcontentTokenId) {
      
      decodedWebcontentToken = atob(webcontentTokenId); // Decode the record_id
      setters.setWebcontentUptoken(webcontentTokenId);
      setters.setWebcontentActionStatus('update_web_content');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawWebcontentQueryStr =`where primkey ='${decodedWebcontentToken}'`
    if(customQueryStr!='')
    {
      // if no web_content_uptoken set , use customQueryStr
      if (!webcontentTokenId) {
       rawWebcontentQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initWebcontentProfileData(rawWebcontentQueryStr)

    if(deleteParam){
      popDeleteDialog(webcontentTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setWebcontentNode(finalProfileData)
    
    
}
  
  

export function InteprateWebcontentEvent(data) {
     
  //console.log('🎯 Webcontent Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_web_content){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setWebcontentCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('WebcontentProfileTray')

    
    mosyUpdateUrlParam('web_content_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_web_content){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add web_content `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('WebcontentProfileTray')
      }
    }
     
  }

  if(childActionName.update_web_content){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update web_content `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('WebcontentProfileTray')
        
      }
    }
  }

  if(childActionName.delete_web_content){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../content/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteWebcontent(deleteToken).then(data=>{
  
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
       deleteUrlParam('web_content_delete');
        
    }
  
  });

}