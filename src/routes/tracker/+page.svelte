<script>
    import "../../app.css";

    // function to make api call GET
    async function getApiData() {
        const response = await fetch('http://api.mossgiant.xyz/api/v1/population/osrs');
        const data = await response.json();
        console.log(data);
    }
    getApiData();
</script>
<div class="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-900">
    <table class="table-auto">
        <thead>
            <tr>
                <th class="px-4 py-2">World</th>
                <th class="px-4 py-2">Population</th>
                <th class="px-4 py-2">Change</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border px-4 py-2">China</td>
                <td class="border px-4 py-2">1,398,000,000</td>
                <td class="border px-4 py-2">+6,000,000</td>
            </tr>
            <tr>
                <td class="border px-4 py-2">India</td>
                <td class="border px-4 py-2">1,351,000,000</td>
                <td class="border px-4 py-2">+18,000,000</td>
            </tr>
            <tr>
                <td class="border px-4 py-2">USA</td>
                <td class="border px-4 py-2">329,000,000</td>
                <td class="border px-4 py-2">+3,000,000</td>
            </tr>
        </tbody>
</div>