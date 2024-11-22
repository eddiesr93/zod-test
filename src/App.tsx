import i18next from 'i18next';
import { locales } from './validation/messages/locales.ts';
import { initValidation } from './validation';
import RegistrationForm from './RegistrationForm.tsx';
import { useEffect } from 'react';

i18next.init({
  lng: 'ro',
  resources: {
    ro: {
      zod: locales,
    },
  },
});

function App() {
  useEffect(() => {
    initValidation();
  }, []);

  return <RegistrationForm />;
}

export default App;
