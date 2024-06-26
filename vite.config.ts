import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        root: './src',
        base: '',
        plugins: [tsconfigPaths(), reactRefresh()],
    });
};
