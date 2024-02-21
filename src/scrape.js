import axios from 'axios';
import cheerio from 'cheerio';
// @ts-ignore
import fs from 'fs';

const url = 'https://oldschool.runescape.wiki/w/Music';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const songs = {
            "songs": []
        };

        $('table.wikitable.music-tracks tbody tr').each((i, elem) => {
            // ignore the first row -- lazy way to do it
            if (i === 0) {
                return;
            }
            const song = $(elem).find('td').eq(0).text().replace(/\n/g, '').trim();;
            // extract description
            const description = $(elem).find('td').eq(1).text().replace(/\n/g, '').trim();;
            // extract if it is members only
            const members = $(elem).find('td').eq(2).text().replace(/\n/g, '').trim();;
            // extract duration
            const duration = $(elem).find('td').eq(3).text().replace(/\n/g, '').trim();;

            console.log(song, description, members, duration);
            // @ts-ignore
            songs.songs.push({
                'title': song,
                'UnlockDetails': description,
                'Members': members,
                'Duration': duration
            });
        });

        fs.writeFile('songs.json', JSON.stringify(songs, null, 4), (err) => {
            if (err) throw err;
            console.log('File has been successfully created');
        });
    });