// @ts-nocheck
// fetch https://oldschool.runescape.wiki/w/Special:AllPages
// scrape all pages

import fetch from 'node-fetch';
import cheerio from 'cheerio';

const template_url = 'https://oldschool.runescape.wiki';
let pages = [];
let pageOverview = {};

async function fetchAllPages(url) {
    const res = await fetch(url);
    const body = await res.text();
    const $ = cheerio.load(body);

    // clear pages
    pages = [];

    $('#mw-content-text ul li a').each((i, el) => {
        const page = $(el).attr('title');
        pages.push(page);
        //console.log("Page: ", page)
    });

    //#mw-content-text > div:nth-child(5) > a
    // #mw-content-text > div:nth-child(5) > a:nth-child(2)
    pageOverview['nextPage'] = $('#mw-content-text > div:nth-child(5) > a:nth-child(2)').attr('href');
    pageOverview['pages'] = pages;
}

async function fetchPage(page) {
    console.log(`API Call to - https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${page}`)
    const res = await fetch(`https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${page}`);

    if (!res.ok) {
        console.log(`Error fetching page: ${page}`)
        return ''
    }
    const json = await res.json();

    console.log(json)

    // get key of first element
    const key = Object.keys(json.query.pages)[0];
    if (!json.query.pages[key].revisions) {
        console.log("No Revisions")
        return ''
    }
    const content = json.query.pages[key].revisions[0]['*'];

    console.log(content)
    return content
}

async function apiCall(data) {
    console.log("API Call")
    await fetch('https://osrs-rag.mossgiant.workers.dev/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"text": data})
    });
}

async function main(url) {
    await fetchAllPages(template_url + url);

    // loop over pages and call fetchPage
    for (let i = 0; i < pageOverview.pages.length; i++) {
        console.log("Parsing Page: ", pages[i])
        let data = await fetchPage(pages[i]);
        // check if data is undefined
        if (data === undefined) {
            console.log("Missing Data")
        }
        if (data != '') {
            await apiCall(data);
        }
    }

    console.log("Next Page: ", pageOverview.nextPage)

    // run again
    await main(pageOverview.nextPage);
}

//https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=20th anniversary hat
//await fetchPage("20th anniversary hat")
main('/w/Special:AllPages?from=20th+anniversary+necklace&hideredirects=1');