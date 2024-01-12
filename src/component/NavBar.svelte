<script>
import { onMount } from "svelte";

let activeTab = 'overview';

function changeTab(tab) {
  activeTab = tab;
  const targetSection = document.getElementById(tab);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
}

let showNavbar = false;

onMount(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      showNavbar = scrollPosition >= 1500;

      const overviewSection = document.getElementById('overview');
      const photosSection = document.getElementById('photos');
      const recommendationsSection = document.getElementById('recommendations');

      const overviewTop = overviewSection.offsetTop;
      const photosTop = photosSection.offsetTop;
      const recommendationsTop = recommendationsSection.offsetTop;

      if (scrollPosition >= overviewTop && scrollPosition < photosTop) {
        activeTab = 'overview';
      } else if (scrollPosition >= photosTop && scrollPosition < recommendationsTop) {
        activeTab = 'photos';
      } else if (scrollPosition >= recommendationsTop) {
        activeTab = 'recommendations';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

</script>

<nav class="flex justify-center w-full bg-white fixed top-0 {showNavbar ? '' : 'hidden'}">
  <div class="w-4/6 flex">
  <a
    class="w-48 flex items-center justify-center px-4 py-2 cursor-pointer {activeTab === 'overview' ? 'bg-white text-primary border-bottom font-extrabold border-b-4 border-primary' : 'hover:bg-gray-200'}"
    on:click={() => changeTab('overview')}
  >
    Overview
  </a>
  <a
    class="w-48 flex items-center justify-center px-4 py-2 cursor-pointer {activeTab === 'photos' ? 'bg-white text-primary border-bottom font-extrabold border-b-4 border-primary' : 'hover:bg-gray-200'}"
    on:click={() => changeTab('photos')}
  >
    Photos
  </a>
  <a
    class="w-48 flex items-center justify-center px-4 py-2 cursor-pointer {activeTab === 'recommendations' ? 'bg-white text-primary border-bottom font-extrabold border-b-4 border-primary' : 'hover:bg-gray-200'}"
    on:click={() => changeTab('recommendations')}
  >
    Recommendations
  </a>
  </div>
</nav>
