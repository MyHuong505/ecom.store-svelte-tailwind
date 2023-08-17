  <script>
    
    import ShoppingCart from "./ShoppingCart.svelte";
    let selectedPage = 'Home';
    let isCartVisible = false;
    let isMouseOverCart = false;
    

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
  </script>

  <style>
  .triangle {
   clip-path: polygon(50% 0, 100% 100%, 0 100%);
   width: 1.2rem;
   height: 0.75rem;
  }
</style>

  <header class="flex flex justify-between items-center py-6 px-8 text-white bg-primary">
    <nav class="">
      <ul class="flex gap-4 mx-16">
        <li><a href="/" class={selectedPage === 'Home' ? 'underline' : ''} on:click={()=>{selectedPage = 'Home'}}>Home</a></li>
        <li><a href="/products" class={selectedPage === 'Product' ? 'underline' : ''} on:click={()=>{selectedPage = 'Product'}}>Product</a></li>
		    <li><a href="/products/newProduct" class={selectedPage === 'New Product' ? 'underline' : ''} on:click={()=>{selectedPage = 'New Product'}}>New Product</a></li>
      </ul>
    </nav>
    
    <nav>
      <ul class="flex gap-4 mx-16">
        <button class="fa-solid fa-cart-shopping cursor-pointer" 
      on:mouseenter={handleCartMouseEnter}
      on:mouseleave={handleCartMouseLeave}
        >
      </button>
		    <li>Login</li>
        <li>Contact us</li>
        <li>Help</li>
      </ul>
    </nav>
  </header>

  {#if isCartVisible}
<div class="relative">
  <div class="triangle absolute bottom-0 right-72 bg-white shadow-md">
  </div>
  <button class="fixed right-64 w-96 z-50 rounded grid bg-white drop-shadow-lg"
      on:mouseenter={handleCartMouseEnter}
      on:mouseleave={handleCartMouseLeave} 
  >
    <ShoppingCart /> 
    <div class="flex p-4 bg-stone-100">
      <button class="text-stone-800 text-sm px-4 py-2 mr-2 hover:underline hover:text-primary" on:click={handleCartClick}>View My Cart</button>
      <button class="bg-primary text-white px-12 py-2 rounded text-sm">Proceed to Checkout</button>
    </div>
  </button>
</div>
  {/if}