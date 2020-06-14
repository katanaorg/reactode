let assetManifest;
if (process.env.NODE_ENV === 'production') {
  assetManifest = require('../build/asset-manifest.json');
} else {
  assetManifest = {
    'main.js': 'js/main.bundle.js',
    'main.css': 'css/main.css',
  };
}


export const indexHtml = ({ helmet, markup }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  const mainJS = assetManifest['main.js'];
  const mainCss = assetManifest['main.css'];

  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="prefetch" as="style" href="${mainCss}">
        ${helmet.link.toString()}
        <link rel="stylesheet" href="${mainCss}">
        ${helmet.style.toString()}
        ${helmet.noscript.toString()}
        ${helmet.script.toString()}
        
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>
        <script type="text/javascript" src=${mainJS} defer></script>
        <script>
          window.__ASSET_MANIFEST__ = ${JSON.stringify(assetManifest)}
        </script>
      </body>
    </html>
  `;
};
