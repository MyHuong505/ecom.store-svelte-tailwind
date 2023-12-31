<script>
import {onMount} from 'svelte';    
import {afterUpdate  } from 'svelte';
import Popup from '../../component/Popup.svelte';
import {cart, calculateCartTotal} from "../../store/cartStore.js"
import countries from '../../constant/countries';


let userData = {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    state: "",
    zip: "",
    countrycode: "",
    phoneNum: "",
    selectedCountry: countries[0],
    selectedCity: null,
};


let showSelectedCountry = false;
let isClickedSave = false;
let defaultMode = true;
let showSelectedCity = false;

function handleSubmit() {
    isClickedSave = true;
    if (!userData.firstName || !userData.lastName || !userData.address || !userData.selectedCity || !userData.zip || !userData.phoneNum || !userData.selectedCountry
    || userData.firstName.length > 20 || userData.lastName.length >20) {
        return
    } 
    saveUserDataToLocalStorage();
        defaultMode = false
}




let filteredCountries = countries;
    

function filterCountries() {
    filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(search.toLowerCase());
    });
}

let search = '';
  
function handleSearchKeydown(event) {
  if (event.key === 'Enter') {
    if (filteredCountries.length > 0) {
      userData.selectedCountry = filteredCountries[0];
      search = userData.selectedCountry.name;
      showSelectedCountry = false;
    }
  }
}


function handleCountryChange(countryCode) {
    userData.selectedCountry = countries.find(country => country.code === countryCode);
    search = userData.selectedCountry.name;
    showSelectedCountry = false;
    userData.countrycode = userData.selectedCountry.countrycode;
    userData.selectedCity = null;

    editedUser.selectedCountry = userData.selectedCountry;
    editedUser.countrycode = userData.countrycode;
}


function handleSearchCountry() {
    showSelectedCountry = !showSelectedCountry;
    showClearButton = true;
}


