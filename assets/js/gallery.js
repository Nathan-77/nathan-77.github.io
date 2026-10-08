/* ============================================================
   My Works 相册（works.html 用）
   1. 把 works.html 里每个 <section class="album"> 变成目录里的一张封面卡片
   2. 点卡片只显示那一个地点（网址变成 works.html#地点，可以直接分享）
   3. 点照片放大；左右箭头 / 键盘方向键 / 手机左右滑切换，Esc 关闭
   平时加照片、加地点只改 works.html，这个文件不用动。
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  if (!root.classList.contains('js')) root.classList.add('js');
  window.galleryReady = true;

  var index = document.getElementById('album-index');
  var intro = document.getElementById('works-intro');
  var albums = [].slice.call(document.querySelectorAll('.album'));
  if (!index || !albums.length) return;

  var baseTitle = document.title;
  var savedScroll = 0;

  function plural(n, unit) {
    return n + ' ' + unit + (n === 1 ? '' : 's');
  }

  /* ---------- 目录卡片 + 每个相册的页头 ---------- */
  albums.forEach(function (album) {
    var imgs = [].slice.call(album.querySelectorAll('.gallery img'));
    var titleEl = album.querySelector('.album-title');
    var noteEl = album.querySelector('.album-note');
    var title = titleEl ? titleEl.textContent.trim() : album.id;
    var count = plural(imgs.length, album.getAttribute('data-unit') || 'photo');

    var card = document.createElement('a');
    card.className = 'album-card';
    card.href = '#' + album.id;

    var cover = document.createElement('span');
    cover.className = 'album-cover';
    var coverImg = document.createElement('img');
    coverImg.src = album.getAttribute('data-cover') ||
      (imgs[0] ? imgs[0].getAttribute('src') : '');
    coverImg.alt = '';
    coverImg.loading = 'lazy';
    if (album.getAttribute('data-cover-position')) {
      coverImg.style.objectPosition = album.getAttribute('data-cover-position');
    }
    cover.appendChild(coverImg);

    var name = document.createElement('span');
    name.className = 'album-name';
    name.textContent = title;

    var meta = document.createElement('span');
    meta.className = 'album-meta';
    meta.textContent = (noteEl ? noteEl.textContent.trim() + ' · ' : '') + count;

    card.appendChild(cover);
    card.appendChild(name);
    card.appendChild(meta);
    card.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      savedScroll = window.pageYOffset;
      go('#' + album.id);
    });
    index.appendChild(card);

    /* 相册页头：返回目录的链接 + 照片数 */
    var back = document.createElement('p');
    back.className = 'crumb';
    var backLink = document.createElement('a');
    backLink.href = '#';
    backLink.textContent = '← All albums';
    backLink.addEventListener('click', function (e) {
      e.preventDefault();
      go('');
    });
    back.appendChild(backLink);
    album.insertBefore(back, album.firstChild);

    var countEl = document.createElement('p');
    countEl.className = 'album-count';
    countEl.textContent = count;
    var after = noteEl || titleEl;
    if (after) after.parentNode.insertBefore(countEl, after.nextSibling);

    /* 只有一张照片的地点就占满整行 */
    var gallery = album.querySelector('.gallery');
    if (gallery && imgs.length < 2) gallery.style.setProperty('--cols', '1');

    imgs.forEach(function (img, i) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', title + ', photo ' + (i + 1) + ' of ' + imgs.length);
      img.addEventListener('click', function () { openViewer(imgs, i, img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openViewer(imgs, i, img);
        }
      });
    });
  });

  /* ---------- 目录 / 单个相册 之间切换 ---------- */
  function go(hash) {
    try {
      history.pushState(null, '', hash || location.pathname + location.search);
    } catch (err) {
      location.hash = hash;   // 少数环境不允许 pushState，退回普通锚点
      return;
    }
    render(true);
  }

  function render(fromClick) {
    var id = decodeURIComponent(location.hash.replace(/^#/, ''));
    var open = null;
    albums.forEach(function (a) { if (a.id === id) open = a; });
    albums.forEach(function (a) { a.classList.toggle('is-open', a === open); });
    index.hidden = !!open;
    if (intro) intro.hidden = !!open;

    if (open) {
      var t = open.querySelector('.album-title');
      document.title = (t ? t.textContent.trim() + ' · ' : '') + baseTitle;
      var main = document.querySelector('main');
      var top = main ? main.getBoundingClientRect().top + window.pageYOffset : 0;
      if (fromClick !== false && window.pageYOffset > top) window.scrollTo(0, top);
    } else {
      document.title = baseTitle;
      if (fromClick !== false) window.scrollTo(0, savedScroll);
    }
  }

  window.addEventListener('popstate', function () { render(true); });
  window.addEventListener('hashchange', function () { render(true); });
  render(false);

  /* ---------- 放大查看 ---------- */
  var viewer, viewerImg, viewerCount, btnPrev, btnNext, btnClose;
  var list = [], cur = 0, opener = null, touchX = null;

  function buildViewer() {
    viewer = document.createElement('div');
    viewer.id = 'lightbox';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Photo viewer');
    viewer.innerHTML =
      '<button type="button" class="lb-btn lb-close" aria-label="Close">×</button>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
      '<img alt="">' +
      '<button type="button" class="lb-btn lb-next" aria-label="Next photo">›</button>' +
      '<p class="lb-count"></p>';
    document.body.appendChild(viewer);

    viewerImg = viewer.querySelector('img');
    viewerCount = viewer.querySelector('.lb-count');
    btnPrev = viewer.querySelector('.lb-prev');
    btnNext = viewer.querySelector('.lb-next');
    btnClose = viewer.querySelector('.lb-close');

    btnClose.addEventListener('click', closeViewer);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer) closeViewer();
    });
    viewer.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    viewer.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if (!viewer.classList.contains('open')) return;
      if (e.key === 'Escape') closeViewer();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {
        var f = [].slice.call(viewer.querySelectorAll('button:not([hidden])'));
        var k = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  }

  function showCurrent() {
    var img = list[cur];
    viewerImg.src = img.currentSrc || img.src;
    viewerImg.alt = img.alt || '';
    viewerCount.textContent = (cur + 1) + ' / ' + list.length;
    var many = list.length > 1;
    btnPrev.hidden = !many;
    btnNext.hidden = !many;
    viewerCount.hidden = !many;
    if (many) {
      [1, -1].forEach(function (d) {
        var n = list[(cur + d + list.length) % list.length];
        (new Image()).src = n.currentSrc || n.src;
      });
    }
  }

  function openViewer(imgs, i, from) {
    if (!viewer) buildViewer();
    list = imgs;
    cur = i;
    opener = from;
    showCurrent();
    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function step(d) {
    cur = (cur + d + list.length) % list.length;
    showCurrent();
  }

  function closeViewer() {
    viewer.classList.remove('open');
    document.body.style.overflow = '';
    viewerImg.removeAttribute('src');
    if (opener) opener.focus();
  }
})();
