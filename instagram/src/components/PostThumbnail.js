import React from 'react';
import css from 'PostThumbnail.module.css';
import publicUrl from 'utils/publicUrl';
import {
  Link
} from "react-router-dom";


function PostThumbnail(props) {
  return (
    <Link to={props.id}>
      <div className={css.square}>
        <div className={css.content}>
          <img className={css.image} src={publicUrl(props.photo)} alt="Post Thumbnail"/>
        </div>
          
      </div>
    </Link>
  );
}

export default PostThumbnail;
