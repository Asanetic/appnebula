'use client';

//React
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';


//components
import { MosyAlertCard, MosyNotify ,closeMosyModal } from  '../../../MosyUtils/ActionModals';
import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//basic utils
import { mosyScrollTo , deleteUrlParam, mosyFormInputHandler,mosyUrlParam  } from '../../../MosyUtils/hiveUtils';

//data control and processors
import { inteprateWebcontentFormAction, webcontentProfileData , popDeleteDialog, InteprateWebcontentEvent } from '../dataControl/WebcontentRequestHandler';

//state management
import { useWebcontentState } from '../dataControl/WebcontentStateManager';

//profile components
import {
  SubmitButtons,
  AddNewButton,
  LiveSearchDropdown,
  MosySmartField,
  MosyActionButton,
  SmartDropdown,
  DeleteButton ,
  MosyImageViewer,
  MosyFileUploadButton
} from '../../UiControl/componentControl';

//def logo
import logo from '../../../img/logo/logo.png'; // outside public!

import MosyHtmlEditor from '../../../MosyUtils/htmlEditor'

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();


//import WebcontentList component
import WebcontentList from './WebcontentList';



// export profile


export default function WebcontentProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="WebcontentMainProfilePage",
    parentProfileItemId = "WebcontentProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Webcontent states
  const [stateItem, stateItemSetters] = useWebcontentState(settersOverrides);
  const web_contentNode = stateItem.webcontentNode
  
  // -- basic states --//
  const paramWebcontentUptoken  = stateItem.webcontentUptoken
  const webcontentActionStatus = stateItem.webcontentActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setWebcontentNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postWebcontentFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateWebcontentFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postWebcontentFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("WebcontentProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    webcontentProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="WebcontentProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postWebcontentFormData} encType="multipart/form-data" id="web_content_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                {web_contentNode?.primkey ? (  <span>{`Content / ${web_contentNode?.section_title}`}</span> ) :(<span> New Content</span>)}
              </div>
              <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                {paramWebcontentUptoken && (
                  <DeleteButton
                  src="WebcontentMainProfilePage"
                  tableName="web_content"
                  uptoken={paramWebcontentUptoken}
                  stateItemSetters={stateItemSetters}
                  parentStateSetters={parentStateSetters}
                  
                  onDelete={popDeleteDialog}
                  />
                )}
              </div>)}</>
            </h3>
            {/*    Title isle      */}
            
            
            
            {/*    Navigation isle      */}
            <><div className="row justify-content-end m-0 p-0 col-md-12  p-3 bg-white hive_profile_navigation " id="">
              <div className="col-md-4 text-left p-0 hive_profile_nav_back_to_list_tray" id="">
                
                {showNavigationIsle && ( <Link href="./list" className="text-info hive_profile_nav_back_to_list"><i className="fa fa-arrow-left"></i> Back to list</Link>)}
                
              </div>
              <div className="col-md-8 p-0 text-right hive_profile_nav_add_new_tray" id="">
                
                
                
                {paramWebcontentUptoken && (
                  <>
                  
                </>
              )}
              
              {paramWebcontentUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="WebcontentMainProfilePage"
                tableName="web_content"
                uptoken={paramWebcontentUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="WebcontentMainProfilePage"
                tableName="web_content"
                link="./profile"
                label="New Content"
                icon="plus" />
              </>
            )}
            
          </div>
        </div></>
        <div className="col-md-12 pt-4 p-0 hive_profile_navigation_divider d-lg-none" id=""></div>
        {/*    Navigation isle      */}
        <div className="row justify-content-center m-0 p-0 col-md-12" id="">
          {/*    Image section isle      */}
          
          <div className="col-md-6 mr-lg-5">
            
            <div className="col-md-12 p-0 text-center mb-3">
              <div className="col-md-12 m-2"><b>Section Image</b></div>
              <MosyImageViewer
              media={`/api/mediaroom?media=${btoa((web_contentNode?.section_pic || ""))}`}
              mediaRoot={""}
              defaultLogo={logo.src}
              imageClass="product_image"
              />
              
              <MosyFileUploadButton
              tblName="web_content"
              attribute="section_pic"
              />
              <input type="hidden" name="media_web_content_section_pic" value={web_contentNode?.section_pic || ""}/>
            </div>
            
            
          </div>
          {/*    Image section isle      */}
          
          {/*  //-------------    main content starts here  ------------------------------ */}
          
          
          
          <div className="col-md-12 row justify-content-center m-0  p-0">
            {/*    Input cells section isle      */}
            <div className="col-md-12 row p-0 justify-content-center p-0 m-0">
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center">Section Details</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <MosySmartField
                  module="web_content"
                  field="section_title"
                  label="Section Title"
                  value={web_contentNode?.section_title || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <MosySmartField
                  module="web_content"
                  field="section_key"
                  label="Section Key"
                  value={web_contentNode?.section_key || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="text"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label className="d-none">Section Tag</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.webcontent.base}
                    idField="primkey"
                    labelField="section_tag"
                    inputName="txt_section_tag"
                    label="Section Tag"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={web_contentNode?.section_tag || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label className="d-none">Page Name</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.webcontent.base}
                    idField="primkey"
                    labelField="page_name"
                    inputName="txt_page_name"
                    label="Page Name"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={web_contentNode?.page_name || ""}
                    />
                  </div>
                  
                  
                  <MosySmartField
                  module="web_content"
                  field="section_content"
                  label="Section Content"
                  value={web_contentNode?.section_content || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="textarea"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                </div>
                
              </div>
              
              <div className="col-md-12 bg-white border border_set shadow-md p-4 mb-4 hive_form_section  ">
                <h5 className="col-md-12 row p-2 justify-content-center p-0 m-0">
                  <div className="col-md-3 bg-dark mb-3 mb-lg-0 mt-lg-3" style={{height: "1px"}}></div>
                  <div className="col-md-5 text-center"></div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <div className="form-group col-md-12 hive_data_cell">
                    <label >Advanced Content</label>
                    <MosyHtmlEditor
                    key={`reload - ${web_contentNode?.primkey}`}
                    module="web_content"
                    field="txt_advanced_content"
                    label="Advanced Content"
                    value={web_contentNode?.advanced_content || ""}
                    onChange={handleInputChange}
                    context={{ hostParent: hostParent  }}
                    inputOverrides={{}}
                    type="content_editable"
                    cellOverrides={{additionalClass: "d-none"}}
                    
                    />
                    <div className="col-md-12  p-0 m-0 ck_raw_content d-none"  id="advanced_content_toprint">{web_contentNode?.advanced_content || ""}</div>
                    
                  </div>
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="WebcontentMainProfilePage"
                  tblName="web_content"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="web_content_uptoken" name="web_content_uptoken" value={paramWebcontentUptoken}/>
              <input type="hidden" id="web_content_mosy_action" name="web_content_mosy_action" value={webcontentActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          
          
          <style jsx global>{`
          .data_list_section {
            display: none;
          }
          .bottom_tbl_handler{
            padding-bottom:70px!important;
          }
          `}
        </style>
        {web_contentNode?.primkey && (
          <section className="col-md-12 m-0 bg-white pt-5 p-0 ">
            <h5 className="col-md-12 text-left  border-bottom pl-lg-1 text-muted mb-3"> {`Other Sections`} </h5>
            
            <WebcontentList
            key={`${customQueryStr}-${localEventSignature}`}
            dataIn={{
              parentStateSetters : stateItemSetters,
              parentUseEffectKey : localEventSignature,
              showNavigationIsle:false,
              showDataControlSections:false,
              customQueryStr : '',
              customProfilePath:""
              
            }}
            
            dataOut={{
              setChildDataOut: InteprateWebcontentEvent,
              setChildDataOutSignature: (sig) => console.log("Signature changed:", sig),
            }}
            />
          </section>
        )}
      </div>
    </div>
  </div>
  
  
  {/* snack notifications -- */}
  {snackMessage &&(
    <MosySnackWidget
    content={snackMessage}
    duration={5000}
    type="custom"
    onDone={() => {
      stateItemSetters.setSnackMessage("");
      stateItem.snackOnDone(); // Run whats inside onDone
      deleteUrlParam("snack_alert")
    }}
    
    />)}
    {/* snack notifications -- */}
    
    
    {/* ================== End Feature Section========================== ------*/}
  </div>
  
);

}

