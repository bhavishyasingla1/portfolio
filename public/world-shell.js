/**
 * Title and loading screen for the 3D worlds (/room/, /world/, /folio/).
 * The markup is already in the page, so it shows on the very first paint. This script drives the
 * progress bar from real network activity and fades the screen out once the world has what it needs:
 * the page has loaded, most of the expected files have arrived and the network has gone quiet.
 */
(function () {
  var el = document.getElementById('ws');
  if (!el) return;
  var bar = el.querySelector('.ws-bar span');
  var num = el.querySelector('.ws-status b');
  var expected = Number(el.getAttribute('data-expected')) || 30;
  var start = performance.now();
  var lastActivity = start;
  var shown = 0;
  var done = false;

  try {
    new PerformanceObserver(function () {
      lastActivity = performance.now();
    }).observe({ type: 'resource', buffered: true });
  } catch (e) {
    /* old browsers: the time limit below still clears the screen */
  }

  function finish() {
    if (done) return;
    done = true;
    bar.style.transform = 'scaleX(1)';
    num.textContent = '100';
    el.classList.add('is-done');
    setTimeout(function () {
      el.style.visibility = 'hidden';
    }, 650);
  }

  function tick() {
    if (done) return;
    var now = performance.now();
    var loaded = performance.getEntriesByType('resource').length;
    var target = Math.min(0.96, loaded / expected);
    shown += (Math.max(shown, target) - shown) * 0.12; // ease, never backwards
    bar.style.transform = 'scaleX(' + shown.toFixed(3) + ')';
    num.textContent = String(Math.round(shown * 100));
    var quiet = now - lastActivity > 550;
    var enough = loaded >= expected * 0.7;
    if (document.readyState === 'complete' && enough && quiet && now - start > 700) return finish();
    if (now - start > 14000) return finish(); // never trap anyone behind the screen
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
  // rAF pauses in background tabs: make sure the screen still clears when the tab comes back
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !done) requestAnimationFrame(tick);
  });
  // Escape or a click on "Skip" removes it immediately
  var skip = el.querySelector('.ws-skip');
  if (skip) skip.addEventListener('click', finish);
})();
