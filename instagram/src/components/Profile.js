import React from 'react';
import Thumbnail from './Thumbnail.js';
import { useParams } from 'react-router-dom';

function Profile(props) {
    let {userId} = useParams();
    const store = props.store;
    const u = (userId === undefined ? store.users.find(user => user.id === store.currentUserId) : store.users.find(user => user.id === userId)); 
    return (
        <div>
            <Thumbnail
                store = {store}
                userName = {u.id}
                profilePic = {u.photo}
                name = {u.name}
                bio = {u.bio}
                posts = {store.posts.filter(post => post.userId === u.id)}
                followers = {store.followers.filter(follower => follower.userId === u.id)}
                following = {store.followers.filter(followee => followee.followerId === u.id)}
                onFollow = {props.onFollow}
                onUnfollow = {props.onUnfollow}
            />    
        </div>
    );
}

export default Profile;