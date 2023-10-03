<!-- search/index.svelte -->
<script>
  import { onMount } from 'svelte';

  let products = [];
  let searchTerm = '';

  onMount(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    searchTerm = urlSearchParams.get('term');

    if (searchTerm) {
      fetchProducts();
    }
  });

  async function fetchProducts() {
    try {
      const response = await fetch(
        `http://localhost:4000/products?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error('Lỗi khi tìm kiếm sản phẩm');
      }
      const data = await response.json();
      products = data;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    }
  }
</script>

<div>
  <h1>Kết quả tìm kiếm cho "{searchTerm}"</h1>
  <ul>
    {#each products as product}
      <li>{product.name}</li>
    {/each}
  </ul>
</div>
