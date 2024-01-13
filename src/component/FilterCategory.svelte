<script>
  export let categories;
  export let selectedCategory;

  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  function handleChange(value) {
    dispatch('change', value)
  }
</script>



<div class="flex justify-center mt-8">
  <button 
    class={!selectedCategory ? 'text-primary underline mr-8' : 'mr-8'}
    on:click={() => handleChange(null)}
  >
    All
  </button>
  {#each categories as category}
    <button 
      class={selectedCategory === category.id ? 'text-primary underline mr-8' : 'mr-8'} 
      on:click={() => handleChange(category.id)}
    >
        {category.title}
    </button>
  {/each}
</div>