import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('Checkbox functions correctly', () => {
	test('Checkbox is unchecked by default', () => {
		render(<SummaryForm />);

		const checkBox = screen.getByRole('checkbox', {
			name: 'I agree to Terms and Conditions',
		});
		expect(checkBox).not.toBeChecked();
	});

	test('Checking and unchecking checkbox enables and disables button', async () => {
		const user = userEvent.setup();

		render(<SummaryForm />);

		const checkBox = screen.getByRole('checkbox', {
			name: 'I agree to Terms and Conditions',
		});
		const button = screen.getByRole('button', { name: 'Confirm order' });

		expect(button).toBeDisabled();
		await user.click(checkBox);
		expect(button).toBeEnabled();

		await user.click(checkBox);
		expect(button).toBeDisabled();
	});
});

test('popover responds to hover', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);

	// popover starts out hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);

	expect(nullPopover).not.toBeInTheDocument();

	// popover appears on mouseover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await user.hover(termsAndConditions);
	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	// popover disappears when we mouse out
	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});
