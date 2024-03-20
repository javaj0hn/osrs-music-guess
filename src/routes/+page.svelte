<script>
    import "../app.css";
    import { base } from '$app/paths'
    import Fa from 'svelte-fa'
    import {
        faArrowsRotate,
        faLightbulb,
        faPlay,
        faCheck,
        faX
    } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-900">
    <div class="md:flex-1 mx-4 my-2 md:my-0 max-w-sm"> <!-- Adjusted max-w-sm to limit panel width on larger screens -->
        <a href="/inventory">
        <div class="relative">
            <img src="inv_card.png" alt="Background Image" class="w-full h-full object-cover">
            <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <h2 class="text-white text-2xl">Inventory Guesser</h2>
            </div>
        </div>
        </a>
    </div>
    <div class="md:flex-1 mx-4 my-2 md:my-0 max-w-sm"> <!-- Adjusted max-w-sm to limit panel width on larger screens -->
        <a href="/music">
        <div class="relative">
            <img src="music.png" alt="Background Image" class="w-full h-full object-cover">
            <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <h2 class="text-white text-2xl">Music Guesser</h2>
            </div>
        </div>
        </a>
    </div>
    <div class="md:flex-1 mx-4 my-2 md:my-0 max-w-sm"> <!-- Adjusted max-w-sm to limit panel width on larger screens -->
        <a href="/quest">
        <div class="relative">
            <img src="quest.png" alt="Background Image" class="w-full h-full object-cover">
            <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <h2 class="text-white text-2xl">Quest Guesser</h2>
            </div>
        </div>
        </a>
    </div>
    <div class="md:flex-1 mx-4 my-2 md:my-0 max-w-sm"> <!-- Adjusted max-w-sm to limit panel width on larger screens -->
        <a href="/trivia">
        <div class="relative">
            <img src="trivia.png" alt="Background Image" class="w-full h-full object-cover">
            <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <h2 class="text-white text-2xl">Trivia</h2>
            </div>
        </div>
        </a>
    </div>
</div>
