<script>
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Music', href: '/music' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Quest', href: '/quest' }
  ];

  const activeLink = derived(page, $page => $page.url.pathname);
</script>

<nav class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0 flex items-center gap-3">
          <img class="h-8 w-auto" src="snapdragon.png" alt="Taverly Tools">
          <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
            Taverly Tools
          </span>
        </div>
      </div>
      <div class="flex space-x-2">
        {#each links as { name, href }}
          <a
            {href}
            class="text-gray-300 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            class:active={$activeLink === href}
          >
            {name}
          </a>
        {/each}
      </div>
    </div>
  </div>
</nav>

<style>
  .active {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
    color: white;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }
</style>