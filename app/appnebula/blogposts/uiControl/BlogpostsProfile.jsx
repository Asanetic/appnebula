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
import { inteprateBlogpostsFormAction, blogpostsProfileData , popDeleteDialog, InteprateBlogpostsEvent } from '../dataControl/BlogpostsRequestHandler';

//state management
import { useBlogpostsState } from '../dataControl/BlogpostsStateManager';

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




// export profile


export default function BlogpostsProfile({ dataIn = {}, dataOut = {} }) {
  
  //initiate data exchange manifest
  //incoming data from parent
  const {
    showNavigationIsle = true,
    customQueryStr = "",
    parentUseEffectKey = "",
    parentStateSetters=null,
    customProfileData={},
    hostParent="BlogpostsMainProfilePage",
    parentProfileItemId = "BlogpostsProfileTray"
    
  } = dataIn;
  
  //outgoing data to parent
  const {
    setChildDataOut = () => {},
    setChildDataOutSignature = () => {},
  } = dataOut;
  
  
  //set default state values
  const settersOverrides  = {localEventSignature : parentUseEffectKey,   activeScrollId : parentProfileItemId}
  
  //manage Blogposts states
  const [stateItem, stateItemSetters] = useBlogpostsState(settersOverrides);
  const blog_postsNode = stateItem.blogpostsNode
  
  // -- basic states --//
  const paramBlogpostsUptoken  = stateItem.blogpostsUptoken
  const blogpostsActionStatus = stateItem.blogpostsActionStatus
  const snackMessage = stateItem.snackMessage
  const activeScrollId = stateItem.activeScrollId
  
  //const snackOnDone = stateItem.snackOnDone
  
  const localEventSignature = stateItem.localEventSignature
  
  const handleInputChange = mosyFormInputHandler(stateItemSetters.setBlogpostsNode);
  
  //use route navigation system
  const router = useRouter();
  
  //manage post form
  function postBlogpostsFormData(e) {
    
    MosyNotify({message: "Sending request",icon:"send"})
    
    inteprateBlogpostsFormAction(e, stateItemSetters).then(response=>{
      
      setChildDataOut({
        
        actionName : response.actionName,
        dataToken : response.newToken,
        actionsSource : "postBlogpostsFormData",
        setters :{
          
          childStateSetters: stateItemSetters,
          parentStateSetters: parentStateSetters
          
        }
        
      })
      
      //focus on this form on submission
      stateItemSetters.setActiveScrollId("BlogpostsProfileTray")
      mosyScrollTo(activeScrollId)
      
      closeMosyModal()
      
    })
    
  }
  
  useEffect(() => {
    
    blogpostsProfileData(customQueryStr, stateItemSetters, router, customProfileData)
    
    mosyScrollTo(activeScrollId)
    
  }, [localEventSignature]);
  
  
  
  //child queries use effect
  
  
  
  return (
    
    <div className="p-0 col-md-12 text-center row justify-content-center m-0  " id="BlogpostsProfileTray">
      {/* ================== Start Feature Section========================== ------*/}
      
      
      <div className="col-md-12 rounded text-left p-2 mb-0  bg-white ">
        <div className={` profile_container col-md-12 m-0 p-0  ${showNavigationIsle &&("pr-lg-4 pl-lg-4 m-0")}`}>
          <form onSubmit={postBlogpostsFormData} encType="multipart/form-data" id="blog_posts_profile_form">
            
            {/*    Title isle      */}
            <div className="col-md-12 pt-4 p-0 hive_profile_title_top d-lg-none" id=""></div>
            <h3 className="col-md-12 title_text text-left p-0 pt-3 hive_profile_title row justify-content-center m-0 ">
              <div className="col m-0 p-0 pb-3">
                {blog_postsNode?.primkey ? (  <span>{`Post / ${blog_postsNode?.post_title}`} </span> ) :(<span> New Post</span>)}
              </div>
              <>{!showNavigationIsle && (<div className="col m-0 p-0 text-right ">
                {paramBlogpostsUptoken && (
                  <DeleteButton
                  src="BlogpostsMainProfilePage"
                  tableName="blog_posts"
                  uptoken={paramBlogpostsUptoken}
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
                
                
                
                {paramBlogpostsUptoken && (
                  <>
                  
                </>
              )}
              
              {paramBlogpostsUptoken && showNavigationIsle && (
                <>
                
                <DeleteButton
                src="BlogpostsMainProfilePage"
                tableName="blog_posts"
                uptoken={paramBlogpostsUptoken}
                stateItemSetters={stateItemSetters}
                parentStateSetters={parentStateSetters}
                router={router}
                onDelete={popDeleteDialog}
                />
                
                
                <AddNewButton
                src="BlogpostsMainProfilePage"
                tableName="blog_posts"
                link="./profile"
                label="New Post"
                icon="edit" />
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
              <div className="col-md-12 m-2"><b>Featured Image</b></div>
              <MosyImageViewer
              media={`/api/mediaroom?media=${btoa((blog_postsNode?.post_photo || ""))}`}
              mediaRoot={""}
              defaultLogo={logo.src}
              imageClass="product_image"
              />
              
              <MosyFileUploadButton
              tblName="blog_posts"
              attribute="post_photo"
              />
              <input type="hidden" name="media_blog_posts_post_photo" value={blog_postsNode?.post_photo || ""}/>
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
                  <div className="col-md-5 text-center">Post Details</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <MosySmartField
                  module="blog_posts"
                  field="post_title"
                  label="Post Title"
                  value={blog_postsNode?.post_title || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="title"
                  cellOverrides={{additionalClass: "col-md-12 hive_data_cell"}}
                  />
                  
                  
                  <div className="form-group col-md-12 hive_data_cell">
                    <label >Post Content</label>
                    <MosyHtmlEditor
                    key={`reload - ${blog_postsNode?.primkey}`}
                    module="blog_posts"
                    field="txt_post"
                    label="Post Content"
                    value={blog_postsNode?.post || ""}
                    onChange={handleInputChange}
                    context={{ hostParent: hostParent  }}
                    inputOverrides={{}}
                    type="content_editable"
                    cellOverrides={{additionalClass: "d-none"}}
                    
                    />
                    <div className="col-md-12  p-0 m-0 ck_raw_content d-none"  id="post_toprint">{blog_postsNode?.post || ""}</div>
                    
                  </div>
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label className="d-none">Post Tag</label>
                    
                    <SmartDropdown
                    apiEndpoint={apiRoutes.blogposts.base}
                    idField="primkey"
                    labelField="post_tag"
                    inputName="txt_post_tag"
                    label="Post Tag"
                    onSelect={(val) => console.log('Selected:', val)}
                    defaultValue={blog_postsNode?.post_tag || ""}
                    />
                  </div>
                  
                  
                  <div className="form-group col-md-6 hive_data_cell ">
                    <label >Publish status</label>
                    
                    <select name="txt_published" id="txt_published" className="form-control">
                      <option  value={blog_postsNode?.published || ""}>{blog_postsNode?.published || "Select Publish status"}</option>
                      <option>Draft</option>
                      <option>Published</option>
                      
                    </select>
                  </div>
                  
                  
                  <MosySmartField
                  module="blog_posts"
                  field="post_keywords"
                  label="SEO Keywords"
                  value={blog_postsNode?.post_keywords || ""}
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
                  <div className="col-md-5 text-center">Publication Info</div>
                  <div className="col-md-4 bg-dark mt-3" style={{height: "1px"}}></div>
                </h5>
                
                <div className="col-md-12 pt-3 p-0" id=""></div>
                
                <div className="row justify-content-start col-md-12 p-0 m-0 ">
                  
                  <MosySmartField
                  module="blog_posts"
                  field="date_posted"
                  label="Date Posted"
                  value={blog_postsNode?.date_posted || ""}
                  onChange={handleInputChange}
                  context={{ hostParent: hostParent  }}
                  inputOverrides={{}}
                  type="date"
                  cellOverrides={{additionalClass: "col-md-6 hive_data_cell "}}
                  />
                  
                </div>
                
                <div className="col-md-12 text-center">
                  <SubmitButtons
                  src="BlogpostsMainProfilePage"
                  tblName="blog_posts"
                  extraClass="optional-custom-class"
                  
                  />
                </div>
              </div></div>
              {/*    Input cells section isle      */}
            </div>
            
            <section className="hive_control">
              <input type="hidden" id="blog_posts_uptoken" name="blog_posts_uptoken" value={paramBlogpostsUptoken}/>
              <input type="hidden" id="blog_posts_mosy_action" name="blog_posts_mosy_action" value={blogpostsActionStatus}/>
            </section>
            
            
          </div>
          
        </form>
        
        
        <div className="row justify-content-center m-0 pr-lg-1 pl-lg-1 pt-0 col-md-12" id="">
          {/*<hive_mini_list/>*/}
          
          
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

