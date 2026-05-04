import react from '@astrojs/react';

export default {
  integrations: [react()],
  output: 'static',
  build: {
    format: 'directory'
  }
};
