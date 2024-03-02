// write a script that scrapes items from https://oldschool.runescape.wiki/ clicks each item and saves the item's name, examine text, and weight to a file called items.js

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://oldschool.runescape.wiki/w/Category:Items';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const items = {
            "items": []
        };

        $('div.mw-category-group ul li').each((i, elem) => {
            const item = $(elem).find('a').attr('title');
            items.items.push({
                'title': item,
                'image': ''
            });
        });

        fs.writeFile('items.json', JSON.stringify(items, null, 4), (err) => {
            if (err) throw err;
            console.log('File has been successfully created');
        });
    });


