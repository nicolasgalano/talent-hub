import React, { FC, Fragment, useRef } from 'react'

// Files
import detailData from '../../data/single.json';
import '../../assets/scss/base/form.scss';
import './ProfessionalDetail.scss';
import { namespaces } from '../../i18n/i18n.constants';
import { useTranslation } from 'react-i18next';

// Semantic component
import { Button } from 'semantic-ui-react';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleProfile, { SingleProfileType } from '../../components/common/Single/SingleProfile';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import TextField from '../../components/common/TextField/TextField';
import { useHistory } from 'react-router';

const ProfessionalDetail: FC = () => {

  const {t} = useTranslation();
  const history = useHistory();

  // TODO: Only for testing porpuse
  // we get the name of the URL to use in the title of About
  let path: string | string[] = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];
  
  let doc: SingleProfileType = null;

  switch (path) {
    case 'withphoto':
      doc = detailData.candidate_with_photo
      break;
    case 'withoutphoto':
      doc = detailData.candidate_without_photo
      break;
    case 'withgallery':
      doc = detailData.candidate_with_gallery
      break;
    default:
      doc = detailData.candidate_with_photo
      break;
  }

  const modalRef = useRef<ModalHandle>(null);

  const handleClick = () => modalRef.current.openModal();

  const handleSubmit = () => history.push('/professional/success');

  // TODO: END Only for testing porpuse

  return (
    <Fragment>
      <Detail btnText="Contact" onClickAction={handleClick}>
        <SingleProfile data={doc} />
      </Detail>
      <Modal theme="light" ref={modalRef} className="modal-profile-details">
        <ModalHeader>
          Contact Florencia Daniele
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