import React, { FC, Fragment, useEffect, useRef, useState } from 'react'

// hooks
import { useHistory, useParams } from 'react-router';
import useApi from '../../components/hooks/useApi';
import { useTranslation } from 'react-i18next';

// Files
import '../../assets/scss/base/form.scss';
import './ProfessionalDetail.scss';
import { namespaces } from '../../i18n/i18n.constants';
import { formatProfessionalDetails } from '../../utils/formatData';

// Semantic component
import { Button } from 'semantic-ui-react';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleProfile from '../../components/common/Single/SingleProfile';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import TextField from '../../components/common/TextField/TextField';


const ProfessionalDetail: FC = () => {

  const {t} = useTranslation();
  const history = useHistory();

  const { slug }: { slug: string } = useParams();
  const [data, setData] = useState(null);

  const {response, loading, error} = useApi({
    url: `/professionals?Slug=${slug}`,
    method: 'GET'
  });

  useEffect(() => {
    response && setData(formatProfessionalDetails(response.data));
  }, [response])

  const modalRef = useRef<ModalHandle>(null);

  const handleClick = () => modalRef.current.openModal();

  const handleSubmit = () => history.push('/professional/success');

  // TODO: END Only for testing porpuse

  return (
    <Fragment>
      { error && console.log(error)}
      {
        data !== null &&
          <Detail btnText="Contact" onClickAction={handleClick}>
            <SingleProfile data={data} />
          </Detail>
      }
      <Modal theme="light" ref={modalRef} className="modal-profile-details">
        <ModalHeader>
          Contact { data !== null && data.company_project_candidate }
        </ModalHeader>
        <ModalBody>
          <div className="custom-form">
            <div className="row">
              <div className="col">
                {/* Input Name and surname */}
                <TextField
                  element="input"
                  type="text"
                  label={t("general.name-and-surname", {ns: namespaces.common})}
                  htmlFor="name-and-surname"
                  required />
              </div>
              <div className="col">
              {/* Input Email */}
                <TextField 
                  element="input"
                  type="email"
                  label={t("general.email", {ns: namespaces.common})}
                  htmlFor="email"
                  required />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/* Input Company or project name */}
                <TextField 
                  element="input"
                  type="text"
                  label={t("general.company-or-project-name", {ns: namespaces.common})}
                  htmlFor="company-or-project-name"
                  required />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/* Textarea message */}
                <TextField 
                  element="textarea"
                  label={t("general.message", {ns: namespaces.common})}
                  htmlFor="message"
                  required />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            primary
            onClick={() => handleSubmit()} >
              {t("buttons.send", {ns: namespaces.common})}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
export default ProfessionalDetail;