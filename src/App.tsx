import React, { useEffect } from 'react';
import './App.css';
import { RestaurantInterface } from './models/RestaurantInterface';
import RestaurantService from './services/restaurantService';
import { Footer, Header, MainContent, Sidebar} from './components';

function App() {
  const fetchRestaurant = async (): Promise<RestaurantInterface> => {
    const data = await (await RestaurantService.findRestaurantByName('Morris Park Bake Shop')).json();
    return data;
  };

  useEffect(function() {
    fetchRestaurant()
      .then(res => console.log(res))
      .catch(err => {throw err});
  })

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
