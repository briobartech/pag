import "./App.css";
import IconPage from "./components/Widgets/IconPage.jsx";
import { SectionRouter } from './routes/routes.jsx';

function App() {
 
  return (
    <div className="pagina-completa">
      <IconPage />
      <SectionRouter />
    </div>
  );
}

export default App;
