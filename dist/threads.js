const threadsPhotos = [
  ['21-08-07','Panel conversation beneath the Illuminate the Unseen backdrop',2560,1707],
  ['21-08-02','Speaker addressing the creative seminar',2560,1707],
  ['21-07-43','Black-and-white photograph of a speaker with a microphone',2048,2560],
  ['21-07-39','Speaker sharing a message on stage',2048,2560],
  ['21-07-33','Two presenters on stage',2048,2560],
  ['21-07-07','Two participants speaking into microphones',2048,2560],
  ['21-07-05','Speaker in blue addressing the audience',2048,2560],
  ['21-09-11','Runway look with colorful thread spools and orange sleeves',1440,1920],
  ['21-09-08','Runway look with a textured jacket and blue fringe',1440,1920],
  ['21-08-36','Front view of a sculptural blue runway outfit',1440,1920],
  ['21-08-39','Back detailing of the blue runway outfit',1440,1920],
  ['21-11-19','Participant walking the runway in a dark coordinated outfit',1440,1920],
  ['21-11-16','Live dance performance on the runway',1440,1920],
  ['21-11-13','Two performers during a dramatic stage moment',1440,1911],
  ['21-11-24','Audience members enjoying the event',1440,1920],
  ['21-12-00','A candid moment among event guests',1440,1920]
];
function threadsGallery(photos) {
  return `<div class="threads-gallery">${photos.map(([file,alt,w,h])=>`<figure class="${w>h?'landscape':''}"><a href="assets/light-in-threads/${file}.jpg" target="_blank" rel="noopener"><img src="assets/light-in-threads/${file}.jpg" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${alt}"></a><figcaption>${alt} <span aria-hidden="true">↗</span></figcaption></figure>`).join('')}</div>`;
}
function threadsCaseStudy(p) {
  return `${head('Fashion / Creative seminar / Live experience',p.name,'Illuminate the Unseen. Two days of faith, fashion and creative expression in Abuja.')}
  <section class="section">
    <figure class="threads-lead"><img src="assets/light-in-threads/21-08-07.jpg" width="2560" height="1707" fetchpriority="high" alt="Four participants in a panel conversation at LIGHT IN THREADS"><figcaption>Creative conversations at LIGHT IN THREADS 2.0</figcaption></figure>
    <div class="case-info"><span><strong>Dates</strong><br>27–28 June 2026</span><span><strong>Theme</strong><br>Illuminate the Unseen</span><span><strong>Organisers</strong><br>Fashion Connect Group &amp; Creative Connect Group<br>Supernatural Life Church (SLC)</span><span><strong>Runway venue</strong><br>National Centre for Women’s Development<br>Tafawa Balewa Way, Abuja</span></div>
    <div class="copy-grid"><h2>Where faith<br>meets fashion.</h2><div><p>LIGHT IN THREADS 2.0 brought Christian faith and creative expression into a shared space. Organised by SLC’s Fashion Connect and Creative Connect groups, the two-day event combined practical industry conversations with a runway showcase of faith-based and modest designer collections.</p><p>“Illuminate the Unseen” placed the focus on creative potential: giving ideas, emerging talent and distinctive design a platform to be seen.</p></div></div>
    <div class="threads-programme"><article><div class="eyebrow">01 / 27 June</div><h3>Equip. Inspire. Connect.</h3><p>A creative and fashion industry seminar designed to equip and inspire local creatives, with opportunities for learning and connection.</p></article><article><div class="eyebrow">02 / 28 June</div><h3>From ideas to the runway.</h3><p>A fashion exhibition showcasing designer collections alongside creative performances. The runway listing scheduled the event for 3:00–6:00pm (GMT+1).</p></article></div>
    <div class="section-top"><div>${eyebrow('Conversations & community')}<h2>Creative voices.</h2></div></div>${threadsGallery(threadsPhotos.slice(0,7))}
    <div class="section-top"><div>${eyebrow('Runway & live performance')}<h2>Expression in motion.</h2></div></div>${threadsGallery(threadsPhotos.slice(7))}
    <div class="copy-grid"><h2>The invitation.</h2><div><p>The event poster announced fashion runway, music, panel sessions, spoken word and drama across 27 and 28 June 2026, starting at 3pm, at the Women’s Centre banquet hall.</p><a class="text-link" href="assets/light-in-threads/poster.jpg" target="_blank" rel="noopener">Open the original event poster ↗</a></div></div>
    <a class="threads-poster" href="assets/light-in-threads/poster.jpg" target="_blank" rel="noopener"><img src="assets/light-in-threads/poster.jpg" width="1440" height="1802" loading="lazy" alt="LIGHT IN THREADS 2.0 event poster: Illuminate the Unseen, June 27 and 28, 2026, 3pm, Women’s Centre banquet hall"></a>
    <div class="copy-grid"><h2>The delivery story.</h2><p>Progenius’ specific responsibilities, production scope and delivery outcomes will be added once confirmed. Event details and photography are supplied by the project team.</p></div>
    <p><a class="text-link" href="#projects/project-black">Next project: Project BLVCK ↗</a></p>
  </section>${closing()}`;
}
