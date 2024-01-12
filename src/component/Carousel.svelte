<script>
import Carousel from 'svelte-carousel'
import "resize-observer-polyfill";  
import { onMount, onDestroy } from 'svelte';
export let products = [];
  let carouselSize = 5
  onMount(() => {
    if (window.innerWidth < 768) {
      carouselSize = 1
    } 
  });

  function gotoPage(product) {
     window.location.href = `/products/${product.id}`;;
  }  
</script>

<div class="flex justify-center items-center m-4">
  <div class="p-4 w-full border rounded">
    {#if products.length > 0}
      <Carousel 
        autoplay
        autoplayDuration={2000}
        particlesToShow={carouselSize} 
        particlesToScroll={carouselSize}
        dots={false}
      >
        {#each products as product (product.id)}
          <div on:click={() => gotoPage(product)}>
            <div class="bg-white p-2 cursor-pointer">
              <img src={product.thumbnailUrl} alt={product.title} class="w-full mb-2" />
              <h3 class="text-stone-700 text-sm font-semibold">{product.title}</h3>
              <p class="text-md text-primary text-gray-600">${product.price}</p>
            </div>
          </div>
        {/each}
      </Carousel>
    {/if}
  </div>
</div>







