import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

import styles from './Book.module.css';

const Book = ({ id, title, author, description, price, image_url }) => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.login.isLogged);


    const [showMore, setShowMore] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const showFullDescriptionHandler = () => {
        setShowMore(prev => !prev);
    }

    const addBookToCartHandler = () => {
        if (isLogged) {
            dispatch(cartActions.addItemToCart({ id, title, author, price, amount: 1 }));
        } else {
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false)
            }, 1000);
        }
    }

    return (
        <Fragment>

            {!isLogged && isClicked && <Modal>You need to login.</Modal>}
            <li className={styles.book}>
                <h2>{title}</h2>
                <h3>{author}</h3>
                <div className={styles.details}>
                    <p className={styles.description}>
                        {showMore ? description : (description.substr(0, 100) + '...')}
                        <button onClick={showFullDescriptionHandler}>
                            {showMore ? 'Read Less' : 'Read More'}
                        </button>
                    </p>
                    <img src={image_url} alt={title} />
                </div>
                <div className={styles['price-container']}>
                    <p className={styles.price}>{price}$</p>
                    <Button value="Add to cart" onClick={addBookToCartHandler} />
                </div>
            </li>
        </Fragment >
    )
}

export default Book;
