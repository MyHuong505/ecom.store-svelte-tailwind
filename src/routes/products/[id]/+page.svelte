<script>
  export let data;
  import { onMount  } from 'svelte';
  import {addToCart} from '../../../store/cartStore.js'
  import RelatedProducts from '../../../component/RelatedProducts.svelte';



  let categories =[];
  let product = {
    title: "",
    price:"",
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
  product = await res.json();
  await fetchRelatedProducts();
  // console.log(product);
 }

async function fetchCategory(){
 const res = await fetch('http://localhost:4000/categories');
 categories = await res.json();
 // console.log(categories);
}


async function editProduct(){
await fetch(`http://localhost:4000/products/${data.id}`, {
 method: "PUT",
 headers: {
 "Content-Type": "application/json",
},
 body: JSON.stringify(product),
});
  location.reload();
}


async function deleteProduct(productId) {
  const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: 'DELETE',
  });
  await response.json();
  await fetchData();
}

let showPopup = false;

async function addToCartAndShowPopup(product) {
  addToCart(product); 
    showPopup = true;  
    setTimeout(() => {
      showPopup = false; 
    }, 2000); 
}

let relatedProducts = [];

async function fetchRelatedProducts() {
  if (product.categoryId) {
    const res = await fetch(`http://localhost:4000/products?categoryId=${product.categoryId}`);
    relatedProducts = await res.json();
    relatedProducts = relatedProducts.filter(item => item.id !== product.id); 
  }
}

</script>

{#if isEditing}
  <p class="flex justify-center m-8 font-semibold text-xl">Update product</p>
  <div class="flex m-8 flex-col items-center justify-center">
    <div class="w-full max-w-md p-4 bg-gray-100">
      <input type="text" bind:value={product.title} class="w-full px-2 py-1 my-2 border border-gray-300 rounded" />
      <input type="text" bind:value={product.url} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>
      <input type="text" bind:value={product.thumbnailUrl} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>
      <input type="text" bind:value={product.price} class="w-full px-2 py-1 my-2 border border-gray-300 rounded"/>

      <select bind:value={product.categoryId} class="w-full px-2 py-1 mb-2 border border-gray-300 rounded">
        {#each categories as category}
          <option value={category.id}>
              {category.title}
          </option>
        {/each}
      </select>
    <div>
      <button on:click={editProduct} class="text-white border w-24 py-2 my-2 bg-primary rounded-md">Save</button>
      <button on:click={() => { isEditing = false }} class="border w-24 py-2 mx-4 rounded-md">Cancel</button>
    </div>
    </div>
  </div>
{:else}
<div class="max-w-md mx-auto">
  <img src={product.thumbnailUrl} alt={product.title} />

  <div class="py-6">
    <h3 class="text-xl font-semibold mb-2">{product.title}</h3>
    <p class="text-gray-600 text-primary">{product.price}</p>

    <div class="py-2">
      <a class="hover:text-primary" href={product.url} > View </a>
      <button class="hover:text-primary p-2" on:click={() => { isEditing = true }} > Edit </button>
      <button class="hover:text-primary p-2" on:click={() => deleteProduct(data.id)}> Delete </button>
      <button on:click={()=>console.log("Button clicked"), addToCartAndShowPopup(product)}>Add to cart</button>
    </div>
  
  </div>
</div>

{/if}

{#if showPopup}
<div class="fixed inset-0 flex items-center justify-center">
  <div class="bg-black bg-opacity-50 p-6 rounded shadow-md p-12 flex flex-col items-center">
    <i class="fa-solid fa-circle-check text-green-500 text-5xl mb-4 "></i>
    <p class="text-md font-semibold mb-2 text-white">Item has been added to your cart</p>
  </div>
</div>
{/if}

<RelatedProducts {relatedProducts}/>