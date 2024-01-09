  <script>
    import ShoppingCart from "./ShoppingCart.svelte";
    import {cart} from '../store/cartStore';
    import { onMount } from 'svelte';
    let selectedPage = 'Home';
    let isCartVisible = false;
    let isMouseOverCart = false;
    let remainingItems = 0;


  function showCart() {
    isCartVisible = true;
  }

  function hideCart() {
    if (!isMouseOverCart) {
      isCartVisible = false;
    }
  }

  function handleCartMouseEnter() {
    isMouseOverCart = true;
    showCart();
  }

  function handleCartMouseLeave() {
    isMouseOverCart = false;
    setTimeout(() => {
      if (!isMouseOverCart) {
        hideCart();
      }
    }, 200);
  }

  function handleCartClick() {
    window.location.href = "/cart"; 
  }

  onMount(() => {
    const storedCart = localStorage.getItem('cart');
    cart.set(storedCart ? JSON.parse(storedCart) : []);
  });

  let totalItemsFromCart = 0;

  $: {
    totalItemsFromCart = $cart.reduce((sum, item) => sum + item.quantity, 0);
    const remainingQuantities = $cart.slice(4).map(item => item.quantity);
    remainingItems = remainingQuantities.reduce((sum, quantity) => sum + quantity, 0);
  }


  </script>

  <style>
  .triangle {
   clip-path: polygon(50% 0, 100% 100%, 0 100%);
   width: 1.2rem;
   height: 0.75rem;
  }
</style>
  <header class="w-full flex flex justify-between items-center py-6 px-8 text-white bg-primary">
    
    <nav class="">
      <ul class="flex space-x-4">
        <li class="w-12"><a href="/" class="fa-solid fa-home" /></li>
        <li class="w-16 hidden md:block"><a href="/products" class="{selectedPage === 'Product' ? 'underline' : ''}" on:click={()=>{selectedPage = 'Product'}}>Products</a></li>
		    <li class="w-32 hidden md:block"><a href="/products/newProduct" class={selectedPage === 'New Product' ? 'underline' : ''} on:click={()=>{selectedPage = 'New Product'}}>New Product</a></li>
      </ul>
    </nav>
    
    <nav>
      <ul class="flex">
          <div class="relative">
            <button class="fa-solid fa-cart-shopping cursor-pointer w-12"
              on:click={handleCartClick} 
              on:mouseenter={handleCartMouseEnter}
              on:mouseleave={handleCartMouseLeave}>
            </button>
            <span class="absolute top-0 right-0 -mt-2 bg-red-500 rounded-full w-5 h-5 text-white text-xs flex items-center justify-center">
              {totalItemsFromCart}
            </span>
          </div>    
		    <li class="w-12">Login</li>
        <li class="w-24">Contact us</li>
        <li class="w-12">Help</li>
      </ul>
    </nav>
  </header>

{#if isCartVisible}
  {#if $cart.length === 0}
  <div class="relative">
    <div class="triangle absolute bottom-0 right-80 bg-white shadow-md"></div>
    <div class="fixed right-64 w-1/4 h-1/4 z-50 rounded grid bg-white drop-shadow-lg">
      <div class="flex flex-col items-center justify-center">
        <img class="w-1/4 my-4" src="http://doduae.com/image/shopping_cart.gif" alt="empty-shopping-cart" />
        <p class="text-stone-800">Your shopping cart is empty</p>
      </div>
    </div>
  </div>
{:else}
  <div class="relative">
    <div class="triangle absolute bottom-0 right-80 bg-white shadow-md"></div>
      <div class="fixed right-64 w-96 z-50 rounded grid bg-white drop-shadow-lg"
        on:mouseenter={handleCartMouseEnter}
        on:mouseleave={handleCartMouseLeave} 
      >
      <ShoppingCart /> 
      <div class="flex items-center p-4 bg-stone-100">
        <span class="text-stone-800 text-sm py-2 mr-2 text-xs">
            {remainingItems === 1 ? `${remainingItems} More Item In Cart` : `${remainingItems} More Items In Cart`} 
        </span>
        <button class="bg-primary text-white px-12 py-2 rounded text-sm hover:bg-secondary ml-auto" on:click={handleCartClick}>
            View My Cart
        </button>
      </div>
    </div>
  </div>
  {/if}
{/if}
