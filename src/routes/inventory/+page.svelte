<script>
    import { onDestroy } from 'svelte';
    import { base } from '$app/paths';
    import "../../app.css";
    
    export let imagePath = "../../static/inven_clean.png";
    import items from "../../items_old.json";

    let timer = 300;
    let interval;
    let formattedTime = formatTime(timer);
    let userInput = "";
    let filteredItems = [];
    let selectedIndex = -1;
    let randomItems = randomizeItems();
    let gameOver = false;
    let finalScore = 0;
    let finalTime = "";
    let copySuccess = false;
    let showInventory = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function startTimer() {
        interval = setInterval(() => {
            timer--;
            if (timer === 0) {
                clearInterval(interval);
                endGame();
            }
            formattedTime = formatTime(timer);
        }, 1000);
    }

    function endGame() {
        gameOver = true;
        finalScore = randomItems.filter(item => item.correct).length;
        finalTime = formatTime(300 - timer);
        clearInterval(interval);
        
        // Mark items that weren't guessed to show their names
        randomItems.forEach((item, index) => {
            if (!item.correct) {
                randomItems[index].showName = true;
                randomItems[index].wrong = true;
            }
        });
    }

    function randomizeItems() {
        const randomItemsList = [];
        const selectedIndexes = new Set();

        while (randomItemsList.length < 28 && randomItemsList.length < items.items.length) {
            const randomIndex = Math.floor(Math.random() * items.items.length);

            if (!selectedIndexes.has(randomIndex)) {
                randomItemsList.push(items.items[randomIndex]);
                selectedIndexes.add(randomIndex);
            }
        }

        return randomItemsList;
    }

    function handleInput() {
        selectedIndex = -1;
        if (userInput.length < 2) {
            filteredItems = [];
            return;
        }
        
        const searchTerm = userInput.toLowerCase();
        const remainingItems = items.items.filter(item => {
            return !randomItems.some(randItem => 
                randItem.correct && randItem.title.toLowerCase() === item.title.toLowerCase()
            );
        });
        
        filteredItems = remainingItems
            .filter(item => item.title.toLowerCase().includes(searchTerm))
            .slice(0, 10)
            .map(item => item.title);
    }

    function selectItem(itemTitle) {
        userInput = itemTitle;
        filteredItems = [];
        selectedIndex = -1;
        checkAnswer();
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (filteredItems.length > 0 && selectedIndex >= 0) {
                selectItem(filteredItems[selectedIndex]);
            } else {
                checkAnswer();
            }
            return;
        }

        if (filteredItems.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectedIndex = (selectedIndex + 1) % filteredItems.length;
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectedIndex = selectedIndex <= 0 ? filteredItems.length - 1 : selectedIndex - 1;
        } else if (event.key === 'Escape') {
            filteredItems = [];
            selectedIndex = -1;
        }
    }

    function checkAnswer() {
        const inputText = userInput.trim().toLowerCase();
        if (!inputText) return;

        for (let i = 0; i < randomItems.length; i++) {
            const correctTitle = randomItems[i].title.toLowerCase();
            const cleanCorrectTitle = correctTitle.replace(/\([^)]*\)/g, '').trim();
            const cleanInputText = inputText.replace(/\([^)]*\)/g, '').trim();

            if (cleanInputText === cleanCorrectTitle || cleanInputText === correctTitle) {
                randomItems[i].correct = true;
                userInput = "";
                filteredItems = [];
                
                // Check if all items are guessed
                if (randomItems.every(item => item.correct)) {
                    endGame();
                }
                return;
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        checkAnswer();
    }

    function giveUp() {
        endGame();
    }

    function getPerformanceMessage() {
        const percentage = (finalScore / 28) * 100;
        if (percentage === 100) return "Perfect! You're a RuneScape expert! 🏆";
        if (percentage >= 90) return "Excellent work! 🌟";
        if (percentage >= 75) return "Great job! 💪";
        if (percentage >= 50) return "Not bad! 👍";
        if (percentage >= 25) return "Keep practicing! 📚";
        return "Better luck next time! 💀";
    }

    async function shareResults() {
        const percentage = ((finalScore / 28) * 100).toFixed(1);
        
        // Create a 4x7 grid representation of the inventory
        let inventoryGrid = '';
        for (let i = 0; i < 28; i++) {
            if (randomItems[i].correct) {
                inventoryGrid += '✅';
            } else {
                inventoryGrid += '❌';
            }
            // Add newline after every 4 items (except the last row)
            if ((i + 1) % 4 === 0 && i < 27) {
                inventoryGrid += '\n';
            }
        }
        
        const shareText = `OSRS Inventory Guesser 🎯\n\nScore: ${finalScore}/28 (${percentage}%)\nTime: ${finalTime}\n\n${inventoryGrid}\n\nPlay at: ${window.location.href}`;
        
        try {
            await navigator.clipboard.writeText(shareText);
            copySuccess = true;
            setTimeout(() => {
                copySuccess = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    function newGame() {
        randomItems.forEach((item, index) => {
            delete randomItems[index].correct;
            delete randomItems[index].showName;
            delete randomItems[index].wrong;
        });
        clearInterval(interval);
        timer = 300;
        formattedTime = formatTime(timer);
        randomItems = randomizeItems();
        userInput = "";
        filteredItems = [];
        selectedIndex = -1;
        gameOver = false;
        showInventory = false;
        finalScore = 0;
        finalTime = "";
        startTimer();
    }

    startTimer();

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pb-8">
    <h1 class="text-white text-5xl font-bold mb-6 drop-shadow-lg">OSRS Inventory Guesser</h1>
    
    {#if !gameOver}
        <div class="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 mb-6">
            <div class="score text-center">
                <span class="text-emerald-400 text-2xl font-bold">{randomItems.filter(item => item.correct).length}/28</span>
                <span class="text-gray-400 mx-3">|</span>
                <span class="text-blue-400 text-2xl font-bold">{formattedTime}</span>
            </div>
        </div>

        <div class="inventories flex mb-6">
            <div class="inventory relative">
                <div class="grid">
                    {#each randomItems as item, i}
                        <div class="item relative">
                            <div class="relative items-center">
                                <img 
                                    src="https://oldschool.runescape.wiki/images/{item.image}" 
                                    alt={item.title}
                                    class="relative z-10 transition-all duration-200 {item.correct ? 'opacity-70' : 'opacity-100'}"
                                />
                                {#if item.correct === true}
                                    <div class="absolute inset-0 bg-green-500/20 rounded z-5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 absolute -top-1 -right-1 answerIcon drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" clip-rule="evenodd" />
                                    </svg>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="w-full max-w-2xl min-h-[280px]">
            <label for="answerInput" class="text-gray-300 text-sm font-bold mb-2 block uppercase tracking-wide">
                Guess the Item
            </label>
            <form on:submit={handleSubmit} class="relative">
                <div class="flex gap-3">
                    <div class="flex-1 relative z-50">
                        <input 
                            type="text" 
                            id="answerInput"
                            bind:value={userInput}
                            on:input={handleInput}
                            on:keydown={handleKeydown}
                            class="w-full bg-gray-700 text-white font-semibold p-3 rounded-lg border-2 border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors" 
                            placeholder="Start typing an item name..."
                            autocomplete="off"
                        />
                        
                        {#if filteredItems.length > 0}
                            <div class="absolute top-full left-0 mt-2 bg-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto w-full border-2 border-gray-600">
                                {#each filteredItems as item, index}
                                    <button 
                                        type="button"
                                        class="w-full text-left px-4 py-3 text-white transition-colors border-b border-gray-600 last:border-b-0 {index === selectedIndex ? 'bg-emerald-600' : 'hover:bg-gray-600'}"
                                        on:click={() => selectItem(item)}>
                                        {item}
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                    <button 
                        type="submit"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                        Guess
                    </button>
                </div>
            </form>
        </div>

        <div class="flex gap-3 mt-6">
            <button 
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                on:click={newGame}>
                New Game
            </button>
            <button 
                class="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                on:click={giveUp}>
                Give Up
            </button>
        </div>
    {:else}
        <!-- Results Screen -->
        <div class="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-2xl w-full">
            <h2 class="text-white text-4xl font-bold text-center mb-2">Game Over!</h2>
            <p class="text-gray-400 text-center text-lg mb-6">{getPerformanceMessage()}</p>
            
            <div class="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-600">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div class="text-gray-400 text-xs uppercase tracking-wide mb-1">Final Score</div>
                        <div class="text-emerald-400 text-2xl font-bold">{finalScore}/28</div>
                        <div class="text-gray-500 text-xs mt-1">{((finalScore / 28) * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-xs uppercase tracking-wide mb-1">Time Taken</div>
                        <div class="text-blue-400 text-2xl font-bold">{finalTime}</div>
                        <div class="text-gray-500 text-xs mt-1">MM:SS</div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-600">
                <div class="text-gray-400 text-sm uppercase tracking-wide mb-3 text-center">Visual Progress</div>
                <div class="flex justify-center flex-wrap gap-1 text-2xl max-w-full">
                    {#each Array(28) as _, i}
                        {#if i < finalScore}
                            <span class="text-emerald-500">🎮</span>
                        {:else}
                            <span class="text-gray-700">⬜</span>
                        {/if}
                    {/each}
                </div>
            </div>

            <div class="flex flex-col gap-3">
                <button 
                    class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2" 
                    on:click={shareResults}>
                    {#if copySuccess}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" clip-rule="evenodd" />
                        </svg>
                        Copied to Clipboard!
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Share Results
                    {/if}
                </button>
                
                <div class="flex gap-3">
                    <button 
                        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                        on:click={newGame}>
                        Play Again
                    </button>
                    <button 
                        class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                        on:click={() => showInventory = !showInventory}>
                        {showInventory ? 'Hide' : 'View'} Inventory
                    </button>
                </div>
            </div>
        </div>

        {#if showInventory}
            <!-- Show inventory when viewing after results -->
            <div class="inventories flex mt-6">
                <div class="inventory relative">
                    <div class="grid">
                        {#each randomItems as item, i}
                            <div class="item relative">
                                <div class="relative items-center">
                                    <img 
                                        src="https://oldschool.runescape.wiki/images/{item.image}" 
                                        alt={item.title}
                                        class="relative z-10 transition-all duration-200 {item.correct ? 'opacity-70' : 'opacity-100'}"
                                    />
                                    {#if item.showName && item.wrong}
                                        <span class="item-name text-red-400 text-xs absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 font-bold text-center whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    {/if}
                                    {#if item.correct === true}
                                        <div class="absolute inset-0 bg-green-500/20 rounded z-5"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 absolute -top-1 -right-1 answerIcon drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" clip-rule="evenodd" />
                                        </svg>
                                    {:else if item.wrong}
                                        <div class="absolute inset-0 bg-red-500/20 rounded z-5"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400 absolute -top-1 -right-1 answerIcon drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    {/if}
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
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(7, 1fr);
        gap: 10px;
        position: absolute;
    }

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        padding-right: 18px;
        padding-left: 18px;
    }

    .item img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
    }

    .answerIcon {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    }

    .item-name {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>