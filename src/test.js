// write a script that opens the items.json file and tries to access the image of each item. Prepend the url with https://oldschool.runescape.wiki/images/
// and append .png to the end of the string. If the image exists, download it to a folder called images. If the image does not exist, log the item name to the console.

import fs from 'fs';
import axios from 'axios';
import items from "./items.json" assert { type: "json" };

const downloadImage = async (url, path) => {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });

        response.data.on('error', (err) => {
            reject(err);
        });
    });
};

items.items.forEach(item => {
    const url = `https://oldschool.runescape.wiki/images/${item.image}`;
    const path = `./static/items/${item.image}`;

    downloadImage(url, path)
        .then(() => {
            console.log(`${item.title} has been downloaded`);
        })
        .catch(err => {
            console.log(err)
            console.log(`${item.title} does not exist`);
        });
});

