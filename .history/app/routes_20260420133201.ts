import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
    layout("routes/root/root-layout.tsx", [
        // s
        route('sign-in', 'routes/root/sign-in.tsx'),
        route('auth-processing', 'routes/root/processing.tsx'),
        route('api/create-trip', 'routes/api/create-trip.ts'),

        layout("routes/admin/admin-layout.tsx", [
            index('routes/admin/dashboard.tsx'),
            route('dashboard', 'routes/admin/dashboard.tsx'),
            route('all-users', 'routes/admin/all-users.tsx'),
            route('trips', 'routes/admin/trips.tsx'),
            route('trips/create', 'routes/admin/CreateTrip.tsx'),
            route('trips/:tripId', 'routes/admin/TripDetails.tsx'),
        ])
    ])

] satisfies RouteConfig;