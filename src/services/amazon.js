// services/amazon.js

const querystring = require('querystring');

/**
 * Build an Amazon search URL for a given book title and author.
 * @param {string} title
 * @param {string} author
 * @returns {string}
 */
function buildAmazonUrl(title, author) {
  const searchTerm = `${title} ${author}`;
  const encoded = encodeURIComponent(searchTerm);
  return `https://www.amazon.com/s?k=${encoded}`;
}

/**
 * Generate simple recommendations based on author.
 * Currently returns three placeholder titles.
 * You can replace this with real API calls if needed.
 * @param {string} author
 * @returns {Promise<string[]>}
 */
async function getRecommendations(author) {
  return [
    `${author} Masterpiece`,
    `The Best of ${author}`,
    `${author}'s Greatest Work`
  ];
}

module.exports = { buildAmazonUrl, getRecommendations };
