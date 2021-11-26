import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Books from "./components/Books/Books";
import Cart from "./components/Cart/Cart";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Notification from "./components/UI/Notification/Notification";
import { booksActions } from "./store/books-slice";
import { cartActions } from "./store/cart-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const isLogged = useSelector(state => state.login.isLogged);
  const showForm = useSelector(state => state.ui.showForm);
  const showCart = useSelector(state => state.ui.showCart);

  // Fetch books 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://bookshop-80519-default-rtdb.firebaseio.com/books.json');

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();
      dispatch(booksActions.fetchBooks({ items: data }));
    }
    fetchData();
  }, [dispatch]);

  // Fetch books in cart
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://bookshop-80519-default-rtdb.firebaseio.com/cart.json');

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();
      console.log(data.items);

      dispatch(cartActions.fetchItems({
        items: data.items || [],
        totalAmount: data.totalAmount || 0,
        totalPrice: data.totalPrice || 0,
      }));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
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
    putBooksToCart()
  }, [cart, dispatch]);

  return (
    <Fragment>
      {showCart && <Cart />}
      <Header />
      {!isLogged && <Notification>Please login if you want add some products to cart.</Notification>}
      {showForm && <Notification>Do not enter personal data, because it's a demo application!</Notification>}
      {showForm && <Form />}
      <Books />
    </Fragment>
  );
}

export default App;
