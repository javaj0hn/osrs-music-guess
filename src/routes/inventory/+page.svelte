<script>
    import "../../app.css";
    export let imagePath = "../../static/inven_clean.png";

    import items from "../../items.json";

    console.log("Hey");

    let test = undefined;

    // function to handle when enter is pressed while in input field
    function handleEnter(event, item, index) {
        console.log("Yes")
        if (event.key === 'Enter') {

            // if input equals item name
            if (event.target.value.toLowerCase() === item.name.toLowerCase()) {
                items.items[index].correct = true;
                event.target.classList.add('hidden');
            }
            else {
                items.items[index].correct = false;
                event.target.classList.add('hidden');
            }
        }
        return
    }

</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900 relative">
    <div class="inventory relative">
        <div class="grid">
            {#each items.items as item, i}
                <div class="item relative">
                    <div class="relative">
                        <img src="items/{item.image}"/>
                        <input type="text" class="w-8 input" on:keydown={event => handleEnter(event, item, i)} />
                        {#if item.correct === true}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 absolute top-0 right-0 m-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" clip-rule="evenodd" />
                            </svg>
                            {:else if item.correct === false}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 absolute top-0 right-0 m-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/>
                            </svg>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex justify-center mt-4">
    </div>
</div>

<style>
    .inventory {
        width: 373px;
        height: 503px;
        background-image: url('https://oldschool.runescape.wiki/images/Inventory_tab.png');
        background-size: contain;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Runescape', sans-serif; /* Apply Runescape font to all text */
    }

    /* Grid layout */
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 4 columns */
        grid-template-rows: repeat(7, 1fr); /* 7 rows */
        gap: 23px; /* Gap between grid items */
        position: absolute;
        top: 18px;
        left: 52px;
    }

    /* Grid item */
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px; /* Font size */
        padding-right: 23px;
    }

        /* Style for the input field */
    .input {
        margin-top: 1px; /* Adjust spacing between image and input */
        background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
        border-radius: 6px; /* Rounded border */
        border: 0.5px solid #333; /* Border color */
        transition: all 0.3s ease; /* Smooth transition */
        font-family: 'Runescape', sans-serif; /* Apply Runescape font to all text */
    }

    .input:focus {
        font-size: 14px; /* Larger font size when focused */
        padding: 2px 6px; /* Adjusted padding when focused */
        width: 50px;
    }

    /* Style for the input field */
    .item input {
        margin-top: 1px; /* Adjust spacing between image and input */
        background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
        border: 0.5px solid #333; /* Border color */
        border-radius: 6px; /* Border radius */
        font-family: 'Runescape', sans-serif; /* Apply Runescape font to all text */
    }
    
</style>
