
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert web_content 
export async function AddWebcontent(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("web_content", mutatedDataArray, body);
   
  return result;
}


//update web_content 
export async function UpdateWebcontent(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("web_content", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete web_content 
export async function DeleteWebcontent(tokenId, whereStr)
{  
  const result = await mosySqlDelete("web_content", whereStr);

  return result;
}

