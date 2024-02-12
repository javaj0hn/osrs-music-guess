<script>
    import "../app.css";
    import Fa from 'svelte-fa'
    import { faArrowsRotate, faLightbulb, faPlay, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
    // read songs.json file
    import songs from "../songs.json";

    // variable to store the current song
    let currentSong = null;
    let userGuess = null;
    let userStatus = null;

    // function that returns a random song
    async function getRandomSong() {
        // reset user status
        userStatus = null;
        // reset user guess
        userGuess = null;
        // set random song
        currentSong = songs.songs[Math.floor(Math.random() * songs.songs.length)];

        // reset audio player
        let audio = document.getElementById("song");
        audio.load();
    }

    // function that lets the user guess the song
    async function guessSong() {
        console.log(currentSong.title);

        if (userGuess.toLowerCase() === currentSong.title.toLowerCase()) {
            userStatus = true;
        } else {            
            document.getElementById('songInput').value = '';
            userStatus = false;
        }
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            guessSong();
        }
    }

</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    {#if currentSong === null}
    <h1 class="text-4xl text-white font-bold">OSRS - Guess The Song</h1>
    <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mt-2 text-lg flex items-center ml-2" on:click={getRandomSong}>
        <Fa class="mr-2" icon={faPlay} />
        <span>Start</span>
    </button>
    {/if}
    {#if currentSong !== null}
    {#if userStatus}    
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold block">Well done! You guessed the song correctly!</strong>
        <div class="block">Unlock Details: {currentSong.UnlockDetails}</div>
        <div class="flex items-center">Members: {#if currentSong.Members}
            <Fa class="mr-2 ml-2" icon={faCheck} />
            {:else}
            <Fa class="mr-2 ml-2" icon={faX} />
            {/if}
        </div>
        <div class="block">Duration: {currentSong.Duration}</div>
    </div>
    {/if}
    {#if userStatus === false}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Oh no!</strong>
        <span class="block sm:inline">You guessed the song incorrectly!</span>
    </div>
    {/if}
    <div class="flex items-center">
        <input id="songInput" class="border border-gray-700 rounded-lg p-2 m-2 text-white bg-gray-800" type="text" list="songs" placeholder="Song Title..." bind:value={userGuess} on:keydown={handleEnter} />
        <datalist id="songs">
            {#each songs.songs as song}
            <option value={song.title} />
            {/each}
        </datalist>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ml-2" on:click={guessSong}>
            <Fa class="mr-2" icon={faLightbulb} />
            <span>Guess</span>
        </button>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ml-2" on:click={getRandomSong}>
            <Fa class="mr-2" icon={faArrowsRotate} />
            <span>New Song</span>
        </button>
    </div>
    <audio id="song" class="block w-full max-w-md mx-auto" controls autoplay>
        <source src="https://oldschool.runescape.wiki/images/{currentSong.title.replace(/ /g, "_")}.ogg" type="audio/mpeg" auto>
    </audio>
    {/if}
</div>
  
<style lang="postcss">
    /* Dark theme styles for the audio player */
    audio {
        color: #fff; /* Text color */
        border-radius: 0.5rem; /* Rounded corners */
        padding: 0.5rem; /* Padding */
        width: 100%; /* Make sure the audio player takes full width */
        outline: none; /* Remove outline */
        border: none; /* Remove border */
    }
</style>
