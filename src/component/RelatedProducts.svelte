<script>
    export let relatedProducts = [];
</script>

{#if relatedProducts.length > 0}
  <div class="grid grid-cols-3 gap-4 mt-4">
    {#each relatedProducts as relatedProduct (relatedProduct.id)}
      <div class="bg-white border rounded p-4 shadow hover:shadow-md">
        <img src={relatedProduct.thumbnailUrl} alt={relatedProduct.title} class="w-full mb-2" />
        <h3 class="text-sm font-semibold">{relatedProduct.title}</h3>
        <p class="text-xs text-gray-600">{relatedProduct.price}</p>
      </div>
    {/each}
  </div>
{/if}