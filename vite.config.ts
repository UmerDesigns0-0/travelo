import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";


export default defineConfig({
  plugins: [svgr(), tailwindcss(), reactRouter(), tsconfigPaths()],
});


// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
//   ssr: {
//     noExternal: ["/@syncfusion/"],
//   }
// });
