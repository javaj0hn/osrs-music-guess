// write a script to grab all the quests names from https://oldschool.runescape.wiki/w/Quests/List and store to a file

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://oldschool.runescape.wiki/w/Quests/List';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const quests = [];

        $('#mw-content-text > div.mw-parser-output > table:nth-child(7) > tbody > tr > a').each(function() {
        quests.push($(this).text());
        });
        return quests;
    })
    .then(quests => {
        fs.writeFile('quests.txt', quests.join('\n'), err => {
        if (err) {
            console.error(err);
        }
        });
    })
    .catch(console.error);

