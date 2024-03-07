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
                'https://oldschool.runescape.wiki/w/Category:Fish',
                'https://oldschool.runescape.wiki/w/Category:Fruit',
                'https://oldschool.runescape.wiki/w/Category:Random_event_rewards',
                'https://oldschool.runescape.wiki/w/Category:Runes',
                'https://oldschool.runescape.wiki/w/Category:Treasure_Trails_rewards',
                'https://oldschool.runescape.wiki/w/Category:Treasure_Trails_rewards?pagefrom=Black+unicorn+mask#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Treasure_Trails_rewards?pagefrom=Holy+sandals#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Treasure_Trails_rewards?pagefrom=Saradomin+platebody#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Gloves',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Birthday+balloons#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Bronze+sq+shield#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Death+rune+%28Barbarian+Assault%29#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Giant+easter+egg#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Iron+kiteshield#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Murky+potion#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Right+skull+half#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Sliding+button#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Free-to-play_items?pagefrom=Team-8+cape#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Ancient+statuette#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Big+bones#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Bone+club#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Chocolate+cake#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Dragon+dart#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Fancy+hedge+%28bagged%29#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Green+dragon+mask#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Iron+ore#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Magic+potion#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Mummy%27s+head#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Pestle+and+mortar#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Red+dragon+leather#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Sanfew+serum#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Sinew#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Super+restore#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Trailblazer+hood+%28t2%29#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Warrior+ring#mw-pages',
                'https://oldschool.runescape.wiki/w/Category:Grand_Exchange_items?pagefrom=Zombie+axe#mw-pages'
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
