import { writable } from "svelte/store";
export const cart = writable([]);

export const plusItem = (item) => {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      calculateCartData();
      return [...items];
    }
    return items;
  });
};

export const minusItem = (item) => {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        calculateCartData();
      }
    }
    return items;
  });
  calculateCartTotal();
};

export function deleteItem(item) {
  cart.update((items) => items.filter((cartItem) => cartItem !== item));
  calculateCartData();
}

export const addToCart = (product) => {
  cart.update((items) => {
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      return [...items];
    } else {
      return [...items, { ...product, quantity: 1 }];
    }
  });
  calculateCartData();
};

export const totalItems = writable(0);
export const totalPrice = writable(0);
export const slicedCart = writable([]);

export const calculateCartData = () => {
  cart.update((items) => {
    const sliced = items.slice(0, 4);
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );

    slicedCart.set(sliced);
    totalItems.set(total);
    totalPrice.set(price);

    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("totalItems", total.toString());
    localStorage.setItem("totalPrice", price.toString());

    return items;
  });
};

if (typeof localStorage !== "undefined") {
  const storedCart = localStorage.getItem("cart");
  cart.set(storedCart ? JSON.parse(storedCart) : []);
} else {
  cart.set([]);
}
