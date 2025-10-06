// app/portfolio/page.js
import AppList from './AppList';
import { NavBar } from '../elements/navbar';
import HeroSection from '../elements/hero1';
import Footer from '../elements/footer';
import { hiveRoutes } from "../../appConfigs/hiveRoutes";

// Server-side metadata generation
export async function generateMetadata({ searchParams }) {
  const title = searchParams?.title || "Kibao business apps";
  const description = searchParams?.description || "AppNebula portfolio project";
  const ogImage = searchParams?.ogImage || `${hiveRoutes.hiveBaseRoute}/logo.png`;

  return {
    title,
    description,
    icons: { icon: `${hiveRoutes.hiveBaseRoute}/logo.png` },
    openGraph: { title, description, images: [ogImage] },
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
