import Header from './Header';
import Home from './Home';
import Explore from './Explore';
import Profile from './Profile';
import NewPost from './NewPost';
import Activity from './Activity';
import Navbar from './Navbar';
import css from 'App.module.css';
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StoreContextProvider from 'contexts/StoreContext'

function App() {

  return(
    <Router basename={process.env.PUBLIC_URL}>
      <StoreContextProvider>
        <div className={css.container}>
          <Header/>
          <main className={css.content}>
            <Switch>
              <Route path="/profile/:userId?">
                <Profile/>
              </Route>
              <Route path="/activity">
                <Activity/>
              </Route>
              <Route path="/newPost">
                <NewPost/>
              </Route>
              <Route path="/explore">
                <Explore/>
              </Route>
              <Route path="/:postId?">
                <Home/>
              </Route>
            </Switch>
          </main>
          <div className={css.content}>
            <Navbar/>
          </div>
        </div>
      </StoreContextProvider>
    </Router>
  );
}

export default App;
