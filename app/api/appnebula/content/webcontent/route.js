
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {WebcontentRowMutations} from './WebcontentRowMutations';

import listWebcontentRowMutationsKeys from './WebcontentMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddWebcontent, UpdateWebcontent } from './WebcontentDbGateway';


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
      tbl: 'web_content',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('web_content', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('web_content', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listWebcontentRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, WebcontentRowMutations);

      return Response.json({
        status: 'success',
        message: 'Webcontent data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Webcontent failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(WebcontentRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = WebcontentRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await WebcontentRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await WebcontentRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(WebcontentRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const WebcontentFormAction = body.web_content_mosy_action;
    const web_content_uptoken_value = base64Decode(body.web_content_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  web_content inputs array ---// 
  const WebcontentInputsArr = {

    "section_title" : "?", 
    "section_pic" : "?", 
    "section_content" : "?", 
    "section_tag" : "?", 
    "page_name" : "?", 
    "site_name" : "?", 
    "custom_field_1" : "?", 
    "custom_field_2" : "?", 
    "custom_field_3" : "?", 
    "custom_field_4" : "?", 
    "custom_field_5" : "?", 
    "custom_field_6" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 
    "section_key" : "?", 
    "advanced_content" : "?", 

  };

  //--- End web_content inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('web_content',WebcontentInputsArr, WebcontentRequest, newId, authData)

    if (WebcontentFormAction === "add_web_content") 
    {
      
      mutatedDataArray.site_cont_key = newId;
      
      // Insert into table Webcontent
      const result = await AddWebcontent(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for section_pic, if any
                if (body.txt_web_content_section_pic) {
                  if(body["txt_web_content_section_pic"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_web_content_section_pic"], "media/web_content");
                    
                    WebcontentInputsArr.section_pic = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateWebcontent(newId, { section_pic: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_web_content_section_pic;
                      
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
        web_content_uptoken: result.record_id
      });
      
    }
    
    if (WebcontentFormAction === "update_web_content") {
      
      // update table Webcontent
      const result = await UpdateWebcontent(newId, mutatedDataArray, body, authData, `primkey='${web_content_uptoken_value}'`)

      
                // Now handle the file upload for section_pic, if any
                if (body.txt_web_content_section_pic) {
                  if(body["txt_web_content_section_pic"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_web_content_section_pic"], "media/web_content");
                    
                    WebcontentInputsArr.section_pic = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateWebcontent(newId, { section_pic: filePath }, body, authData,  `primkey='${web_content_uptoken_value}'`)
                    
                    let fileToDelete = body.media_web_content_section_pic;
                      
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
        web_content_uptoken: web_content_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${WebcontentFormAction}`
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