<script>
import { onMount,  afterUpdate  } from 'svelte';

    const countries = [
        { code: 'fra', countrycode: '+590',name: 'France', flag: 'https://www.nicepng.com/png/full/190-1909755_france-flag-3d-round-xl-france-flag-icon.png'},
        { code: 'vie', countrycode: '+84' ,name: 'Vietnam', flag: 'https://www.nicepng.com/png/full/190-1909755_france-flag-3d-round-xl-france-flag-icon.png'},
        { code: 'usa', countrycode: '+00',name: 'United States', flag: 'https://cdn3.iconfinder.com/data/icons/flags-of-countries-3/128/USA-1024.png' },
    ];


let firstName = "";
let lastName = "";
let address = "";
let city = "";
let zip = "";
let phoneNum = "";


let isSubmitted = false;

function handleSubmit() {
        isSubmitted = true;
    }


let selectedCountry = countries[0];


function handleCountryChange(event) {
  const countryCode = event.target.value;
  selectedCountry = countries.find(country => country.code === countryCode);
  search = selectedCountry.name;
  showSelect = false;
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
      selectedCountry = filteredCountries[0];
      search = selectedCountry.name;
      showSelect = false; 
    }
  }
}


  let showSelect = false;


  function handleSearchFocus() {
    showSelect = true;

  }

  function handleSearchBlur() {
    afterUpdate(() => {
      if (!showSelect && filteredCountries.length > 0) {
        selectedCountry = filteredCountries[0];
        search = selectedCountry.name;
      }
    });
  }

  

</script>


<div class="bg-gray-100 w-full h-full flex justify-center">
    <div class="w-3/6 bg-white overflow-auto my-4 rounded">
        <div class="text-stone-700 mx-4 my-2 pb-2 pt-4 text-md font-extrabold">Shipping Address</div>
    <div class="flex flex-row my-4 mb-8">
        <div class="flex flex-col w-1/2">
            <span class="text-stone-500 text-xs mx-4 mb-1">*First Name</span>
            <input type="text" class="mx-4 rounded py-2 pl-1 border outline-none focus-within:border-blue-500 {isSubmitted && !firstName ? 'border-red-500' : ''}" bind:value={firstName} />
            {#if isSubmitted && !firstName}
                <p class="text-red-500 text-xs mx-4 fixed mt-16">Please enter your first name.</p>
            {/if}
        </div>
        <div class="flex flex-col w-1/2">
            <span class="text-stone-500 text-xs mx-4 mb-1" >*Last Name</span>
            <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !lastName ? 'border-red-500' : ''}" bind:value={lastName} />
            {#if isSubmitted && !lastName}
                <p class="text-red-500 text-xs mx-4 fixed mt-16">Please enter your last name.</p>
            {/if}
        </div>
    </div>
    <div class="flex flex-row my-4 mb-8">
        <div class="flex flex-col w-1/2">
            <span class="text-stone-500 text-xs mx-4 mb-1">*Address line 1</span>
            <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !address ? 'border-red-500' : ''}" bind:value={address}/>
            {#if isSubmitted && !address}
                <p class="text-red-500 text-xs mx-4 fixed mt-16">Please enter your address.</p>
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
        <div class=" flex flex-col relative mx-4">
            <input
            type="text"
            class="w-full px-4 py-2 border rounded outline-none focus-within:border-blue-500"
            placeholder="Search country"
            bind:value={search}
            on:input={filterCountries}
            on:keydown={handleSearchKeydown}
            on:focus={handleSearchFocus}
            on:blur={handleSearchBlur}
            />
            {#if showSelect}
            <select
                class="absolute mt-10 w-full px-4 py-1 border rounded outline-none focus-within:border-blue-500"
                on:change={handleCountryChange}
                on:focus={handleSearchFocus}
                >
                {#each filteredCountries as country }
                <option value={country.code}>
                    <img src={country.flag} alt={country.name} class="w-4 h-3 mr-2" />
                    {country.name}
                </option>
                {/each}
            </select>
            {/if}
        </div>
        </div>
        <div class="flex flex-col w-1/3">
            <span class="text-stone-500 text-xs mx-4 mb-1">State/County</span>
            <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500" />
        </div>
        <div class="flex flex-col w-1/3">
            <span class="text-stone-500 text-xs mx-4 mb-1">*City</span>
            <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !city ? 'border-red-500' : ''}" bind:value={city}/>
            {#if isSubmitted && !city}
                <p class="text-red-500 text-xs mx-4 fixed mt-16">Please enter your city.</p>
            {/if}
        </div>
    </div>
    <div class="flex flex-row my-4 mb-8">
        <div class="flex flex-col w-1/2">
            <span class="text-stone-500 text-xs mx-4 mb-1">*Zip/Postal Code</span>
            <input type="text" class="mx-4 border rounded py-2 pl-1 outline-none focus-within:border-blue-500 {isSubmitted && !zip ? 'border-red-500' : ''}" bind:value={zip}/>
            {#if isSubmitted && !zip}
                <p class="text-red-500 text-xs mx-4 fixed mt-16">Please enter your zip/postal code.</p>
            {/if}
        </div>
        <div class="flex flex-col w-1/2">
            <span class="text-stone-500 text-xs mb-1 ml-4">*Phone Number</span>
            <div class="flex items-center ml-4 mr-4">
                <span class="text-gray-500 border py-2 px-2 rounded-l border-r-0 {isSubmitted && !phoneNum ? 'border-red-500' : ''}">{selectedCountry.countrycode}</span>
                <input type="text" class="grow py-2 pl-1 border rounded-r outline-none focus-within:border-blue-500 {isSubmitted && !phoneNum ? 'border-red-500' : ''}" bind:value={phoneNum}/>
            </div>
            {#if isSubmitted && !phoneNum}
                <p class="text-red-500 text-xs mx-4 mt-2 fixed mt-16">Please enter your phone number.</p>
            {/if}
            </div>
        </div>
    
    <div class="flex items-center justify-center">
        <button class="w-1/5 bg-primary text-white py-2 rounded text-sm hover:bg-secondary mb-8" on:click={handleSubmit}>
            Save
        </button>
    </div>
    

        
    </div>
    <div class="w-1/5 h-1/5 py-2 bg-white m-4 sticky top-4 rounded">
        <p class="text-stone-700 border-b mx-4 py-4 text-md font-extrabold">Order Summary</p>
        <p class="py-2 px-4 text-stone-500 text-sm text-left"> Total:
        <button class="w-full bg-primary text-white py-2 rounded text-sm hover:bg-secondary mt-8" >
            Continue
        </button>   
    </div>
    
</div>