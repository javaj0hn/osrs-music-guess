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
    let randomSongs = []

    // function that returns a random song
    async function getRandomSong() {
        // reset user status
        userStatus = null;
        // reset user guess
        userGuess = null;
        // reset random songs
        randomSongs = []
        // reset current song
        currentSong = null;
        // clear radio buttons
        let radioButtons = document.querySelectorAll('input[name="song"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        // get 4 random songs & all should be unique
        while (randomSongs.length < 4) {
            let randomSong = songs.songs[Math.floor(Math.random() * songs.songs.length)];
            if (!randomSongs.includes(randomSong)) {
                randomSongs.push(randomSong)
            }
        }

        // set random song answer
        currentSong = randomSongs[Math.floor(Math.random() * randomSongs.length)];

        // reset audio player
        let audio = document.getElementById("song");
        audio.load();
    }

    // function that lets the user guess the song
    async function guessSong() {
        console.log(currentSong.title);

        // get user guess from radio button
        userGuess = document.querySelector('input[name="song"]:checked').value;
        console.log(userGuess);

        if (userGuess.toLowerCase() === currentSong.title.toLowerCase()) {
            userStatus = true;
        } else {
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
        {#each randomSongs as song}
        <input type="radio" id={song.title} name="song" value={song.title} class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
        <label for={song.title} class="ml-1 mr-2 text-white">{song.title}</label>
        {/each}
        <datalist id="songs">
            {#each songs.songs as song}
            <option value={song.title} />
            {/each}
        </datalist>
    </div>
    <div class="mt-4 flex items-center">
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
