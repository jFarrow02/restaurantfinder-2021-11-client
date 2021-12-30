import { useState } from 'react';
import './App.css';
import { Footer, Header, MainContent, Sidebar, Modal} from './components';

function App():JSX.Element {
  
  const [ displayModal, setDisplayModal ] = useState(false);

  return (
    <div className="App">
      { displayModal && <Modal></Modal>}
      <Header/>
      <Sidebar/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
