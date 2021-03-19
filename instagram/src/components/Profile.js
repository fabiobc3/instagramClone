import React from 'react';
import Thumbnail from './Thumbnail.js';

function findUser(store){
    return store.users.find(user => user.id === store.currentUserId);
}

function findPosts(store){
    return store.posts.filter(post => post.userId === store.currentUserId);
}

function Profile(props) {
    const {store} = props;
    const u = findUser(store);
    return (
        <div>
            <Thumbnail
                userName = {u.id}
                profilePic = {u.photo}
                name = {u.name}
                bio = {u.bio}
                posts = {findPosts(store)}
            />    
        </div>
    );
}

export default Profile;