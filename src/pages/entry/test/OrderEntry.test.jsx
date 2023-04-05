import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles errors for scoops and toppings routes', async () => {
	server.restoreHandlers(
		rest.get('htttp://localhost:3030/scoops', (req, res, ctx) => {
			res(ctx.status(500));
		}),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
			res(ctx.status(500));
		})
	);

	render(<OrderEntry />);

	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert');

		expect(alerts).toHaveLength(2);
	});
});

// Note: If you want to skip a test the you can call .only on the test which would exclude the rest of the tests
// in the file.
// Alternatively, you can use .skip on any tests that you don't want to run
// test('Not a real test', () => {});
