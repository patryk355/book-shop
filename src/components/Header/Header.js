import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import CartButton from '../Cart/CartButton';
import Button from '../UI/Button/Button';
import { loginActions } from '../../store/login-slice';
import { uiActions } from '../../store/ui-slice';

const Header = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.login.isLogged);

    const logoutHandler = () => {
        dispatch(loginActions.logout());
    }

    const toggleFormHandler = () => {
        dispatch(uiActions.toggleForm());
    }

    const nav = isLogged ? (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li>
                    <CartButton />
                </li>
                <li>
                    <Button value="Logout" onClick={logoutHandler} />
                </li>
            </ul>
        </nav>
    ) : (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li>
                    <Button value="Login" onClick={toggleFormHandler} />
                </li>
            </ul>
        </nav>
    )

    return (
        <header className={styles.header}>
            <h1>BookShop</h1>
            {nav}
        </header>
    )
}

export default Header;
