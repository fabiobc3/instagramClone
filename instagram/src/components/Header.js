import React from 'react';
import publicUrl from 'utils/publicUrl';
import css from 'Header.module.css';
function Header() {
    return (
        <div className={css.header}>
            <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/camera.svg')} alt="Camera"/>
                </button>
            </div>
            <div className={css.navItem}>
                <img src={publicUrl('/assets/logo.png')} alt="Logo"/>
            </div>
            <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/message.svg')} alt="Arrow"/>
                </button>
            </div>       
        </div>
      );
}

export default Header;