
//utils 
import { mosySqlInsert, mosySqlUpdate, base64Decode, mosyFlexSelect, mosyUploadFile, mosyDeleteFile, magicRandomStr } from '../../../apiUtils/dataControl/dataUtils';

import {ProjectportfolioRowMutations} from './ProjectportfolioRowMutations';

import listProjectportfolioRowMutationsKeys from './ProjectportfolioMutationKeys';

//be gate keeper and auth 
import { validateSelect , mosyMutateQuery, mutateInputArray } from '../../beMonitor';
import { processAuthToken } from '../../../auth/authManager';

import { AddProjectportfolio, UpdateProjectportfolio } from './ProjectportfolioDbGateway';


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
      tbl: 'projects',
      colstr: queryParams.colstr || 'Kg==', // default to *
      ...queryParams 
    };

    // 🧠 Clean up optional params if missing
    if (!enhancedParams.pagination) delete enhancedParams.pagination;
    if (!enhancedParams.q) delete enhancedParams.q;
    if (!enhancedParams.function_cols) enhancedParams.function_cols = '';

    //append further queries to client query request , account filters order by group by  etc
    const mutatedQparam = mosyMutateQuery('projects', searchParams, authData, 'primkey')

    enhancedParams.q=mutatedQparam
    
    let requestValid =validateSelect('projects', queryParams, authData)

    if(!requestValid)
    {
      return Response.json(
        { status: 'error', message: 'Request is invalid' },
        { status: 400 }
      );

    }
 
    const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
    const mutationsObj = isEmpty(requestedMutationsObj) ? listProjectportfolioRowMutationsKeys : requestedMutationsObj;
    
    if(requestValid){
    
      const result = await mosyFlexSelect(enhancedParams, mutationsObj, ProjectportfolioRowMutations);

      return Response.json({
        status: 'success',
        message: 'Projectportfolio data retrieved',
        ...result,
      });
      
   }
  } catch (err) {
    console.error('GET Projectportfolio failed:', err);
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}



export async function POST(ProjectportfolioRequest) {
  try {
    let body;
    let isMultipart = false;

    const contentType = ProjectportfolioRequest.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      isMultipart = true;
      const formData = await ProjectportfolioRequest.formData();

      // Convert FormData to plain object
      body = {};
      for (let [key, value] of formData.entries()) {
        body[key] = value;
      }

    } else {
      body = await ProjectportfolioRequest.json();
    }
    
    
    const { valid: isTokenValid, reason: tokenError, data: authData } = processAuthToken(ProjectportfolioRequest);
     
    if (!isTokenValid) {
      return Response.json(
        { status: 'unauthorized', message: tokenError },
        { status: 403 }
      );
    }
    
    const ProjectportfolioFormAction = body.projects_mosy_action;
    const projects_uptoken_value = base64Decode(body.projects_uptoken);
    
    const newId = magicRandomStr(7);


		
  
  //--- Begin  projects inputs array ---// 
  const ProjectportfolioInputsArr = {

    "title" : "?", 
    "description" : "?", 
    "thumbnail" : "?", 
    "video_link" : "?", 
    "category" : "?", 
    "created_at" : "?", 
    "updated_at" : "?", 
    "hive_site_id" : "?", 
    "hive_site_name" : "?", 

  };

  //--- End projects inputs array --//

    //mutate requested values
    const mutatedDataArray =mutateInputArray('projects',ProjectportfolioInputsArr, ProjectportfolioRequest, newId, authData)

    if (ProjectportfolioFormAction === "add_projects") 
    {
      
      mutatedDataArray.record_id = newId;
      
      // Insert into table Projectportfolio
      const result = await AddProjectportfolio(newId, mutatedDataArray, body, authData);     

       
                // Now handle the file upload for thumbnail, if any
                if (body.txt_projects_thumbnail) {
                  if(body["txt_projects_thumbnail"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_projects_thumbnail"], "media/projects");
                    
                    ProjectportfolioInputsArr.thumbnail = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateProjectportfolio(newId, { thumbnail: filePath }, body, authData,  `primkey='${result.record_id}'`)
                    
                    let fileToDelete = body.media_projects_thumbnail;
                      
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
        projects_uptoken: result.record_id
      });
      
    }
    
    if (ProjectportfolioFormAction === "update_projects") {
      
      // update table Projectportfolio
      const result = await UpdateProjectportfolio(newId, mutatedDataArray, body, authData, `primkey='${projects_uptoken_value}'`)

      
                // Now handle the file upload for thumbnail, if any
                if (body.txt_projects_thumbnail) {
                  if(body["txt_projects_thumbnail"].size>0){
                  try {
                    
                    const filePath = await mosyUploadFile(body[ "txt_projects_thumbnail"], "media/projects");
                    
                    ProjectportfolioInputsArr.thumbnail = filePath; // Update file path in the database

                    // After file upload, update the database with the file path
                    await UpdateProjectportfolio(newId, { thumbnail: filePath }, body, authData,  `primkey='${projects_uptoken_value}'`)
                    
                    let fileToDelete = body.media_projects_thumbnail;
                      
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
        projects_uptoken: projects_uptoken_value
      });
    }    

    // Optional: catch unrecognized actions
    return Response.json({
      status: 'error',
      message: `Invalid action: ${ProjectportfolioFormAction}`
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