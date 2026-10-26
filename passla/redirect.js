// The share page: every link the app shares lands here with ?ct=<where it was
// shared from>. Once the listing exists (web/config.js, written by
// `npm run store:urls`), forward to it with Apple's campaign token and the
// provider token Apple needs to attribute it. Until then, stay on the page.
(function () {
  var config = window.PASSLA_CONFIG || {};
  if (!/^\d+$/.test(config.appStoreId || '')) return;

  var campaign = (new URLSearchParams(window.location.search).get('ct') || '')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 40);

  var url = 'https://apps.apple.com/app/id' + config.appStoreId + '?mt=8';
  if (config.providerToken) url += '&pt=' + encodeURIComponent(config.providerToken);
  if (campaign) url += '&ct=' + encodeURIComponent(campaign);
  window.location.replace(url);
})();
