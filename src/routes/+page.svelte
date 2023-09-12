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
        products = list.slice(0,10);
    }

    onMount(()=>{
      fetchItem();
    })

</script>


<div class="bg-gray-100 ">
    <div class="bg-white mx-48 ">
        
        <Banner />

        <div class="my-8">
        <Carousel {products}/>
        </div>

        <div class="flex justify-center">
            <h1 class="text-2xl font-bold text-gray-700">New arrivals</h1>
        </div>

        <HomeProduct {products} />

        <div class="flex justify-center mt-4 mb-8">
            <a class="font-semibold text-lg text-primary hover:underline" href="/products">View more</a>
        </div>

    </div>
</div>

<Footer/>
