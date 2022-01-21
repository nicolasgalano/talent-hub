import React, { FC, useRef, useState } from 'react'

// Files & Libraries
import { useHistory, useLocation, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import '../../assets/scss/base/form.scss';
import './OpeningApply.scss';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { ErrorFocus } from '../../utils/ErrorFocus';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Custom component
import HeroPost from '../../components/common/HeroPost/HeroPost'
import Typography from '../../components/common/Typography/Typography';
import TextField from '../../components/common/TextField/TextField';
import Label from "../../components/common/Label/Label";
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import SingleProfile, { SingleProfileType } from '../../components/common/Single/SingleProfile';
import TextFieldNew from '../../components/common/TextField/TextFieldNew';

interface LocationProps {
  positionOffered: string;
}

interface FormInterface {
  Fullname: string;
  Profession: string;
  Introduction: string;
  Email: string;
  Linkedin: string;
  OnlinePortfolio: string;
  CV: string;
  Portfolio: string;
  ProfilePicture: string;
  BestWork: Array<string>;
  Preview: boolean;
}

const OpeningApply:FC = () => {
  const { t } = useTranslation([namespaces.pages.openingcontact, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const [applicants, setApplicants] = useState<SingleProfileType>(null)
  const modalRef = useRef<ModalHandle>(null);
  const history = useHistory();
  // Get data that was send on params
  const { state } : { state: LocationProps } = useLocation();
  // Get slug profile
  const { slug }: { slug: string } = useParams();

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleSubmit = () => history.push('/job/contact/success');

  const handlePreview = (doc: FormInterface) => {
    const dataFormated: SingleProfileType = {
      company_project_candidate: doc.Fullname,
      profession_job_name: doc.Profession,
      introduction: doc.Introduction,
      email: doc.Email,
      portfolio: doc.Portfolio,
      linkedin: doc.Linkedin,
      gallery: doc.BestWork,
      image: doc.ProfilePicture,
    }

    console.log('handlePreview:', dataFormated);

    setApplicants(dataFormated);
    handleOpenModal();
  };

  const initialValues: FormInterface = {
    Fullname: '',
    Profession: '',
    Introduction: '',
    Email: '',
    Linkedin: '',
    OnlinePortfolio: '',
    CV: '',
    Portfolio: '',
    ProfilePicture: '',
    BestWork: [],
    Preview: false,
  }

  const formSchema = Yup.object().shape({
    Fullname: Yup.string()
      .required(t("general.name-and-surname", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Profession: Yup.string()
      .required(t("general.profession", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Introduction: Yup.string()
      .required(t("general.introduction", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Email: Yup.string()
      .email(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.invalid-email", {ns: namespaces.common}))
      .required(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Linkedin: Yup.string(),
    OnlinePortfolio: Yup.string(),
  });

  return (
    <div className="custom-form" id="job-details-contact">
      <HeroPost
        title={ t("hero.title") + ' ' + state.positionOffered }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        buttonLink={`/job/${slug}`}
        />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          if(values.Preview){
            handlePreview(values);
            console.log('onSubmit:', values);
          }else{
            // TODO: handle submit
            console.log(JSON.stringify(values, null, 2));
          }
          // prevent submit
          actions.setSubmitting(false);
        }}>
        {(formik) => 
          <Form>
            <div className="ui container">
              {/* Title */}
              <Typography element="p" variant="body-s" className="label-required">*{t("general.required-information", {ns: namespaces.common})}</Typography>
              <div className="row">
                {/* First Col */}
                <div className="col">
                  {/* Input Name and surname */}
                  <div>
                    <TextFieldNew
                      element="input"
                      type="text"
                      label={t("general.name-and-surname", {ns: namespaces.common})}
                      name="Fullname"
                      id="Fullname"
                      required />
                  </div>
                  {/* Input profession */}
                  <div>
                    <TextFieldNew
                      element="input"
                      type="text"
                      label={t("general.profession", {ns: namespaces.common})}
                      name="Profession"
                      id="Profession"
                      required />
                  </div>
                  {/* Textarea introduction */}
                  <div>
                    <TextFieldNew 
                      element="textarea"
                      label={t("general.introduction", {ns: namespaces.common})}
                      name="Introduction"
                      id="Introduction"
                      required />
                  </div>
                  <div>
                    {/* Input Email */}
                    <TextFieldNew 
                      element="input"
                      type="email"
                      label={t("general.email", {ns: namespaces.common})}
                      name="Email"
                      id="Email"
                      required />
                  </div>
                  <div>
                    {/* Input linkedin */}
                    <TextFieldNew 
                      element="input"
                      label={t("general.linkedin", {ns: namespaces.common})}
                      name="Linkedin"
                      id="Linkedin" />
                  </div>
                  <div>
                    {/* Input Online portfolio */}
                    <TextFieldNew 
                      element="input"
                      label={t("general.online-portfolio", {ns: namespaces.common})}
                      name="OnlinePortfolio"
                      id="OnlinePortfolio" />
                  </div>
                </div>
                <div className="col uploads">
                  {/* Input cv */}
                  <div className="upload-box">
                    <Label type="form">{t("general.cv", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF, DOC</Typography>}
                    { updateFile && <File title="CV_DanieleFlorencia.pdf" className="file" /> }
                    { !updateFile && <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-cv", {ns: namespaces.common})}</Button>}
                  </div>
                  {/* Input portfolio */}
                  <div className="upload-box">
                    <Label type="form">{t("general.portfolio", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF</Typography>}
                    { updateFile && <File title="Portfolio_Daniele.pdf" className="file" /> }
                    { !updateFile && <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-portfolio", {ns: namespaces.common})}</Button>}
                  </div>
                  {/* Input picture */}
                  <div className="upload-box">
                    <Label type="form">{t("general.picture", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 100 x 100px</Typography>}
                    { updateFile && <File title="ProfilePicture.png" className="file" /> }
                    { !updateFile && <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-picture", {ns: namespaces.common})}</Button>}
                  </div>
                  {/* Input showcase */}
                  <div className="upload-box">
                    <Label type="form">{t("general.upload-showcase", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 736 x 408px</Typography>}
                    { updateFile && <File title="Picture1.jpg" className="file" /> }
                    { updateFile && <File title="Picture2.jpg" className="file" /> }
                    { updateFile && <File title="Picture3.jpg" className="file" /> }
                    { updateFile && <File title="Picture4.jpg" className="file" /> }
                    { updateFile && <File title="Picture5.jpg" className="file" /> }
                    { updateFile && <File title="Picture6.jpg" className="file" /> }
                    { !updateFile && <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-pictures", {ns: namespaces.common})}</Button>}
                  </div>
                </div>
              </div>
            </div>
            <div className="ui container">
              <div className="actions">
                <Button 
                  disabled={!formik.isValid}
                  type="submit"
                  primary 
                  onClick={() => handleSubmit()}>
                    {t("buttons.submit", {ns: namespaces.common})}
                </Button>
                <Button 
                  disabled={!formik.isValid}
                  type="button"
                  onClick={() => {
                    formik.setFieldValue('Preview', true)
                    formik.handleSubmit();
                  }}
                  secondary >
                    {t("buttons.preview", {ns: namespaces.common})}
                </Button>
              </div>
            </div>
            <ErrorFocus />
          </Form>
        }
      </Formik>
      <Modal theme="light" ref={modalRef}>
        <ModalHeader>{ t("hero.title") + ' ' + state.positionOffered }</ModalHeader>
        <ModalBody className="review-modal">
          <SingleProfile data={applicants} />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>{t("buttons.edit", {ns: namespaces.common})}</Button>
          <Button primary onClick={() => handleSubmit()}>{t("buttons.submit", {ns: namespaces.common})}</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default OpeningApply;
