const cheerio = require('cheerio');
const request = require('request-promise');
class NewsController {
  getNews(req, res) {
    request('https://vnexpress.net', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
        const data = [];
        $('.item-news-common').each((index, el) => {
          const title = $(el).find('.title-news a').text();
          const href = $(el).find('.title-news a').attr('href');
          const description = $(el).find('.description a').text();
          const thumbnail = $(el).find('.thumb-art a picture img').attr('src');
          data.push({
            title,
            href,
            description,
            thumbnail,
          });
        });
        res.json({ data: data });
      } else {
        console.log({ error: JSON.stringify(error) });
        res.json({ data: [] });
      }
    });
  }
  getNewsDetail(req, res) {
    const href = req.body.href;
    request(href, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
        const data = {
          content: [],
        };
        const title = $('.container').find('.sidebar-1 .title-detail').text();
        const description = $('.container')
          .find('.sidebar-1 .description')
          .text();
        $('.fck_detail .Normal').each((index, el) => {
          const content = $(el).text();
          data.content.push(content);
        });
        data.title = title;
        data.description = description;
        res.json({ data: data });
      } else {
        console.log({ error: JSON.stringify(error) });
        res.json({ data: [] });
      }
    });
  }

  getNewsByCategory(req, res) {
    const category = req.body.category;
    console.log(category);
    request(`https://vnexpress.net/${category}`, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
        const data = [];
        $('.item-news').each((index, el) => {
          const title = $(el).find('.title-news a').text();
          const href = $(el).find('.title-news a').attr('href');
          const description = $(el).find('.description a').text();
          const thumbnail = $(el).find('.thumb-art a picture img').attr('src');
          data.push({
            title,
            href,
            description,
            thumbnail,
          });
        });
        res.json({ data: data });
      } else {
        console.log({ error: JSON.stringify(error) });
        res.json({ data: [] });
      }
    });
  }
}
module.exports = new NewsController();
