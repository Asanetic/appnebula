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
export async function insertProjectportfolio() {
 //console.log(`Form projects insert sent `)

  return await mosyPostFormData({
    formId: 'projects_profile_form',
    url: apiRoutes.projectportfolio.base,
    method: 'POST',
    isMultipart: true,
  });
}

//update record 
export async function updateProjectportfolio() {

  //console.log(`Form projects update sent `)

  return await mosyPostFormData({
    formId: 'projects_profile_form',
    url: apiRoutes.projectportfolio.base,
    method: 'POST',
    isMultipart: true,
  });
}


///receive form actions from profile page  
export async function inteprateProjectportfolioFormAction(e, setters) {
  e.preventDefault();

  const form = e.target;
  const formDataObj = new FormData(form);
  const actionType = formDataObj.get('projects_mosy_action');
 
 //console.log(`Form projects submission received action : ${actionType}`)

  try {
    let result = null;
    let actionMessage ='Record added succesfully!';

    if (actionType === 'add_projects') {

      actionMessage ='Record added succesfully!';

      result = await insertProjectportfolio();
    }

    if (actionType === 'update_projects') {

      actionMessage ='Record updated succesfully!';

      result = await updateProjectportfolio();
    }

    if (result?.status === 'success') {
      
      const projectsUptoken = btoa(result.projects_uptoken || '');

      //set id key
      setters.setProjectportfolioUptoken(projectsUptoken);
      
      //update url with new projectsUptoken
      mosyUpdateUrlParam('projects_uptoken', projectsUptoken)

      setters.setProjectportfolioActionStatus('update_projects')
    
      setters.setSnackMessage(actionMessage);

      return {
        status: 'success',
        message: actionMessage,
        newToken: projectsUptoken,
        actionName : actionType,
        actionType : 'projects_form_submission'
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


export async function initProjectportfolioProfileData(rawQstr) {

  //add the following data in response
  const rawMutations = {
     
  }
  

  MosyNotify({message : 'Refreshing Project Portfolio' , icon:'refresh', addTimer:false})

  const encodedMutations = btoa(JSON.stringify(rawMutations));

  try {
    // Fetch the  data with the given key
    const response = await mosyGetData({
      endpoint: apiRoutes.projectportfolio.base,
      params: { 
      q: btoa(rawQstr),         
      mutations: encodedMutations,
      fullQ : true,
      aw : btoa(``),
      src : btoa(`initProjectportfolioProfileData`)
      },
    });

    // Handle the successful response
    if (response.status === 'success') {
      //console.log('apps Data:', response.data);  // Process the data

       closeMosyModal()

      return response.data?.[0] || {};  // Return the actual record

    } else {
          
      console.log('Error fetching apps data:', response.message);  // Handle error

      closeMosyModal()

      return {}
    }
  } catch (err) {

    closeMosyModal()

    console.log('Error:', err);
    return {}
  }
}


export async function DeleteProjectportfolio(token = '') {

    try {
      MosyNotify({message:"Sending delete request",icon:"send", addTimer : false})
    
      const response = await mosyGetData({
        endpoint: apiRoutes.projectportfolio.delete,
        params: { 
          _projects_delete_record: (token), 
          },
      });

      console.log('Token DeleteProjectportfolio '+token)
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


export async function getProjectportfolioListData(qstr = "") {
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
  const pageNo = mosyUrlParam('qprojects_page','0')
  const recordsPerPage = mosyGetLSData('systemDataLimit', '11')

  try {
    const response = await mosyGetData({
      endpoint: apiRoutes.projectportfolio.base,
      params: { 
        q: qstr, 
        mutations: encodedMutations,
        fullQ : fullWhere,
        pagination : `l:qprojects_page:${recordsPerPage}:${pageNo}`,
        aw : btoa(`order by primkey desc`),
        src : btoa(`getProjectportfolioListData`)
        },
    });

    if (response.status === 'success') {
      //console.log('apps Data:', response.data);
      return response; // ✅ Return the data
    } else {
      console.log('Error fetching apps data:', response);
      return []; // Safe fallback
    }
  } catch (err) {
    console.log('Error:', err);
    return []; //  Even safer fallback
  }
}


export async function loadProjectportfolioListData(customQueryStr, setters) {

    const gftProjectportfolio = MosyFilterEngine('projects', true);
    let finalFilterStr = btoa(gftProjectportfolio);    

    if(customQueryStr!='')
    {
      finalFilterStr = customQueryStr;
    }

    setters.setProjectportfolioLoading(true);
    
    const projectportfolioListData = await getProjectportfolioListData(finalFilterStr);
    
    setters.setProjectportfolioLoading(false)
    setters.setProjectportfolioListData(projectportfolioListData?.data)

    setters.setProjectportfolioListPageCount(projectportfolioListData?.page_count)


    return projectportfolioListData

}
  
  
export async function projectportfolioProfileData(customQueryStr, setters, router, customProfileData={}) {

    const projectportfolioTokenId = mosyUrlParam('projects_uptoken');
    
    const deleteParam = mosyUrlParam('projects_delete');

    //manage  the staff_uptoken value  basically detect primkey
    let decodedProjectportfolioToken = '0';
    if (projectportfolioTokenId) {
      
      decodedProjectportfolioToken = atob(projectportfolioTokenId); // Decode the record_id
      setters.setProjectportfolioUptoken(projectportfolioTokenId);
      setters.setProjectportfolioActionStatus('update_projects');
      
    }
    
    //override customQueryStr if there is an active staff_uptoken else use customQueryStr if any
    let rawProjectportfolioQueryStr =`where primkey ='${decodedProjectportfolioToken}'`
    if(customQueryStr!='')
    {
      // if no projects_uptoken set , use customQueryStr
      if (!projectportfolioTokenId) {
       rawProjectportfolioQueryStr = customQueryStr
      }
    }

    const profileDataRecord = await initProjectportfolioProfileData(rawProjectportfolioQueryStr)

    if(deleteParam){
      popDeleteDialog(projectportfolioTokenId, setters, router)
    }
    
    // Merge with custom injected values (custom wins)
    const finalProfileData = {
      ...profileDataRecord,
      ...customProfileData,    
    };
      

    setters.setProjectportfolioNode(finalProfileData)
    
    
}
  
  

export function InteprateProjectportfolioEvent(data) {
     
  //console.log('🎯 Projectportfolio Child gave us:', data);

  const actionName = data?.actionName

  const childActionName = { [actionName]: true };

  if(childActionName.select_projects){

    if(data?.profile)
    {
      const router = data?.router
      
      const url = data?.url

      router.push(url, { scroll: false });

    }else{

    //const childStateSetters = data?.setters.childSetters

    const parentSetter = data?.setters.parentStateSetters 

    parentSetter?.setProjectportfolioCustomProfileQuery(data?.qstr)

    parentSetter?.setLocalEventSignature(magicRandomStr())
    parentSetter?.setParentUseEffectKey(magicRandomStr())
    parentSetter?.setActiveScrollId('ProjectportfolioProfileTray')

    
    mosyUpdateUrlParam('projects_uptoken', btoa(data?.token))
    
    }
  }

  if(childActionName.add_projects){

    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`add projects `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProjectportfolioProfileTray')
      }
    }
     
  }

  if(childActionName.update_projects){
    const stateSetter =data?.setters.childStateSetters
    const parentStateSetter =data?.setters.parentStateSetters

    //console.log(`update projects `, data?.setters)

    if(stateSetter.setLocalEventSignature){
     stateSetter?.setLocalEventSignature(magicRandomStr())
    }

    if(parentStateSetter){
      if(parentStateSetter.setLocalEventSignature){
        parentStateSetter?.setLocalEventSignature(magicRandomStr())
        parentStateSetter?.setActiveScrollId('ProjectportfolioProfileTray')
        
      }
    }
  }

  if(childActionName.delete_projects){

    popDeleteDialog(btoa(data?.token), data?.setters)

 }

  
}


export function popDeleteDialog(deleteToken, setters, router, afterDeleteUrl='../apps/list')
{     

  //console.log(`popDeleteDialog`, setters)
  const childSetters = setters?.childStateSetters
  
  MosyAlertCard({
  
    icon : "trash",
  
    message: "Are you sure you want to delete this record?",

    autoDismissOnClick : false,
  
    onYes: () => {
  
      DeleteProjectportfolio(deleteToken).then(data=>{
  
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
       deleteUrlParam('projects_delete');
        
    }
  
  });

}