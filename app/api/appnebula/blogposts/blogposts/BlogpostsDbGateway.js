
import { mosySqlDelete  , mosySqlInsert , mosySqlUpdate } from "../../../apiUtils/dataControl/dataUtils";

//insert blog_posts 
export async function AddBlogposts(newId, mutatedDataArray, body, authData)
{

  const result = await mosySqlInsert("blog_posts", mutatedDataArray, body);
   
  return result;
}


//update blog_posts 
export async function UpdateBlogposts(newId, mutatedDataArray, body, authData, whereStr)
{

  const result = await mosySqlUpdate("blog_posts", mutatedDataArray, body, whereStr);
  
  return result;
}


//delete blog_posts 
export async function DeleteBlogposts(tokenId, whereStr)
{  
  const result = await mosySqlDelete("blog_posts", whereStr);

  return result;
}

