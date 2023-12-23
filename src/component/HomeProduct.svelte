<script>
    export let products;

    import { goto } from "$app/navigation";
    function gotoPage(product) {
        goto('/products/'+ product.id);
    }


</script>


    <div class="flex flex-wrap justify-center w-full bg-stone-100">
        {#each products as product}
            <div on:click={() => gotoPage(product)} class="w-48 bg-white m-1 cursor-pointer rounded" >
            <img src={product.thumbnailUrl} alt={product.title} class="w-48 object-contain mb-4" />
            <h3 class="text-base font-semibold text-gray-600 px-2">{product.title}</h3>
            <p class="font-semibold text-primary px-2 pb-2">${product.price}</p>
            </div>      
        {/each}
    </div>

