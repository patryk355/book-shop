import { useState } from 'react';
import styles from './Notification.module.css';

const Notification = ({ children }) => {
    const [showNotification, setShowNotification] = useState(true);

    const hideNotificationHandler = () => {
        setShowNotification(false);
    }

    return (
        <>
            {showNotification && <div className={styles.notification} onClick={hideNotificationHandler}>
                {children}
            </div>}
        </>
    )
}

export default Notification;
