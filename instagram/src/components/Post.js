import publicUrl from 'utils/publicUrl';
import css from 'Post.module.css';
import TimeSpan from 'utils/timespan';

function Post(props) {
    
    let like = 'likes';
    if (props.likes.count == 1){
        like = 'like'
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
                <button>
                    <img src={publicUrl('/assets/like.svg')} alt="Like"/>
                </button>
            </div>
            <div class={css.containerItem}>
                <button>
                    <img src={publicUrl('/assets/comment.svg')} alt="Comment"/>
                </button>
            </div>
        </div>
        <div>
            <b>{props.likes.count} {like}</b>
        </div>
        <div>
            <div>
                <b>{props.comments[0].userId}</b> {props.comments[0].text}  
            </div>
            <div>
                <b>{props.comments[1].userId}</b> {props.comments[1].text}  
            </div>
        </div>
        <div>
            {time} ago
        </div>
       
      </div>
    );
  }

export default Post;