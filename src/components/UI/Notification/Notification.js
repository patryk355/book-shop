import { Fragment, useState } from 'react';
import styles from './Notification.module.css';

const Notification = ({ children, type }) => {
    const [showNotification, setShowNotification] = useState(true);

    const hideNotificationHandler = () => {
        setShowNotification(false);
    }

    let classes;

    if (type === 'error') {
        classes = styles.error;
    } else if (type === 'success') {
        classes = styles.success;
    } else {
        classes = styles.info;
    }

    return (
        <Fragment>
            {showNotification && <div className={classes} onClick={hideNotificationHandler} type={type}>
                {children}
            </div>}
        </Fragment >
    )
}

export default Notification;
