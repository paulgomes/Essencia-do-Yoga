import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';

export default defineConfig({
  site: 'https://essenciadoyoga.com.br',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) =>
        page === 'https://essenciadoyoga.com.br/' ||
        page === 'https://essenciadoyoga.com.br/politica-de-privacidade',
      serialize(item) {
        const isHome = item.url === 'https://essenciadoyoga.com.br/';
        return {
          ...item,
          changefreq: isHome ? 'monthly' : 'yearly',
          priority: isHome ? 1.0 : 0.3,
          lastmod: new Date().toISOString(),
        };
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
