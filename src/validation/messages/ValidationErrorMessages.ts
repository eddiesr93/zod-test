export const ValidationErrorMessages = {
  required: 'Acest câmp este obligatoriu.',

  fileFormat: 'Formatul fișierului nu este permis.',

  fileSize: (value: string | number) => `Dimensiunea documentului depășește valoarea maximă acceptată de ${value} MB.`,
  multipleFileSize: (value: string | number) =>
    `Suma dimensiunii documentelor depășește valoarea maximă acceptată de ${value} MB.`,

  numbersOnly: 'Acest câmp trebuie să conțină doar valori numerice.',

  cnp: (value: string | number) => `'${value}' nu este un CNP valid.`,
  phone: (value: string | number) => `'${value}' nu este un număr de telefon valid.`,
  cui: (value: string | number) => `'${value}' nu este un CUI valid.`,
  email: (value: string | number) => `'${value}' nu este un email valid.`,
  date: (value: string | number) => `'${value}' nu este o dată validă.`,
  url: (value: string | number) => `'${value}' nu este un URL valid.`,
  iban: (value: string | number) => `'${value}' nu este un IBAN valid.`,
  swift: (value: string | number) => `'${value}' nu este un SWIFT valid.`,
  codSmis: (value: string | number) => `'${value}' nu este un cod SMIS valid.`,
  percentage: (value: string | number) => `'${value}' nu este un procent valid.`,
  alphaNumeric: (value: string | number) => `'${value}' nu este un text alfanumeric valid.`,
};
