import React from 'react';
import publicUrl from 'utils/publicUrl';
import css from 'Header.module.css';
function Header() {
    return (
        <div className={css.header}>
            <div>
                <button>
                    <img src={publicUrl('/assets/camera.svg')} alt="Camera"/>
                </button>
            </div>
            <div>
                <img src={publicUrl('/assets/logo.png')} alt="Logo"/>
            </div>
            <div>
                <button>
                    <img src={publicUrl('/assets/message.svg')} alt="Arrow"/>
                </button>
            </div>       
        </div>
      );
}

export default Header;