<script>
  import '../../app.css';
  import { onMount } from 'svelte';

  let populations = {};
  let previousPopulations = {};
  let topChanges = [];
  let fetchFrequency = 10;
  let trackType = 'ALL';

  // Function to fetch population data from the API
  async function fetchPopulations() {
    try {
      const response = await fetch('https://api.mossgiant.xyz/api/v1/population/osrs');
      const data = await response.json();
      previousPopulations = { ...populations }; // Save previous populations
      populations = data;

      console.log(trackType)

      // Filter F2P or P2P worlds
      if (trackType === 'F2P') {
        console.log(populations)
        // filter using the server key
        populations = Object.fromEntries(Object.entries(populations).filter(([world, data]) => data.server === 'Free'));
      } else if (trackType === 'P2P'){
        populations = Object.fromEntries(Object.entries(populations).filter(([world, data]) => data.server === 'Members'));
      }

      // Calculate population differences
      calculatePopulationDifferences();
    } catch (error) {
      console.error('Error fetching population data:', error);
    }
  }

  // Function to calculate population differences and get top 10 changes
  function calculatePopulationDifferences() {
    topChanges = Object.keys(populations)
      .map(world => ({
        world: populations[world].world,
        location: populations[world].location,
        population: populations[world].population,
        activity: populations[world].activity,
        difference: populations[world].population - (previousPopulations[world]?.population || 0)
      }))
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference)) // Sort by absolute difference
      .slice(0, 10); // Get top 10 changes
  }

  // Function to check population difference
  function checkPopulationDifference() {
    // Fetch population data
    fetchPopulations();

    // Set timeout to fetch data every 10 seconds
    setTimeout(checkPopulationDifference, fetchFrequency * 1000);
  }

  // Call the function initially
  onMount(() => {
    checkPopulationDifference();
  });
</script>

<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="h-8 w-auto" src="snapdragon.png" alt="Taverly Tools">
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
            <a href="/music" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Music</a>
            <a href="/inventory" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Inventory</a>
            <a href="/quest" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Quest</a>
            <a href="/trivia" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Trivia</a>
            <a href="/worldtracker" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">World Tracker</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
  <h1 class="text-4xl text-white">World Tracker</h1>
  <div class="border-collapse border border-gray-800 p-4 mt-4 flex flex-wrap justify-between mb-2">
    <div class="mt-4 mb-2 text-white flex-grow">
      <label for="fetchFrequency">Fetch Frequency (seconds):</label>
      <input type="number" id="fetchFrequency" class="bg-gray-900 border-gray-800 border-2" bind:value={fetchFrequency} min="5" max="120">
    </div>
  
    <!-- Radio button to track F2P or P2P worlds -->
    <div class="mt-4 mb-2 text-white flex-grow ml-4">
      <label for="trackType">Track Type:</label>
      <select id="trackType" class="bg-gray-900 border-gray-800 border-2" bind:value={trackType}>
        <option value={"ALL"}>ALL</option>
        <option value={"F2P"}>F2P</option>
        <option value={"P2P"}>P2P</option>
      </select>
    </div>
  </div>
  
  <!-- Display top 10 population changes in table format -->
  <div class="overflow-x-auto">
    <table class="border-collapse border border-gray-800 w-full">
      <thead>
        <tr>
          <th class="border border-gray-800 text-white px-4 py-2">World</th>
          <th class="border border-gray-800 text-white px-4 py-2">Population</th>
          <th class="border border-gray-800 text-white px-4 py-2">Change</th>
          <th class="border border-gray-800 text-white px-4 py-2">Activity</th>
        </tr>
      </thead>
      <tbody>
        {#each topChanges as { world, location, population, activity, difference }}
        <tr>
          <td class="border border-gray-800 px-4 py-2 text-white flex items-center">
            <img src={`${location}.gif`} alt={world} class="h-4 w-4 mr-2">
            {world}
          </td>
          <td class="border border-gray-800 px-4 py-2 text-white">{population}</td>
          <td class="border border-gray-800 px-4 py-2 text-{difference >= 0 ? 'green-300' : 'red-400'}">{difference}</td>
          <td class="border border-gray-800 px-4 py-2 text-white">{activity}</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>