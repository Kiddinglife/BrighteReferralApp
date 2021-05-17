import { getByText, render, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';

describe('ReferralTable', () => {
  it('should render correctly', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <RegisterForm handleSubmit={() => {}} />
      </BrowserRouter>
    );
    await waitFor(() => getByText(baseElement as HTMLElement, 'Create'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Cancel'));
  });
});
