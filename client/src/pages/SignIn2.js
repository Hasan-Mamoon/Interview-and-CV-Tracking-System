import * as React from 'react';
import { SignInPage } from '@toolpad/core/SignInPage';
import axios from 'axios';


// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signIn = async (provider, formData) => {
    try {
      const response = await fetch('http://localhost:3070/auth/mentor/signin', {
        email: formData.get('email'),
        password: formData.get('password'),
      });
      alert(`Signed in successfully with "${provider.name}"`);
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please check your credentials and try again.');
      throw error;
    }
  };

export default function CredentialsSignInPage() {

  return (
    // preview-start

      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />

    // preview-end
  );
}
