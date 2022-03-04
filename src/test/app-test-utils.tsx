import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryConfig } from '../context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { JSXElementConstructor, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

type uiRTL = ReactElement<any, string | JSXElementConstructor<any>>;

function Wrapper(props: any) {
	const { children } = props;
	const queryClient = new QueryClient(queryConfig);

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<BrowserRouter>{children}</BrowserRouter>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

async function render(ui: uiRTL, { route = '/', ...renderOptions } = {}) {
	window.history.pushState({}, 'Test page', route);

	const returnValue = {
		...rtlRender(ui, {
			wrapper: Wrapper,
			...renderOptions,
		}),
	};

	return returnValue;
}

const waitForLoadingToFinish = () =>
	waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)], {
		timeout: 4000,
	});

export * from '@testing-library/react';
export { render, userEvent, waitForLoadingToFinish };
