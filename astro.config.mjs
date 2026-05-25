import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://essenciadoyoga.com.br',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => page === 'https://essenciadoyoga.com.br/',
      serialize(item) {
        return {
          ...item,
          changefreq: 'monthly',
          priority: 1.0,
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
