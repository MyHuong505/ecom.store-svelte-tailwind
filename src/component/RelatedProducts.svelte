<script>
import Carousel from 'svelte-carousel'
import "resize-observer-polyfill";  
import { onMount, onDestroy } from 'svelte';
export let relatedProducts = [];
  let carouselSize = 5
  onMount(() => {
    if (window.innerWidth < 768) {
      carouselSize = 1
    } 
  });

  function gotoPage(relatedProduct) {
     window.location.href = `/products/${relatedProduct.id}`;;
  }  
</script>

<div class="flex justify-center items-center m-4">
  <div class="p-4 w-full border rounded">
    <p class="text-stone-700 pb-2 text-md font-extrabold mx-8">You May Also Like</p>
    {#if relatedProducts.length > 0}
      <Carousel particlesToShow={carouselSize} particlesToScroll={carouselSize}>
        {#each relatedProducts as relatedProduct (relatedProduct.id)}
          <div on:click={() => gotoPage(relatedProduct)}>
            <div class="bg-white p-2 cursor-pointer">
              <img src={relatedProduct.thumbnailUrl} alt={relatedProduct.title} class="w-full mb-2" />
              <h3 class="text-stone-700 text-sm font-semibold">{relatedProduct.title}</h3>
              <p class="text-md text-primary text-gray-600">${relatedProduct.price}</p>
            </div>
          </div>
        {/each}
      </Carousel>
    {/if}
  </div>
</div>







