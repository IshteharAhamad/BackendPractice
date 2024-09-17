import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api/":"http://localhost:8000",
    },
  },
  plugins: [react()],
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         // rewrite: (path) => path.replace(/^\/api/, ''),
//         onError: (err, req, res) => {
//           console.error('Proxy Error:', err);
//           res.writeHead(500, {
//             'Content-Type': 'text/plain',
//           });
//           res.end('Proxy error occurred.');
//         },
//       },
//     },
//   },
//   plugins: [react()],
// });
