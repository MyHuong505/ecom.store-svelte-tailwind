<script>
  import ProductCard from '../../component/ProductCard.svelte';
  import Filter from '../../component/Filter.svelte';
  import Footer from '../../component/Footer.svelte';
  import SearchBar from '../../component/SearchBar.svelte';
  import { onMount } from 'svelte';

  let products = [];
  let categories = [];
  let searchTerm = ''; // Biến state để lưu giá trị tìm kiếm

  onMount(() => {
    fetchProduct();
    fetchCategory();
  });

  async function fetchProduct(categoryId) {
    try {
      let url = 'http://localhost:4000/products';
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }
      if (searchTerm) {
        url += `&searchTerm=${searchTerm}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Lỗi khi tìm kiếm sản phẩm');
      }
      const data = await response.json();
      products = data;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    }
  }

  async function fetchCategory() {
    try {
      const res = await fetch('http://localhost:4000/categories');
      if (!res.ok) {
        throw new Error('Lỗi khi tải danh mục');
      }
      categories = await res.json();
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    }
  }

  function handleSearch(event) {
    searchTerm = event.detail; // Cập nhật giá trị tìm kiếm
    fetchProduct(null, searchTerm);
  }
</script>

<div class="my-8">
  <!-- SearchBar với sự kiện search -->
  <SearchBar on:search={handleSearch} />

  <!-- Filter -->
  <Filter {categories} {fetchProduct} />

  <!-- ProductCard -->
  <ProductCard {products} />
</div>

<!-- Footer -->
<Footer />