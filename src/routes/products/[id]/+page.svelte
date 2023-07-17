<script>
  import { onMount } from 'svelte';  
  export let data;
  let categories =[];
  let editedProduct = {
    title: "",
    prive:"",
    url: "",
    thumbnailUrl: "",
    categoryId: ""
};
let isEditing = false;


onMount(()=>{
  fetchData();
  fetchCategory();
})

 async function fetchData(){
  let res = await fetch(`http://localhost:4000/products/${data.id}`);
  editedProduct = await res.json();
  // console.log(editedProduct);
 }
 


async function editProduct(){
await fetch(`http://localhost:4000/products/${data.id}`, {
 method: "PUT",
 headers: {
 "Content-Type": "application/json",
},
 body: JSON.stringify(editedProduct),
});
  // location.reload();
}

async function fetchCategory(){

const res = await fetch('http://localhost:4000/categories');
 categories = await res.json();
 // console.log(categories);

}


async function deleteProduct(productId) {
  const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: 'DELETE',
  });
  await response.json();
  await fetchData();
}

</script>


{#if isEditing}
  <p class="flex justify-center m-8 font-semibold text-xl">Update product</p>
  <div class="flex m-8 flex-col items-center justify-center">
    <div class="w-full max-w-md p-4 bg-gray-100">
      <input type="text" bind:value={editedProduct.title} class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <input type="text" bind:value={editedProduct.url} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>
      <input type="text" bind:value={editedProduct.thumbnailUrl} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>
      <input type="text" bind:value={editedProduct.price} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>

      <select bind:value={editedProduct.categoryId} class="w-full px-2 py-1 mb-2 border border-gray-300 rounded">
        {#each categories as category}
          <option value={category.id}>
            {category.title}
          </option>
        {/each}
      </select>
    <div>
      <button on:click={() => { editProduct() }} class="text-white border w-24 py-2 my-2 bg-primary rounded-md">Save</button>
      <button on:click={() => { isEditing = false }} class="border w-24 py-2 mx-4 rounded-md">Cancel</button>
    </div>
    </div>
  </div>
{:else}
<div class="max-w-md mx-auto">
  <img src={editedProduct.thumbnailUrl} alt={editedProduct.title} />

  <div class="py-6">
    <h3 class="text-xl font-semibold mb-2">{editedProduct.title}</h3>
    <p class="text-gray-600 text-primary">{editedProduct.price}</p>

    <div class="py-2">
      <a class="hover:text-primary" href={editedProduct.url} > View </a>
      <button class="hover:text-primary p-2" on:click={() => { isEditing = true }} > Edit </button>
      <button class="hover:text-primary p-2" on:click={()=> {deleteProduct(data.id)}} > Delete </button>
    </div>
  
  </div>
</div>

{/if}
