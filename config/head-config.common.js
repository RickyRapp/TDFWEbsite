/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    // /** <link> tags for favicons **/
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'assets/img/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'assets/img/favicon/favicon-16x16.png' },

    // /** <link> tags for a Web App Manifest **/
    { rel: 'manifest', href: 'assets/img/favicon/site.webmanifest' },
    { rel: 'mask-icon', href: 'assets/img/favicon/safari-pinned-tab.svg', color: '#005bff' },
    { rel: 'stylesheet', href: 'https://use.typekit.net/zxh7dpc.css' }, /* Sofia Pro */
    { rel: 'stylesheet', href: 'https://use.typekit.net/yub1uam.css' } /* Adobe Castlon Pro */
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1'},
    { name: 'msapplication-TileColor', content: '#ffffff' },
    { name: 'msapplication-config', content: 'assets/img/favicon/browserconfig.xml' },
    { name: 'theme-color', content: '#223a5e' }
  ],
  script: [
    // { src: 'assets/js/modernizr.custom.min.js' }
  ]
};
