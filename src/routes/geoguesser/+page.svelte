<script>
    import Map from '@anoram/leaflet-svelte'
    let options={
      center: [0,0],
      markers: [
        {
          lat: 0,
          lng: 0
        }
      ],
      minZoom: 4,
      maxZoom: 8,
      mapID: "map",
      attribution: 'Map data',
      noWrap: true,
      // set limit
      bounds: [[-5, -5], [5, 5]], // Set the bounds to limit the map to coordinates up to 60
      maxBounds: [[-5, -5], [5, 5]], // Set the maxBounds to limit the map to coordinates up to 60
      tilelayers: [
        {
          url: "https://raw.githubusercontent.com/Explv/osrs_map_tiles/master/0/{z}/{x}/{y}.png",
          maxNativeZoom: 8, // Adjust this value based on the maximum zoom level you have tiles for
          minNativeZoom: 4, // Adjust this value based on the minimum zoom level you have tiles for
        }
    ],
    }
    </script>
    <style>
      .map {
        height: 600px;
        width: 100%;
      }
    </style>
    <div class="map">
      <Map {options} />
    </div>