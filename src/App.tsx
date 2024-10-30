import Formular from './Formular.tsx';
import i18next from 'i18next';
import { locales } from './validation/messages/locales.ts';
import { initValidation } from './validation';

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
