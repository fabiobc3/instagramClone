import Post from './Post';
import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';


function findUser(post, users){
    return users.find(user=>user.id===post.userId);
  }

function findComments(post, comments){
  return comments.filter(comment=>comment.postId===post.id);
}

function findLikes(post, likes, currentUserId){
  let postLikes = likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===currentUserId),
    count: postLikes.length
  }
}

function Home(props) {
  let {
    posts, users, comments, likes, currentUserId, 
    addComment, addLike, removeLike
  } = useContext(StoreContext);
  let {postId} = useParams();
  //const store = props.store;
  const render = (postId === undefined ? posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime)) :  posts.filter(post => post.id === postId)); 
	return (
	    <div>
        {render.map(post=>
				  <Post
            key={post.id}
            user={findUser(post, users)}
            post={post}
            desc={post.desc}
            comments={findComments(post, comments)}
            likes={findLikes(post, likes, currentUserId)}
            //store = {store}
            onComment={addComment}
            onLike={addLike}
            onUnlike={removeLike}
          />)}
      </div>
	);
}

export default Home;