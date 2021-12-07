import React, { FC } from 'react'

// Files
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// Custom component
import Success from '../../components/common/Success/Success';

const OpeningCreateSuccess: FC = () => {
  const {t} = useTranslation(namespaces.pages.success);
  return (
    <Success 
      title={t('openingcreate.title')}
      description={t('openingcreate.description')}
      btnText={t('openingcreate.button')}
      to="../"
      />
  )
}
export default OpeningCreateSuccess;