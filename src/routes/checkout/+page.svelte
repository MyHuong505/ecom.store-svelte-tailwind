<script>
import {onMount} from 'svelte';    
import {afterUpdate  } from 'svelte';
import {checkoutItems} from "../../store/cartStore.js";


    const countries = [
        { code: 'fra', countrycode: '+590',name: 'France', flag: 'https://tse3.explicit.bing.net/th?id=OIP.DdIdlrDrhxD2oTJbvd0TdgHaHv&pid=Api&P=0&h=220'},
        { code: 'vie', countrycode: '+84' ,name: 'Vietnam', flag: 'https://www.pngkit.com/png/detail/382-3826500_vietnam-flag-circle-icon-vietnam-flag-flags-of.png'},
        { code: 'usa', countrycode: '+00',name: 'United States', flag: 'https://cdn3.iconfinder.com/data/icons/flags-of-countries-3/128/USA-1024.png' },
    ];


let userData = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    countrycode: "",
    phoneNum: "",
    selectedCountry: countries[0],
};


let showSelect = false;
let isSubmitted = false;

function handleSubmit() {
        isSubmitted = true;
    }

let search = '';
let filteredCountries = countries;
    

function filterCountries() {
    filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(search.toLowerCase());
    });
}

  
function handleSearchKeydown(event) {
  if (event.key === 'Enter') {
    if (filteredCountries.length > 0) {
      userData.selectedCountry = filteredCountries[0];
      search = userData.selectedCountry.name;
      showSelect = false;
    }
  }
}



function handleCountryChange(countryCode) {
    userData.selectedCountry = countries.find(country => country.code === countryCode);
    search = userData.selectedCountry.name;
    showSelect = false;
    userData.countrycode = userData.selectedCountry.countrycode;
}

function handleSearchFocus() {
    showSelect = !showSelect;
    showClearButton = true;
}

function handleSearchBlur() {
    afterUpdate(() => {
      if (!showSelect && filteredCountries.length > 0) {
        userData.selectedCountry = filteredCountries[0];
        search = userData.selectedCountry.name;
    }
  });
}

let showClearButton = false;

function handleClearSearch() {
  search = '';
  filteredCountries = countries;
}  

let checkoutItemsData = [];

let totalProducts = 0;
let totalPrice = 0;


function calculateTotal() {
  totalProducts = 0;
  totalPrice = 0;

  for (const item of checkoutItemsData) {
    totalProducts += item.quantity;
    totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
  }
}


onMount(() => {
  const storedCheckoutItems = localStorage.getItem('checkoutItems');
  if (storedCheckoutItems) {
    checkoutItemsData = JSON.parse(storedCheckoutItems);
    calculateTotal();
  }
});


$: {
  calculateTotal();
}


let selectedShippingTime = '';
let shippingPrice = 0;

  function handleShippingChange(event) {
    selectedShippingTime = event.target.value;

    if (selectedShippingTime === 'first_option') {
      shippingPrice = 17.15;
    } else if (selectedShippingTime === 'second_option') {
      shippingPrice = 10.96;
    }
    calculateGrandTotal()
  }

function handleInputChange(event, field) {
    userData[field] = event.target.value;
}

function saveUserDataToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log(userData);
}

onMount(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        userData = JSON.parse(storedUserData);
    }
     if (!userData.countrycode) {
        userData.countrycode = countries[0].countrycode; 
    }
});

</script>


