import './App.css';
import { Footer, Header, MainContent, Sidebar, ErrorBoundary} from './components';

function App():JSX.Element {
  
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
