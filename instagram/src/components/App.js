import Header from './Header';
import Home from './Home';
import Explore from './Explore';
import Profile from './Profile';
import NewPost from './NewPost';
import Activity from './Activity';
import Navbar from './Navbar';
import css from 'App.module.css';
import React, {useState} from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [store, setStore] = useState(initialStore);

  function addComment(postId, text){
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
        comments:store.comments.concat(comment)
    });
  }

  function addLike(postId){
    const like = {
      userId: store.currentUserId,
      postId,
      datetime: new Date().toISOString() 
    };
    setStore({
      ...store,
        likes:store.likes.concat(like)
    });
  }

  function removeLike(postId){
    setStore({
      ...store,
        likes:store.likes.filter(like => like.userId !== store.currentUserId || like.postId !== postId)
    });
  }

  function addPost(photo, desc){
    const post = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo: photo,
      desc: desc,
      datetime: new Date().toISOString()     
    }
    setStore({
      ...store,
        posts: store.posts.concat(post)
    });
  }

  function addFollower(userId, followerId){
    const newFollow = {           
      userId: userId,
      followerId: followerId 
    }
    console.log(newFollow);
    setStore({
      ...store,
        followers: store.followers.concat(newFollow)
    });
  }

  function removeFollower(userId, followerId){
    setStore({
      ...store,
        followers: store.followers.filter(follower => follower.followerId !== followerId || follower.userId !== userId)
    });
  }

 
  return(
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
          <Switch>
            <Route path="/profile/:userId?">
              <Profile store={store} onFollow={addFollower} onUnfollow={removeFollower}/>
            </Route>
            <Route path="/activity">
              <Activity/>
            </Route>
            <Route path="/newPost">
              <NewPost store={store} onPost={addPost}/>
            </Route>
            <Route path="/explore">
              <Explore/>
            </Route>
            <Route path="/:postId?">
              <Home store={store} onComment={addComment} onLike={addLike} onUnlike={removeLike}/>
            </Route>
          </Switch>
        </main>
        <div className={css.content}>
          <Navbar/>
        </div>
      </div>
    </Router>
  );
}

export default App;
