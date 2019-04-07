import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import DashboardAdmin from './View/DashboardAdmin';
import TambahBerita from './View/TambahBerita';
import LoginAdmin from './View/LoginAdmin';
import NavbarAdmin from './Component/Navbar';
import Navbara from './Component/Navbar';

class App extends Component {
  render(){
    return (
      <div>
        <Navbara/>
        <Switch>
          <Route exact path="/" component={DashboardAdmin} />
          <Route path="/tambahberita" component={TambahBerita}/>
          <Route path="/login" component={LoginAdmin}/>
        </Switch>
      </div>
    );
  }
}

export default App;
