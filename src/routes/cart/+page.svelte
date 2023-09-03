<script>
    import {onMount} from 'svelte';
    import {cart, plusItem, minusItem, deleteItem, updateCheckoutItems} from "../../store/cartStore.js";
    

let totalItems = 0;
let totalPrice = 0;

function updateTotals() {
    totalItems = $cart.reduce((sum, item) => item.selected ? sum + item.quantity : sum, 0);
    totalPrice = $cart.reduce((sum, item) => item.selected ? sum + parseFloat(item.price.replace('$', '')) * item.quantity : sum, 0);
    const selectedProducts = $cart.filter(item => item.selected);
    
}

onMount(() => {
  const storedCart = localStorage.getItem('cart');
  cart.set(storedCart ? JSON.parse(storedCart) : []);
});

let selectAll = false;

    function updateSelectAll() {
        selectAll = $cart.every(item => item.selected);
    }

    function toggleSelectAll() {
        selectAll = !selectAll;
        $cart = $cart.map((item) => ({
            ...item,
            selected: selectAll,
        }));
        updateTotals();
    }

    
let isCheckoutPopupVisible = false;


    function handleCheckout() {
        const selectedProducts = $cart.filter(item => item.selected);
        if (selectedProducts.length === 0) {
            isCheckoutPopupVisible = true;
        } else {
            updateCheckoutItems(selectedProducts);
            
            window.location.href = "/checkout";
        }
    }




</script>
<div class="bg-gray-100 w-full h-full flex justify-center">
    <div class="w-3/6 bg-white overflow-auto my-4 rounded">
        <div class="text-stone-700 mx-4 my-2 pb-2 pt-4 text-md font-extrabold">Shopping Cart</div>
        <div class="flex my-2 mx-4">
            <input type="checkbox" class="h-4 w-4 " checked={selectAll} disabled={false} on:change={toggleSelectAll}  />
            <span class="text-stone-700 text-sm mx-4">Select All</span>
            <span class="text-stone-700 text-sm mx-8">Items</span>
            <span class="text-stone-700 text-sm ml-56">Unit price</span>
            <span class="text-stone-700 text-sm mx-16">Quantity</span>
            <span class="text-stone-700 text-sm ">Total</span>
        </div>
        {#each $cart as item}
        <div class="flex py-4 pl-2 mx-2 border-b items-center rounded">
        <input type="checkbox" class="h-5 w-5 " bind:checked={item.selected} on:change={() => { updateTotals(); updateSelectAll(); }} />
            <img class="w-28 h-28 ml-4" src={item.thumbnailUrl} alt={item.title} />
            <div class="w-full">
                <div class="flex items-center">
                <div class="text-stone-700 text-sm px-4 text-left">{item.title}</div>
                <div class="text-sm text-stone-800 ml-auto mx-8">${item.price}</div>
                <button class="mx-4 w-6 h-6 border border-gray-300 rounded px-2 flex items-center justify-center
                    {item.quantity === 1 ? 'text-gray-300 border-gray-300 cursor-default' : ''}"
                    on:click={() => { minusItem(item); updateTotals(); }}
                >
                    -
                </button>
                <span class="w-4 text-center text-md text-stone-700">{item.quantity}</span>
                <button class="mx-4 w-6 h-6 border border-gray-300 rounded px-2 flex items-center justify-center"
                    on:click={() => { plusItem(item); updateTotals(); }}
                >
                    +
                </button>

                <div class="mx-4 w-16">
                    <p class="font-md text-md text-primary text-right">${(item.price.replace('$', '') * item.quantity).toFixed(2)}</p>
                </div>
                </div>
                <div class="flex justify-end mt-12 mx-4">
                <button class="text-stone-500 text-xs mt-6" on:click={() => deleteItem(item)}>
                    Remove
                </button>
                </div>
            </div>
        </div>
        {/each}
    </div>
    <div class="w-1/5 h-1/5 py-2 bg-white m-4 sticky top-4 rounded">
        <p class="text-stone-700 border-b mx-4 py-4 text-md font-extrabold">Order Summary</p>
        <p class="py-2 px-4 text-stone-500 text-sm text-left"> Total:
            <span class="float-right">
            {totalItems === 1 ? `${totalItems} item` : `${totalItems} items`}
            </span>
        </p>

        <p class="text-stone-700 text-sm font-bold px-4 text-left flex justify-between items-center">
            Cart Total: <span class="text-stone-700 float-right text-lg">USD ${totalPrice.toFixed(2)}</span>
        </p>
        <div class="mx-4 my-4">
            <button on:click={handleCheckout} class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto">
                Check Out
            </button>
        </div>
    </div>
</div>

{#if isCheckoutPopupVisible}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md">
            <p class="p-8">You have not selected any items for checkout</p>
            <button class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto" on:click={() => isCheckoutPopupVisible = false}>
                OK
            </button>
        </div>
    </div>
{/if}
