<script>
  const apps = [
    {
      name: 'Music',
      href: '/music',
      description: 'Guess osrs songs based on audio snippets',
      icon: '🎵',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Inventory',
      href: '/inventory',
      description: 'Guess random items found in an inventory',
      icon: '📦',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Quest',
      href: '/quest',
      description: 'Quests in other words. Guess the quest based on the summary provided',
      icon: '⚔️',
      gradient: 'from-orange-500 to-red-500'
    }
  ];
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <!-- Hero Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
    <div class="text-center">
      <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
        Welcome to <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Taverly Tools</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        Oldschool Runescape Games
      </p>
    </div>
  </div>

  <!-- Apps Grid -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each apps as app}
        <a href={app.href} class="group block">
          <div class="bg-gray-800 rounded-xl p-8 h-full border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div class="text-6xl mb-6">{app.icon}</div>
            <h2 class="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:{app.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {app.name}
            </h2>
            <p class="text-gray-400 mb-6">{app.description}</p>
            <div class="inline-flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Launch App
              <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <!-- Footer -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <div class="text-center text-gray-500 text-sm">
      <p>Select an app above to get started</p>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
</style>