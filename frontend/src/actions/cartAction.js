import { CART_ADD_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, REMOVE_ALL_CART_ITEMS, REMOVE_CART_ITEMS, UPDATE_CART_ITEMS } from "../constants/cartConstants"

export const addToCart = (productItem, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: productItem.name,
            image: productItem.image,
            price: productItem.price,
            countInStock: productItem.countInStock,
            product: productItem._id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartItems = (productItem, qty) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_ITEMS,
        payload: {
            name: productItem.name,
            image: productItem.image,
            price: productItem.price,
            countInStock: productItem.countInStock,
            product: productItem.product,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItems = (productItem) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEMS,
        payload: {
            name: productItem.name,
            image: productItem.image,
            price: productItem.price,
            countInStock: productItem.countInStock,
            product: productItem.product,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeAllCartItems = () => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ALL_CART_ITEMS,
        payload: {
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
}
