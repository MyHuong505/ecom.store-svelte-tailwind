<script>
  export let isOpen = false;
  export let message = "";
  export let onClose = () => {};

  function closePopup() {
    isOpen = false;
    onClose();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-1/3 bg-white p-6 rounded shadow-md flex flex-col items-center justify-center">
      <p class="p-6">{message}</p>
      <button class="w-2/5 bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto" on:click={closePopup}>
        OK
      </button>
    </div>
  </div>
{/if}