<div class="bg-gray-100 w-full h-full flex flex-row justify-center">
    <div class="flex flex-col w-3/6">
        <div class=" bg-white overflow-auto my-4 rounded">
            <div class="text-stone-700 mx-4 my-2 pb-2 pt-4 text-md font-extrabold">Shipping Address</div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*First Name</span>
                <input type="text" class="mx-4 rounded py-2 pl-1 border outline-none focus-within:border-blue-500 {isSubmitted && !userData.firstName ? 'border-red-500' : ''}" 
                    bind:value={userData.firstName} on:input={(e) => handleInputChange(e, 'firstName')}
                />
                {#if isSubmitted && !userData.firstName}
                    <p class="text-red-500 text-xs mx-4">Please enter your first name.</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1" >*Last Name</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !userData.lastName ? 'border-red-500' : ''}" 
                bind:value={userData.lastName} 
                />
                {#if isSubmitted && !userData.lastName}
                    <p class="text-red-500 text-xs mx-4">Please enter your last name.</p>
                {/if}
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*Address line 1</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !userData.address ? 'border-red-500' : ''}" 
                bind:value={userData.address}
                />
                {#if isSubmitted && !userData.address}
                    <p class="text-red-500 text-xs mx-4 ">Please enter your address.</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">Address line 2 (optional)</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500"  />
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/3">
            <span class="text-stone-500 text-xs mx-4 mb-1">*Country/Region</span>
            <div class="relative mx-4">
        <button
            class="flex items-center w-full px-4 py-2 border rounded outline-none focus-within:border-blue-500 bg-white"
            on:click={handleSearchFocus}>
{#if userData.selectedCountry}
    <img src={userData.selectedCountry.flag} alt={userData.selectedCountry.name} class="w-4 h-3 mr-2" />
    {userData.selectedCountry.name}
{:else}
    Select a country
{/if}
<span class="ml-auto">
    {#if showSelect}
        <i class="fas fa-chevron-up ml-2"></i>
    {:else}
        <i class="fas fa-chevron-down ml-2"></i>
    {/if}
</span>
        </button>
        {#if showSelect}
            <div class="absolute z-10 w-full bg-white border rounded shadow-lg">
                <input
                    type="text"
                    class="w-full px-4 py-2 border rounded outline-none focus-within:border-blue-500"
                    placeholder="Search country"
                    bind:value={search}
                    on:input={filterCountries}
                    on:keydown={handleSearchKeydown}
                    on:blur={handleSearchBlur}
                />
                {#if showClearButton}
                <button class="absolute right-4 top-2 text-gray-500" on:click={handleClearSearch}>
                    <i class="fas fa-times"></i>
                </button>
                {/if}
                {#each filteredCountries as country}
                    <div
                        class="flex items-center center-justify px-4 py-2 cursor-pointer hover:bg-gray-100"
                        on:click={() => handleCountryChange(country.code)}
                    >
                        <img src={country.flag} alt={country.name} class="w-4 h-3 mr-2" />
                        {country.name}
                    </div>
                {/each}
            </div>
        {/if}
        </div>
            </div>
            <div class="flex flex-col w-1/3">
                <span class="text-stone-500 text-xs mx-4 mb-1">State/County</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500" />
            </div>
            <div class="flex flex-col w-1/3">
                <span class="text-stone-500 text-xs mx-4 mb-1">*City</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !city ? 'border-red-500' : ''}" 
                bind:value={userData.city}/>
                {#if isSubmitted && !userData.city}
                    <p class="text-red-500 text-xs mx-4">Please enter your city.</p>
                {/if}
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*Zip/Postal Code</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !userData.zip ? 'border-red-500' : ''}" 
                bind:value={userData.zip}
                />
                {#if isSubmitted && !userData.zip}
                    <p class="text-red-500 text-xs mx-4">Please enter your zip/postal code.</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mb-1 ml-4">*Phone Number</span>
                <div class="flex items-center ml-4 mr-4">
                    <span class="text-gray-500 border py-2 px-2 rounded-l border-r-0 {isSubmitted && !userData.phoneNum ? 'border-red-500' : ''}">{userData.countrycode}</span>
                    <input type="tel" class="grow py-2 pl-1 border rounded-r outline-none focus-within:border-blue-500 {isSubmitted && !userData.phoneNum ? 'border-red-500' : ''}" 
                    bind:value={userData.phoneNum}
                    />
                </div>
                {#if isSubmitted && !userData.phoneNum}
                    <p class="text-red-500 text-xs mx-4 ">Please enter your phone number.</p>
                {/if}
                </div>
            </div>
        
        <div class="flex items-center justify-center">
            <button class="w-1/5 bg-primary text-white py-2 rounded text-sm hover:bg-secondary mb-8" on:click={() => {
                handleSubmit();
                saveUserDataToLocalStorage();
            }}>
                Save
            </button>
        </div>     
        </div>

    <div class="bg-white rounded mb-4">
        <div>

            <p class="text-stone-700 mx-4 py-4 text-md font-extrabold">Products Ordered</p>
            
            <div class="flex mx-4 mb-8">
            <label
                class="w-1/3 h-24 border p-4 rounded flex items-center transition duration-300 ease-in-out hover:border-blue-500 text-sm
                {selectedShippingTime === 'first_option' ? 'bg-blue-200 border-blue-500' : ''} cursor-pointer
                ">
                <input
                type="radio"
                value="first_option"
                bind:group={selectedShippingTime}
                on:change={handleShippingChange}
                />
                <div class="ml-2 text-stone-700">
                3 - 7 Business days shipping time
                <p class="text-sm text-stone-500 pt-1">
                    US $17.15
                </p>
                </div>
            </label>

            <label
                class="w-1/3 h-24 border p-4 rounded flex items-center mx-4 transition duration-300 ease-in-out hover:border-blue-500 text-sm
                {selectedShippingTime === 'second_option' ? 'bg-blue-200 border-blue-500' : ''} cursor-pointer
                ">
                <input
                type="radio"
                value="second_option"
                bind:group={selectedShippingTime}
                on:change={handleShippingChange}
                />
                <div class="ml-2 text-stone-700">
                10 - 15 Business days shipping time
                <p class="text-sm text-stone-500 pt-1">
                    US $10.96
                </p>
                </div>
            </label>
        
        </div>
    </div>
            
            {#each checkoutItemsData as item}
                <div class="flex my-4">
                <img class="w-20 h-20 ml-4" src={item.thumbnailUrl} alt={item.title} />
                <div class="w-full">
                    <div class="flex items-center">
                    <div class="text-stone-700 text-sm px-4 text-left">{item.title}</div>
                    <div class="text-sm text-stone-800 ml-auto mx-8">${item.price}</div>
                    <span class="w-4 text-center text-sm text-stone-700 ml-16">x{item.quantity}</span>
                    <p class="font-md text-sm text-primary text-right mr-4 ml-20">${(item.price.replace('$', '') * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="flex justify-end mt-12 mx-4">
                    </div>
                </div>
                </div>
            {/each}
        </div>
    </div>
    

    <div class="w-1/5 h-1/5 py-2 bg-white m-4 sticky top-4 rounded">
        <p class="text-stone-700 border-b mx-4 py-4 text-md font-extrabold">Order Summary</p>

        <p class="py-1 pt-4 px-4 text-stone-700 text-sm text-left"> Total:
            <span class="float-right">
            {totalProducts === 1 ? `${totalProducts} item` : `${totalProducts} items`}
            </span>
        </p>
        <p class="py-1 px-4 text-stone-700 text-sm text-left">Sub Total:
            <span class="float-right">
                US ${totalPrice.toFixed(2)}
            </span> 
        </p>
        <p class="py-1 px-4 text-stone-700 text-sm text-left">Shipping Charge:
            <span class="float-right">
                US ${shippingPrice.toFixed(2)}
            </span> 
        </p>

        <p class="text-stone-700 text-lg font-bold px-4 my-4 text-left flex justify-between items-center">
            Grand Total: <span class="text-stone-700 float-right text-lg">US ${(totalPrice + shippingPrice).toFixed(2)}</span>
        </p>
        
        <div class="mx-4 my-4">
        <button class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto " >
            Confirm
        </button> 
        </div>
  
    </div>
     
</div>

