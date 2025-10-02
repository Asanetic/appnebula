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
import { loadBlogpostsListData, popDeleteDialog, InteprateBlogpostsEvent  } from '../dataControl/BlogpostsRequestHandler';

//state management
import { useBlogpostsState } from '../dataControl/BlogpostsStateManager';

import logo from '../../../img/logo/logo.png'; // outside public!

//large text
import ReactMarkdown from 'react-markdown';

//routes manager
///handle routes
import { getApiRoutes } from '../../AppRoutes/apiRoutesHandler';

// Use default base root (/)
const apiRoutes = getApiRoutes();


//export list

export default function BlogpostsList({ dataIn = {}, dataOut = {} }) {
  
  //incoming data in from parent
  const {
    customQueryStr = "",
    customProfilePath="../blogposts/profile",
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
  
  //manage Blogposts states
  const [stateItem, stateItemSetters] = useBlogpostsState(settersOverrides);
  
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
    
    loadBlogpostsListData(customQueryStr, stateItemSetters);
    
  }, [localEventSignature]);
  
  
  
  return (
    
    <div className={`col-md-12 bg-white p-0 m-0  ${showDataControlSections && ("main_list_container")}  `} style={{marginTop: "0px", paddingBottom: "0px"}}>
      <form method="post" onSubmit={()=>{mosyFilterUrl({tableName:"blog_posts", keyword:stateItem.blogpostsQuerySearchStr})}} encType="multipart/form-data">
      
      {showDataControlSections && (<div className="row justify-content-end col-md-12 text-right pt-3 pb-3 data_list_section ml-0 mr-0 mb-3 border-bottom pr-0 pl-0" id="">
        <div className="col-md-6 p-0 text-left pt-3 hive_list_title">
          <h6 className="text-muted"><b> Blog Posts </b></h6>
        </div>
        <div className="col-md-6 p-0 text-right hive_list_search_tray">
          <input type="text" id="txt_blog_posts" name="txt_blog_posts" className="custom-search-input form-control" placeholder="Search in Blog Posts "
          onChange={(e) => stateItemSetters.setBlogpostsQuerySearchStr(e.target.value)}
          />
          <button className="custom-search-botton" id="qblog_posts_btn" name="qblog_posts_btn" type="submit"><i className="fa fa-search mr-1"></i> Go </button>
        </div>
        <div className="col-md-12 pt-5 p-0 hive_list_search_divider" id=""></div>
        <div className="row justify-content-end m-0 p-0 col-md-12 hive_list_action_btn_tray" id="">
          <div className="col-md-5 d-none p-0 text-left hive_list_nav_left_ribbon" id="">
          </div>
          <div className="col-md-12 p-0 hive_list_nav_right_ribbon" id="">
            {/*--<navgation_buttons/>--*/}
            
            <a href="list" className="medium_btn border border_set btn-white hive_list_nav_refresh ml-3"><i className="fa fa-refresh mr-1 "></i> Refresh </a>
            
            
            <AddNewButton src="BlogpostsList" link={customProfilePath} label="New Post" icon="edit" />
          </div>
        </div>
      </div> )}
      
      
      <div className="table-responsive  data-tables bg-white bottom_tbl_handler">
        
        <table className="table table-hover  text-left printTarget" id="blog_posts_data_table">
          <thead className="text-uppercase">
            <tr>
              <th scope="col">#</th>
              <th>Featured Image</th>
              <th scope="col"><b>Date Posted</b></th>
              <th scope="col"><b>Post Title</b></th>
              <th scope="col"><b>Post Content</b></th>
              <th scope="col"><b>Post Tag</b></th>
              
            </tr>
            
          </thead>
          <tbody>
            {stateItem.blogpostsLoading ? (
              <tr>
                <th scope="col">#</th>
                <td colSpan="5" className="text-muted">
                  <h5 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-spinner fa-spin"></i> Loading Blog Posts ...</h5>
                </td>
              </tr>
            ) : stateItem.blogpostsListData?.length > 0 ? (
              stateItem.blogpostsListData.map((listblog_posts_result, index) => {
                
                
                
                return(
                  <Fragment key={`_row_${listblog_posts_result.primkey}`}>
                    <tr key={listblog_posts_result.primkey}>
                      <td>
                        <div className="table_cell_dropdown">
                          <div className="table_cell_dropbtn"><b>{listblog_posts_result.row_count}</b></div>
                          <div className="table_cell_dropdown-content">
                            <MosySmartDropdownActions
                            tblName="blog_posts"
                            setters={{
                              
                              childStateSetters: stateItemSetters,
                              parentStateSetters: parentStateSetters
                              
                            }}
                            
                            attributes={`${listblog_posts_result.primkey}:${customProfilePath}:false`}
                            callBack={(incomingRequest) => {setChildDataOut(incomingRequest) }}
                            
                            />
                            
                          </div>
                        </div>
                      </td>
                      
                      <td>
                        <MosyImageViewer
                        media={`/api/mediaroom?media=${btoa((listblog_posts_result.post_photo || ""))}`}
                        mediaRoot={""}
                        defaultLogo={logo.src}
                        imageClass="small_thumbnail"
                        />
                      </td>
                      <td scope="col"><span title={listblog_posts_result.date_posted}>{mosyFormatDateOnly(listblog_posts_result.date_posted)}</span></td>
                      <td scope="col"><span title={listblog_posts_result.post_title}>{magicTrimText(listblog_posts_result.post_title, 70)}</span></td>
                      <td scope="col"><span>
                        <ReactMarkdown>
                          
                          {magicTrimText(listblog_posts_result.post, 70)}
                          
                        </ReactMarkdown>
                      </span></td>
                      <td scope="col"><span title={listblog_posts_result.post_tag}>{magicTrimText(listblog_posts_result.post_tag, 70)}</span></td>
                      
                    </tr>
                    
                    
                  </Fragment>)
                  
                })
                
              ) : (
                
                <tr><td colSpan="6" className="text-muted">
                  
                  
                  <div className="col-md-12 text-center mt-4">
                    <h6 className="col-md-12 text-center p-3 mb-5 text-muted"><i className="fa fa-search"></i> Sorry, no blog posts records found</h6>
                    
                    <AddNewButton src="BlogpostsList"  link={customProfilePath} label="New Post" icon="edit" />
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
                
              </tr>
            </tbody>
            
          </table>
          
          <MosyPaginationUi
          src="BlogpostsList"
          tblName="blog_posts"
          totalPages={stateItem.blogpostsListPageCount}
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
  
