import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			{/* <TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/> */}
		</>
	),
});
