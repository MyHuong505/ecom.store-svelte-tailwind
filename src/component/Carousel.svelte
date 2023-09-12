<script>
  import { onMount } from 'svelte';    
  import { goto } from "$app/navigation";
  
  
  function gotoPage(product) {
    goto('/products/' + product.id);
  }

  export let products;
  
  let currentSlide = 0;
  let itemWidth = 0;
  let containerWidth = 0;
  let totalWidth = 0;
  
  const nextSlide = () => {
    if (currentSlide < products.length - 1) {
      currentSlide += 1;
    } else {
      currentSlide = 0;
    }
  };
  
  onMount(() => {
    const container = document.getElementById('carousel-container');
    containerWidth = container.offsetWidth;
    itemWidth = containerWidth / 5; 
    totalWidth = products.length * (itemWidth + 4); 
    const intervalId = setInterval(nextSlide, 3000);
    window.addEventListener('resize', handleResize);
    return () => clearInterval(intervalId);
  });   
  
  function handleResize() {
    const container = document.getElementById('carousel-container');
    containerWidth = container.offsetWidth;
    itemWidth = containerWidth / 5;
    totalWidth = products.length * (itemWidth + 4); 
  }
</script>

<div id="carousel-container" class="relative overflow-hidden">
  <div
    class="flex transition-transform duration-300"
    style="transform: translateX(-{currentSlide * (itemWidth + 4)}px)"
  >
    {#each products as product, index (product.id)}
      <div
        on:click={() => gotoPage(product)}
        class="bg-white border rounded p-4 mx-1 shadow hover:shadow-md cursor-pointer"
        style="width: {itemWidth}px; min-width: {itemWidth}px;"
      >
        <img src={product.thumbnailUrl} alt={product.title} class="w-full mb-2" />
        <h3 class="text-stone-700 text-sm font-semibold">{product.title}</h3>
        <p class="text-md text-primary text-gray-600">{product.price}</p>
      </div>
    {/each}
    {#each products as product, index (product.id)}
      <div
        on:click={() => gotoPage(product)}
        class="bg-white border rounded p-4 shadow hover:shadow-md cursor-pointer"
        style="width: {itemWidth}px; min-width: {itemWidth}px;"
      >
        <img src={product.thumbnailUrl} alt={product.title} class="w-full mb-2" />
        <h3 class="text-stone-700 text-sm font-semibold">{product.title}</h3>
        <p class="text-md text-primary text-gray-600">{product.price}</p>
      </div>
    {/each}
  </div>
</div>
