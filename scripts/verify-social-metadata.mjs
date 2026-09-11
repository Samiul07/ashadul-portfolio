const siteOrigin = process.env.SITE_ORIGIN ?? "https://www.ashadul.design";
const bareOrigin = siteOrigin.replace("://www.", "://");
const paths = ["/", "/portfolio", "/blog", "/contact"];
const crawlerHeaders = {
  "user-agent":
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
};

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return match?.[1] ?? null;
}

function meta(html, property) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find(
    (candidate) =>
      attribute(candidate, "property") === property ||
      attribute(candidate, "name") === property,
  );
  return tag ? attribute(tag, "content") : null;
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => attribute(candidate, "rel") === "canonical");
  return tag ? attribute(tag, "href") : null;
}

async function verify(path) {
  const url = path === "/" ? siteOrigin : new URL(path, siteOrigin).toString();
  const response = await fetch(url, { headers: crawlerHeaders, redirect: "manual" });

  if (response.status !== 200) {
    throw new Error(`${url} returned ${response.status}, expected 200`);
  }

  const html = await response.text();
  const required = ["og:title", "og:description", "og:image", "twitter:card"];

  for (const name of required) {
    if (!meta(html, name)) throw new Error(`${url} is missing ${name}`);
  }

  if (meta(html, "og:url") !== url) {
    throw new Error(`${url} has an incorrect og:url`);
  }

  if (canonical(html) !== url) {
    throw new Error(`${url} has an incorrect canonical URL`);
  }

  const imageUrl = meta(html, "og:image");
  if (!imageUrl?.startsWith(siteOrigin)) {
    throw new Error(`${url} does not use the canonical-host social image`);
  }

  const imageResponse = await fetch(imageUrl, {
    headers: crawlerHeaders,
    redirect: "manual",
  });

  if (imageResponse.status !== 200) {
    throw new Error(`${imageUrl} returned ${imageResponse.status}, expected 200`);
  }

  if (!imageResponse.headers.get("content-type")?.startsWith("image/")) {
    throw new Error(`${imageUrl} did not return an image content type`);
  }

  console.log(`✓ ${url}`);
}

async function verifyBareDomainRedirect(path) {
  const bareUrl = new URL(path, bareOrigin);
  const response = await fetch(bareUrl, {
    headers: crawlerHeaders,
    redirect: "manual",
  });
  const location = response.headers.get("location");

  if (![301, 302, 307, 308].includes(response.status) || !location) {
    throw new Error(`${bareUrl} does not redirect to the canonical host`);
  }

  const destination = new URL(location, bareUrl);
  if (destination.origin !== siteOrigin || destination.pathname !== bareUrl.pathname) {
    throw new Error(`${bareUrl} redirects to an unexpected destination`);
  }

  console.log(`✓ ${bareUrl} → ${destination}`);
}

for (const path of paths) {
  await verify(path);
  await verifyBareDomainRedirect(path);
}
