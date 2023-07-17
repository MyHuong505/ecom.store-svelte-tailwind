<script>
  export let categories;
  export let selectedCategory;
  export let fetchProduct;
</script>



<div class="flex justify-center mt-8">
  <button class={selectedCategory === 'All' ? 'text-primary underline mr-8' : 'mr-8'}
    on:click={() => { fetchProduct(); selectedCategory = 'All'; }}>
    All
  </button>
  {#each categories as category}
    <button class={selectedCategory === category.id ? 'text-primary underline mr-8' : 'mr-8'} 
        on:click={() => { fetchProduct(category.id); selectedCategory = category.id; }}>
        {category.title}
    </button>
  {/each}
</div>