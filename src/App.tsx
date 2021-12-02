import React from 'react';
import './App.css';
import RestaurantInterface from './models/RestaurantInterface';
import RestaurantService from './services/restaurantService';
import { Footer, Header, MainContent, Sidebar} from './components';
import ErrorResponseInterface from './models/ErrorResponseInterface';

function App():JSX.Element {
  // const fetchRestaurant = async (): Promise<RestaurantInterface | ErrorResponseInterface> => {
  //   // const data = await RestaurantService.findRestaurantByName('Morris Park Bake Shop');
  //   const data = await RestaurantService.findRestaurantByName('foo');
  //   return data;
  // };


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
