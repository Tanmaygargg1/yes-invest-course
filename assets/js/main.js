// YES Investing Course — shared behaviour
// Progress is stored in localStorage under key "yes-invest-progress"
// as a JSON array of completed lesson ids, e.g. ["unit-1-lesson-1", ...]

(function () {
  var STORAGE_KEY = 'yes-invest-progress';
  var TOTAL_LESSONS = 42;

  function getCompleted() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setCompleted(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* localStorage unavailable — progress simply won't persist */ }
  }

  function isComplete(lessonId, completed) {
    return completed.indexOf(lessonId) !== -1;
  }

  function toggleComplete(lessonId) {
    var completed = getCompleted();
    var idx = completed.indexOf(lessonId);
    if (idx === -1) {
      completed.push(lessonId);
    } else {
      completed.splice(idx, 1);
    }
    setCompleted(completed);
    return completed;
  }

  function paintSidebarChecks(completed) {
    var items = document.querySelectorAll('.lesson-list li[data-lesson]');
    items.forEach(function (li) {
      var id = li.getAttribute('data-lesson');
      if (isComplete(id, completed)) {
        li.classList.add('is-complete');
      } else {
        li.classList.remove('is-complete');
      }
    });
  }

  function paintSidebarProgress(completed) {
    var track = document.querySelector('[data-sidebar-progress-fill]');
    var text = document.querySelector('[data-sidebar-progress-text]');
    if (track) {
      var pct = Math.round((completed.length / TOTAL_LESSONS) * 100);
      track.style.width = pct + '%';
    }
    if (text) {
      text.textContent = completed.length + ' of ' + TOTAL_LESSONS + ' lessons complete';
    }
  }

  function paintHomeProgress(completed) {
    var wrap = document.querySelector('[data-home-progress]');
    if (!wrap) return;
    if (completed.length > 0) {
      wrap.classList.add('visible');
    }
    var track = wrap.querySelector('[data-sidebar-progress-fill]');
    var text = wrap.querySelector('[data-sidebar-progress-text]');
    var pct = Math.round((completed.length / TOTAL_LESSONS) * 100);
    if (track) track.style.width = pct + '%';
    if (text) text.textContent = 'You’ve completed ' + completed.length + ' of ' + TOTAL_LESSONS + ' lessons';
  }

  function paintMarkCompleteButton(completed) {
    var btn = document.querySelector('[data-mark-complete]');
    if (!btn) return;
    var lessonId = btn.getAttribute('data-mark-complete');
    updateButtonLabel(btn, isComplete(lessonId, completed));
  }

  function updateButtonLabel(btn, done) {
    if (done) {
      btn.textContent = 'Completed ✓';
      btn.setAttribute('data-complete-state', 'done');
    } else {
      btn.textContent = 'Mark as complete';
      btn.removeAttribute('data-complete-state');
    }
  }

  function initMarkCompleteButton() {
    var btn = document.querySelector('[data-mark-complete]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var lessonId = btn.getAttribute('data-mark-complete');
      var completed = toggleComplete(lessonId);
      updateButtonLabel(btn, isComplete(lessonId, completed));
      paintSidebarChecks(completed);
      paintSidebarProgress(completed);
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('[data-sidebar-overlay]');
    var closeBtn = document.querySelector('[data-sidebar-close]');

    function open() {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('open');
    }
    function close() {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }
    if (toggle) toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var completed = getCompleted();
    paintSidebarChecks(completed);
    paintSidebarProgress(completed);
    paintHomeProgress(completed);
    paintMarkCompleteButton(completed);
    initMarkCompleteButton();
    initMobileNav();
  });
})();
