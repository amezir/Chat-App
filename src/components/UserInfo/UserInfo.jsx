import style from './UserInfo.module.scss';

const UserInfo = ({ username }) => {



    const getFirstLetter = (username) => {
        if (username) {
            return username.charAt(0).toUpperCase();
        } else {
            return null;
        }
    }

    const getUsername = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("username");
        } else {
            return null;
        }
    }


    return (

        <div className={style.ctnGlobal}>
            <p className={style.usernamelogo}> {getFirstLetter(getUsername())}</p>
            <div>
                <p className={style.username}
                >{getUsername()}</p>
                <p>online</p>
            </div>
        </div>
    );
}

export default UserInfo;