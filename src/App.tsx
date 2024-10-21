import Formular from './Formular.tsx';
import { initValidation } from './validation';
import i18next from 'i18next';
import { locales } from './validation/messages/locales.ts';

i18next.init({
  lng: 'ro',
  resources: {
    ro: {
      zod: locales,
    },
  },
});

function App() {
  initValidation();

  return <Formular />;
}

export default App;
