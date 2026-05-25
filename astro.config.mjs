import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  ],
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
