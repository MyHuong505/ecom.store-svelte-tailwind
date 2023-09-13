<script>
  import { onMount, onDestroy } from 'svelte';

  let banners = [
    { link: 'http://graphicgoogle.com/wp-content/uploads/2017/10/facebook-Women-Fashion-Sale-Banner.jpg', text: '1' },
    { link: 'https://i.pinimg.com/originals/6f/76/b7/6f76b7b5277565dcbd2e3d0db2178ff6.jpg', text: '2' },
    { link: 'https://cdn2.f-cdn.com/contestentries/1196786/25468056/5a21896309171_thumb900.jpg', text: '3' },
    { link: 'https://3.bp.blogspot.com/-AcY0y1_2Tj0/X1gCorMCBxI/AAAAAAAAAGc/pf2-mG0D7902_PaukCkGuu2gCO9UgJDWQCK4BGAYYCw/s1600/banner2.jpg', text: '4' },
    { link: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/40058396168299.5ea8569a1915f.png', text: '5' },
    { link: 'https://i.pinimg.com/originals/19/ed/18/19ed18ec6b05b176493cedff7746d747.jpg', text: '6' }
  ];

  let currentIndex = 0;
  let intervalId = null;


  const nextBanner = () => {
    currentIndex = (currentIndex + 1) % banners.length;
  };

  const previousBanner = () => {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
  };  

  const startAutoPlay = () => {
    intervalId = setInterval(nextBanner, 3000);
  };

  const stopAutoPlay = () => {
    clearInterval(intervalId);
  };

  onMount(() => {
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });

let sliderDots = [];

function updateSliderDots() {
  sliderDots = banners.map((_, i) => ({
    index: i,
    isActive: i === currentIndex,
  }));
}

function goToBanner(index) {
  currentIndex = index;
  updateSliderDots(); 
}


</script>
<style>
  .slider-dot {
    background-color: #ccc;
  }

  .slider-dot.bg-zinc-700 {
    background-color: #333;
  }
</style>


<div class="grid grid-cols-3 gap-2">
    
  <div class="col-span-2 relative flex items-center">
    {#each banners as { link, text }, index}
      <div
        class="w-full absolute opacity-0 transition-opacity duration-500 "
        class:opacity-100={index === currentIndex}
        on:mouseover={stopAutoPlay}
        on:mouseleave={startAutoPlay}
      >
        <img src={link} alt={text} class="w-full h-96 object-cover rounded" />
      </div>
    {/each}
  <div class="absolute bottom-0 left-0 right-0 flex justify-center">
    <ul class="flex space-x-2">
      {#each banners as { link, text }, index}
        <li>
          <button
            class="h-2 w-2 rounded-full focus:outline-none transition duration-300 ease-in-out slider-dot"
            class:bg-zinc-700={index === currentIndex}
            on:click={() => goToBanner(index)}
          ></button>
        </li>
      {/each}
    </ul>
  </div>

    <div class="absolute z-1 left-0"> 
      <button on:click={previousBanner}>
        <i class="fas fa-chevron-left px-2 py-3 text-xl text-slate-200 bg-zinc-500 bg-opacity-25 hover:bg-zinc-700"></i>
      </button>
    </div>

    <div class="absolute z-1 right-0">
      <button on:click={nextBanner}>
        <i class="fas fa-chevron-right px-2 py-3 text-xl text-slate-200 bg-zinc-500 bg-opacity-25 hover:bg-zinc-700"></i>
      </button>
    </div>
  </div>

  <div class="col-span-1 flex flex-col">
    <img
      src="https://static.vecteezy.com/system/resources/previews/000/185/218/original/vector-fashion-sale-and-discount-voucher-template-design.jpg"
      alt="voucher-1"
      class="w-full h-48 object-cover rounded"
    />

    <img
      src="https://tse3.mm.bing.net/th?id=OIP.Nqakqz4Z9Aicys2XsqyFKAHaEQ&pid=Api&P=0&h=220"
      alt="voucher-2"
      class="w-full h-48 object-cover rounded"
    />
  </div>

</div>






