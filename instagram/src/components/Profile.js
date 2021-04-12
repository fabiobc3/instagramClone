import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';
import Thumbnail from './Thumbnail.js';
import { useParams } from 'react-router-dom';

function Profile(props) {
    let {
        posts, users, followers, currentUserId, 
        addFollower, removeFollower
    } = useContext(StoreContext);
    let {userId} = useParams();
    //const store = props.store;
    const u = (userId === undefined ? users.find(user => user.id === currentUserId) : users.find(user => user.id === userId)); 
    return (
        <div>
            <Thumbnail
                //store = {store}
                currentUserId = {currentUserId}
                userName = {u.id}
                profilePic = {u.photo}
                name = {u.name}
                bio = {u.bio}
                posts = {posts.filter(post => post.userId === u.id)}
                followers = {followers.filter(follower => follower.userId === u.id)}
                following = {followers.filter(followee => followee.followerId === u.id)}
                onFollow = {addFollower}
                onUnfollow = {removeFollower}
            />    
        </div>
    );
}

export default Profile;