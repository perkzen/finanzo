import React, { useState } from 'react';
import { languages } from '../../i18next/languages';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    await i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <h2 className="leading-6 text-gray-500">{t('language')}</h2>
      <select
        value={language}
        onChange={handleChange}
        className={
          'outline outline-1 shadow-md px-2 py-2 mt-2 outline-neutral-800 rounded-lg w-full'
        }
      >
        {Object.keys(languages).map((language) => (
          <option key={language} value={language}>
            {languages[language]?.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
