  <!-- SearchBar.svelte -->
  <script>
    import { goto } from '$app/navigation';

    let searchTerm = '';

 function handleSearch() {
  if (searchTerm.trim() !== '') {
    goto(`/search?term=${encodeURIComponent(searchTerm)}`);
  }
}

  </script>

  <div class="flex items-center justify-center">
    <input
      type="text"
      placeholder="Search..."
      class="w-1/3 border rounded-l py-2 px-3 focus:outline-none border-primary"
      bind:value={searchTerm}
    />
    <button
      class="border border-primary border-l-0 bg-primary text-white rounded-r py-2 px-4 hover:bg-primary-dark"
      on:click={handleSearch}
    >
      Search
    </button>
  </div>
