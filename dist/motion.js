// A small, route-scoped interaction layer. No animation library required.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  let dispose = () => {};
  const disabled = () => paused || preference.matches;

  window.progeniusMotion = () => {
    dispose();
    const controller = new AbortController();
    const { signal } = controller;
    const animations = new Set();
    const frames = new Set();
    const resets = [];
    const animate = (element, keyframes, options) => {
      if (disabled()) return;
      const animation = element.animate(keyframes, options);
      animations.add(animation);
      animation.finished.catch(() => {}).finally(() => animations.delete(animation));
      return animation;
    };
    const on = (element, event, callback) => element.addEventListener(event, callback, { signal });
    const motionButton = document.querySelector('.motion-toggle');
    const sync = () => {
      document.documentElement.classList.toggle('motion-paused', disabled());
      motionButton.textContent = disabled() ? 'Motion: off' : 'Motion: on';
      motionButton.setAttribute('aria-pressed', String(!disabled()));
      motionButton.disabled = preference.matches;
      motionButton.title = preference.matches ? 'Reduced motion follows your device preference' : 'Toggle decorative animation';
      if (disabled()) {
        animations.forEach(a => a.cancel());
        resets.forEach(reset => reset());
      }
    };
    on(motionButton, 'click', () => { paused = !paused; sync(); });
    on(preference, 'change', sync);
    sync();

    const heading = document.querySelector('h1');
    if (heading) animate(heading, [{ opacity: .25, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target, [{ opacity: .2, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: Number(entry.target.dataset.revealDelay || 0), easing: 'cubic-bezier(.16,1,.3,1)' });
      });
    }, { threshold: .12 });
    document.querySelectorAll('.section-top, .project, .statement h2, .copy-grid, .process article, .closing h2').forEach((element, i) => {
      element.dataset.revealDelay = element.matches('.process article') ? (i % 5) * 65 : 0;
      observer.observe(element);
    });

    document.querySelectorAll('.pill, .project').forEach(element => {
      const target = element.matches('.project') ? element.querySelector('.art') : element;
      let frame;
      const reset = () => {
        if (frame) { cancelAnimationFrame(frame); frames.delete(frame); frame = null; }
        target.style.removeProperty('--mx'); target.style.removeProperty('--my');
        target.style.removeProperty('--rx'); target.style.removeProperty('--ry');
        element.classList.remove('tracking');
      };
      resets.push(reset);
      on(element, 'pointermove', event => {
        if (disabled() || !finePointer.matches || event.pointerType === 'touch') return;
        if (frame) { cancelAnimationFrame(frame); frames.delete(frame); }
        const { clientX, clientY } = event;
        frame = requestAnimationFrame(() => {
          frames.delete(frame); frame = null;
          const rect = element.getBoundingClientRect();
          const x = Math.max(-.5, Math.min(.5, (clientX - rect.left) / rect.width - .5));
          const y = Math.max(-.5, Math.min(.5, (clientY - rect.top) / rect.height - .5));
          target.style.setProperty('--mx', `${x * 12}px`);
          target.style.setProperty('--my', `${y * 10}px`);
          target.style.setProperty('--rx', `${-y * 5}deg`);
          target.style.setProperty('--ry', `${x * 5}deg`);
          element.classList.add('tracking');
        });
        frames.add(frame);
      });
      on(element, 'pointerleave', reset);
      on(element, 'pointercancel', reset);
      on(element, 'blur', reset);
    });

    const star = document.querySelector('.star');
    if (star) {
      let spin;
      on(star, 'click', () => {
        spin?.cancel();
        spin = animate(star.querySelector('i'), [{ transform: 'rotate(0deg) scale(1)' }, { transform: 'rotate(190deg) scale(.78)', offset: .45 }, { transform: 'rotate(540deg) scale(1)' }], { duration: 1100, easing: 'cubic-bezier(.2,.8,.2,1)' });
      });
    }

    // Keep native details semantics while animating both opening and closing.
    document.querySelectorAll('details').forEach(details => {
      const summary = details.querySelector('summary');
      let current;
      let expanded = details.open;
      const settle = () => {
        current?.cancel(); current = null;
        details.open = expanded;
        details.style.removeProperty('height');
        details.style.removeProperty('overflow');
      };
      resets.push(settle);
      on(summary, 'click', event => {
        if (disabled()) return;
        event.preventDefault();
        const start = details.getBoundingClientRect().height;
        current?.cancel();
        expanded = !expanded;
        details.open = true;
        details.style.height = 'auto';
        const end = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
        details.style.overflow = 'hidden';
        const animation = animate(details, [{ height: `${start}px` }, { height: `${end}px` }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
        current = animation;
        if (animation) animation.onfinish = () => { if (current === animation) settle(); };
      });
      on(details, 'toggle', () => { if (!current) expanded = details.open; });
    });

    dispose = () => {
      controller.abort(); observer.disconnect();
      frames.forEach(cancelAnimationFrame);
      animations.forEach(animation => animation.cancel());
      resets.forEach(reset => reset());
    };
  };
})();
