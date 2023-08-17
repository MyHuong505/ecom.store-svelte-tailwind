import { onMount } from "svelte";
import { writable } from "svelte/store";
export const cart = writable([]);
export let totalItems = 0;
export let totalPrice = 0;

export const plusItem = (item) => {
  cart.update((items) => {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      calculateCartTotal();
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
        calculateCartTotal();
      }
    }
    return items;
  });
};

export function deleteItem(item) {
  cart.update((items) => items.filter((cartItem) => cartItem !== item));
  calculateCartTotal();
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
  calculateCartTotal();
};

export const calculateCartTotal = () => {
  cart.update((items) => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("totalItems", totalItems.toString());
    localStorage.setItem("totalPrice", totalPrice.toString());
    return items;
  });
};

// const unsubscribe = cart.subscribe((items) => {
//   totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
//   totalPrice = items.reduce(
//     (sum, item) =>
//       sum + parseFloat(item.price.replace("$", "")) * item.quantity,
//     0
//   );
// });

// // Đừng quên hủy đăng ký khi không cần thiết nữa, ví dụ khi component bị hủy
// unsubscribe();

// onMount(() => {
//   const storedCart = localStorage.getItem("cart");
//   cart.set(storedCart ? JSON.parse(storedCart) : []);
// });
