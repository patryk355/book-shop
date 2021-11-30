import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Books from "./components/Books/Books";
import Cart from "./components/Cart/Cart";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Notification from "./components/UI/Notification/Notification";

import { fetchData, fetchDataFromCart, putDataToCart } from "./store/data-slice";
import { notificationActions } from "./store/notification-slice";

let firstRun = true;
let secondRun = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const isLogged = useSelector(state => state.login.isLogged);
  const showForm = useSelector(state => state.ui.showForm);
  const showCart = useSelector(state => state.ui.showCart);

  const notification = useSelector(state => state.notification);

  // Fetch books 
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Fetch books in cart
  useEffect(() => {
    dispatch(fetchDataFromCart());
  }, [dispatch]);

  // Update cart on firebase
  useEffect(() => {
    dispatch(putDataToCart(cart));

    if (firstRun) {
      firstRun = false;
      return;
    }
    if (secondRun) {
      secondRun = false;
      return;
    }

    setTimeout(() => {
      dispatch(notificationActions.hideNotification())
    }, 2000);

  }, [cart, dispatch]);

  return (
    <Fragment>
      {showCart && <Cart />}
      <Header />

      {notification.showNotification && <Notification type={notification.type}>{notification.content}</Notification>}

      {!isLogged && <Notification>Please login if you want add some products to cart.</Notification>}
      {showForm && <Notification>Do not enter personal data, because it's a demo application!</Notification>}
      {showForm && <Form />}
      <Books />
    </Fragment>
  );
}

export default App;