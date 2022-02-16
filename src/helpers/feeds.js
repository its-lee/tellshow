import Parser from 'rss-parser';

export const feeds = {
  theExploringSeries: 'https://anchor.fm/s/941e1d8/podcast/rss',
  comedyBangBang: 'https://feeds.simplecast.com/byb4nhvN',
  hardcoreHistory: 'https://dchhaddendum.libsyn.com/rss',
  intentionallyBlank: 'https://feeds.buzzsprout.com/1796140.rss',
  smbc: 'https://www.smbc-comics.com/comic/rss',
  wineAndCrime: 'https://audioboom.com/channels/4903845.rss',
  questionableContent: 'https://www.questionablecontent.net/QCRSS.xml',
  serial: 'https://feeds.simplecast.com/xl36XBC2',
  xkcd: 'https://xkcd.com/rss.xml',
  morbid: 'https://audioboom.com/channels/4997220.rss',
  privateEye: 'https://www.private-eye.co.uk/rss/itunes/itunes.xml',
  apology: 'https://rss.art19.com/apology-line',
  theConspirators: 'https://audioboom.com/channels/4918522.rss',
  // We solely provide this item to demonstrate that we have some error handling set up, and that the relevant
  // modal is rendered in this situation!
  intentionallyBroken: 'https://intentionally-broken.xyz'
};

const requestRss = async url => {
  const parser = new Parser();
  return await parser.parseURL(url);
};

export async function requestFeed(name) {
  if (!(name in feeds)) {
    throw new Error(`Unsupported feed ${name}`);
  }

  const url = feeds[name];
  return await requestRss(`${process.env.VUE_APP_RSS_PROXY}/${url}`);
}

export function parseFeedOrDefault(feed) {
  return Object.keys(feeds).includes(feed) ? feed : Object.keys(feeds)[0];
}
