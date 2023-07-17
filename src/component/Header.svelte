  <script>
      let selectedPage = 'home';
  </script>

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
		    <li><a href="">Login</a></li>
        <li><a href="">Contact us</a></li>
        <li><a href="">Help</a></li>
      </ul>
    </nav>
  </header>

