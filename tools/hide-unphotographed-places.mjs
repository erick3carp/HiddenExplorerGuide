import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appRoot = path.join(root, '.next', 'server', 'app');
const landingHero = '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg';
const oldLandingHero = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85';

const visibleSlugs = new Set([
  'canal-street-historic-district',
  'flagler-avenue-beach-approach',
  'old-fort-park',
  'riverside-park',
  'norwoods-treehouse',
  'sugar-mill-ruins',
  'third-wave-cafe',
  'grayce-k-barck-north-beach-community-park',
  'emory-l-bennett-park',
]);

const hiddenSlugs = [
  'smyrna-dunes-park',
  'mary-mcleod-bethune-beach-park',
  'jbs-fish-camp',
  'indian-river-lagoon-park',
  'the-garlic',
  '27th-avenue-beachfront-park',
  'esther-street-beachfront-park',
  'buena-vista-park',
  'turtle-mound',
];

const filesToPatch = [
  path.join(root, '.next', 'server', 'chunks', '488.js'),
  path.join(root, '.next', 'static', 'chunks', 'app', 'explore', 'page-6a6ed5a3c05e8d44.js'),
  ...['index', 'destinations', 'explore', 'map'].flatMap((page) => [
    path.join(appRoot, `${page}.html`),
    path.join(appRoot, `${page}.rsc`),
  ]),
];

const missingRenderedPlaces = [
  {
    name: 'Grayce K. Barck North Beach Community Park',
    slug: 'grayce-k-barck-north-beach-community-park',
    category: 'Park',
    description: 'A quiet north beach community park for shaded breaks, neighborhood walks, and easy coastal photos.',
    duration: '30-60 min',
    bestTime: 'Early morning or late afternoon for softer light and a quieter visit.',
    latitude: '29.0550',
    longitude: '-80.9070',
    image: '/photos/grayce-kenemer-barck-north-brach/hero-beach.jpg',
  },
  {
    name: 'Emory L. Bennett Park',
    slug: 'emory-l-bennett-park',
    category: 'Park',
    description: 'A neighborhood park stop with open green space, simple facilities, and a relaxed local pace.',
    duration: '30-60 min',
    bestTime: 'Morning shade or golden hour when the park feels calmest.',
    latitude: '29.0190',
    longitude: '-80.9270',
    image: '/photos/emory-l-bennett-park/hero-emory.jpg',
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeArrays(text) {
  let next = text;
  for (let index = 0; index < 8; index += 1) {
    next = next
      .replace(/\[,/g, '[')
      .replace(/,,/g, ',')
      .replace(/,\]/g, ']')
      .replace(/,\}/g, '}')
      .replace(/,\)/g, ')');
  }
  return next;
}

function removeDestinationObject(text, slug) {
  const slugPattern = escapeRegExp(slug);
  const patterns = [
    new RegExp(`,?\\{id:\\d+,name:"[^"]+",slug:"${slugPattern}"[\\s\\S]*?duration:"[^"]+"\\}`, 'g'),
    new RegExp(`,?\\{"id":\\d+,"name":"[^"]+","slug":"${slugPattern}"[\\s\\S]*?"duration":"[^"]+"\\}`, 'g'),
    new RegExp(`,?\\\\\\{"id":\\d+,\\\\?"name\\\\?":\\\\?"[^"]+\\\\?",\\\\?"slug\\\\?":\\\\?"${slugPattern}\\\\?"[\\s\\S]*?\\\\?"duration\\\\?":\\\\?"[^"]+\\\\?"\\\\\\}`, 'g'),
  ];

  let output = text;
  for (const pattern of patterns) {
    output = output.replace(pattern, '');
  }
  return normalizeArrays(output);
}

function removeRenderedCards(text, slug) {
  const slugPattern = escapeRegExp(slug);
  return text.replace(
    new RegExp(`<a class="group grid[^"]*" href="/destination/${slugPattern}"[\\s\\S]*?</a>`, 'g'),
    '',
  );
}

function injectHideStyle(text) {
  if (!text.includes('<head>') || text.includes('data-photo-ready-filter')) return text;

  const selectors = hiddenSlugs.map((slug) => `a[href="/destination/${slug}"]`).join(',');
  const style = `<style data-photo-ready-filter>${selectors}{display:none!important}</style>`;
  return text.replace('<head>', `<head>${style}`);
}

