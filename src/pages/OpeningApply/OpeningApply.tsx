import React, { FC, useEffect, useRef, useState } from 'react'

// Files & Libraries
import { useHistory, useLocation, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import '../../assets/scss/base/form.scss';
import './OpeningApply.scss';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { ErrorFocus } from '../../utils/ErrorFocus';
import ReCAPTCHA from "react-google-recaptcha";
import useApi from '../../components/hooks/useApi';
import validateReCaptcha from '../../utils/validateReCaptcha';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Custom component
import HeroPost from '../../components/common/HeroPost/HeroPost'
import Typography from '../../components/common/Typography/Typography';
import Label from "../../components/common/Label/Label";
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import SingleProfile, { SingleProfileType } from '../../components/common/Single/SingleProfile';
import TextField from '../../components/common/TextField/TextField';
import { formatOpeningDetails, filePreview } from '../../utils/formatData';
import FileButton from "../../components/common/FileButton/FileButton";

interface LocationProps {
  positionOffered: string;
  id: number;
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
  published_at: boolean;
  Job: number;
}

const OpeningApply:FC = () => {
  const { t } = useTranslation([namespaces.pages.openingcontact, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const [applicants, setApplicants] = useState<SingleProfileType>(null)
  const modalRef = useRef<ModalHandle>(null);
  const [formData, setFormData] = useState<FormInterface>(null);
  const [cvFileUpload, setCvFileUpload] = useState(null);
  const [portfolioFileUpload, setPortfolioFileUpload] = useState(null);
  const [profilePicFileUpload, setProfilePicFileUpload] = useState(null);
  const [showcaseFileUpload, setShowcaseFileUpload] = useState([]);
  const [title, setTitle] = useState<string>('');
  const [jobId, setJobId] = useState<number>(null);
  const reRef = useRef<ReCAPTCHA>();
  const history = useHistory();
  // Get data that was send on params
  const { state } : { state: LocationProps } = useLocation();
  // Get slug profile
  const { slug }: { slug: string } = useParams();

  const {response, loading, error} = useApi({
    url: `/jobs?Slug=${slug}`,
    method: 'GET'
  });

  const { 
    response: responseSubmit, 
    loading: loadingSubmit, 
    sendData, sendFormData } = useApi({
      url: '/applicants',
      method: 'POST',
      data: JSON.stringify(formData),
  });

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handlePreview = async (doc: FormInterface) => {
    const dataFormated: SingleProfileType = {
      company_project_candidate: doc.Fullname,
      profession_job_name: doc.Profession,
      introduction: doc.Introduction,
      email: doc.Email,
      portfolio: doc.OnlinePortfolio,
      linkedin: doc.Linkedin,
      gallery: [],
      image: doc.ProfilePicture,
    }

    let listFile = [];
    for (let i = 0; i < showcaseFileUpload.length; i++) {
      let fileBase64 = await filePreview(showcaseFileUpload[i]);
      listFile.push(fileBase64);
    }
    dataFormated.gallery = listFile;
    if (profilePicFileUpload) {
      dataFormated.image = await filePreview(profilePicFileUpload);
    }

    // console.log('handlePreview:', dataFormated);

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
    CV: null,
    Portfolio: null,
    ProfilePicture: null,
    BestWork: [],
    Preview: false,
    published_at: null,
    Job: jobId,
    /*Fullname: '',
    Profession: '',
    Introduction: '',
    Email: '',
    Linkedin: '',
    OnlinePortfolio: '',
    CV: null,
    Portfolio: null,
    ProfilePicture: null,
    BestWork: [],
    Preview: false,
    published_at: null,
    Job: jobId*/
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

  useEffect(() => {
    if(state){ 
      setTitle(state.positionOffered);
      setJobId(state.id);
    }else{
      if (response && !state) {
        let openingDetails = formatOpeningDetails(response.data);
        setTitle(openingDetails.profession_job_name);
        console.log('openingDetails.id', openingDetails.id);
        setJobId(openingDetails.id);
      }
    }
  }, [response])

  useEffect(() => {
    // launch when setState is ready when handleSubmit was executed
    // formData !== null && sendData();
    if (formData !== null) {
      const formDataEl = new FormData();
      formDataEl.append('data', JSON.stringify(formData));
      formDataEl.append('files.CV', cvFileUpload);
      formDataEl.append('files.Portfolio', portfolioFileUpload);
      for(let i = 0; i < showcaseFileUpload.length; i++) {
        formDataEl.append('files.BestWork', showcaseFileUpload[i]);
      }
      formDataEl.append('files.ProfilePicture', profilePicFileUpload);

      let axiosReq = {
        url: '/applicants',
        method: 'POST',
        data: formDataEl,
      };
      sendFormData(axiosReq);
    }
  }, [formData])

  useEffect(() => {
    if(responseSubmit){
      if(responseSubmit.status === 200){
        handleCloseModal();
        history.push(`/job/${slug}/apply/success`);
      }
    }
  }, [responseSubmit]);

  const handleCvUpload = (fileList) => {
    setCvFileUpload(fileList[0]);
  };

  const handlePortfolioUpload = (fileList) => {
    setPortfolioFileUpload(fileList[0]);
  };

  const handleShowcaseUpload = (fileList) => {
    setShowcaseFileUpload(fileList);
  };

  const handleProfilePicUpload = (fileList) => {
    setProfilePicFileUpload(fileList[0]);
  };

  useEffect(() => {
    console.log('Api public key:', process.env.REACT_APP_G_RECAPTCHA_PUBLIC_KEY);
  }, [])
  

  return (
    <div className="custom-form" id="job-details-contact">
      <HeroPost
        title={ t("hero.title") + ' ' + title }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        buttonLink={`/job/${slug}`}
        />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          // GET token ReCaptcha
          const token: string = await reRef.current.executeAsync();
          reRef.current.reset();
          // Validate captcha
          /*const isValidCaptcha = await validateReCaptcha(token);
          if(!isValidCaptcha){
            return alert('invalid captcha');
          }*/
          // console.log('onSubmit', values, jobId);
          if(values.Preview && token){
            handlePreview(values);
            // Reset variable
            actions.setFieldValue('Preview', false);
          }else{
            let data: FormInterface = Object.assign({}, values);

            data.Job = jobId;

            setFormData(data);
            // handle submit on useEffect FormData
            // console.log(JSON.stringify(data, null, 2));
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
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.name-and-surname", {ns: namespaces.common})}
                      name="Fullname"
                      id="Fullname"
                      required />
                  </div>
                  {/* Input profession */}
                  <div>
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.profession", {ns: namespaces.common})}
                      name="Profession"
                      id="Profession"
                      required />
                  </div>
                  {/* Textarea introduction */}
                  <div>
                    <TextField 
                      element="textarea"
                      label={t("general.introduction", {ns: namespaces.common})}
                      name="Introduction"
                      id="Introduction"
                      required />
                  </div>
                  <div>
                    {/* Input Email */}
                    <TextField 
                      element="input"
                      type="email"
                      label={t("general.email", {ns: namespaces.common})}
                      name="Email"
                      id="Email"
                      required />
                  </div>
                  <div>
                    {/* Input linkedin */}
                    <TextField 
                      element="input"
                      label={t("general.linkedin", {ns: namespaces.common})}
                      name="Linkedin"
                      id="Linkedin" />
                  </div>
                  <div>
                    {/* Input Online portfolio */}
                    <TextField 
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
                    { !updateFile && <Typography variant="body-s" element="p" className="recommended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF, DOC</Typography>}
                    <FileButton
                      label={t("general.upload-cv", {ns: namespaces.common})}
                      onChange={handleCvUpload}
                      multiple={false}
                      maxFiles={1}
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                    />
                  </div>
                  {/* Input portfolio */}
                  <div className="upload-box">
                    <Label type="form">{t("general.portfolio", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recommended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF</Typography>}
                    <FileButton
                      label={t("general.upload-portfolio", {ns: namespaces.common})}
                      onChange={handlePortfolioUpload}
                      maxFiles={1}
                      multiple={false}
                      accept=".pdf"
                    />
                  </div>
                  {/* Input picture */}
                  <div className="upload-box">
                    <Label type="form">{t("general.picture", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recommended">{t("general.recommended-size", {ns: namespaces.common})} 100 x 100px</Typography>}
                    <FileButton
                      label={t("general.upload-picture", {ns: namespaces.common})}
                      onChange={handleProfilePicUpload}
                      maxFiles={1}
                      multiple={false}
                      accept="image/*"
                    />
                  </div>
                  {/* Input showcase */}
                  <div className="upload-box">
                    <Label type="form">{t("general.upload-showcase", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recommended">{t("general.recommended-size", {ns: namespaces.common})} 736 x 408px</Typography>}
                    <FileButton
                      label={t("general.upload-pictures", {ns: namespaces.common})}
                      onChange={handleShowcaseUpload}
                      maxFiles={6}
                      multiple={true}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ui container">
              <div className="actions">
                <Button 
                  disabled={!formik.isValid}
                  loading={loadingSubmit}
                  type="submit"
                  primary >
                    {t("general.apply", {ns: namespaces.common})}
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
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_G_RECAPTCHA_PUBLIC_KEY}
              size="invisible"
              ref={reRef}
              />
            <Modal theme="light" ref={modalRef}>
              <ModalHeader>{ t("hero.title") + ' ' + title }</ModalHeader>
              <ModalBody className="review-modal">
                <SingleProfile data={applicants} />
              </ModalBody>
              <ModalFooter>
                <Button 
                  secondary 
                  onClick={() => handleCloseModal()}>
                    {t("buttons.edit", {ns: namespaces.common})}
                </Button>
                <Button 
                  primary
                  loading={loadingSubmit}
                  type="button"
                  onClick={() => {
                    formik.handleSubmit();
                  }}>
                    {t("general.apply", {ns: namespaces.common})}
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default OpeningApply;
