import { Suspense } from 'react';

import ProjectportfolioProfile from '../uiControl/ProjectportfolioProfile';

import { InteprateProjectportfolioEvent } from '../dataControl/ProjectportfolioRequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Project Portfolio "//searchParams?.mosyTitle || "Project Portfolio";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Project Portfolio`,
    description: 'appnebula Project Portfolio',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function ProjectportfolioMainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <ProjectportfolioProfile 
                    dataIn={{ parentUseEffectKey: "initProjectportfolioProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateProjectportfolioEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}