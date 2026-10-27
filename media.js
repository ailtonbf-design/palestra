document.querySelectorAll('.media-launch').forEach(button => {
  button.addEventListener('click', () => {
    const url = new URL(button.dataset.embed);
    if (!['www.youtube-nocookie.com', 'player.vimeo.com'].includes(url.hostname)) return;
    const frame = document.createElement('iframe');
    frame.src = url.href;
    frame.title = button.dataset.title;
    frame.allow = 'fullscreen; picture-in-picture; encrypted-media';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(frame);
    frame.focus();
  });
});
