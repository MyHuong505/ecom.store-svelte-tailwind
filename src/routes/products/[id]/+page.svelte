<script>
  import { onMount } from 'svelte';
    
  export let data;
  

  let categories =[];
  let product = {
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
  product = await res.json();
  // console.log(product);
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

let cart = [];  
let totalItems = 0;
let totalPrice = 0;
	
const addToCart = (product) => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
		cart = [...cart, { ...product, quantity: 1 }];
	}
  calculateCartTotal();
};  

  const plusItem = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    calculateCartTotal();
    cart = cart;
    return;
  };

  const minusItem = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter((cartItem) => cartItem.id !== existingItem.id);
      }
    }
    calculateCartTotal();
    cart = cart;
    return;
  };

const calculateCartTotal = () => {
  totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', ''))* item.quantity, 0);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('totalItems', totalItems.toString());
  localStorage.setItem('totalPrice', totalPrice.toString());
};

onMount(() => {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    const storedTotalItems = localStorage.getItem('totalItems');
    totalItems = storedTotalItems ? parseInt(storedTotalItems) : 0;

    const storedTotalPrice = localStorage.getItem('totalPrice');
    totalPrice = storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
});

  function deleteItem(item) {
    cart = cart.filter(cartItem => cartItem !== item);
    calculateCartTotal();
  }

</script>


<div class="cart-list">
  <p>There are {totalItems} items in your cart</p>
  {#each cart as item}
      <div>
        <img class="w-12" src={item.thumbnailUrl} alt={item.title}/>
        <h3 class="mt-2 text-stone-700 ">{item.title}</h3>
        <p class="text-md text-primary">{item.price}</p> 
        <button on:click={()=>plusItem(item)}>+</button>
        {item.quantity}
        <button on:click={()=>minusItem(item)}>-</button>
        <button on:click={()=>deleteItem(item)}>Delete</button>
        <p>${item.price.replace('$', '') * item.quantity}</p>
      </div>
  {/each}
  <p>Total Price: ${totalPrice}</p>
</div>



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
      <button class="hover:text-primary p-2" on:click={deleteProduct(data.id)} > Delete </button>
      <button on:click={()=>addToCart(product)}>Add to cart</button>
    </div>
  
  </div>
</div>

{/if}
