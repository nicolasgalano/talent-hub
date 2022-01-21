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
import { Form, Formik } from 'formik';
import * as Yup from "yup";

// Semantic component
import { Button } from 'semantic-ui-react';

// Custom component
import Detail from '../../components/common/Detail/Detail'
import SingleProfile from '../../components/common/Single/SingleProfile';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import TextField from '../../components/common/TextField/TextField';

interface FormInterface {
  Fullname: string;
  Email: string;
  Company: string;
  Message: string;
}

const ProfessionalDetail: FC = () => {
  const {t} = useTranslation(namespaces.common);
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

  const formSchema = Yup.object().shape({
    Fullname: Yup.string()
      .required(t("general.name-and-surname") + ' ' + t("forms.required")),
    Email: Yup.string()
      .email(t("general.email") + ' ' + t("forms.invalid-email"))
      .required(t("general.email") + ' ' + t("forms.required")),
    Company: Yup.string()
      .required(t("general.company-or-project-name") + ' ' + t("forms.required")),
    Message: Yup.string()
      .required(t("general.message") + ' ' + t("forms.required")),
  
  });

  const initialValues: FormInterface = { 
    Fullname: '',
    Email: '',
    Company: '',
    Message: '',
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
          <Detail urlParent='/professionals/' btnText="Contact" onClickAction={handleClick}>
            <SingleProfile data={data} />
          </Detail>
      }
      <Modal theme="light" ref={modalRef} className="modal-profile-details">
        <ModalHeader>
          Contact { data !== null && data.company_project_candidate }
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            setFormData(values);
            // prevent submit
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <ModalBody>
              <div className="custom-form">
                <div className="row">
                  <div className="col">
                    {/* Input Name and surname */}
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.name-and-surname")}
                      id="Fullname"
                      name="Fullname"
                      required />
                  </div>
                  <div className="col">
                    {/* Input Email */}
                    <TextField
                      element="input"
                      type="email"
                      label={t("general.email")}
                      id="Email"
                      name="Email"
                      required />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* Input Company or project name */}
                    <TextField 
                      element="input"
                      type="text"
                      label={t("general.company-or-project-name")}
                      id="Company"
                      name="Company"
                      required />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* Textarea message */}
                    <TextField 
                      element="textarea"
                      label={t("general.message")}
                      id="Message"
                      name="Message"
                      required />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
            <Button 
              loading={loadingSubmit}
              primary >
                {t("buttons.send")}
            </Button>
          </ModalFooter>
          </Form>
        </Formik>
      </Modal>
    </Fragment>
  )
}
export default ProfessionalDetail;