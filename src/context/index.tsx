import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

export const queryConfig = {
	defaultOptions: {
		queries: {
			// useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry(failureCount: number, error: any) {
				if (failureCount < 2) return true;
				return false;
			},
		},
	},
};
const queryClient = new QueryClient(queryConfig);

export function AppProviders({ children }: PropsWithChildren<{}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<BrowserRouter>{children}</BrowserRouter>
			</RecoilRoot>
		</QueryClientProvider>
	);
}
