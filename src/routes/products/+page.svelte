<script>
import CardProduct from '../../component/CardProduct.svelte';
let selectedCategory = 'All';
import { onMount } from 'svelte';

let products = [];
let categories = [];

  onMount(()=> {
    fetchProduct();
    fetchCategory()
  })

  async function fetchProduct(categoryId) {
    let response 
    if (categoryId) {
      response = await fetch(`http://localhost:4000/products?categoryId=${categoryId}`);
    } else {
      response = await fetch('http://localhost:4000/products');
    } 
    products = await response.json();
	// console.log(products);
  }

  async function fetchCategory() {
    const res = await fetch('http://localhost:4000/categories');
    categories = await res.json();
    // console.log(categories);
  }



</script>

<style>



</style>


<div class="my-8">

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

  <div class="grid grid-cols-4 gap-4 mx-24 cursor-pointer my-8">
      <CardProduct {products} />
  </div>

</div>

  




