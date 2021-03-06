/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const fullscreen = player.querySelector('.fullscreen');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */

// .paused is a property that lives on the video
// Can be written like this alternatively
// function togglePlay() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// We can use this here because the function is bound to the video
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  // grab the button and toggle the content
  toggle.textContent = icon;
}

function toggleFullscreen() {
  if (player.style.width === '750px') {
    player.style.width = '100%';
  } else {
    player.style.width = '750px';
  }
}


function skip() {
  // this.dataset.skip is a string so it needs to be converted
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // the name of the property we need to update happens to be the same as the value name of the slider
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  // grab the progress bar and add the style to it
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', toggleFullscreen);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
