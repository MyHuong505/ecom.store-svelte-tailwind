<script>
  import { createEventDispatcher } from 'svelte';
  export let isOpen = false;
  export let message = "";

  const dispatch = createEventDispatcher();

  function closePopup() {
    isOpen = false;
    dispatch('close');
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-md">
      <p class="p-8">{message}</p>
      <button class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto" on:click={closePopup}>
        OK
      </button>
    </div>
  </div>
{/if}