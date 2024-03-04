// @ts-nocheck

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const urls = ['https://oldschool.runescape.wiki/w/Category:Amulets', 
                'https://oldschool.runescape.wiki/w/Category:Axes',
                'https://oldschool.runescape.wiki/w/Category:Bracelets',
                'https://oldschool.runescape.wiki/w/Category:Boots',
                'https://oldschool.runescape.wiki/w/Category:Capes',
                'https://oldschool.runescape.wiki/w/Category:Fishing_equipment',
                'https://oldschool.runescape.wiki/w/Category:Light_sources',
                'https://oldschool.runescape.wiki/w/Category:Pickaxes',
                'https://oldschool.runescape.wiki/w/Category:Rings',
                'https://oldschool.runescape.wiki/w/Category:Logs',
                'https://oldschool.runescape.wiki/w/Category:Metal_bars',
                'https://oldschool.runescape.wiki/w/Category:Ores',
                'https://oldschool.runescape.wiki/w/Category:Random_event_rewards',
                'https://oldschool.runescape.wiki/w/Category:Runes',
                'https://oldschool.runescape.wiki/w/Category:Monkey_greegrees'
            ];


const items = {
    "items": []
};

// loop over each url and scrape the items
urls.forEach(url => {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('div.mw-category-group ul li').each((i, elem) => {
                const item = $(elem).find('a').attr('title');
                items.items.push({
                    'title': item,
                    'image': item?.replace(/ /g, '_') + '.png',
                });
            });

            // append to items.json
            fs.writeFile('./src/items.json', JSON.stringify(items), (err) => {
                if (err) throw err;
                console.log('Data has been added to items.json');
            });
        });
});

fs.writeFile('./src/items.json', JSON.stringify(items), (err) => {
    if (err) throw err;
    console.log('File has been successfully created');
});

const downloadImage = async (url, path) => {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });

        response.data.on('error', (err) => {
            reject(err);
        });
    });
};
