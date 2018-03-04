import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import JsonResto from './RestaurantFourchette.json';

class App extends Component {
  render() {
    return (
      <div className = "App" >
      <header className = "App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title" align="center"> Web Application Architectures by Clément JACQUES</h1>
      < /header >
      <p className = "App-intro" >
      Theses are the starred and discounted restaurants.
      </p>
        <div className = "Discount" >
       {
        JsonResto.map((restau) => {
          return <div className="card">
          <br/>
          <div className="container">
          <h4> {restau.name}, {restau.city}, starred: {restau.stars}, promo : {restau.promotions}</h4>
          <a href={restau.link}>Book here</a>
          </div>
          < /div>
        })
      }  </div>
      </div >
    );
  }
}/*
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
        {
                JsonResto.map(function(restau){
            return <li>{restau.name}</li>;
          
          })
              }
        </div>
        
        
      </div>
    );
  }
}*/

JsonResto.map

export default App;
