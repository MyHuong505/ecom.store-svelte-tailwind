<script>
import { onMount } from 'svelte';
import HomeProduct from '../component/HomeProduct.svelte';
import Banner from '../component/Banner.svelte';
import Footer from '../component/Footer.svelte';
import Carousel from '../component/Carousel.svelte';


let products = [];

    async function fetchItem() {
        const res = await fetch('http://localhost:4000/products');
        const list = await res.json();
        products = list.slice(0,20);
    }

    onMount(()=>{
      fetchItem();
    })

</script>
  

<div class="bg-stone-100 flex flex-col ">
  <div class="mt-2 mx-48">
    <div class="">
      <Banner />
    </div>
  </div>

  <div class="mt-2 mx-48">
    <div class="flex justify-center mt-8 bg-white border p-2  ">
        <h1 class="text-2xl font-semibold text-primary">New arrivals</h1>
    </div>
            <div class="bg-primary h-1 w-full"></div>
    <div class="mb-8 mt-4">
      <Carousel {products}/>
    </div>
  </div>

  <div class="mt-2 mx-48">
        <div class="flex justify-center bg-white border p-2 ">
            <h1 class="text-2xl font-semibold text-primary">Recommendations for you</h1>
        </div>
            <div class="bg-primary h-1 w-full"></div>

        <div class="mb-4 mt-4">
            <HomeProduct {products} />
        </div>
        

        <div class="flex justify-center mt-4 mb-8 ">
            <a class="font-md bg-white text-sm text-gray-500 border p-2 rounded hover:text-primary hover:border-primary" href="/products">View more</a>
        </div>
    </div>

</div>

<Footer/>
