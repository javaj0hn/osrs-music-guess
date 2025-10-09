<script>
  import "../../app.css";
  import Map from '@anoram/leaflet-svelte';
  import locations from '../../locations.json';

  // active user guess
  let userGuess = {
    x: 0,
    y: 0,
  };

  // game state
  let gameStarted = false;
  let questionCount = 0;
  const totalQuestions = 5;

  // active score
  let score = 0;
  let showInterimScreen = false;
  let showFinalScoreScreen = false;
  let interimScore = 0;
  let correctAnswerLocation = null;
  let usedLocations = [];

  function startGame() {
    gameStarted = true;
    questionCount = 0;
    score = 0;
    usedLocations = [];
    showFinalScoreScreen = false;
    nextQuestion();
  }

  function getRandomLocation() {
    let location;
    do {
      location = locations.locations[Math.floor(Math.random() * locations.locations.length)];
    } while (usedLocations.includes(location));
    usedLocations.push(location);
    return location;
  }

  let currentLocation = getRandomLocation();  // Initialize after declaring `usedLocations`

  function calculateDistance(correctAnswer, userGuess) {
    return Math.sqrt(Math.pow(correctAnswer[0] - userGuess.x, 2) + Math.pow(correctAnswer[1] - userGuess.y, 2));
  }

  function calculatePoints(distance) {
    const maxDistance = 250;
    const maxPoints = 5000;

    // points can't be negative
    return Math.max(0, maxPoints - Math.floor((distance / maxDistance) * maxPoints));
  }

  function checkAnswer() {
    const distance = calculateDistance(currentLocation.position, userGuess);
    const points = calculatePoints(distance);
    score += points;
    interimScore = points;
    correctAnswerLocation = currentLocation.location;
    showInterimScreen = true;
  }

  function nextQuestion() {
    if (questionCount < totalQuestions) {
      questionCount++;
      currentLocation = getRandomLocation();
      showInterimScreen = false;
    } else {
      gameStarted = false;
      showInterimScreen = false;
      showFinalScoreScreen = true;
    }
  }

  export const MAP_HEIGHT_MAX_ZOOM_PX = 364544;
  export const MAP_WIDTH_MAX_ZOOM_PX = 104448;
  export const RS_TILE_WIDTH_PX = 32, RS_TILE_HEIGHT_PX = 32; // Width and height in px of an rs tile at max zoom level
  export const RS_OFFSET_X = 1024; // Amount to offset x coordinate to get correct value
  export const RS_OFFSET_Y = 6208; // Amount to offset y coordinate to get correct value

  class Position {

    // @ts-ignore
    constructor(x, y, z) {
      this.x = Math.round(x);
      this.y = Math.round(y);
      this.z = z;
    }

    // @ts-ignore
    static fromLatLng(map, latLng, z) {
      var point = map.project(latLng, 11);
      var y = MAP_HEIGHT_MAX_ZOOM_PX - point.y + (RS_TILE_HEIGHT_PX / 4);
      y = Math.round((y - RS_TILE_HEIGHT_PX) / RS_TILE_HEIGHT_PX) + RS_OFFSET_Y;
      var x = Math.round((point.x - RS_TILE_WIDTH_PX) / RS_TILE_WIDTH_PX) + RS_OFFSET_X;
      return new Position(x, y, z);
    }

    // @ts-ignore
    toLatLng(map) {
      return Position.toLatLng(map, this.x, this.y)
    }

    // @ts-ignore
    toCentreLatLng(map) {
      return Position.toLatLng(map, this.x + 0.5, this.y + 0.5)
    }

    // @ts-ignore
    static toLatLng(map, x, y) {
      x = ((x - RS_OFFSET_X) * RS_TILE_WIDTH_PX) + (RS_TILE_WIDTH_PX / 4);
      y = (MAP_HEIGHT_MAX_ZOOM_PX - ((y - RS_OFFSET_Y) * RS_TILE_HEIGHT_PX));
      // @ts-ignore
      return map.unproject(L.point(x, y), map.getMaxZoom());
    }

    // @ts-ignore
    getDistance(position) {
      var diffX = Math.abs(this.x - position.x);
      var diffY = Math.abs(this.y - position.y);
      return Math.sqrt((diffX * diffX) + (diffY * diffY));
    }

    // @ts-ignore
    toLeaflet(map) {
      var startLatLng = this.toLatLng(map)
      var endLatLng = new Position(this.x + 1, this.y + 1, this.z).toLatLng(map)

      // @ts-ignore
      return L.rectangle(L.latLngBounds(startLatLng, endLatLng), {
        color: "#33b5e5",
        fillColor: "#33b5e5",
        fillOpacity: 1.0,
        weight: 1,
        interactive: false
      });
    }

    getName() {
      return "Position";
    }

    // @ts-ignore
    equals(position) {
      return this.x === position.x && this.y === position.y && this.z === position.z;
    }

    toString() {
      return `(${this.x}, ${this.y}, ${this.z})`;
    }
  };

  let options = {
    mapID: "osrsmap",
    zoom: 7,
    center: [-79, -137],
    keepBuffer: 20,
    tilelayers: [
      {
        url: "https://raw.githubusercontent.com/Explv/osrs_map_tiles/master/0/{z}/{x}/{y}.png",
        tms: true,
        noWrap: true,
        minZoom: 4,
        maxZoom: 11,
        keepBuffer: 20
      },
    ],
  }

  let MAP_EL;
  let latlng = '';
  let lt = '', ln = '';
  let currentMarker;

  async function init() {
    let map = MAP_EL.getMap();
    map.getContainer().style.cursor = "pointer";

    map.on("click", function (e) {
      latlng = e.latlng
      lt = e.latlng.lat;
      ln = e.latlng.lng;
      var popLocation = e.latlng;
      let mousePos = Position.fromLatLng(map, e.latlng, 0);
      var blueIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      currentMarker = L.marker(e.latlng, { icon: blueIcon }).addTo(map);

      // set user guess
      userGuess.x = mousePos.x;
      userGuess.y = mousePos.y;
    });
  }
