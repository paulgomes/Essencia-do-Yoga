import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';

export default defineConfig({
  site: 'https://essenciadoyoga.com.br',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => [
        'https://essenciadoyoga.com.br/',
        'https://essenciadoyoga.com.br/yoga-kids-sorocaba',
        'https://essenciadoyoga.com.br/politica-de-privacidade',
      ].includes(page),
      serialize(item) {
        const lastmod = new Date().toISOString();
        if (item.url === 'https://essenciadoyoga.com.br/') {
          return { ...item, changefreq: 'monthly', priority: 1.0, lastmod };
        }
        if (item.url === 'https://essenciadoyoga.com.br/yoga-kids-sorocaba') {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod };
        }
        return { ...item, changefreq: 'yearly', priority: 0.3, lastmod };
      },
    }),
    critters({
      // Inline CSS crítico (above-the-fold) e carrega resto async
      Critters: {
        preload: 'swap',
        pruneSource: false,
        compress: false,
        inlineFonts: false,
      },
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  build: {
    // Inline TODOS os stylesheets de componentes (elimina waterfall de 3 CSS files)
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
