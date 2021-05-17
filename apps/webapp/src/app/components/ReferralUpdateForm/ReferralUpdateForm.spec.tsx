import { getByText, render, waitFor } from '@testing-library/react';
import ReferralUpdateForm from './ReferralUpdateForm';
import { BrowserRouter } from 'react-router-dom';

describe('ReferralTable', () => {
  it('should render correctly', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ReferralUpdateForm
          handleSubmit={() => {}}
          currReferral={{
            email: 'your.name@gmail.com',
            givenName: 'Awesome',
            phone: '0456234345',
            surName: 'Dev',
          }}
        />
      </BrowserRouter>
    );
    await waitFor(() => getByText(baseElement as HTMLElement, 'Update'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Cancel'));
  });
});
