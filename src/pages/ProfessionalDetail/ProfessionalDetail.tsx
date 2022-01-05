import React, { FC, Fragment, useEffect, useRef, useState } from 'react'

// hooks
import { useHistory, useParams } from 'react-router';
import useApi from '../../components/hooks/useApi';
import { useTranslation } from 'react-i18next';

// Files
import '../../assets/scss/base/form.scss';
import './ProfessionalDetail.scss';
import { namespaces } from '../../i18n/i18n.constants';
import { formatProfessionalDetails, generateURL } from '../../utils/formatData';

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

  const [formData, setFormData] = useState(null);

  const {response, loading, error} = useApi({
    url: `/professionals?Slug=${slug}`,
    method: 'GET'
  });

  useEffect(() => {
    response && setData(formatProfessionalDetails(response.data));
  }, [response])

  const modalRef = useRef<ModalHandle>(null);

  const handleClick = () => modalRef.current.openModal();

  const { 
    response: responseSubmit, 
    loading: loadingSubmit, 
    error: errorSubmit,
    sendData } = useApi({
      url: '/contacts',
      method: 'POST',
      data: JSON.stringify(formData),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get form data
    const contactData = new FormData(e.target);
    const inputs = Object.fromEntries(contactData.entries());

    // Get values
    let name = inputs.name_and_surname;
    let email = inputs.email;
    let company = inputs.company_or_project_name;
    let message = inputs.message;
    
    // Validate if not empty
    if(name === '') return;
    if(email === '') return;
    if(company === '') return;
    if(message === '') return;

    // contactData.append('Fullname', name);
    // contactData.append('Email', email);
    // contactData.append('Company', company);
    // contactData.append('Message', message);

    let contact = {
      Fullname: name,
      Email: email,
      Company: company,
      Message: message
    }

    setFormData(contact);
  };

  useEffect(() => {
    // launch when setState is ready when handleSubmit was executed
    formData !== null && sendData();
  }, [formData])

  useEffect(() => {
    if(responseSubmit){
      if(responseSubmit.status === 200){
        history.push(`/professional/${slug}/success`);
      }
    }
  }, [responseSubmit]);

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
        <form onSubmit={handleSubmit}>
          <ModalBody>
              <div className="custom-form">
                <div className="row">
                  <div className="col">
                    {/* Input Name and surname */}
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.name-and-surname", {ns: namespaces.common})}
                      htmlFor="name_and_surname"
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
                      htmlFor="company_or_project_name"
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
              loading={loadingSubmit}
              primary >
                {t("buttons.send", {ns: namespaces.common})}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  )
}
export default ProfessionalDetail;