function patchCounts(text) {
  return text
    .replace(/(">|\\"children\\":\\")16(<|\\")/g, '$19$2')
    .replace(/(">|\\"children\\":\\")80\+(<|\\")/g, '$145$2')
    .replace(/16 locations found/g, '9 locations found')
    .replace(/7 locations found/g, '9 locations found');
}

function patchLandingHero(text) {
  const encodedOld = encodeURIComponent(oldLandingHero);
  const encodedNew = encodeURIComponent(landingHero);
  const escapedOld = oldLandingHero.replaceAll('&', '\\u0026');

  return text
    .replace(new RegExp(escapeRegExp(oldLandingHero), 'g'), landingHero)
    .replace(new RegExp(escapeRegExp(escapedOld), 'g'), landingHero)
    .replace(new RegExp(escapeRegExp(encodedOld), 'g'), encodedNew);
}

function enhancementScript() {
  const payload = JSON.stringify({ hiddenSlugs, places: missingRenderedPlaces });
  return `<script data-photo-ready-enhancer>
(() => {
  const data = ${payload};
  const categoryClass = 'inline-flex rounded px-2.5 py-1 text-xs font-semibold bg-palm/10 text-palm';
  const cardHtml = (place) => '<a class="group grid overflow-hidden rounded border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft" href="/destination/' + place.slug + '">' +
    '<div class="relative aspect-[4/3] overflow-hidden"><img alt="' + place.name + '" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" src="' + place.image + '"></div>' +
    '<div class="grid gap-3 p-4"><div class="flex items-start justify-between gap-3"><h3 class="text-lg font-semibold leading-tight">' + place.name + '</h3><span class="' + categoryClass + '">' + place.category + '</span></div>' +
    '<p class="line-clamp-2 text-sm leading-6 text-ink/70">' + place.description + '</p>' +
    '<div class="grid gap-2 text-sm text-ink/60"><span>New Smyrna Beach, FL</span><span>' + place.duration + '</span><span>' + place.bestTime + '</span></div></div></a>';
  const mapHtml = (place) => '<a class="grid gap-2 rounded border border-ink/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft" href="/destination/' + place.slug + '">' +
    '<span class="text-sm font-bold text-ink">' + place.name + '</span><span class="text-sm text-ink/60">' + place.latitude + ', ' + place.longitude + '</span><span class="text-sm text-coast">View profile</span></a>';
  const apply = () => {
    for (const slug of data.hiddenSlugs) {
      document.querySelectorAll('a[href="/destination/' + slug + '"]').forEach((item) => item.remove());
    }
    const path = location.pathname;
    const isMap = path === '/map';
    const target = isMap
      ? [...document.querySelectorAll('main .grid')].find((grid) => grid.querySelector('a[href^="/destination/"]'))
      : document.querySelector('main .grid.gap-5');
    if (!target) return;
    for (const place of data.places) {
      if (document.querySelector('a[href="/destination/' + place.slug + '"]')) continue;
      target.insertAdjacentHTML('beforeend', isMap ? mapHtml(place) : cardHtml(place));
    }
    document.querySelectorAll('span').forEach((span) => {
      if (/^\\d+ locations found$/.test(span.textContent.trim())) span.textContent = '9 locations found';
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  setTimeout(apply, 400);
  setTimeout(apply, 1200);
})();
</script>`;
}

function injectEnhancer(text) {
  if (!text.includes('</body>') || text.includes('data-photo-ready-enhancer')) return text;
  return text.replace('</body>', `${enhancementScript()}</body>`);
}

function removeEnhancer(text) {
  return text.replace(/<script data-photo-ready-enhancer>[\s\S]*?<\/script>/g, '');
}

function patchExploreClientComponent(text) {
  const marker = 'function S(e){let{destinations:t}=e,';
  if (!text.includes(marker)) return text;

  const payload = JSON.stringify(missingRenderedPlaces.map((place, index) => ({
    id: 21 + index,
    name: place.name,
    slug: place.slug,
    city: 'New Smyrna Beach',
    state: 'FL',
    category: place.category,
    description: place.description,
    latitude: Number(place.latitude),
    longitude: Number(place.longitude),
    featuredImage: place.image,
    parking: index === 0
      ? 'Neighborhood-style public parking nearby; confirm posted signs before leaving the car.'
      : 'Small public parking areas nearby; check posted access and park-hour signs.',
    bestTime: place.bestTime,
    photoTip: index === 0
      ? 'Frame palms, paths, and beachside textures to give the park a local, lived-in feel.'
      : 'Use trees, benches, and walking paths as simple foreground anchors.',
    duration: place.duration,
  })));
  const visible = JSON.stringify([...visibleSlugs]);
  const replacement = `function S(e){let{destinations:t}=e;t=[...t,...${payload}].filter((e,t,a)=>a.findIndex(t=>t.slug===e.slug)===t).filter(e=>${visible}.includes(e.slug));let `;

  return text.replace(marker, replacement);
}

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');

  if (filePath.endsWith('page-6a6ed5a3c05e8d44.js')) {
    text = patchExploreClientComponent(text);
  }

  for (const slug of hiddenSlugs) {
    text = removeDestinationObject(text, slug);
    text = removeRenderedCards(text, slug);
  }

  if (filePath.endsWith('.html')) {
    if (path.basename(filePath) === 'explore.html') {
      text = removeEnhancer(text);
    }
    text = injectHideStyle(text);
    if (path.basename(filePath) !== 'explore.html') {
      text = injectEnhancer(text);
    }
  }

  if (path.basename(filePath).startsWith('index.')) {
    text = patchLandingHero(text);
  }

  text = patchCounts(text);
  fs.writeFileSync(filePath, text);
}

for (const filePath of filesToPatch) {
  patchFile(filePath);
}

console.log(`Showing ${visibleSlugs.size} photo-ready places; hid ${hiddenSlugs.length} places without photos.`);
