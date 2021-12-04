import React, { FC } from 'react'

// Files
import { useTranslation } from 'react-i18next';
import { openings2 } from '../../assets/illustrations'
import { namespaces } from '../../i18n/i18n.constants';

// Custom component
import HeroPost from '../../components/common/HeroPost/HeroPost'

const JobDetailsContact:FC = () => {
const { t } = useTranslation([namespaces.pages.postajob, namespaces.common]);

  return (
    <div id="job-details-contact">
      <HeroPost
        imgSrc={openings2}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        />
    </div>
  )
}

export default JobDetailsContact
