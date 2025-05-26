// services/amazon.js

const { AWS_ASSOCIATE_TAG } = process.env;

/**
 * Build an Amazon UK search URL for a given title and author.
 * If the title string is already a full Amazon URL, it returns it directly.
 */
function buildAmazonUrl(title, author) {
 const amazonUkPattern = /^https?:\/\/(www\.)?amazon\.co\.uk\/.+/i;
  if (amazonUkPattern.test(title)) {
    // user provided a direct link → return as is
    return title;
  }
  const keywords = encodeURIComponent(`${title} ${author}`);
  return `https://www.amazon.co.uk/s?k=${keywords}&tag=${AWS_ASSOCIATE_TAG}`;
}

/**
 * Placeholder for recommendations.
 * You can implement real calls to the Product Advertising API here,
 * using the global fetch if needed.
 */
async function getRecommendations(author) {
  // Example: return an empty array or mock data.
  return [];
}

module.exports = {
  buildAmazonUrl,
  getRecommendations
};
