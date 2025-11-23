import "./App.css";
import Inicio from "./components/Inicio/Inicio.jsx";
import IconPage from "./components/Widgets/IconPage.jsx";
import { SideProgressNav } from "./components/Widgets/SideProgressBar.jsx";
import AboutMeSection from "./components/AboutMe/AboutMeSection.jsx";
import ProcessSection from "./components/Process/ProcessSection.jsx";



function App() {
  

  return (
    <div className="pagina-completa">
      <IconPage />
     
      <SideProgressNav />


      <section id="inicio" className="inicio">
        <Inicio />
      </section>
      
      <section id="quienes-somos" className="quienes-somos">
        <AboutMeSection/>
      </section>
      <section id="proceso">
        <ProcessSection/>
      </section>
      
    </div>
  );
}

export default App;
