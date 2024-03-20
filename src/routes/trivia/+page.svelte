<script>
    import "../../app.css";

    import triviaQuestions from "../../trivia_questions.json";


    let randomQuestion = getQuestion();
    let userStatus;

    function getRandomQuestion() {
        console.log('here');
        return triviaQuestions.questions[Math.floor(Math.random() * triviaQuestions.questions.length)];
    }

    function getQuestion() {
        console.log('yolo');
        let question = getRandomQuestion();
        console.log(question);
        //let quote = getRandomQuote(quest);
        return {
            question: question,
            //quote: quote
        };
    }

    function newQuestion() {
        userStatus = undefined;
        document.querySelector("#userInput").value = "";
        randomQuestion = getQuestion();
    }

    function guess() {
        let answer = document.querySelector("#userInput").value;
        console.log(answer)
        answer = answer.replace(',', '');
        console.log(answer);
        if (answer.toLowerCase() === randomQuestion.question.answer.toLowerCase()) {
            console.log("Correct!");
            userStatus = true;
        } else {
            userStatus = false;
            console.log("Incorrect!");
        }
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
            <a href="/quest" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Quest</a>
            <a href="/trivia" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Trivia</a>
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
    <a href="/quest" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Quest</a>
    <a href="/trivia" class="text-blue-400 hover:text-white font-bold text-lg mx-2">Trivia</a>
</nav> -->


<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <h1 class="text-white text-4xl font-bold mb-4">OSRS Trivia</h1>
    <div class="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg">
        {#if userStatus === true}
        <h2 class="text-green-300 text-2xl font-bold mb-4">Correct!</h2>
        {/if}
        {#if userStatus === false}
        <h2 class="text-red-300 text-2xl font-bold mb-4">Incorrect!</h2>
        {/if}
        <h2 class="text-white text-2xl font-bold mb-4">{randomQuestion.question.question}</h2>
        <div>
        <input type="text" id="userInput" class="bg-gray-700 text-white font-semibold p-2 rounded-lg mt-4" placeholder="Enter your answer" />
        <button class="bg-blue-400 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={guess}>Guess</button>
        <button class="bg-purple-400 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={newQuestion}>New Question</button>
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