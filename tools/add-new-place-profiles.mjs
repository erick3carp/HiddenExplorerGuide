import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const chunkPath = path.join(root, '.next', 'server', 'chunks', '488.js');
const staticExploreChunkPath = path.join(root, '.next', 'static', 'chunks', 'app', 'explore', 'page-6a6ed5a3c05e8d44.js');
const manifestPath = path.join(root, '.next', 'prerender-manifest.json');
const destinationDir = path.join(root, '.next', 'server', 'app', 'destination');
const templateSlug = 'buena-vista-park';
const appRoot = path.join(root, '.next', 'server', 'app');

const photoProfiles = [
  {
    slug: 'canal-street-historic-district',
    name: 'Canal Street Historic District',
    oldHero: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/canal-st-historic/hero-canal-st.jpg',
    gallery: [
      '/photos/canal-st-historic/canalst-2.JPG',
      '/photos/canal-st-historic/canalst-3.jpg',
      '/photos/canal-st-historic/canalst-4.JPG',
      '/photos/canal-st-historic/canalst-5.jpg',
      '/photos/canal-st-historic/hero-canal-st.jpg',
    ],
  },
  {
    slug: 'flagler-avenue-beach-approach',
    name: 'Flagler Avenue Beach Approach',
    oldHero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/flager-avenue/hero-flager-avenue.jpg',
    gallery: [
      '/photos/flager-avenue/flager-avenue2.jpg',
      '/photos/flager-avenue/flager-avenue3.jpg',
      '/photos/flager-avenue/flager-avenue4.jpg',
      '/photos/flager-avenue/flager-avenue5.jpg',
      '/photos/flager-avenue/hero-flager-avenue.jpg',
    ],
  },
  {
    slug: 'old-fort-park',
    name: 'Old Fort Park',
    oldHero: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/old-fort-park/hero-old-fort.jpg',
    gallery: [
      '/photos/old-fort-park/old-fort2.jpg',
      '/photos/old-fort-park/old-fort3.jpg',
      '/photos/old-fort-park/old-fort4.jpg',
      '/photos/old-fort-park/old-fort5.jpg',
      '/photos/old-fort-park/hero-old-fort.jpg',
    ],
  },
  {
    slug: 'riverside-park',
    name: 'Riverside Park',
    oldHero: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/riverside-park/hero-riverside.jpg',
    gallery: [
      '/photos/riverside-park/riverside2.JPG',
      '/photos/riverside-park/riverside3.JPG',
      '/photos/riverside-park/riverside4.JPG',
      '/photos/riverside-park/riverside5.JPG',
      '/photos/riverside-park/hero-riverside.jpg',
    ],
  },
  {
    slug: 'norwoods-treehouse',
    name: "Norwood's Treehouse",
    oldHero: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/norwoods-restaurant/hero-norwoods.jpg',
    gallery: [
      '/photos/norwoods-restaurant/norwoods2.jpg',
      '/photos/norwoods-restaurant/norwoods3.jpg',
      '/photos/norwoods-restaurant/norwoods4.jpg',
      '/photos/norwoods-restaurant/norwoods5.jpg',
      '/photos/norwoods-restaurant/hero-norwoods.jpg',
    ],
  },
  {
    slug: 'sugar-mill-ruins',
    name: 'Sugar Mill Ruins',
    oldHero: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/plantation-sugar-mill-ruins/hero-ruins.JPG',
    gallery: [
      '/photos/plantation-sugar-mill-ruins/sugar-mill-ruins2.JPG',
      '/photos/plantation-sugar-mill-ruins/sugar-mill-ruins3.JPG',
      '/photos/plantation-sugar-mill-ruins/sugar-mill-ruins4.JPG',
      '/photos/plantation-sugar-mill-ruins/sugar-mill-ruins5.JPG',
      '/photos/plantation-sugar-mill-ruins/hero-ruins.JPG',
    ],
  },
  {
    slug: 'third-wave-cafe',
    name: 'Third Wave Cafe',
    oldHero: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/thirdwave-restaurant/hero-thirdwave.JPG',
    gallery: [
      '/photos/thirdwave-restaurant/thirdwave2.JPG',
      '/photos/thirdwave-restaurant/thirdwave3.jpg',
      '/photos/thirdwave-restaurant/thirdwave4.jpg',
      '/photos/thirdwave-restaurant/thirdwave5.JPG',
      '/photos/thirdwave-restaurant/hero-thirdwave.JPG',
    ],
  },
  {
    slug: 'grayce-k-barck-north-beach-community-park',
    name: 'Grayce K. Barck North Beach Community Park',
    oldHero: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg',
    gallery: [
      '/photos/grayce-kenemer-barck-north-brach/grace-kenemer2.jpg',
      '/photos/grayce-kenemer-barck-north-brach/grace-kenemer3.jpg',
      '/photos/grayce-kenemer-barck-north-brach/grace-kenemer4.jpg',
      '/photos/grayce-kenemer-barck-north-brach/grace-kenemer5.jpg',
      '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg',
    ],
  },
  {
    slug: 'emory-l-bennett-park',
    name: 'Emory L. Bennett Park',
    oldHero: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
    hero: '/photos/emory-l-bennett-park/hero-emory.jpg',
    gallery: [
      '/photos/emory-l-bennett-park/emory2.jpg',
      '/photos/emory-l-bennett-park/emory3.jpg',
      '/photos/emory-l-bennett-park/emory4.jpg',
      '/photos/emory-l-bennett-park/emory5.jpg',
      '/photos/emory-l-bennett-park/hero-emory.jpg',
    ],
  },
];

const templateGalleryImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=80',
];

const places = [
  {
    id: 21,
    name: 'Grayce K. Barck North Beach Community Park',
    slug: 'grayce-k-barck-north-beach-community-park',
    city: 'New Smyrna Beach',
    state: 'FL',
    category: 'Park',
    description: 'A quiet north beach community park for shaded breaks, neighborhood walks, and easy coastal photos.',
    latitude: 29.0550,
    longitude: -80.9070,
    featuredImage: '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg',
    parking: 'Neighborhood-style public parking nearby; confirm posted signs before leaving the car.',
    bestTime: 'Early morning or late afternoon for softer light and a quieter visit.',
    photoTip: 'Frame palms, paths, and beachside textures to give the park a local, lived-in feel.',
    duration: '30-60 min',
  },
  {
    id: 22,
    name: 'Emory L. Bennett Park',
    slug: 'emory-l-bennett-park',
    city: 'New Smyrna Beach',
    state: 'FL',
    category: 'Park',
    description: 'A neighborhood park stop with open green space, simple facilities, and a relaxed local pace.',
    latitude: 29.0190,
    longitude: -80.9270,
    featuredImage: '/photos/emory-l-bennett-park/hero-emory.jpg',
    parking: 'Small public parking areas nearby; check posted access and park-hour signs.',
    bestTime: 'Morning shade or golden hour when the park feels calmest.',
    photoTip: 'Use trees, benches, and walking paths as simple foreground anchors.',
    duration: '30-60 min',
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function jsObject(place) {
  return `{id:${place.id},name:${JSON.stringify(place.name)},slug:${JSON.stringify(place.slug)},city:${JSON.stringify(place.city)},state:${JSON.stringify(place.state)},category:${JSON.stringify(place.category)},description:${JSON.stringify(place.description)},latitude:${place.latitude},longitude:${place.longitude},featuredImage:${JSON.stringify(place.featuredImage)},parking:${JSON.stringify(place.parking)},bestTime:${JSON.stringify(place.bestTime)},photoTip:${JSON.stringify(place.photoTip)},duration:${JSON.stringify(place.duration)}}`;
}

function photoProfileFor(slug) {
  return photoProfiles.find((profile) => profile.slug === slug);
}

function patchDestinationArray(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  text = text.replace(/(duration:"[^"]+")\],s=o\.flatMap/, '$1}],s=o.flatMap');
  for (const place of places) {
    const existing = new RegExp(`,?\\{id:\\d+,name:${escapeRegExp(JSON.stringify(place.name))},slug:${escapeRegExp(JSON.stringify(place.slug))}[^}]+\\}`, 'g');
    text = text.replace(existing, '');
    const insert = `},${jsObject(place)}],s=o.flatMap`;
    text = text.replace('}],s=o.flatMap', insert);
    text = text.replace('}].flatMap', `},${jsObject(place)}].flatMap`);
  }
  for (const profile of photoProfiles) {
    const pattern = new RegExp(`(name:${escapeRegExp(JSON.stringify(profile.name))},slug:${escapeRegExp(JSON.stringify(profile.slug))}[^}]*?featuredImage:)([^,}]+)`, 'g');
    text = text.replace(pattern, (_match, prefix) => `${prefix}${JSON.stringify(profile.hero)}`);
  }
  fs.writeFileSync(filePath, text);
}

function encodedImageUrl(image) {
  return encodeURIComponent(image);
}

function escapedNextUrl(image) {
  return image.replaceAll('&', '\\u0026');
}

function replaceImageUrl(text, from, to) {
  return text
    .replace(new RegExp(escapeRegExp(from), 'g'), to)
    .replace(new RegExp(escapeRegExp(escapedNextUrl(from)), 'g'), to)
    .replace(new RegExp(escapeRegExp(encodedImageUrl(from)), 'g'), encodedImageUrl(to));
}

function nextImageUrl(image, width) {
  return `/_next/image?url=${encodedImageUrl(image)}&amp;w=${width}&amp;q=75`;
}

function nextImageSrcSet(image, widths = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]) {
  return widths.map((width) => `${nextImageUrl(image, width)} ${width}w`).join(', ');
}

function patchHeroImage(text, profile) {
  const preloadPattern = /(<link rel="preload" as="image" imageSrcSet=")([^"]+)(" imageSizes="100vw" fetchPriority="high"\/>)/;
  text = text.replace(preloadPattern, (_match, before, _srcSet, after) => {
    return `${before}${nextImageSrcSet(profile.hero, [640, 750, 828, 1080, 1200, 1920, 2048, 3840])}${after}`;
  });

  const htmlHeroPattern = new RegExp(`(<section class="relative min-h\\[56vh\\][\\s\\S]*?<img alt="${escapeRegExp(profile.name)}"[\\s\\S]*?srcSet=")([^"]+)("[\\s\\S]*?src=")([^"]+)`, 'g');
  text = text.replace(htmlHeroPattern, (_match, beforeSrcSet, _srcSet, beforeSrc, _src) => {
    return `${beforeSrcSet}${nextImageSrcSet(profile.hero, [640, 750, 828, 1080, 1200, 1920, 2048, 3840])}${beforeSrc}${nextImageUrl(profile.hero, 3840)}`;
  });

  if (profile.oldHero) {
    text = replaceImageUrl(text, profile.oldHero, profile.hero);
  }

  return text;
}

function patchPage(template, place) {
  const profile = photoProfileFor(place.slug);
  const replacements = [
    [templateSlug, place.slug],
    ['Buena Vista Park', place.name],
    ['A simple riverfront park with benches, boat activity, and a slower local rhythm.', place.description],
    ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80', place.featuredImage],
    [escapedNextUrl('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'), place.featuredImage],
    [encodedImageUrl('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'), encodedImageUrl(place.featuredImage)],
    ['Small public parking areas nearby.', place.parking],
    ['Golden hour facing the water.', place.bestTime],
    ['Use benches and railings as foreground anchors.', place.photoTip],
    ['29.033,-80.9132', `${place.latitude},${place.longitude}`],
    ['29.0330', place.latitude.toFixed(4)],
    ['-80.9132', place.longitude.toFixed(4)],
    ['30-60 min', place.duration],
    ['170', `${place.id * 10}`],
    ['171', `${place.id * 10 + 1}`],
    ['172', `${place.id * 10 + 2}`],
    ['173', `${place.id * 10 + 3}`],
    ['174', `${place.id * 10 + 4}`],
  ];

  let output = template;
  for (const [from, to] of replacements) {
    output = output.replace(new RegExp(escapeRegExp(from), 'g'), to);
  }
  for (const [index, image] of profile.gallery.entries()) {
    const templateImage = templateGalleryImages[index];
    output = replaceImageUrl(output, templateImage, image);
  }
  return output;
}

function patchExistingDestinationPage(slug) {
  const profile = photoProfileFor(slug);
  if (!profile) return;

  for (const extension of ['html', 'rsc']) {
    const filePath = path.join(destinationDir, `${slug}.${extension}`);
    if (!fs.existsSync(filePath)) continue;

    let text = fs.readFileSync(filePath, 'utf8');

    for (const [index, image] of profile.gallery.entries()) {
      text = replaceImageUrl(text, templateGalleryImages[index], image);
    }
    text = patchHeroImage(text, profile);

    fs.writeFileSync(filePath, text);
  }
}

function patchRenderedListingImages(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, 'utf8');

  text = text.replace(/(\\\"src\\\":\\\"\/photos\/[^"]+)(",\\\"alt\\\")/g, '$1\\$2');

  for (const profile of photoProfiles) {
    const jsonDataPattern = new RegExp(`("name":${escapeRegExp(JSON.stringify(profile.name))},"slug":${escapeRegExp(JSON.stringify(profile.slug))}[\\s\\S]*?"featuredImage":")([^"]+)(")`, 'g');
    text = text.replace(jsonDataPattern, (_match, prefix, _image, suffix) => `${prefix}${profile.hero}${suffix}`);

    const escapedJsonDataPattern = new RegExp(`(\\\\"name\\\\":\\\\"${escapeRegExp(profile.name)}\\\\",\\\\"slug\\\\":\\\\"${escapeRegExp(profile.slug)}\\\\"[\\s\\S]*?\\\\"featuredImage\\\\":\\\\")([^"]+)(\\\\")`, 'g');
    text = text.replace(escapedJsonDataPattern, (_match, prefix, _image, suffix) => `${prefix}${profile.hero}${suffix}`);

    const htmlCardPattern = new RegExp(`(<a class="group grid[^"]*" href="/destination/${escapeRegExp(profile.slug)}"[\\s\\S]*?<img[^>]+srcSet=")([^"]+)("[^>]+src=")([^"]+)`, 'g');
    text = text.replace(htmlCardPattern, (_match, beforeSrcSet, _srcSet, beforeSrc, _src) => {
      const imageUrl = nextImageUrl(profile.hero, 3840);
      const srcSet = nextImageSrcSet(profile.hero);
      return `${beforeSrcSet}${srcSet}${beforeSrc}${imageUrl}`;
    });

    const rscCardPattern = new RegExp(`("href":"/destination/${escapeRegExp(profile.slug)}"[\\s\\S]{0,1600}?"src":")([^"]+)`, 'g');
    text = text.replace(rscCardPattern, (_match, prefix) => `${prefix}${profile.hero}`);

    const escapedRscCardPattern = new RegExp(`(\\\\"href\\\\":\\\\"/destination/${escapeRegExp(profile.slug)}\\\\"[\\s\\S]{0,1600}?\\\\"src\\\\":\\\\")([^"]+?)(\\\\")`, 'g');
    text = text.replace(escapedRscCardPattern, (_match, prefix, _image, suffix) => `${prefix}${profile.hero}${suffix}`);
  }

  fs.writeFileSync(filePath, text);
}

function createStaticPages() {
  const htmlTemplate = fs.readFileSync(path.join(destinationDir, `${templateSlug}.html`), 'utf8');
  const rscTemplate = fs.readFileSync(path.join(destinationDir, `${templateSlug}.rsc`), 'utf8');
  const metaTemplate = fs.readFileSync(path.join(destinationDir, `${templateSlug}.meta`), 'utf8');

  for (const place of places) {
    fs.writeFileSync(path.join(destinationDir, `${place.slug}.html`), patchPage(htmlTemplate, place));
    fs.writeFileSync(path.join(destinationDir, `${place.slug}.rsc`), patchPage(rscTemplate, place));
    fs.writeFileSync(path.join(destinationDir, `${place.slug}.meta`), patchPage(metaTemplate, place));
  }
}

function patchPrerenderManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const base = manifest.routes[`/destination/${templateSlug}`];
  for (const place of places) {
    manifest.routes[`/destination/${place.slug}`] = {
      ...base,
      dataRoute: `/destination/${place.slug}.rsc`,
    };
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest));
}

patchDestinationArray(chunkPath);
patchDestinationArray(staticExploreChunkPath);
createStaticPages();
for (const profile of photoProfiles) {
  patchExistingDestinationPage(profile.slug);
}
for (const file of ['index', 'destinations', 'explore', 'map']) {
  patchRenderedListingImages(path.join(appRoot, `${file}.html`));
  patchRenderedListingImages(path.join(appRoot, `${file}.rsc`));
}
patchPrerenderManifest();

console.log(`Added ${places.length} place profiles: ${places.map((place) => place.slug).join(', ')}`);
