<script>
export let products;
import { goto } from "$app/navigation";
function gotoPage(product) {
  goto('/products/'+ product.id);
}

</script>

<div class="flex justify-center">
  <div class="flex flex-wrap justify-center mx-24 cursor-pointer my-8">
    {#each products as product}
      <div on:click={() => gotoPage(product)} class="w-72 flex flex-col bg-white border p-4 rounded shadow hover:shadow-md">
        <img class="w-96" src={product.thumbnailUrl} alt={product.title} /> 
        <h3 class="mt-2 text-stone-700 ">{product.title}</h3>

        <div class="mt-auto">
          <p class="font-medium text-lg text-primary">${product.price}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
