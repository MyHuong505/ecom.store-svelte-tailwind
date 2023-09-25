<script>
  export let data;
  import { goto } from "$app/navigation";
  import { onMount } from 'svelte';
  import {cart, addToCart} from '../../../store/cartStore.js'
  import RelatedProducts from '../../../component/RelatedProducts.svelte';
  import HomeProduct from '../../../component/HomeProduct.svelte';
  import Footer from "../../../component/Footer.svelte";
  import NavBar from "../../../component/NavBar.svelte";



  let categories =[];
  let product = {
    title: "",
    price: "",
    url: "",
    thumbnailUrl: "",
    categoryId: "",
    relatedImages: [],
    highlight:"",
    specifications:{},
    sizes: ["S", "M", "L"]
  };

let isEditing = false;


onMount(async () => {
  await fetchData();
  fetchCategory();
});


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

let isDeletePopupOpen = false;

function openDeletePopup() {
  isDeletePopupOpen = true;
}

async function confirmDelete() {
  isDeletePopupOpen = false;
  await deleteProduct(data.id);
}

function cancelDelete() {
  isDeletePopupOpen = false;
}

let selectedSize = ''; 

function setSelectedSize(size) {
  showSizeError = false;
  selectedSize = size;
}

let showSizeError = false;

function addToCartClicked() {
    if (selectedSize) {
      showSizeError = false; 
      addToCartAndShowPopup(product, selectedSize);
    } else {
      showSizeError = true;
    }
  }

let showPopup = false;

async function addToCartAndShowPopup(product, selectedSize) {
  addToCart(product, selectedSize); 
  console.log(selectedSize);
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

let relatedImages = product.relatedImages;

$: {
  relatedImages = product.relatedImages;
}

let quantity = 1;

  function handleQuantityInput(event) {
    const inputValue = parseInt(event.target.value); 

    if (isNaN(inputValue) || inputValue <= 0) {
      quantity = 1; 
    } else {
      quantity = inputValue;
    }
  }

  function decrementQuantity() {
    if (quantity > 1) {
      quantity--;
    }
  }

  function incrementQuantity() {
    quantity++;
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
<div class="bg-white">
    <div class="max-w mx-auto p-4 flex justify-center">
    <img src={product.thumbnailUrl} alt={product.title} />
      <div class="px-12">
        <h3 class="text-xl text-stone-700 font-semibold mb-2">{product.title}</h3>
        <p class="text-gray-600 text-primary">{product.price}</p>

        <div class="py-2">
          <div class="flex flex-col">
            <div class="mb-2 text-sm">Size: <span class="font-semibold text-stone-700">{selectedSize}</span></div>
            <div>

            {#each product.sizes as size}
              <button
                class="border rounded px-6 py-1 mr-3
                {selectedSize === size ? 'bg-white text-primary border-primary border-2 font-semibold' : 'border-gray-300 text-gray-700'}"
                on:click={() => setSelectedSize(size)}
              >{size}
              </button>
            {/each}

            <div class="flex items-center mt-6">
              <p>Quantity:</p>
              <button class="mx-4 w-8 h-8 border border-gray-300 rounded flex items-center justify-center" on:click={decrementQuantity}>
                -
              </button>
              <input type="number" class="w-12 h-8 py-1 border border-gray-300 rounded outline-none" bind:value={quantity} on:input={handleQuantityInput} />
              <button class="mx-4 w-8 h-8 border border-gray-300 rounded flex items-center justify-center" on:click={incrementQuantity}>
                +
              </button>
            </div>

            </div>
              {#if showSizeError}
                <p class="text-red-500">Please Select Size</p>
              {/if}    
            </div>

          <button class="my-4 bg-primary text-white text-lg font-bold px-20 py-3 rounded text-sm hover:bg-secondary ml-auto"
            on:click={addToCartClicked}
          >
            ADD TO CART
          </button>

          <div>
            <a class="hover:text-primary" href={product.url} > View </a>
            <button class="text-stone-700 hover:text-primary p-2" on:click={() => { isEditing = true }} > Edit </button>
            <button on:click={openDeletePopup} class="text-stone-700 hover:text-primary p-2"> Delete </button>
          </div>
          
        </div>
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

<div class="bg-white">
  <RelatedProducts {relatedProducts} />
</div>

<div class="bg-gray-100">
  <div class="flex justify-center">
    <div class="bg-white w-2/3 flex flex-col">

      <div class="w-full bg-gray-100">
      <p class="py-2 px-4 "></p>
      </div>  

      <div class=" flex flex-row w-1/2 justify-center items-center">
        <div class="w-1/3 flex items-center">
        <a href="#overview" on:click={() => goto('#overview')} 
          class="px-14 py-2 cursor-pointer bg-white text-primary border-bottom font-extrabold border-b-4 border-primary">Overview</a>
        </div>
        <div class="w-1/3 flex  justify-center items-center">
          <a href="#photos" on:click={() => goto('#photos')} 
            class="text-md text-stone-700 w-1/3 hover:text-primary hover:font-extrabold hover:scale-110 leading-none ">Photos</a>
        </div>
        <div class="w-1/3 flex justify-center items-center">
          <a href="#recommendations" on:click={() => goto('#recommendations')} 
            class="text-md text-stone-700 hover:text-primary hover:font-extrabold hover:scale-110 leading-none ">Recommendations</a>
        </div>
      </div>

      <div class="px-4 border-t mb-8">
        <section id="overview">
          <p class="font-extrabold text-sm text-stone-700 py-2">Highlights</p> 
          <p class="text-xs text-stone-600 pb-2">{product.highlight}</p>
        </section>

        <section id="photos">
          <p class="font-extrabold text-sm text-stone-700 py-2">Photos</p>
          <div class="flex flex-col justify-center items-center">
            {#each relatedImages as imageUrl}
            <img class="py-2" src={imageUrl} alt="Related Image" />
            {/each}
          </div>
        </section>

        <section id="recommendations">
          <p class="font-extrabold text-sm text-stone-700 py-2">Recommendations</p>
          <HomeProduct bind:products={relatedProducts} />
        </section>
      </div>

    </div>
  </div>
      <div class="bg-gray-100 w-full py-2"></div>
</div>

{#if isDeletePopupOpen}
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="bg-white p-6 rounded border shadow-md">
      <p class="text-stone-700 text-md font-semibold mb-2">Are you sure you want to delete this item?</p>
      <div class="flex justify-end">
        <button on:click={confirmDelete} class="text-stone-700 hover:text-primary p-2 mr-4">Yes</button>
        <button on:click={cancelDelete} class="text-stone-700 hover:text-primary p-2">No</button>
      </div>
    </div>
  </div>
{/if}


<NavBar />

<Footer />