</script>

<style>
  .image-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 56px); /* Adjust the container height to fit the screen considering navbar height */
    max-width: 100%;
    margin: 0 auto; /* Center the container */
  }

  .stretched-img {
    display: block; /* Remove inline space from inline-block images */
    width: 100%;
    height: 100%; /* Maintain aspect ratio */
    object-fit: cover; /* Ensure the image covers the entire container */
  }

  .map-container {
    position: absolute;
    bottom: 60px; /* Adjusted to leave space for the button */
    right: 10px;
    width: 300px;
    height: 200px;
    overflow: hidden;
    transition: width 0.3s, height 0.3s;
    z-index: 1; /* Ensure the map is above the image */
  }

  .map-container:hover {
    width: 700px; /* Adjust as needed for the expanded size */
    height: 700px; /* Adjust as needed for the expanded size */
  }

  .check-button {
    position: absolute;
    bottom: 10px; /* Place right below the map */
    right: 10px;
    width: 300px; /* Match the map width */
    background-color: #1e40af; /* Blue color */
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: width 0.3s;
  }

  .map-container:hover + .check-button {
    width: 700px; /* Match the expanded map width */
  }

  Map {
    width: 100%;
    height: 100%;
  }

  .score-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 2; /* Ensure the score is above other elements */
  }

  .interim-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
  }

  .interim-button {
    background-color: green;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .final-score-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
  }

  .final-score-button {
    background-color: #1e40af;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>

<div>
  {#if gameStarted}
    {#if showInterimScreen}
      <div class="interim-container">
        <h2>Your Score for this location: {interimScore}</h2>
        <p>Correct Location: {correctAnswerLocation.toString()}</p>
        <button class="interim-button" on:click={nextQuestion}>Next Question</button>
      </div>
    {:else}
      <div class="image-container">
        <img src={currentLocation.image} class="stretched-img" alt="location image"/>
        <div class="score-overlay"><div>Guess: {questionCount}/{totalQuestions}</div>Score: {score}</div>
        <div class="map-container">
          <Map {options} bind:this={MAP_EL} on:ready={init}/>
        </div>
        <button class="check-button" on:click={checkAnswer}>Check Answer</button>
      </div>
    {/if}
  {:else if showFinalScoreScreen}
    <div class="final-score-container">
      <h2>Game Over</h2>
      <p>Your Final Score: {score}</p>
      <button class="final-score-button" on:click={startGame}>Play Again</button>
    </div>
  {:else}
    <div>
      <button class="bg-green-500" on:click={startGame}>Start Game</button>
    </div>
  {/if}
</div>
