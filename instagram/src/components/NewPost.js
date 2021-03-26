import React, { useState } from 'react';
import css from 'NewPost.module.css';
import FileLoader from './FileLoader.js';
import {
    Link,
    useHistory
} from "react-router-dom";


function NewPost(props) {
  
  const history = useHistory();
  const [dragging, setDragging] = useState(false);
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  function handleFileDragEnter(e){
    setDragging(true);
  }
  function handleFileDragLeave(e){
    setDragging(false);
  }
  function handleFileDrop(e){
    if (e.dataTransfer.types.includes('Files')===false){
			return;
    }
    if (e.dataTransfer.files.length>=1){
      let file = e.dataTransfer.files[0];
      if (file.size>1000000){// larger than 1 MB
        return;
      }
      if (file.type.match(/image.*/)){
				let reader = new FileReader();			
				reader.onloadend = (e) => {
                    setPhoto(e.target.result);
				};
				reader.readAsDataURL(file);
			}
    }
    setDragging(false);    
  }
  
  function handleSubmit(e){
    props.onPost(photo,desc);
    e.preventDefault();
    history.push('/');
  }

  return (
    <div>
        
        <div className={css.photo}>
          {!photo?  <div className={css.message}>Drop your image</div>:
                    <img src={photo} alt="New Post"/>}
            <FileLoader
              onDragEnter={handleFileDragEnter}
              onDragLeave={handleFileDragLeave}
              onDrop={handleFileDrop}
            >
	            <div className={[css.dropArea, dragging?css.dragging:null].join(' ')}
              ></div>
	          </FileLoader>
        </div>
        <div className={css.desc} >
            <form>
                <input type="text" placeholder="Add a description…" value={desc} onChange={e=>setDesc(e.target.value)}/>
            </form>
        </div>
        <div className={css.error}>
	
        </div>
        <div className={css.actions}>
            <Link to="/">
                <button>Cancel</button>
            </Link>
            <button onClick={handleSubmit}>Share</button>   
        </div>
    </div>
  );
}

export default NewPost;