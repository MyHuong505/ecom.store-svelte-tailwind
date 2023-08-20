<script>
import { slicedCart, totalItems, totalPrice, calculateCartData} from '../store/cartStore';
import {onMount} from 'svelte';

  onMount(() => {
    const storedCart = localStorage.getItem('cart');
    cart.set(storedCart ? JSON.parse(storedCart) : []);
    calculateCartData();
  });


</script>




<p class="py-2 px-4 text-stone-500 border-b text-sm">
  {totalItems === 1 ? `There is ${totalItems} item in your cart` : `There are ${totalItems} items in your cart`}
</p>
  {#each slicedCart as item}
    <div class="flex bg-white py-4 pl-2 mx-4 border-b">
      <img class="w-12" src={item.thumbnailUrl} alt={item.title}/>
      <div class="w-full">
        <div class="text-stone-500 text-sm px-4">{item.title}</div>

        <div class="flex">
            <div class="text-sm text-stone-800 ml-auto">{item.price}</div>    
        </div>

        <div class="flex">
            <button class="mx-4 w-6 h-6 border border-gray-300 rounded px-2 flex items-center justify-center 
                    {item.quantity === 1 ? 'text-gray-300 border-gray-300 cursor-default' : ''}" 
                    on:click={() => minusItem(item)}>-</button>            
            <div class="w-4 text-center text-sm text-stone-700">{item.quantity}</div>
            <button class="mx-4 w-6 h-6 border border-gray-300 rounded px-2 flex items-center justify-center" 
                    on:click={() => plusItem(item)}>+</button>
            <button class="text-stone-500 text-xs ml-auto mt-auto" on:click={() => deleteItem(item)}>Remove</button>
        </div>
      </div>
      <!-- <p class="ml-2">${(item.price.replace('$', '') * item.quantity).toFixed(2)}</p> -->
    </div>
  {/each}
  <div class="flex justify-end py-2 px-4">
    <p class="text-stone-700 text-sm font-bold">Cart Total: <span class="text-primary">${totalPrice.toFixed(2)}</span> </p>
  </div>