function handleSearchBlur() {
    afterUpdate(() => {
      if (!showSelectedCountry && filteredCountries.length > 0) {
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


let selectedShippingTime = 'first_option';
let shippingPrice = 17.15;

  function handleShippingChange(event) {
    selectedShippingTime = event.target.value;

    if (selectedShippingTime === 'first_option') {
      shippingPrice = 17.15;
    } else if (selectedShippingTime === 'second_option') {
      shippingPrice = 10.96;
    }
    calculateGrandTotal()
  }


function saveUserDataToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userData', JSON.stringify(editedUser));
     isSaved = true;
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

let isEditing = false;
let editedUser = {...userData};

function startEditing() {
  isEditing = true;
  editedUser = { ...userData};
}

let isSaved = false;

function saveChanges() {
  isEditing = false;
  for (const key in userData) {
    if (userData[key] !== editedUser[key]) {
      userData[key] = editedUser[key];
    }
  }

  saveUserDataToLocalStorage();
  isSaved = true;
}

let popupOpen = false;

function handlePopupClose() {
    popupOpen = false;
}


  function showPopup() {
    if (isSaved) {
      confirmCheckout(); 
    } else {
      popupOpen = true;
    }
  }

function confirmCheckout() {
  const currentCart = $cart;
  const checkoutProducts = checkoutItemsData;
  const updatedCart = currentCart.filter((item) => {
    return !checkoutProducts.some((checkoutItem) => checkoutItem.id === item.id);
  });

  cart.set(updatedCart);

  calculateCartTotal();

  window.location.href = "/purchase";
}







</script>

<div class="bg-gray-100 w-full h-full flex flex-row justify-center">
    <div class="flex flex-col w-3/6">
    {JSON.stringify(userData)}
    {#if defaultMode}
        <div class=" bg-white overflow-auto my-4 rounded">
        <div class="text-stone-700 mx-4 my-2 pb-2 pt-4 text-md font-extrabold">Shipping Address</div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*First Name</span>
                <input type="text" class="mx-4 rounded py-2 pl-1 border outline-none focus-within:border-blue-500 {isClickedSave && !userData.firstName ? 'border-red-500' : ''}" 
                    bind:value={userData.firstName}
                    maxlength="20"
                />
                {#if isClickedSave && !userData.firstName}
                    <p class="text-red-500 text-xs mx-4">Please enter your first name.</p>
                {/if}
                {#if isClickedSave && userData.firstName.length > 20}
                    <p class="text-red-500 text-xs mx-4">Please enter your first name less 20 characters</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1" >*Last Name</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isClickedSave && !userData.lastName ? 'border-red-500' : ''}" 
                bind:value={userData.lastName}
                />
                {#if isClickedSave && !userData.lastName}
                    <p class="text-red-500 text-xs mx-4">Please enter your last name.</p>
                {/if}
                {#if isClickedSave && userData.lastName.length >20}
                    <p class="text-red-500 text-xs mx-4">Please enter your last name less than 20</p>
                {/if}
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*Address line 1</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isClickedSave && !userData.address ? 'border-red-500' : ''}" 
                bind:value={userData.address}
                maxlength="200"
                />
                {#if isClickedSave && !userData.address}
                    <p class="text-red-500 text-xs mx-4 ">Please enter your address.</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">Address line 2 (optional)</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500"  
                bind:value={userData.address2}
                maxlength="200"
                />
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/3">
            <span class="text-stone-500 text-xs mx-4 mb-1">*Country/Region</span>
            <div class="relative mx-4">
        <button
            class="flex items-center w-full px-4 py-2 border rounded outline-none focus-within:border-blue-500 bg-white"
            on:click={handleSearchCountry}>
            {#if userData.selectedCountry}
                <img src={userData.selectedCountry.flag} alt={userData.selectedCountry.name} class="w-4 h-3 mr-2" />
                {userData.selectedCountry.name}
            {:else}
                Select a country
            {/if}
            <span class="ml-auto">
                {#if showSelectedCountry}
                    <i class="fas fa-chevron-up ml-2"></i>
                {:else}
                    <i class="fas fa-chevron-down ml-2"></i>
                {/if}
            </span>
        </button>
        {#if showSelectedCountry}
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
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500" 
                bind:value={userData.state}
                />
            </div>
            <div class="flex flex-col w-1/3">
                <span class="text-stone-500 text-xs mx-4 mb-1">*City</span>
                <select class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500" bind:value={userData.selectedCity}>
                    {#each userData.selectedCountry.cities as city}
                        <option value={city}>{city}</option>
                    {/each}
                </select>
                {#if isClickedSave && !userData.selectedCity}
                    <p class="text-red-500 text-xs mx-4">Please select your city.</p>
                {/if}
            </div>  
            </div>
            <div class="flex flex-row my-4 mb-8">
                <div class="flex flex-col w-1/2">
                    <span class="text-stone-500 text-xs mx-4 mb-1">*Zip/Postal Code</span>
                    <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isClickedSave && !userData.zip ? 'border-red-500' : ''}" 
                    bind:value={userData.zip}
                    />
                {#if isClickedSave && !userData.zip}
                    <p class="text-red-500 text-xs mx-4">Please enter your zip/postal code.</p>
                {/if}
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mb-1 ml-4">*Phone Number</span>
                <div class="flex items-center ml-4 mr-4">
                    <span class="text-gray-500 border py-2 px-2 rounded-l border-r-0 {isClickedSave && !userData.phoneNum ? 'border-red-500' : ''}">{userData.countrycode}</span>
                    <input type="tel" class="grow py-2 pl-1 border rounded-r outline-none focus-within:border-blue-500 {isClickedSave && !userData.phoneNum ? 'border-red-500' : ''}" 
                    bind:value={userData.phoneNum}
                    />
                </div>
                {#if isClickedSave && !userData.phoneNum}
                    <p class="text-red-500 text-xs mx-4 ">Please enter your phone number.</p>
                {/if}
                </div>
            </div>
        
        <div class="flex items-center justify-center">
            <button class="w-1/5 bg-primary text-white py-2 rounded text-sm hover:bg-secondary mb-8" on:click={() => {
                handleSubmit();
            }}>
                Save
            </button>
        </div>     
        </div>
        {/if}

        {#if !defaultMode}
        <div class="bg-white overflow-auto my-4 rounded">
            <div class="text-stone-700 mx-4 my-2 pb-2 pt-4 text-md font-extrabold">Shipping Address</div>
            <div class="flex flex-row mx-4">
                <i class="fas fa-map-marker-alt text-red-500 mr-1"></i>
                <div class="flex flex-col  ">
                <p class="text-stone-700 font-extrabold text-sm">{userData.firstName} {userData.lastName} {userData.countrycode} {userData.phoneNum}</p>
                <p class="text-stone-700 text-sm py-1">{userData.address}, {userData.city}, {userData.selectedCountry.name}</p>
            </div>
            </div>
            <button class="text-blue-500 my-4 mx-8 text-sm cursor-pointer" on:click={() => startEditing()} >
                    Edit
            </button>
        </div>
        {/if}

    {#if isEditing} <!-- Pop-up -->
        <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute  inset-0 bg-black opacity-50"></div>
        <div class="bg-white w-3/5 p-4 rounded-lg z-10">
        <div class="mb-4">
        <div class=" bg-white overflow-auto my-4 rounded">
        <div class="text-stone-700 mx-4 my-2 pb-2 text-md font-extrabold">Shipping Address</div>
        <div class="flex flex-row">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*First Name</span>
                <input type="text" class="mx-4 rounded py-2 pl-1 border outline-none focus-within:border-blue-500 " 
                    bind:value={editedUser.firstName}
                />
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1" >*Last Name</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 " 
                bind:value={editedUser.lastName} 
                />
            </div>
        </div>
        <div class="flex flex-row my-4 ">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*Address line 1</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 " 
                bind:value={editedUser.address}
                />
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">Address line 2 (optional)</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500"  
                bind:value={editedUser.address2}
                />
            </div>
        </div>
        <div class="flex flex-row my-4 ">
            <div class="flex flex-col w-1/3">
            <span class="text-stone-500 text-xs mx-4 mb-1">*Country/Region</span>
            <div class="relative mx-4">
        <button
            class="flex items-center w-full px-4 py-2 border rounded outline-none focus-within:border-blue-500 bg-white"
            on:click={Country}>
            {#if editedUser.selectedCountry}
                <img src={editedUser.selectedCountry.flag} alt={editedUser.selectedCountry.name} class="w-4 h-3 mr-2" />
                {editedUser.selectedCountry.name}
            {:else}
                Select a country
            {/if}
            <span class="ml-auto">
                {#if showSelectedCountry}
                    <i class="fas fa-chevron-up ml-2"></i>
                {:else}
                    <i class="fas fa-chevron-down ml-2"></i>
                {/if}
            </span>
        </button>
        {#if showSelectedCountry}
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
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500" 
                bind:value={editedUser.state}
                />
            </div>
            <div class="flex flex-col w-1/3">
                <span class="text-stone-500 text-xs mx-4 mb-1">*City222</span>
                <!-- <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 " 
                bind:value={editedUser.city}
                /> -->
            </div>
        </div>
        <div class="flex flex-row my-4 mb-8">
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mx-4 mb-1">*Zip/Postal Code</span>
                <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 " 
                bind:value={editedUser.zip}
                />
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-stone-500 text-xs mb-1 ml-4">*Phone Number</span>
                <div class="flex items-center ml-4 mr-4">
                    <span class="text-gray-500 border py-2 px-2 rounded-l border-r-0 ">{editedUser.countrycode}</span>
                    <input type="tel" class="grow py-2 pl-1 border rounded-r outline-none focus-within:border-blue-500" 
                    bind:value={editedUser.phoneNum}
                    />
                </div>
                </div>
            </div>     
        </div>

                </div>
                <div class="flex justify-center">
                    <button class="bg-primary text-white w-1/6 py-2 rounded mr-4" on:click={saveChanges}>
                        Save
                    </button>
                    <button class="bg-gray-300 w-1/6 py-2 rounded" on:click={() => isEditing = false}>
                        Cancel
                    </button>
                </div>
                </div>
            </div>
        {/if} <!-- Pop-up -->

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
                        USD $17.15
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
                        USD $10.96
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
                <div class="w-1/6 mx-4 text-stone-700 text-sm border p-2 rounded">Size - {item.size}</div>
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
                USD ${totalPrice.toFixed(2)}
            </span> 
        </p>
        <p class="py-1 px-4 text-stone-700 text-sm text-left">Shipping Charge:
            <span class="float-right">
                USD ${shippingPrice.toFixed(2)}
            </span> 
        </p>

        <p class="text-stone-700 text-lg font-bold px-4 my-4 text-left flex justify-between items-center">
            Grand Total: <span class="text-stone-700 float-right text-lg">USD ${(totalPrice + shippingPrice).toFixed(2)}</span>
        </p>
        
        <div class="mx-4 my-4">

        <button class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mx-auto" on:click={showPopup}>
                Confirm
        </button>
        
        </div>
    </div>
</div>

{#if popupOpen}
    <Popup isOpen={popupOpen} message="Please fill in the information." onClose={handlePopupClose} />
{/if}
