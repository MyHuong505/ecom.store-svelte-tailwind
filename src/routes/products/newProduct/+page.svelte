<script>
import { onMount } from 'svelte';  
let categories = [];
let newProduct = {
    title: "",
    url: "",
    thumbnailUrl: "",
    categoryId: ""
};


async function createProduct(){
    await fetch('/api/products',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(newProduct)
    }),
    location.reload();
}

  async function fetchCategory() {
    const res = await fetch('/api/categories');
    categories = await res.json();
    // console.log(categories);
  }
  
onMount(()=>{
  fetchCategory();
})

</script>

<h1 class="flex justify-center m-8 font-semibold text-xl">Add new product</h1>

<div class="flex items-center justify-center">
  <div class="w-full max-w-md p-4 bg-gray-100">
      <input type="text" bind:value={newProduct.title} placeholder="Title" class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <input type="text" bind:value={newProduct.url} placeholder="Url" class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <input type="text" bind:value={newProduct.thumbnailUrl} placeholder="ThumbnailUrl" class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <input type="text" bind:value={newProduct.price} placeholder="Price" class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <span class="block my-2 text-gray-600">Select category</span>

      <select bind:value ={newProduct.categoryId} class="w-full px-2 py-1 mb-2 border border-gray-300 rounded">
        {#each categories as category}
          <option value={category.id}>{category.title}</option>
        {/each}
      </select>

    <div>
      <button on:click={()=>{createProduct()}} class="px-8 py-2 my-4 text-white rounded bg-primary">Create</button>
    </div>

  </div>
</div>


