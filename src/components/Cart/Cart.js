import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import Modal from "../UI/Modal/Modal";
import styles from './Cart.module.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const closeModalHandler = () => {
        dispatch(uiActions.toggleCart());
    }

    return (
        <Modal onClose={closeModalHandler}>
            <button className={styles.closeBtn} onClick={closeModalHandler}>X</button>
            <h2 className={styles.header}>Your Cart</h2>

            <ul className={styles['products-list']}>
                {cart.items.map(({ amount, author, description, id, image_url, price, title }) => (
                    <li key={id}>
                        <h3 className={styles.title}>{title}</h3>
                        <div>
                            <p className={styles.price}>{amount * price}$</p>
                            <div className={styles.amount}>
                                <button className={styles.actions} onClick={() => dispatch(cartActions.removeItemFromCart({
                                    id,
                                    title,
                                    author,
                                    price,
                                    amount
                                }))}>-</button>
                                <input type="number" min="0" value={amount} readOnly />
                                <button className={styles.actions} onClick={() => dispatch(cartActions.addItemToCart({
                                    id,
                                    title,
                                    author,
                                    price,
                                    amount,
                                }))}>+</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <h3 className={styles.totalAmount}>Total Amount: {cart.totalAmount}</h3>
            <h3 className={styles.totalPrice}>Total Price: {cart.totalPrice} $</h3>
        </Modal>
    )
}

export default Cart;
