import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        totalPrice: 0,
    },
    reducers: {
        setTotalAmountAndPrice(state) {
            let totalAmount = 0;
            let totalPrice = 0;
            state.items.forEach(item => {
                totalAmount += item.amount;
                totalPrice += item.amount * item.price
            });
            state.totalAmount = totalAmount;
            state.totalAmount = totalPrice;
        },
        fetchItems(state, action) {
            state.items = action.payload.items;
            if (state.items.length === 0) {
                state.totalAmount = 0;
                state.totalPrice = 0;
            } else {
                state.totalAmount = action.payload.totalAmount;
                state.totalPrice = action.payload.totalPrice;
            }

        },
        addItemToCart(state, action) {
            const newBook = action.payload;
            const existingItem = state.items.find(item => item.id === newBook.id);

            state.totalAmount++;
            state.totalPrice += action.payload.price;

            if (!existingItem) {
                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    author: action.payload.author,
                    price: action.payload.price,
                    amount: action.payload.amount,
                });
            } else {
                const existingItemId = state.items.findIndex(item => item.id === newBook.id);
                state.items[existingItemId].amount += 1;
            }

        },
        removeItemFromCart(state, action) {
            const newBook = action.payload;
            const existingItem = state.items.find(item => item.id === newBook.id);

            state.totalAmount--;
            state.totalPrice -= action.payload.price;

            if (!existingItem) {
                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    author: action.payload.author,
                    price: action.payload.price,
                    amount: action.payload.amount,
                });
            } else {
                const existingItemId = state.items.findIndex(item => item.id === newBook.id);

                state.items[existingItemId].amount -= 1;

                if (state.items[existingItemId].amount === 0) {
                    state.items.splice(existingItemId, 1);
                }
            }

        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;