<script>
    import "../../app.css";
    import quests from "../../quests.json";

    let randomQuest = getQuestion();
    let userStatus;
    let showLength = false;
    let showMembers = false;
    let showDifficulty = false;
    let showQuestPoints = false;
    let userInput = "";
    let filteredQuests = [];
    let selectedIndex = -1;

    function getRandomQuest() {
        return quests.quests[Math.floor(Math.random() * quests.quests.length)];
    }

    function getRandomQuote(quest) {
        console.log(quest);
        console.log(quest.quotes[Math.floor(Math.random() * quest.quotes.length)]);
        return quest.quotes[Math.floor(Math.random() * quest.quotes.length)];
    }

    function getQuestion() {
        let quest = getRandomQuest();
        return { quest };
    }

    function newQuest() {
        userStatus = undefined;
        userInput = "";
        filteredQuests = [];
        selectedIndex = -1;
        randomQuest = getQuestion();
    }

    function guess() {
        console.log(userInput);
        console.log(randomQuest.quest.title);
        
        if (userInput.toLowerCase() === randomQuest.quest.title.toLowerCase()) {
            console.log("Correct!");
            userStatus = true;
        } else {
            console.log("Incorrect!");
            userStatus = false;
        }
        filteredQuests = [];
        selectedIndex = -1;
    }

    function handleInput() {
        selectedIndex = -1;
        if (userInput.length < 2) {
            filteredQuests = [];
            return;
        }
        
        const searchTerm = userInput.toLowerCase();
        filteredQuests = quests.quests
            .filter(quest => quest.title.toLowerCase().includes(searchTerm))
            .slice(0, 10)
            .map(quest => quest.title);
    }

    function selectQuest(questTitle) {
        userInput = questTitle;
        filteredQuests = [];
        selectedIndex = -1;
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (filteredQuests.length > 0 && selectedIndex >= 0) {
                selectQuest(filteredQuests[selectedIndex]);
            } else {
                guess();
            }
            return;
        }

        if (filteredQuests.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectedIndex = (selectedIndex + 1) % filteredQuests.length;
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectedIndex = selectedIndex <= 0 ? filteredQuests.length - 1 : selectedIndex - 1;
        } else if (event.key === 'Escape') {
            filteredQuests = [];
            selectedIndex = -1;
        }
    }

    function getDifficultyColor(difficulty) {
        const colorMap = {
            'Novice': 'text-green-300',
            'Intermediate': 'text-yellow-300',
            'Experienced': 'text-orange-300',
            'Master': 'text-red-300',
            'Grandmaster': 'text-purple-300',
            'Special': 'text-blue-300'
        };
        return colorMap[difficulty] || 'text-white';
    }

    function getQuestPointsColor(points) {
        const colorMap = {
            1: 'text-green-300',
            2: 'text-yellow-300',
            3: 'text-orange-300',
            4: 'text-red-300',
            5: 'text-purple-300',
            6: 'text-blue-300',
            10: 'text-pink-300'
        };
        return colorMap[points] || 'text-white';
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
    <h1 class="text-white text-5xl font-bold mb-8 text-center drop-shadow-lg">Quest Guesser</h1>
    
    <div class="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-xl shadow-2xl max-w-3xl w-full border border-gray-700">
        {#if userStatus === true}
            <div class="text-green-400 text-2xl font-bold mb-6 bg-green-900/30 px-6 py-3 rounded-lg border-2 border-green-500 animate-pulse">
                ✓ Correct!
            </div>
        {:else if userStatus === false}
            <div class="text-red-400 text-2xl font-bold mb-6 bg-red-900/30 px-6 py-3 rounded-lg border-2 border-red-500">
                ✗ Incorrect!
            </div>
        {/if}
        
        <div class="bg-gray-700/50 p-4 rounded-lg mb-6 w-full border border-gray-600">
            <h2 class="text-white text-xl font-semibold leading-relaxed text-center">{randomQuest.quest.description}</h2>
        </div>
        
        <div class="bg-gray-750 p-4 rounded-lg w-full mb-6 border border-gray-600">
            <h3 class="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Quest Hints</h3>
            <table class="table-fixed w-full">
                <tbody>
                <tr>
                    <td class="px-4 py-3 text-gray-300 font-medium">Length</td>
                    <td class="px-4 py-3 input-column">
                        <label for="questlength">
                            <input id="questlength" type="checkbox" bind:checked={showLength} />
                        </label>
                    </td>
                    <td class="px-4 py-3 text-purple-400 font-semibold min-w-[100px]">
                        {#if showLength}
                            {randomQuest.quest.length}
                        {:else}
                            <span class="text-gray-600">---</span>
                        {/if}
                    </td>
                </tr>
                
                <tr class="border-t border-gray-700">
                    <td class="px-4 py-3 text-gray-300 font-medium">Members</td>
                    <td class="px-4 py-3 input-column">
                        <label for="members">
                            <input id="members" type="checkbox" bind:checked={showMembers} />
                        </label>
                    </td>
                    <td class="px-4 py-3 font-semibold min-w-[100px]">
                        {#if showMembers}
                            {#if randomQuest.quest.members}
                                <span class="text-green-400">Yes</span>
                            {:else}
                                <span class="text-red-400">No</span>
                            {/if}
                        {:else}
                            <span class="text-gray-600">---</span>
                        {/if}
                    </td>
                </tr>
                
                <tr class="border-t border-gray-700">
                    <td class="px-4 py-3 text-gray-300 font-medium">Difficulty</td>
                    <td class="px-4 py-3 input-column">
                        <label for="questdifficulty">
                            <input id="questdifficulty" type="checkbox" bind:checked={showDifficulty} />
                        </label>
                    </td>
                    <td class="px-4 py-3 font-semibold min-w-[100px]">
                        {#if showDifficulty}
                            <span class={getDifficultyColor(randomQuest.quest.difficulty)}>
                                {randomQuest.quest.difficulty}
                            </span>
                        {:else}
                            <span class="text-gray-600">---</span>
                        {/if}
                    </td>
                </tr>
                
                <tr class="border-t border-gray-700">
                    <td class="px-4 py-3 text-gray-300 font-medium">Quest Points</td>
                    <td class="px-4 py-3 input-column">
                        <label for="questpoints">
                            <input id="questpoints" type="checkbox" bind:checked={showQuestPoints} />
                        </label>
                    </td>
                    <td class="px-4 py-3 font-semibold min-w-[100px]">
                        {#if showQuestPoints}
                            <span class={getQuestPointsColor(randomQuest.quest.questPoints)}>
                                {randomQuest.quest.questPoints}
                            </span>
                        {:else}
                            <span class="text-gray-600">---</span>
                        {/if}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        
        <div class="w-full mt-6">
            <label for="userInput" class="text-gray-100 text-sm font-bold mb-6 block uppercase tracking-wide">Your Answer</label>
            <div class="relative">
                <input 
                    type="text" 
                    bind:value={userInput}
                    on:input={handleInput}
                    on:keydown={handleKeydown}
                    class="bg-gray-700 text-white font-semibold p-3 rounded-lg w-full border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" 
                    placeholder="Start typing a quest name..."
                    autocomplete="off"
                />
                
                {#if filteredQuests.length > 0}
                    <div class="absolute top-full left-0 mt-2 bg-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto z-10 w-full border-2 border-gray-600">
                        {#each filteredQuests as quest, index}
                            <button 
                                class="w-full text-left px-4 py-3 text-white transition-colors border-b border-gray-600 last:border-b-0 {index === selectedIndex ? 'bg-blue-600' : 'hover:bg-gray-600'}"
                                on:click={() => selectQuest(quest)}>
                                {quest}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
            
            <div class="flex gap-3 mt-4">
                <button 
                    class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                    on:click={guess}>
                    Guess
                </button>
                <button 
                    class="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg" 
                    on:click={newQuest}>
                    New Quest
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        label {
            @apply relative inline-block h-6 w-11;
        }

        [type="checkbox"] {
            @apply appearance-none h-6 w-11 cursor-pointer relative;
            @apply focus:outline-0;
            @apply border-0;
            @apply focus:ring-0;
            @apply bg-gray-600 rounded-full;
            @apply transition-colors duration-300;
        }

        [type="checkbox"]:checked {
            @apply bg-lime-500;
        }

        [type="checkbox"]::after {
            content: '';
            @apply absolute top-0.5 left-0.5;
            @apply h-5 w-5 bg-white rounded-full;
            @apply shadow-md;
            @apply transition-transform duration-300;
        }

        [type="checkbox"]:checked::after {
            @apply translate-x-5;
        }
    }
</style>