import React, {createContext, useState, useEffect} from 'react';
import uniqueId from 'utils/uniqueId.js';
import initialStore from 'utils/initialStore.js';

export const StoreContext = createContext(); 

function StoreContextProvider(props){

    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });

    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

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

	return (
        <StoreContext.Provider value={{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
