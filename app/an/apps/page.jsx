// app/portfolio/page.js
import AppList from './AppList';
import { NavBar } from '../elements/navbar';
import HeroSection from '../elements/hero1';
import Footer from '../elements/footer';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";

export async function generateMetadata({ searchParams }) {
  const mosyTitle = "Apps : Kibao business apps "//searchParams?.mosyTitle || "Project Portfolio";

  return {
    title: mosyTitle,
    description: 'App Nebula: your haven for tailored business software.',    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}

export default function ProjectportfolioMainListPage({ searchParams }) {
  return (
    <div className="main-wrapper">
      <div className="content container-fluid p-0 m-0">
        <NavBar/>
        <HeroSection/>
        <AppList loadMeta={false} /> {/* Disable client-side meta */}
        <Footer/>
      </div>
    </div>
  );
}
