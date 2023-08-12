<script>
import { cart, plusItem, minusItem, deleteItem } from '../store/cartStore';
import { onMount } from 'svelte'; 

let totalItems = 0;
let totalPrice = 0;

// Cập nhật biến totalPrice và totalItems khi cart thay đổi
$: {
  totalItems = $cart.reduce((acc, item) => acc + item.quantity, 0);
  totalPrice = $cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
}

onMount(() => {
  const storedCart = localStorage.getItem('cart');
  cart.set(storedCart ? JSON.parse(storedCart) : []);

});
</script>

<div class="cart-list">
  <p>There are {totalItems} items in your cart</p>
  {#each $cart as item}
    <div>
      <img class="w-12" src={item.thumbnailUrl} alt={item.title}/>
      <h3 class="mt-2 text-stone-700 ">{item.title}</h3>
      <p class="text-md text-primary">{item.price}</p> 
      <button on:click={() => plusItem(item)}>+</button>
      {item.quantity}
      <button on:click={() => minusItem(item)}>-</button>
      <button on:click={() => deleteItem(item)}>Delete</button>
      <p>${item.price.replace('$', '') * item.quantity}</p>
    </div>
  {/each}
  <p>Total Price: ${totalPrice.toFixed(2)}</p>
</div>
