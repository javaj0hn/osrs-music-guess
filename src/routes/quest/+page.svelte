<script>
    import "../../app.css";

    import quests from "../../quests.json";

    let randomQuest = getQuestion();

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
        let quote = getRandomQuote(quest);
        return {
            quest: quest,
            quote: quote
        };
    }

    function guess() {
        let answer = document.querySelector("input").value;
        if (answer.toLowerCase() === randomQuest.quest.name.toLowerCase()) {
            console.log("Correct!")
            randomQuest = getQuestion();

            // clear input
            document.querySelector("input").value = "";
        } else {
            console.log("Incorrect!");
        }
    }
</script>

<nav class="flex justify-center items-center bg-gray-900">
    <a href="/" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Home</a>
    <a href="/music" class="text-blue-400 hover:text-white font-bold text-lg mx-2">Music</a>
    <a href="/inventory" class="text-white hover:text-blue-400 font-bold text-lg mx-2">Inventory</a>
</nav>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <h1 class="text-white text-4xl font-bold mb-4">Quest Guesser</h1>
    <div class="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg">
        <h2 class="text-white text-2xl font-bold mb-4">{randomQuest.quest.name}</h2>
        <p class="text-white text-lg">{randomQuest.quest.members}</p>
        <p class="text-white text-lg">{randomQuest.quest.length}</p>
        <p class="text-white text-lg">{randomQuest.quest.difficulty}</p>
        <input type="text" class="bg-gray-700 text-white p-2 rounded-lg mt-4" placeholder="Enter your answer" />
        <button class="bg-blue-400 text-white p-2 rounded-lg mt-4" on:click={guess}>Guess</button>
    </div>
</div>