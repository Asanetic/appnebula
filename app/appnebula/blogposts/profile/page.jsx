import { Suspense } from 'react';

import BlogpostsProfile from '../uiControl/BlogpostsProfile';

import { InteprateBlogpostsEvent } from '../dataControl/BlogpostsRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Blog Posts "//searchParams?.mosyTitle || "Blog Posts";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Blog Posts`,
    description: 'appnebula Blog Posts',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function BlogpostsMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <BlogpostsProfile 
                    dataIn={{ parentUseEffectKey: "initBlogpostsProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateBlogpostsEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}