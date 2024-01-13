<script>
  import ProductCard from '../../component/ProductCard.svelte';
  import Filter from '../../component/Filter.svelte';
  import Footer from '../../component/Footer.svelte';

  import { onMount } from 'svelte';

  let products = [];
  let filteredProducts = [];
  let categories = [];
  let searchKey ='';
  let selectedCategory = null;

  onMount(()=> {
    fetchProduct();
    fetchCategory()
  })

  async function fetchProduct(categoryId) {
    let response 
    response = await fetch('/api/products');
    products = await response.json();
    filteredProducts = products;
  }

  async function fetchCategory() {
    const res = await fetch('/api/categories');
    categories = await res.json();
  }

  async function searchProducts() {
    const trimmedSearchKey = searchKey.trim();
    filteredProducts = products;

    if (trimmedSearchKey) {
      filteredProducts = filteredProducts.filter((product) => {
          return product.title.toLowerCase().includes(trimmedSearchKey.toLowerCase());
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(item => item.categoryId === selectedCategory)
    }
  }

function handleCategoryChange(event){
  selectedCategory = event.detail;
  searchProducts()
}
</script>

<div class="my-8">

<div class="">
  <div class="flex items-center justify-center">
    <input
      type="text"
      placeholder="Search..."
      class="w-[500px] border rounded-l py-2 px-3 focus:outline-none border-primary"
      bind:value={searchKey} 
    />
    <button
      class="border border-primary border-l-0 bg-primary text-white rounded-r py-2 px-4 hover:bg-primary-dark"
      on:click={searchProducts} 
    >
      Search
    </button>
  </div>
</div>
  
  <Filter {categories} {selectedCategory} on:change={handleCategoryChange}/>

  <ProductCard products={filteredProducts} />
</div>

<Footer />