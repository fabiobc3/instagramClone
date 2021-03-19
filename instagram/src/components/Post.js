import publicUrl from 'utils/publicUrl';
import css from 'Post.module.css';
import TimeSpan from 'utils/timespan';
import {useState} from 'react';

function renderComments(comments){
    return comments.map(comment => renderComment(comment))
}

function renderComment(comment){
    return (
        <div>
            <b>{comment.userId}</b> {comment.text}  
        </div>
    )
}

function renderHeart(isLiked){
    if (isLiked === false){
        return publicUrl('/assets/like.svg')
    }
    return publicUrl('/assets/redHeart.png')
}

function Post(props) {

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setCount] = useState(props.likes.count); 

    const onClickLikeButton = () => {
        setIsLiked(!isLiked); 
        if (isLiked){
            setCount(likeCount - 1);
            props.store.likes = props.store.likes.filter(like =>
                like.userId !== props.user.id || like.postId !== props.post.id
            )
            console.log(props.store); 
        }else{
            setCount(likeCount + 1);
            props.store.likes = props.store.likes.concat({
                userId: props.user.id,
                postId: props.post.id,
                datetime: new Date().toISOString() 
            });
            console.log(props.store); 
       }
    }

    let profilePic = props.user.photo;
    let postPic = props.post.photo;

    let time = TimeSpan(props.post.datetime);

    return (
      <div>
        <div>
            <img class={css.profilePic} src={publicUrl(profilePic)} alt="Profile Pic"/>
            <b class={css.profileName}>{props.user.id}</b>
        </div>
        <div>
            <img class={css.postPic} src={publicUrl(postPic)} alt="Profile Pic"/>
        </div>
        <div class={css.container}>
            <div class={css.containerItem}>
                <button onClick={onClickLikeButton}>
                    <img class={css.heart} src={renderHeart(isLiked)} alt="Like"/>
                </button>
            </div>
            <div class={css.containerItem}>
                <button>
                    <img src={publicUrl('/assets/comment.svg')} alt="Comment"/>
                </button>
            </div>
        </div>
        <div>
            <b>{likeCount} likes</b>
        </div>
        <div class={css.comments}>
            {renderComments(props.comments)}
        </div>
        <div>
            {time} ago
        </div>
       
      </div>
    );
  }

export default Post;