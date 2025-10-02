import { Suspense } from 'react';

import WebcontentList from '../uiControl/WebcontentList';

import { InteprateWebcontentEvent } from '../dataControl/WebcontentRequestHandler';
    
import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Web content "//searchParams?.mosyTitle || "Web content";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : `Web content`,
    description: 'appnebula Web content',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function WebcontentMainListPage() {

return (
        <>
         <div className="main-wrapper">
           <div className="page-wrapper">
              <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
               
                    <WebcontentList  
                    
                     dataIn={{ parentUseEffectKey: "loadWebcontentList" }}
                       
                     dataOut={{
                       setChildDataOut: InteprateWebcontentEvent
                     }}
                    />
                    
                  </Suspense>                 
              </div>
            </div>
          </div>
        </>
      );
    }