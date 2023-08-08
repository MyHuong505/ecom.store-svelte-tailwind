<script>
  import { goto } from "$app/navigation";

    let inputSearch = '';
    function handleSearch() {
        goto('/search/' + inputSearch);
    }
</script>

<!-- <form class=""> -->
    <!-- <label for="search-product">Search</label>
    <input bind:value={inputSearch} name="search-product" type="text" />
    <button>Search</button>
</form>  -->

<input type="text" placeholder="Search..." bind:value={inputSearch} />
<button on:click={handleSearch}>Search</button>