<script>
    import {
        onDestroy
    } from 'svelte';
    import { base } from '$app/paths'
    import "../../app.css";
    export let imagePath = "../../static/inven_clean.png";

    import items from "../../items.json";

    let timer = 300; // 5 minutes in seconds
    let interval;
    let formattedTime = formatTime(timer);

    // function to format time in MM:SS format
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // function to start the timer
    function startTimer() {
        interval = setInterval(() => {
            timer--;
            if (timer === 0) {
                clearInterval(interval);
                disableInput();
            }
            formattedTime = formatTime(timer)
        }, 1000);
    }

    // function to disable input and reveal item names
    function disableInput() {
        clearInterval(interval); // Stop the timer
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(input => {
            input.disabled = true;
        });

        // loop over randomItems with index
        randomItems.forEach((item, index) => {
            if (randomItems[index].correct === undefined) {
                randomItems[index].showName = true;
            }
        });
    }

    // function to randomly select 28 items from the items.json file
    function randomizeItems() {
        let randomItems = [];
        let randomIndex = 0;
        let randomItem = {};
        let selectedIndexes = new Set();

        while (randomItems.length < 28 && randomItems.length < items.items.length) {
            randomIndex = Math.floor(Math.random() * items.items.length);

            // Check if the random index has been selected before
            if (!selectedIndexes.has(randomIndex)) {
                randomItem = items.items[randomIndex];
                randomItems.push(randomItem);
                selectedIndexes.add(randomIndex);
            }
        }

        return randomItems;
    }


    let randomItems = randomizeItems();

    function handleInput(event) {
        const inputText = event.target.value.trim().toLowerCase();
        // check if user pressed enter or clicked submit button
        if (event.key === 'Enter') {
            for (let i = 0; i < randomItems.length; i++) {
                const correctTitle = randomItems[i].title.toLowerCase();
                const cleanCorrectTitle = correctTitle.replace(/\([^)]*\)/g, '').trim(); // Remove parentheses and their content from correct item title
                const cleanInputText = inputText.replace(/\([^)]*\)/g, '').trim(); // Remove parentheses and their content from input text

                if (cleanInputText === cleanCorrectTitle || cleanInputText === correctTitle) {
                    randomItems[i].correct = true;
                    event.target.value = ""; // Clear input field on correct answer
                }
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // get input from text input answerInput
        const inputText = document.getElementById('answerInput').value.trim().toLowerCase();

        for (let i = 0; i < randomItems.length; i++) {
                const correctTitle = randomItems[i].title.toLowerCase();
                const cleanCorrectTitle = correctTitle.replace(/\([^)]*\)/g, '').trim(); // Remove parentheses and their content from correct item title
                const cleanInputText = inputText.replace(/\([^)]*\)/g, '').trim(); // Remove parentheses and their content from input text

                if (cleanInputText === cleanCorrectTitle || cleanInputText === correctTitle) {
                    randomItems[i].correct = true;
                    document.getElementById('answerInput').value = ""; // Clear input field on correct answer
                }
        }
        handleInput(event);
    }

    function giveUp() {
        clearInterval(interval);
        disableInput();
    }

    function newGame() {
        // remove correct and showName properties from randomItems
        randomItems.forEach((item, index) => {
            delete randomItems[index].correct;
            delete randomItems[index].showName;
        });
        clearInterval(interval);
        timer = 300;
        formattedTime = formatTime(timer);
        startTimer();
        randomItems = randomizeItems();
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(input => {
            input.disabled = false;
            input.value = "";
        });
    }

    // Start the timer when component is mounted
    startTimer();

    onDestroy(() => {
        clearInterval(interval); // Clear the interval when component is destroyed
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
            <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</a>
            <a href="/music" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Music</a>
            <a href="/inventory" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Inventory</a>
            <a href="/quest" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Quest</a>
            <a href="/trivia" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Trivia</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<!-- <nav class="flex justify-center items-center bg-gray-900">
    <a href="/" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Home</a>
    <a href="/music" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Music</a>
    <a href="/inventory" class="text-blue-400 hover:text-white font-bold text-lg mx-2">Inventory</a>
    <a href="/quest" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Quest</a>
    <a href="/trivia" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Trivia</a>
</nav> -->
<div class="flex flex-col items-center justify-center h-screen bg-gray-900 relative">
    <div class="score text-emerald-500 text-lg font-semibold">Score: {randomItems.filter(item => item.correct).length}/28 | Time
        Remaining: {formattedTime}</div>
    <div class="inventories flex">
        <div class="inventory relative">
            <div class="grid">
                {#each randomItems as item, i}
                    <div class="item relative mb-6">
                        <div class="relative items-center">
                                <img src="https://oldschool.runescape.wiki/images/{item.image}" class="relative z-10"/>
                                {#if item.showName}
                                    <span class="item-name text-red-400 text-xsm absolute bottom-0 left-0 right-0 text-center z-20 font-bold text-pretty">{item.title}</span>
                                {/if}
                            {#if item.correct === true}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 absolute top-0 right-0 m-1 answerIcon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" clip-rule="evenodd" />
                                </svg>
                            {:else if item.correct === false}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 absolute top-0 right-0 m-1 answerIcon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/>
                                </svg>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
            
        </div>
    </div>
    <div class="flex justify-center mt-4">
        <input type="text" class="w-1/2 input" id="answerInput" on:keydown={event => handleInput(event)} />
        <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" on:click={event => handleSubmit(event)}>Guess</button>
    </div>
    <div class="flex mt-4">
    <button class="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2" on:click={event => newGame()}>New Game</button>
    <button class="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded ml-2" on:click={event => giveUp()}>Give Up!</button>
    </div>

</div>


<style>
    .inventory {
        width: 373px;
        height: 503px;
        background-image: url('https://oldschool.runescape.wiki/images/Inventory_tab.png');
        background-size: contain;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Runescape', sans-serif;
        /* Apply Runescape font to all text */
    }

    /* Grid layout */
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* 4 columns */
        grid-template-rows: repeat(7, 1fr);
        /* 7 rows */
        gap: 10px;
        /* Gap between grid items */
        position: absolute;

    }

    /* Grid item */
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        /* Font size */
        padding-right: 18px;
        padding-left: 18px;
    }

    /* Center images within grid items */
    .item img {
        display: block;
        /* Ensure images behave as block elements */
        margin: 0 auto;
        /* Center the images horizontally */
    }

    .answerIcon {
        position: absolute;
        /* Position the check mark relative to its parent */
        top: 0;
        /* Align the check mark to the top of its parent */
        right: 0;
        /* Align the check mark to the right of its parent */
        z-index: 10;
        /* Ensure the check mark appears above other elements */
    }


    /* Style for the input field */
    .input {
        margin-top: 1px;
        /* Adjust spacing between image and input */
        background-color: rgba(255, 255, 255, 0.5);
        /* Transparent white background */
        height: 38px;
        /* Height of input field */
        width: 100%;
    }

    button {
        margin-left: 12px;
        /* Adjust margin for spacing */
        transition: background-color 0.3s ease;
        /* Smooth transition */
    }

    /* Style for the input field */
    .item input {
        margin-top: 1px;
        /* Adjust spacing between image and input */
        background-color: rgba(255, 255, 255, 0.5);
        /* Transparent white background */
        border: 0.5px solid #333;
        /* Border color */
        width: 100%;
    }

    .input:focus {
        outline: none;
        /* Remove default focus outline */
    }

    .input:focus::placeholder {
        color: transparent;
        /* Hide placeholder text when focused */
    }

    .input:focus+.cursor::after {
        content: "|";
        /* Display flashing cursor */
        animation: cursor-blink 1s infinite;
        /* Blink animation */
    }

    @keyframes cursor-blink {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .item-name {
        position: absolute;
        /* Position the item name relative to its parent */
        top: 100%;
        /* Position the item name below the icons */
        left: 50%;
        /* Align the item name to the center horizontally */
        transform: translateX(-50%);
        /* Center the item name horizontally */
        z-index: 20;
        /* Ensure the item name appears above other elements */
    }


    .inventories {
        display: flex;
    }
</style>
