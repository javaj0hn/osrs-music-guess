<script>
    import "../../app.css";
    export let imagePath = "../../static/inven_clean.png";
    console.log("Hey")
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <div class="inventory">
         <!-- Grid layout -->
  <div class="grid">
    {#each Array(28) as _, i}
    <div class="item" style="grid-column: {(i % 4) + 1} / span 1; grid-row: {Math.floor(i / 4) + 1} / span 1;">
        <!-- Item content -->
        Item {i + 1}
      </div>
    {/each}
</div>
</div>
</div>

<style>
.inventory {
    position: relative;
    width: 765px;
    height: 503px;
    background-image: url('https://oldschool.runescape.wiki/images/Inventory_tab.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

/* Grid layout */
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columns */
    grid-template-rows: repeat(7, 1fr); /* 7 rows */
    gap: 5px; /* Gap between grid items */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /* Grid item */
  .item {
    background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
    border: 1px solid #333; /* Border color */
    border-radius: 3px; /* Border radius */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px; /* Font size */
  }
</style>