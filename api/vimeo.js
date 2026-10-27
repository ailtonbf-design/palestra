module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).send('ID de vídeo inválido');
  }

  try {
    const vimeoUrl = `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`;
    const response = await fetch(vimeoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://williampaganelli.com.br/'
      }
    });

    if (!response.ok) {
      return res.redirect(`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`);
    }

    const html = await response.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    return res.status(200).send(html);
  } catch (error) {
    return res.redirect(`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`);
  }
};
