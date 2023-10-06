import styles from './notification.module.scss';
import { useEffect } from 'react';

const Notification = ({ title, onClose }) => {

    useEffect(() => {
        console.log("Notification mounted");
        setTimeout(() => {
            onClose();
        }, 5000);
    }, []);

    return (
        <div className={styles.ctnNotif}>
            <strong>{title}</strong>
            <div className={styles.close} onClick={onClose}>Close</div>
        </div>
    );
};

export default Notification;