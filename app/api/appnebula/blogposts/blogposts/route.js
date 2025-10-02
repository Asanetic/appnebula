
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {BlogpostsRowMutations} from './BlogpostsRowMutations';

import listBlogpostsRowMutationsKeys from './BlogpostsMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddBlogposts, UpdateBlogposts } from './BlogpostsDbGateway';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const encodedMutations = searchParams.get('mutations');

    let requestedMutationsObj = {};
    if (encodedMutations) {
      try {
        const decodedMutations = Buffer.from(encodedMutations, 'base64').toString('utf-8');
        requestedMutationsObj = JSON.parse(decodedMutations);
      } catch (err) {
        console.error('Mutation decode failed:', err);
      }
    }

    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(request);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    

    // ✅ Provide default fallbacks
    const enhancedParams = {
      tbl: 'blog_posts',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('blog_posts', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('blog_posts', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listBlogpostsRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, BlogpostsRowMutations);

      return Response.json({
        status: 'success',
        message: 'Blogposts data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Blogposts failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(BlogpostsRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = BlogpostsRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await BlogpostsRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await BlogpostsRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(BlogpostsRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const BlogpostsFormAction = body.blog_posts_mosy_action;
    const blog_posts_uptoken_value = base64Decode(body.blog_posts_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  blog_posts inputs array ---// 
  const BlogpostsInputsArr = {

    "date_posted" : "?", 
    "post_title" : "?", 
    "post" : "?", 
    "post_photo" : "?", 
    "date_updated" : "?", 
    "post_keywords" : "?", 
    "published" : "?", 
    "post_tag" : "?", 
    "publisher" : "?", 
    "publisher_name" : "?", 
    "admin_id" : "?", 
    "month_year" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End blog_posts inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('blog_posts',BlogpostsInputsArr, BlogpostsRequest, newId, authData)

    if (BlogpostsFormAction === "add_blog_posts") 
    {
      
      mutatedDataArray.post_id = newId;
      
      // Insert into table Blogposts
      const result = await AddBlogposts(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for post_photo, if any
                if (body.txt_blog_posts_post_photo) {
                  if(body["txt_blog_posts_post_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_blog_posts_post_photo"], "media/blog_posts");
                    
                    BlogpostsInputsArr.post_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateBlogposts(newId, { post_photo: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_blog_posts_post_photo;
                      
                    //Delete file if need be

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        blog_posts_uptoken: result.record_id
      });
      
    }
    
    if (BlogpostsFormAction === "update_blog_posts") {
      
      // update table Blogposts
      const result = await UpdateBlogposts(newId, mutatedDataArray, body, authData, `primkey='${blog_posts_uptoken_value}'`)

      
                // Now handle the file upload for post_photo, if any
                if (body.txt_blog_posts_post_photo) {
                  if(body["txt_blog_posts_post_photo"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_blog_posts_post_photo"], "media/blog_posts");
                    
                    BlogpostsInputsArr.post_photo = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateBlogposts(newId, { post_photo: filePath }, body, authData,  `primkey='${blog_posts_uptoken_value}'`)
                    
                    let fileToDelete = body.media_blog_posts_post_photo;
                      
                    //Delete old file
mosyDeleteFile(fileToDelete);
// Log or store deleted file: fileToDelete

                  } catch (fileErr) {
                    console.error("File upload failed:", fileErr);
                    // You can either handle this error or return a partial success message
                  }
                }
               }

      return Response.json({
        status: 'success',
        message: result.message,
        blog_posts_uptoken: blog_posts_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${BlogpostsFormAction}`
    }, { status: 400 });

  } catch (err) {
    console.error(`Request failed:`, err);
    return Response.json(
      { status: 'error', 
      message: `Data Post error ${err.message}` },
      { status: 500 }
    );
  }
}