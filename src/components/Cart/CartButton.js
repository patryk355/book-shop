import styles from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.cart.totalAmount);

    const toggleCartHandler = () => {
        dispatch(uiActions.toggleCart());
    }

    return (
        <button className={styles.button} onClick={toggleCartHandler}>
            <span>Your Cart</span>
            <span className={styles.amount}>{totalAmount}</span>
        </button>
    )
}

export default CartButton;
