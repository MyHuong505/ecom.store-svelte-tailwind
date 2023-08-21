<script>
export let products;
import { goto } from "$app/navigation";
function gotoPage(product) {
  goto('/products/'+ product.id);
}

</script>

<div class="grid grid-cols-4 gap-4 mx-24 cursor-pointer my-8">
  {#each products as product}
    <div on:click={() => gotoPage(product)} class="flex flex-col bg-stone-100 p-4">
      <img class="max-h-96" src={product.thumbnailUrl} alt={product.title} /> 
      <h3 class="mt-2 text-stone-700 ">{product.title}</h3>

      <div class="mt-auto">
        <p class="font-medium text-lg text-primary">${product.price}</p>
      </div>
    </div>
  {/each}
</div>