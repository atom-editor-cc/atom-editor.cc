var video;
var videoHud;
var videoButton;

document.addEventListener('DOMContentLoaded', function() {
  video = document.querySelector('#video');
  videoHud = document.querySelector('#video-hud');
  videoButton = document.querySelector('#video-button');

  videoButton.addEventListener('click', function(){ playVideo() }, false );
})

function playVideo() {
  video.play();
  video.controls = true; // enable controls
  videoHud.classList.add('is-hidden');
};
