const siteUrl = 'https://www.imamzaniarahmad.com';
const indexNowKey = 'ed83ab7f85ac72cc66a5461ec6d079c9';
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const endpoint = 'https://api.indexnow.org/indexnow';

async function main() {
  const sitemapResponse = await fetch(sitemapUrl);

  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
  }

  const sitemap = await sitemapResponse.text();
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  if (urlList.length === 0) {
    throw new Error('No URLs found in sitemap.');
  }

  if (process.env.INDEXNOW_DRY_RUN === 'true') {
    console.log(`Dry run found ${urlList.length} URLs in ${sitemapUrl}.`);
    console.log(`Key file location: ${keyLocation}`);
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: new URL(siteUrl).host,
      key: indexNowKey,
      keyLocation,
      urlList,
    }),
  });

  if (!response.ok && response.status !== 202) {
    const responseText = await response.text();
    throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText} ${responseText}`);
  }

  console.log(`Submitted ${urlList.length} URLs to IndexNow. Status: ${response.status}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
