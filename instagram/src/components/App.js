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

function App() {
  
  const [page, setPage] = useState('home');
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
		// TODO:
		// 1. Create a new post object (use uniqueId('post') to create an id)
		// 2. Update the store 
		// 3. Call setPage to come back to the home page
    const post = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo: photo,
      desc: desc,
      datetime: new Date().toISOString()     
    }
    setStore({
      ...store,
        posts:store.posts.concat(post)
    });
    setPage('home');
  }

	function cancelPost(){
		// TODO:
		// 1. Call setPage to come back to the home page (we will use Router to improve this)
    setPage('home');
	}
	// TODO: Pass "store", "addPost", "cancelPost" to <NewPost/>	

  function renderMain(page){
    switch(page){
      case "home" : return <Home store={store} onComment={addComment} onLike={addLike} onUnlike={removeLike}/>;
      case "explore" : return <Explore/>;
      case "newPost" : return <NewPost store={store} onPost={addPost} onCancel={cancelPost}/>;
      case "activity" : return <Activity/>;
      case "profile" : return <Profile  store={store}/>;
      default: return <Home/>;
    }
  }
  
  return(
    <div className={css.container}>
      <Header/>
      <main className={css.content}>
        {renderMain(page)}
      </main>
      <div className={css.content}>
        <Navbar onNavChange={setPage}/>
      </div>
    </div>
  );



}

export default App;
