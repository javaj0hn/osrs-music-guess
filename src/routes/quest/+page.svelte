<script>
    import "../../app.css";

    import quests from "../../quests.json";

    let randomQuest = getQuestion();
    let userStatus;

    function getRandomQuest() {
        return quests.quests[Math.floor(Math.random() * quests.quests.length)];
    }

    function getRandomQuote(quest) {
        console.log(quest)
        console.log(quest.quotes[Math.floor(Math.random() * quest.quotes.length)])
        return quest.quotes[Math.floor(Math.random() * quest.quotes.length)];
    }

    function getQuestion() {
        let quest = getRandomQuest();
        //let quote = getRandomQuote(quest);
        return {
            quest: quest,
            //quote: quote
        };
    }

    function newQuest() {
        userStatus = undefined;
        document.querySelector("#userInput").value = "";
        randomQuest = getQuestion();
    }

    function guess() {
        let answer = document.querySelector("#userInput").value;
        console.log(answer)
        console.log(randomQuest.quest.title)
        if (answer.toLowerCase() === randomQuest.quest.title.toLowerCase()) {
            console.log("Correct!");
            userStatus = true;
        } else {
            userStatus = false;
            console.log("Incorrect!");
        }
    }

    function toggleInput(event) {
        var labelValue = document.getElementById(event.target.id + "Value");
        labelValue.style.visibility = event.target.checked ? "visible" : "hidden";
    }

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
            <a href="/quest" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Quest</a>
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
    <a href="/inventory" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Inventory</a>
    <a href="/quest" class="text-blue-400 hover:text-white font-bold text-lg mx-2">Quest</a>
    <a href="/trivia" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Trivia</a>

</nav> -->

<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <h1 class="text-white text-4xl font-bold mb-4">Quest Guesser</h1>
    <div class="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg">
        {#if userStatus === true}
        <h2 class="text-green-300 text-2xl font-bold mb-4">Correct!</h2>
        {/if}
        {#if userStatus === false}
        <h2 class="text-red-300 text-2xl font-bold mb-4">Incorrect!</h2>
        {/if}
        <h2 class="text-white text-2xl font-bold mb-4">{randomQuest.quest.description}</h2>
        <table class="table-fixed">
            <tbody>
                <tr>
                    <td class="px-4 py-2 text-white font-semibold">Length</td>
                    <td class="px-4 py-2 input-column">
                        <label for="questlength">
                            <input id="questlength" type="checkbox" on:change={toggleInput} />
                        </label>
                    </td>
                    <td id="questlengthValue" class="px-4 py-2 text-purple-300 font-semibold" style="visibility: hidden;">{randomQuest.quest.length}</td>
                </tr>
                <tr>
                    <td class="px-4 py-2 text-white font-semibold">Members</td>
                    <td class="px-4 py-2 input-column">
                        <label for="members">
                            <input id="members" type="checkbox" on:change={toggleInput} />
                        </label>
                    </td>
                    <td id="membersValue" class="px-4 py-2 text-white font-semibold" style="visibility: hidden;">
                        {#if randomQuest.quest.members === true}
                        <span class="text-green
                        -300">Yes</span>
                        {:else}
                        <span class="text-red-300">No</span>
                        {/if}
                    </td>
                </tr>
                <tr>
                    <td class="px-4 py-2 text-white font-semibold">Difficulty</td>
                    <td class="px-4 py-2 input-column">
                        <label for="questdifficulty">
                            <input id="questdifficulty" type="checkbox" on:change={toggleInput} />
                        </label>
                    </td>
                    <td id="questdifficultyValue" class="px-4 py-2 font-semibold" style="visibility: hidden;"
                    class:text-green-300={randomQuest.quest.difficulty === 'Novice'}
                    class:text-yellow-300={randomQuest.quest.difficulty === 'Intermediate'}
                    class:text-orange-300={randomQuest.quest.difficulty === 'Experienced'}
                    class:text-red-300={randomQuest.quest.difficulty === 'Master'}
                    class:text-purple-300={randomQuest.quest.difficulty === 'Grandmaster'}
                    class:text-blue-300={randomQuest.quest.difficulty === 'Special'}>{randomQuest.quest.difficulty}</td>
                </tr>
                <tr>
                    <td class="px-4 py-2 text-white font-semibold">Quest Points</td>
                    <td class="px-4 py-2 input-column">
                        <label for="questpoints">
                            <input id="questpoints" type="checkbox" on:change={toggleInput} />
                        </label>
                    </td>
                    <td id="questpointsValue" class="px-4 py-2 font-semibold" style="visibility: hidden;"
                    class:text-green-300={randomQuest.quest.questPoints === 1}
                    class:text-yellow-300={randomQuest.quest.questPoints === 2}
                    class:text-orange-300={randomQuest.quest.questPoints === 3}
                    class:text-red-300={randomQuest.quest.questPoints === 4}
                    class:text-purple-300={randomQuest.quest.questPoints === 5}
                    class:text-blue-300={randomQuest.quest.questPoints === 6}
                    class:text-pink-300={randomQuest.quest.questPoints === 10}>{randomQuest.quest.questPoints}</td>
                </tr>
            </tbody>
        </table>
        <div>
        <input type="text" id="userInput" class="bg-gray-700 text-white font-semibold p-2 rounded-lg mt-4" placeholder="Enter your answer" />
        <button class="bg-blue-400 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={guess}>Guess</button>
        <button class="bg-purple-400 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={newQuest}>New Quest</button>
        </div>
    </div>
</div>

<style>
    @tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  label {
    @apply relative inline-block h-6;
  }

  [type="checkbox"] {
    @apply inline-block h-0 w-11 cursor-pointer;
    @apply focus:outline-0 dark:focus:outline-0;
    @apply border-0 dark:border-0;
    @apply focus:ring-offset-transparent dark:focus:ring-offset-transparent;
    @apply focus:ring-transparent dark:focus:ring-transparent;
    @apply focus-within:ring-0 dark:focus-within:ring-0;
    @apply focus:shadow-none dark:focus:shadow-none;

    @apply before:absolute after:absolute;
    @apply before:top-0 after:top-0;
    @apply before:inline-block after:block;
    @apply before:rounded-full after:rounded-full;

    @apply after:ml-0.5 after:mt-0.5 after:h-5 after:w-5 after:content-[''];
    @apply after:shadow-md after:duration-100;

    @apply before:h-full before:w-10 before:content-[''];
    @apply before:shadow-[inset_0_0_#000];

    @apply after:bg-white dark:after:bg-gray-50;
    @apply before:bg-gray-300 dark:before:bg-gray-600;
    @apply before:checked:bg-lime-500 dark:before:checked:bg-lime-500;
    @apply checked:after:translate-x-4 checked:after:duration-300;

    @apply disabled:cursor-not-allowed disabled:after:bg-opacity-75;
    @apply disabled:checked:before:bg-opacity-40;
  }
}

    </style>