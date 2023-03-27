import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('Checkbox functions correctly', () => {
	test('Checkbox is unchecked by default', () => {
		render(<SummaryForm />);

		const checkBox = screen.getByRole('checkbox', {
			name: 'I agree to Terms and Conditions',
		});
		expect(checkBox).not.toBeChecked();
	});

	test('Checking and unchecking checkbox enables and disables button', () => {
		render(<SummaryForm />);

		const checkBox = screen.getByRole('checkbox', {
			name: 'I agree to Terms and Conditions',
		});
		const button = screen.getByRole('button', { name: 'Confirm order' });

		expect(button).toBeDisabled();
		fireEvent.click(checkBox);
		expect(button).toBeEnabled();

		fireEvent.click(checkBox);
		expect(button).toBeDisabled();
	});
});
