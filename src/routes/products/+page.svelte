<script>
  import ProductList from '../../component/ProductList.svelte';
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
  <Filter {categories} {fetchProduct} />
  <ProductList {products} />
</div>

<Footer />