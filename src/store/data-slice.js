import { booksActions } from "./books-slice";
import { cartActions } from "./cart-slice";
import { notificationActions } from "./notification-slice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://bookshop-80519-default-rtdb.firebaseio.com/books.json');

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();

            dispatch(booksActions.fetchBooks({ items: data }));
        }
        fetchData();
    }
}

export const fetchDataFromCart = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://bookshop-80519-default-rtdb.firebaseio.com/cart.json');

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await res.json();

            dispatch(cartActions.fetchItems({
                items: data.items || [],
                totalAmount: data.totalAmount || 0,
                totalPrice: data.totalPrice || 0,
            }));
        }
        fetchData();
    }
}

export const putDataToCart = (cart) => {
    return async (dispatch) => {
        const putBooksToCart = async () => {
            const res = await fetch('https://bookshop-80519-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalAmount: cart.totalAmount,
                    totalPrice: cart.totalPrice,
                }),
            })

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }
        }

        putBooksToCart().catch((error) => {
            dispatch(notificationActions.showNotification({ type: 'error', content: 'Upss... Try again!' }));

            setTimeout(() => {
                dispatch(notificationActions.hideNotification());
            }, 2000);
        });
    }
}