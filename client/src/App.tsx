import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const router = createRouter({
    routeTree,
    context: {
        queryClient: queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    router={router}
                    context={{
                        queryClient: queryClient,
                    }}
                />
            </QueryClientProvider>
        </>
    )
}

export default App
