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
        'https://essenciadoyoga.com.br/aulas-de-yoga-sorocaba',
        'https://essenciadoyoga.com.br/yoga-kids-sorocaba',
        'https://essenciadoyoga.com.br/yoga-sorocaba-santa-rosalia',
        'https://essenciadoyoga.com.br/yoga-sorocaba-campolim',
        'https://essenciadoyoga.com.br/politica-de-privacidade',
      ].includes(page),
      serialize(item) {
        const lastmod = new Date().toISOString();
        const priorities = {
          'https://essenciadoyoga.com.br/': 1.0,
          'https://essenciadoyoga.com.br/aulas-de-yoga-sorocaba': 0.9,
          'https://essenciadoyoga.com.br/yoga-kids-sorocaba': 0.9,
          'https://essenciadoyoga.com.br/yoga-sorocaba-santa-rosalia': 0.8,
          'https://essenciadoyoga.com.br/yoga-sorocaba-campolim': 0.8,
          'https://essenciadoyoga.com.br/politica-de-privacidade': 0.3,
        };
        const changefreqMap = {
          'https://essenciadoyoga.com.br/politica-de-privacidade': 'yearly',
        };
        return {
          ...item,
          changefreq: changefreqMap[item.url] || 'monthly',
          priority: priorities[item.url] ?? 0.5,
          lastmod,
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
