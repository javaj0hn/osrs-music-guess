import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const questData = {
    quests: []
}

const url = 'https://oldschool.runescape.wiki/w/Quests/List';
const cfUrl = process.env.CLOUDFLARE_URL;

async function fetchData() {
    try {
        const response = await axios(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const promises = []; // Array to store all promises

        // Loop through each row of the table
        // @ts-ignore
        $('#mw-content-text > div.mw-parser-output > table:nth-child(7) > tbody > tr').each(function() {
            let data = {};
            const title = $(this).find('td:nth-child(2)').text();
            const difficulty = $(this).find('td:nth-child(3)').text();
            const length = $(this).find('td:nth-child(4)').text();
            const questPoints = $(this).find('td:nth-child(5)').text();
            const series = $(this).find('td:nth-child(6)').text();

            data.title = title;
            data.difficulty = difficulty;
            data.length = length;
            data.questPoints = questPoints;
            data.series = series;

            // Add promise to fetch description to promises array
            promises.push(getDescription(title).then(async description => {
                let aiDesc = await apiCall(description);
                console.log(aiDesc)
                data.description = aiDesc;
            }));
            questData.quests.push(data);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Write data to file
        fs.writeFileSync('src/quests.json', JSON.stringify(questData, null, 2));

        return questData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getDescription(title) {
    try {
        const response = await axios(`https://oldschool.runescape.wiki/w/${title.replace(/ /g, '%20')}`);
        const html = response.data;
        const $ = cheerio.load(html);
        return $('#mw-content-text > div.mw-parser-output > table.questdetails > tbody > tr:nth-child(4) > td').text();
    } catch (error) {
        console.error('Error fetching description:', error);
    }
}

async function apiCall(description) {
    let data = JSON.stringify({
        "messages": [
          {
            "role": "system",
            "content": "Rewrite runescape quest descriptions in one sentence without the use of names, cities or towns."
          },
          {
            "role": "user",
            "content": description
          }
        ]
      });

    let config = {
        method: 'post',
        url: cfUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization ': `Bearer {API_KEY}`
        },
        data : data
    };

    const response = await axios(config)
    return response.data.result.response
};

await fetchData();
