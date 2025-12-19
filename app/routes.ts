// import { type RouteConfig, route, index } from "@react-router/dev/routes";

// export default [
//     index('routes/admin/dashboard.tsx')
// ] satisfies RouteConfig;

import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
    layout("routes/admin/admin-layout.tsx",
        [
            route('dashboard', 'routes/admin/dashboard.tsx'),
            route('all-users', 'routes/admin/all-users.tsx')
        ])
] satisfies RouteConfig;