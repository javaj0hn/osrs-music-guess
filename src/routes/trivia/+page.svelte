<script>
    import "../../app.css";
    import triviaQuestions from "../../trivia_questions.json";

    let randomQuestion = getQuestion(null);
    let showQuiz = false;
    let showRandomQuestion = true;
    let questionList = [];
    let quizList = [];
    let userStatus;
    let showHelpText;
    let triviaCompleted = false;
    let showQuizList = false;
    let quizResponses = [];
    let correctResponses = 0;
    let quizType = '';

    function getRandomQuestion(question) {
      if (question === null) {
        return triviaQuestions.questions[Math.floor(Math.random() * triviaQuestions.questions.length)];
      } 

      if (question !== null) {
        let triviaQuestion = triviaQuestions.questions[Math.floor(Math.random() * triviaQuestions.questions.length)];
        if (triviaQuestion.question == question.question) {
          return getRandomQuestion(question);
        } else {
            return triviaQuestion;
        }
      }
    }

    function getQuestion(questionToCheck) {
      if (questionToCheck === null) {
        let question = getRandomQuestion(null);
        return {
            question: question,
        };
      }
        let question = getRandomQuestion(questionToCheck);
        return {
            question: question,
        };
    }

    function getQuizQuestions(type) {
      showQuiz = true;
      let quizList = [];
      // if (type === 'Random') {
      //   console.log('here');
      // for (let i=0; i < 20; i++) {
      //     console.log('length: ' + triviaQuestions.questions.length);
      //     let questionIndex = Math.floor(Math.random() * triviaQuestions.questions.length);
      //     console.log(questionIndex);
      //     quizList.push(triviaQuestions.questions[questionIndex]);
      // }
      // console.log(quizList);
      // }
      if (type === 'Weapons') {
        console.log('here');
        for (let i=0; i < triviaQuestions.weaponsQuiz.length; i++) {
          quizList.push(triviaQuestions.weaponsQuiz[i]);
        }
        console.log(quizList);
      }

        return {
            questions: quizList,
        };
    }

    function checkAnswer(answer) {
      showHelpText = undefined;
      userStatus = answer === true;

      for (let i=0; i < randomQuestion.question.answers.length; i++) {
        if (randomQuestion.question.answers[i].isAnswer === true) {
          randomQuestion.question.answers[i].showAnswer = true;
        }
      }
      return randomQuestion;
    }

    function newQuestion() {
      let questionHasBeenAnswered = false;
        for (let i =0; i < randomQuestion.question.answers.length; i++) {
          if (randomQuestion.question.answers[i].showAnswer == true) {
            questionHasBeenAnswered = true;
          }
        }
        if (questionHasBeenAnswered) {
        let index = triviaQuestions.questions.indexOf(randomQuestion.question);
        triviaQuestions.questions.splice(index, 1);  
        if (triviaQuestions.questions.length == 0) {
          triviaCompleted = true;
        }
        userStatus = undefined;
        showHelpText = undefined;
        let questionToCheck = randomQuestion.question;
        // document.querySelector("#userInput").value = "";
        randomQuestion = getQuestion(questionToCheck);      
        } else {
          showHelpText = true;
        }
    }

    function skipQuestion(answersArray) {   
        showHelpText = undefined; 
      let questionHasBeenAnswered = false;
        for (let i=0; i < answersArray.length; i++) {
          if (answersArray[i].showAnswer === true) {
            questionHasBeenAnswered = true;
          } 
        }
        if (!questionHasBeenAnswered) {
          userStatus = undefined;
          randomQuestion = getQuestion(randomQuestion.question);
        }
    }

    function guess() {
        let answer = document.querySelector("#userInput").value;
        answer = answer.replace(',', '');
        userStatus = answer.toLowerCase() === randomQuestion.question.answer.toLowerCase();
    }

    function handleInput(event) {
      if (event.key === 'Enter') {
        guess();
      }
    }

    function startQuiz(quiz) {
      if (quiz === 'showList') {
        showQuizList = true;
        showRandomQuestion = false;
      } else if (quiz === 'Weapons') {
        quizList =  getQuizQuestions(quiz);
        quizType = quiz;
        showQuizList = false;
        showRandomQuestion = false;
      // } else if (quiz === 'Random') {
      //   quizList =  getQuizQuestions(quiz);
      //   quizType = quiz;
      //   showQuizList = false;
      //   showRandomQuestion = false;
      } else {
        showQuizList = true;
        showRandomQuestion = false;
      }
    }

    function saveResponse(event) {
      let response = {};
      response['question'] = event.target.name;
      response['answer'] = event.target.value;

      if (quizResponses.length === 0) {
        quizResponses.push(response);
        return;
      }

      for (let i=0; i < quizResponses.length; i++) {
        if (quizResponses[i].question == event.target.name) {
          quizResponses[i].answer = event.target.value;
          return;
        } 
      }
      quizResponses.push(response);
    }

    function submitQuiz() {

console.log(quizResponses.length);
console.log(quizList.questions);

      if (quizResponses.length !== quizList.questions.length) {
        return alert('Please answer all of the questions!');
      }

      for (let i=0; i < quizList.questions.length; i++) {
        console.log('hello');
        console.log(quizList);
        console.log(quizResponses);
        let questionToCheck = quizResponses.find((element) => element.question == quizList.questions[i].question);
        console.log(questionToCheck);
        let answerToCheck = questionToCheck.answer;
        console.log(answerToCheck);


        let actualAnswer = quizList.questions[i].answers.find(answer => answer.answer == answerToCheck);
        console.log(actualAnswer);

        if (actualAnswer.isAnswer) {
          correctResponses++;
        }
        // {
        //   if (answer.answer == questionToCheck.answer) {
        //     correctResponses++;
        //   }
        // })
      }
      console.log(window);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log(correctResponses);
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

<div class="flex-col items-center justify-center h-screen bg-gray-900">
    <h1 class="flex text-white text-4xl font-bold mb-4 bg-gray-900 justify-center">OSRS Trivia</h1>
    {#if showQuiz === true}
        <h2 class="flex justify-center text-green-300 text-2xl font-bold mb-4">Final Score: {correctResponses}/20</h2>
    {/if}
    <div class="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg">
    {#if showRandomQuestion === true}
        {#if userStatus === true}
        <h2 class="text-green-300 text-2xl font-bold mb-4">Correct!</h2>
        {/if}
        {#if userStatus === false}
        <h2 class="text-red-300 text-2xl font-bold mb-4">Incorrect!</h2>
        {/if}
        {#if showHelpText === true}
        <h2 class="text-orange-300 text-2xl font-bold mb-4">Please select an answer or click Skip!</h2>
        {/if}
        {#if triviaCompleted === false}
        <h2 class="text-slate-300 text-2xl font-bold mb-4">{randomQuestion.question.question}</h2>
        <div class="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg min-w-80">
          {#each randomQuestion.question.answers as answer}
          <div class="answerBadge">
            <div class="pb-3">
              <span class={answer.showAnswer === false ? 'inline-flex justify-center items-center rounded-md text-center bg-slate-400 w-64 px-10 py-3 text-xs font-medium text-black' : 'inline-flex justify-center items-center rounded-md bg-green-400 w-64 px-10 py-3 text-xs font-medium text-black'} on:click={() => checkAnswer(answer.isAnswer)}>{answer.answer}</span>            
            </div>
          </div>
          {/each}
          <div>
            <button class="bg-blue-400 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={newQuestion}>New Question</button>
            <button class="bg-purple-400 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg mt-4" on:click={() => skipQuestion(randomQuestion.question.answers)}>Skip</button>
          </div>
            <button class="bg-red-500 hover:bg-red-800 text-white font-semibold p-2 rounded-lg mt-4" on:click={() => startQuiz('showList')}>Play a Quiz!</button>
        </div>
          {/if}
          {#if triviaCompleted === true}
            <h2 class="text-white text-2xl font-bold mb-4">Unfortunately, we're out of questions! Refresh the page to run it back!</h2>
          {/if}
          {/if}
        {#if showQuizList === true}
            <button class="bg-red-500 hover:bg-red-800 text-white font-semibold p-2 rounded-lg mt-4" on:click={() => startQuiz('Weapons')}>Weapons Quiz</button>
            <button class="bg-red-500 hover:bg-red-800 text-white font-semibold p-2 rounded-lg mt-4 opacity-50 cursor-not-allowed" on:click={() => startQuiz('Skills')}>Skills Quiz (coming soon)</button>
            <button class="bg-red-500 hover:bg-red-800 text-white font-semibold p-2 rounded-lg mt-4 opacity-50 cursor-not-allowed" on:click={() => startQuiz('Quests')}>Quests Quiz (coming soon)</button>
            <button class="bg-red-500 hover:bg-red-800 text-white font-semibold p-2 rounded-lg mt-4 opacity-50 cursor-not-allowed" on:click={() => startQuiz('Random')}>Random Quiz (coming soon)</button>
        {/if}
        {#if showQuiz === true}
    <h1 class="flex text-white text-3xl font-bold mb-4 justify-center">{quizType} Quiz</h1>
        {#each quizList.questions as question}
        <div class="w-8/12 border-t-4 border-t-slate-200 rounded-sm mb-8">
        <h2 class="text-slate-300 text-2xl font-bold mb-2">{question.question}</h2>
          {#each question.answers as answer}
              <div class="mb-1 ">
                  <input id="default1" type="radio" value={answer.answer} name={question.question} on:change={saveResponse} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="default1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{answer.answer}</label>
              </div>
          {/each}
        </div>
        {/each}
            <button class="bg-blue-500 hover:bg-blue-800 text-white font-semibold p-2 rounded-lg mt-4" on:click={submitQuiz}>Submit!</button>
        {/if}
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

.answerBadge:hover{
	cursor: pointer;
	transform: scale(1.03)
}

.selected {
  background-color: #ff3e00;
}
}

    </style>