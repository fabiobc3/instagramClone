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

    function handleSubmitComment(event){
        props.onComment(props.post.id, comment); // this calls addComment from App.js
        setComment(''); //reset
        setToggleComment(false); //close comment box
        event.preventDefault(); // prevent page refresh
      }

    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setCount] = useState(props.likes.count);

    const onClickLikeButton = () => {
        setIsLiked(!isLiked); 
        if (isLiked){
            setCount(likeCount - 1);
            props.onUnlike(props.post.id);
        }else{
            setCount(likeCount + 1);
            props.onLike(props.post.id);
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
        <div>
            <p>{props.desc}</p>
        </div>
        <div class={css.container}>
            <div class={css.containerItem}>
                <button onClick={onClickLikeButton}>
                    <img class={css.heart} src={renderHeart(isLiked)} alt="Like"/>
                </button>
            </div>
            <div class={css.containerItem}>
                <button onClick={e=>setToggleComment(!toggleComment)}>
                    <img src={publicUrl('/assets/comment.svg')} alt='Comment Action'/> 
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
        {toggleComment && 
            <form className={css.addComment} onSubmit={handleSubmitComment}>
                <input type="text" placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)}/>
                <button type="submit">Post</button>
            </form>
        }
      </div>
    );
  }

export default Post;