<script>
import { onMount } from 'svelte';
let products = [];

  async function fetchItem() {
    const res = await fetch('http://localhost:4000/products');
    const list = await res.json();
    products = list.slice(0,10);
  }

onMount(()=>{
      fetchItem();
})

</script>




<div class="bg-gray-100">
    <div class="bg-white mx-48 ">
        <div class="grid grid-cols-3 ">
            <div class="col-span-2">
                <img src="https://static.highsnobiety.com/thumbor/6P6jzEtHInE8dyWK1-QJQ_Q3OyE=/1600x1067/static.highsnobiety.com/wp-content/uploads/2018/09/11211304/Mannahatta-NYC-Clothing-Stores.jpg" alt="banner" 
                class="h-1/2 object-cover " />

            </div>
                <div class="flex flex-col">
                <img src="https://i.pinimg.com/564x/53/81/11/538111dedf06ce981d8fa65390889e2f.jpg" alt="banner-1" class="h-1/4 object-cover " />
                <img src="https://i.pinimg.com/564x/9e/cb/bc/9ecbbccb428b39e5b3ebf2d57c0498eb.jpg" alt="banner-2" class="h-1/4 object-cover " />
            </div>
        </div>
          <div class="flex justify-center">
            <h1 class="text-2xl font-bold">New arrivals</h1>
        </div>
        <div class="flex flex-wrap justify-center">
            {#each products as product}
                <div class="bg-white p-4">
                <img src={product.thumbnailUrl} alt={product.title} class="h-64 object-contain mb-4" />
                <h3 class="text-base font-semibold">{product.title}</h3>
                <p class="text-gray-500">{product.price}</p>
                </div>      
            {/each}
        </div>
        <div class="flex justify-center mt-4 mb-8">
            <a class="font-semibold text-lg" href="/products">View more</a>
        </div>

    </div>
</div>


