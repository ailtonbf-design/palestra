// Launcher para vídeos com play interativo
document.querySelectorAll('.media-launch').forEach(button => {
  button.addEventListener('click', () => {
    const embedUrl = button.dataset.embed;
    const frame = document.createElement('iframe');
    frame.src = embedUrl;
    frame.title = button.dataset.title || 'Vídeo';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(frame);
    frame.focus();
  });
});

// Suporte para visualização local (file://)
if (window.location.protocol === 'file:') {
  document.querySelectorAll('iframe[src^="/api/vimeo"]').forEach(iframe => {
    try {
      const url = new URL(iframe.src, 'http://localhost');
      const id = url.searchParams.get('id');
      if (id) {
        iframe.src = `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`;
      }
    } catch (e) {}
  });
}
