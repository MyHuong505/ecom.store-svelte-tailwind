import { writable } from "svelte/store";
export const cart = writable([]);

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

export const addToCart = (product, selectedSize, inputValue, selectedColor) => {
  cart.update((items) => {
    const existingItemIndex = items.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity = inputValue;
    } else {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        items = [
          ...items,
          {
            ...product,
            quantity: inputValue,
            size: selectedSize,
            color: selectedColor,
          },
        ];
      } else {
        items = [
          ...items,
          {
            ...product,
            quantity: inputValue,
            size: selectedSize,
            color: selectedColor,
          },
        ];
      }
    }
    return items;
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

export const checkoutItems = writable([]);

export const updateCheckoutItems = (items) => {
  checkoutItems.set(items);
  localStorage.setItem("checkoutItems", JSON.stringify(items));
};
