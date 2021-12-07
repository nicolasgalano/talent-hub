import React, { FC } from 'react'

// Files
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// Custom component
import Success from '../../components/common/Success/Success';

const ProfessionalContactSuccess: FC = () => {
  const {t} = useTranslation(namespaces.pages.success);

  return (
    <Success 
      title={t('openingcontact.title')}
      description={t('openingcontact.description')}
      btnText={t('openingcontact.button')}
      to="/"
      />
  )
}
export default ProfessionalContactSuccess;