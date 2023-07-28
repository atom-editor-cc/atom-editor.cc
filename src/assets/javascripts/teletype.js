document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('#video');
  const videoHud = document.querySelector('#video-hud');
  const videoButton = document.querySelector('#video-button');

  videoButton.addEventListener('click', function() {
    video.play();
    video.controls = true;
    videoHud.classList.add('is-hidden');
  }, false);
});
