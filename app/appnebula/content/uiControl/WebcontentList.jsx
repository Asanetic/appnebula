'use client';
//React
import { useEffect, useState ,Fragment } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';




//custom utils
import { deleteUrlParam, magicTrimText, mosyUrlParam, mosyFormatDateOnly , mosyFormatDateTime} from '../../../MosyUtils/hiveUtils';
import { mosyFilterUrl } from '../../DataControl/MosyFilterEngine';

//list components
import {
  MosySmartDropdownActions,
  AddNewButton,
  MosyActionButton,
  MosyGridRowOptions,
  MosyPaginationUi,
  DeleteButton,
  MosyImageViewer
} from '../../UiControl/componentControl';

import MosySnackWidget from '../../../MosyUtils/MosySnackWidget';

//data
import { loadWebcontentListData, popDeleteDialog, InteprateWebcontentEvent  } from '../dataControl/WebcontentRequestHandler';

//state management
import { useWebcontentState } from '../dataControl/WebcontentStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();


//export list

export default function WebcontentList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="../content/profile",
    showDataControlSections = true,
    parentUseEffectKey = "",
    parentStateSetters=null,
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey}
  
  //manage Webcontent states
  const [stateItem, stateItemSetters] = useWebcontentState(settersOverrides);
  
  const localEventSignature = stateItem.localEventSignature
  const snackMessage = stateItem.snackMessage
  const snackOnDone = stateItem.snackOnDone
  
  //use route navigation system if need be
  const router = useRouter();
  
  useEffect(() => {
    
    const snackUrlAlert = mosyUrlParam("snack_alert")
    if(snackUrlAlert)
    {
      stateItemSetters.setSnackMessage(snackUrlAlert)
    }
    
    loadWebcontentListData(customQueryStr, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  return (
    
    <div className={`col-md-12 bg-white p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"web_content", keyword:stateItem.webcontentQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Web content </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_web_content" name="txt_web_content" className="custom-search-input form-control" placeholder="Search in Web content "
          onChange={(e) => stateItemSetters.setWebcontentQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qweb_content_btn" name="qweb_content_btn" type="submit"><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <a href="list" className="medium_btn border border_set btn-white hive_list_nav_refresh ml-3"><i className="fa fa-refresh mr-1 "></i> Refresh </a>
            
            
            <AddNewButton src="WebcontentList" link={customProfilePath} label="New Content" icon="plus" />
          </div>
        </div>
      </div> )}
      
      
      <div className="table-responsive  data-tables bg-white bottom_tbl_handler">
        
        <table className="table table-hover  text-left printTarget" id="web_content_data_table">
          <thead className="text-uppercase">
            <tr>
              <th scope="col">#</th>
              <th>Section Image</th>
              <th scope="col"><b>Section Title</b></th>
              <th scope="col"><b>Section Content</b></th>
              <th scope="col"><b>Section Tag</b></th>
              <th scope="col"><b>Page Name</b></th>
              <th scope="col"><b>Section Key</b></th>
              <th scope="col"><b>Advanced Content</b></th>
              
            </tr>
            
          </thead>
          <tbody>
            {stateItem.webcontentLoading ? (
              <tr>
                <th scope="col">#</th>
                <td colSpan="7" className="text-muted">
                  <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Web content ...</h5>
                </td>
              </tr>
            ) : stateItem.webcontentListData?.length > 0 ? (
              stateItem.webcontentListData.map((listweb_content_result, index) => {
                
                
                
                return(
                  <Fragment key={`_row_${listweb_content_result.primkey}`}>
                    <tr key={listweb_content_result.primkey}>
                      <td>
                        <div className="table_cell_dropdown">
                          <div className="table_cell_dropbtn"><b>{listweb_content_result.row_count}</b></div>
                          <div className="table_cell_dropdown-content">
                            <MosySmartDropdownActions
                            tblName="web_content"
                            setters={{
                              
                              childStateSetters: stateItemSetters,
                              parentStateSetters: parentStateSetters
                              
                            }}
                            
                            attributes={`${listweb_content_result.primkey}:${customProfilePath}:false`}
                            callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                            
                            />
                            
                          </div>
                        </div>
                      </td>
                      
                      <td>
                        <MosyImageViewer
                        media={`/api/mediaroom?media=${btoa((listweb_content_result.section_pic || ""))}`}
                        mediaRoot={""}
                        defaultLogo={logo.src}
                        imageClass="small_thumbnail"
                        />
                      </td>
                      <td scope="col"><span title={listweb_content_result.section_title}>{magicTrimText(listweb_content_result.section_title, 70)}</span></td>
                      <td scope="col"><span>
                        <ReactMarkdown>
                          
                          {magicTrimText(listweb_content_result.section_content, 70)}
                          
                        </ReactMarkdown>
                      </span></td>
                      <td scope="col"><span title={listweb_content_result.section_tag}>{magicTrimText(listweb_content_result.section_tag, 70)}</span></td>
                      <td scope="col"><span title={listweb_content_result.page_name}>{magicTrimText(listweb_content_result.page_name, 70)}</span></td>
                      <td scope="col"><span title={listweb_content_result.section_key}>{magicTrimText(listweb_content_result.section_key, 70)}</span></td>
                      <td scope="col"><span>
                        <ReactMarkdown>
                          
                          {magicTrimText(listweb_content_result.advanced_content, 70)}
                          
                        </ReactMarkdown>
                      </span></td>
                      
                    </tr>
                    
                    
                  </Fragment>)
                  
                })
                
              ) : (
                
                <tr><td colSpan="8" className="text-muted">
                  
                  
                  <div className="col-md-12 text-center mt-4">
                    <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no web content records found</h6>
                    
                    <AddNewButton src="WebcontentList"  link={customProfilePath} label="New Content" icon="plus" />
                    <div className="col-md-12 pt-5 " id=""></div>
                  </div>
                </td></tr>
                
              )}
              
              <tr className="bg-light">
                <th></th>
                <th></th>
                <th scope="col"><b></b></th>
                <th scope="col"><b></b></th>
                <th scope="col"><b></b></th>
                <th scope="col"><b></b></th>
                <th scope="col"><b></b></th>
                <th scope="col"><b></b></th>
                
              </tr>
            </tbody>
            
          </table>
          
          <MosyPaginationUi
          src="WebcontentList"
          tblName="web_content"
          totalPages={stateItem.webcontentListPageCount}
          stateItemSetters={stateItemSetters}
          />
        </div>
        
        
      </form>
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
      </div>
    );
    
  }
  
