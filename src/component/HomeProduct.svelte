<script>
    export let products;

    import { goto } from "$app/navigation";
    function gotoPage(product) {
        goto('/products/'+ product.id);
    }


</script>

    <div class="flex flex-wrap justify-center gap-1">
        {#each products as product}
            <div on:click={() => gotoPage(product)} class="bg-white p-2 cursor-pointer" >
            <img src={product.thumbnailUrl} alt={product.title} class="h-48 object-contain mb-4" />
            <h3 class="text-base font-semibold text-gray-600">{product.title}</h3>
            <p class="font-semibold text-primary">{product.price}</p>
            </div>      
        {/each}
    </div>