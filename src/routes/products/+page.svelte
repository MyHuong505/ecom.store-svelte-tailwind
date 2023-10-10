<script>
  import ProductCard from '../../component/ProductCard.svelte';
  import Filter from '../../component/Filter.svelte';
  import Footer from '../../component/Footer.svelte';
  import { onMount } from 'svelte';

  let products = [];
  let categories = []

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
  }

  async function fetchCategory() {
    const res = await fetch('http://localhost:4000/categories');
    categories = await res.json();
  }
  
</script>

<div class="my-8">

<div class="flex items-center justify-center">
    <input
      type="text"
      placeholder="Search..."
      class="w-1/3 border rounded-l py-2 px-3 focus:outline-none border-primary"
    />
    <button
      class="border border-primary border-l-0 bg-primary text-white rounded-r py-2 px-4 hover:bg-primary-dark"
    >
      Search
    </button>
  </div>

  <Filter {categories} {fetchProduct} />

  <ProductCard {products} />
</div>

<Footer />