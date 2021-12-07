import React, { FC } from 'react'

// Files
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// Custom component
import Success from '../../components/common/Success/Success';

const ProfessionalCreateSuccess: FC = () => {
  const {t} = useTranslation(namespaces.pages.success);

  return (
    <Success 
      title={t('professionalcreate.title')}
      description={t('professionalcreate.description')}
      btnText={t('professionalcreate.button')}
      to="/"
      />
  )
}
export default ProfessionalCreateSuccess;