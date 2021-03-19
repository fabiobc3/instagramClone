import Header from './Header';
import Home from './Home';
import Explore from './Explore';
import Profile from './Profile';
import NewPost from './NewPost';
import Activity from './Activity';
import Navbar from './Navbar';
import css from 'App.module.css';
import React from 'react';
import initialStore from 'utils/initialStore';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page : "home",
      store: initialStore 
    }
    this.setPage = this.setPage.bind(this);
  }
  setPage(page){
    this.setState({page: page});
  }
  renderMain(page){
    switch(page){
      case "home" : return <Home store={this.state.store} />;
      case "explore" : return <Explore/>;
      case "newPost" : return <NewPost/>;
      case "activity" : return <Activity/>;
      case "profile" : return <Profile  store={this.state.store}/>;
      default: return <Home/>;
    }
  }
  render (){
    return(
    <div className={css.container}>
      <Header/>
      <main className={css.content}>
        {this.renderMain(this.state.page)}
      </main>
      <div className={css.content}>
        <Navbar onNavChange={this.setPage}/>
      </div>
    </div>
    );
  }
}

export default App;
