import { useState } from 'react';
import './App.css';
import { Footer, Header, MainContent, Sidebar, Modal} from './components';

function App():JSX.Element {
  
  // const [ displayModal, setDisplayModal ] = useState(false);
  const [ displayModal, setDisplayModal ] = useState(true);
  
  return (
    <div className="App">
      {/* { displayModal && 
        (
          <Modal
            onClick={setDisplayModal}
          >
            {null}
          </Modal>
        )
      } */}
      <Header/>
      <Sidebar/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
