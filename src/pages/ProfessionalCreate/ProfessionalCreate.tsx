import { FC, useEffect, useRef, useState } from "react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files & Library
import '../../assets/scss/base/form.scss';
import { createAProfile } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { useHistory } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ErrorFocus } from "../../utils/ErrorFocus";
import ReCAPTCHA from "react-google-recaptcha";

// UI Custom Component
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import SingleProfile, { SingleProfileType } from "../../components/common/Single/SingleProfile";
import TextField from "../../components/common/TextField/TextField";
import CheckboxGroup from "../../components/common/CheckboxGroup/CheckboxGroup";
import { setMultipleField, filePreview } from "../../utils/formatData";
import useApi from "../../components/hooks/useApi";
import validateReCaptcha from "../../utils/validateReCaptcha";
import FileButton from "../../components/common/FileButton/FileButton";

interface FormInterface {
  Fullname: string;
  Profession: string;
  Introduction: string;
  Experience: number;
  Email: string;
  Linkedin: string;
  OnlinePortfolio: string;
  CV: string;
  Portfolio: string;
  ProfilePicture: string;
  IsFeatured: boolean;
  Slug: string;
  TypeOfContract: Array<string>;
  Fields: Array<string>;
  WorkingSchedule: Array<string>;
  BestWork: Array<string>;
  Preview: boolean;
  published_at: boolean;
}

const ProfessionalCreate:FC = () =>{
  const { t } = useTranslation([namespaces.pages.professionalcreate, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const [newProfile, setNewProfile] = useState<SingleProfileType>(null)
  const modalRef = useRef<ModalHandle>(null);
  const [formData, setFormData] = useState<FormInterface>(null);
  const [cvFileUpload, setCvFileUpload] = useState(null);
  const [portfolioFileUpload, setPortfolioFileUpload] = useState(null);
  const [profilePicFileUpload, setProfilePicFileUpload] = useState(null);
  const [showcaseFileUpload, setShowcaseFileUpload] = useState([]);
  const history = useHistory();
  const reRef = useRef<ReCAPTCHA>();

  const { 
    response: responseSubmit, 
    loading: loadingSubmit, 
    sendFormData } = useApi({
      url: '/professionals',
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
      experience: doc.Experience,
      image: null,
      workgin_shedule: setMultipleField(doc.WorkingSchedule, 'WorkingSchedule'),
      type_of_contract: setMultipleField(doc.TypeOfContract, 'TypeOfContract'),
      fields: setMultipleField(doc.Fields, 'Fields'),
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

    setNewProfile(dataFormated);
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
    IsFeatured: false,
    Slug: null,
    TypeOfContract: [],
    Fields: [],
    WorkingSchedule: [],
    Experience: undefined,
    BestWork: [],
    Preview: false,
    published_at: null
  }

  const formSchema = Yup.object().shape({
    Fullname: Yup.string()
      .required(t("general.name-and-surname", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Profession: Yup.string()
      .required(t("general.profession", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Introduction: Yup.string()
      .required(t("general.introduction", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Experience: Yup.number()
      .positive()
      .min(0, t("general.experience-required", { ns: namespaces.common }) + ' ' + t("general.positive-number", { ns: namespaces.common }) )
      .required(t("general.experience-required", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Email: Yup.string()
      .email(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.invalid-email", {ns: namespaces.common}))
      .required(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Linkedin: Yup.string(),
    OnlinePortfolio: Yup.string(),
    TypeOfContract: Yup.array()
      .min(1, t("general.type-of-contract", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
    Fields: Yup.array()
      .min(1, t("general.fields", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
    WorkingSchedule: Yup.array()
      .min(1, t("general.working-schedule", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
  });

  useEffect(() => {
    // launch when setState is ready when handleSubmit was executed
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
        url: '/professionals',
        method: 'POST',
        data: formDataEl
      };
      sendFormData(axiosReq);
    };
  }, [formData])

  useEffect(() => {
    if(responseSubmit){
      if(responseSubmit.status === 200){
        history.push('/professionals/create/success');
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

  return(
    <div className="custom-form" id="create-a-profile">
      <HeroPost 
        imgSrc={createAProfile}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        buttonLink="/professionals"
        />
      <Formik 
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          // GET token ReCaptcha
          // const token = await reRef.current.executeAsync();
          // reRef.current.reset();
          // Validate captcha
          /*const isValidCaptcha = await validateReCaptcha(token);
          if(!isValidCaptcha){
            return alert('invalid captcha');
          }*/

          if(values.Preview){
            await handlePreview(values);
            // Reset variable
            actions.setFieldValue('Preview', false);
          }else{
            let data: FormInterface = Object.assign({}, values);

            // Format fields that would be an array
            data.TypeOfContract = setMultipleField(data.TypeOfContract, 'TypeOfContract');
            data.Fields = setMultipleField(data.Fields, 'Fields');
            data.WorkingSchedule = setMultipleField(data.WorkingSchedule, 'WorkingSchedule');

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
                  {/* Input experience */}
                  <div>
                    <TextField
                      element="input"
                      type="number"
                      label={t("general.years-of-experience", {ns: namespaces.common})}
                      name="Experience"
                      id="Experience"
                      min={0}
                      required
                       />
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
                  {/* Input cv */}
                  <div className="upload-box">
                    <Label type="form">{t("general.cv", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF, DOC</Typography>}
                    <FileButton
                      label={t("general.upload-cv", {ns: namespaces.common})}
                      onChange={handleCvUpload}
                      multiple={false}
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                    />
                  </div>
                  {/* Input portfolio */}
                  <div className="upload-box">
                    <Label type="form">{t("general.portfolio", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.file-types-accepted", {ns: namespaces.common})} PDF</Typography>}
                    <FileButton
                      label={t("general.upload-portfolio", {ns: namespaces.common})}
                      onChange={handlePortfolioUpload}
                      multiple={false}
                      accept=".pdf"
                    />
                  </div>
                  {/* Input showcase */}
                  <div className="upload-box">
                    <Label type="form">{t("general.upload-showcase", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 736 x 408px</Typography>}

                    <FileButton
                      label={t("general.upload-pictures", {ns: namespaces.common})}
                      onChange={handleShowcaseUpload}
                      maxFiles={6}
                      multiple={true}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="col uploads">
                  {/* Input picture */}
                  <div className="upload-box">
                    <Label type="form">{t("general.picture", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 100 x 100px</Typography>}
                    <FileButton
                      label={t("general.upload-picture", {ns: namespaces.common})}
                      onChange={handleProfilePicUpload}
                      multiple={false}
                      accept="image/*"
                    />
                  </div>
                  {/* Checkbox's Working schedule */}
                  <div>
                    <Label type="form" required>{t("general.working-schedule", {ns: namespaces.common})}</Label>
                    <div className="checkbox-inline">
                      <CheckboxGroup
                        name="WorkingSchedule"
                        options={[
                          {
                            label: t("general.full-time", {ns: namespaces.common}),
                            value: "FULL_TIME"
                          },
                          {
                            label: t("general.part-time", {ns: namespaces.common}),
                            value: "PART_TIME"
                          },
                          {
                            label: t("general.per-hour", {ns: namespaces.common}),
                            value: "PER_HOUR"
                          },
                        ]}
                      />
                    </div>
                  </div>
                  {/* Checkbox's Types of contract */}
                  <div>
                    <Label type="form" required>{t("general.type-of-contract", {ns: namespaces.common})}</Label>
                    <div className="checkbox-container two-column">
                      <CheckboxGroup
                        name="TypeOfContract"
                        options={[
                          {
                            label: t("general.permanent", {ns: namespaces.common}),
                            value: "PERMANENT"
                          },
                          {
                            label: t("general.temporary", {ns: namespaces.common}),
                            value: "TEMPORARY"
                          },
                          {
                            label: t("general.freelance", {ns: namespaces.common}),
                            value: "FREELANCE"
                          },
                          {
                            label: t("general.intership", {ns: namespaces.common}),
                            value: "INTERNSHIP"
                          },
                        ]}
                      />
                    </div>
                  </div>
                  {/* Checkbox's Fields */}
                  <div>
                    <Label type="form" required>{t("general.fields", {ns: namespaces.common})}</Label>
                    <div className="checkbox-container two-column">
                      <CheckboxGroup
                        name="Fields"
                        options={[
                          {
                            label: t("general.design", {ns: namespaces.common}),
                            value: "DESIGN"
                          },
                          {
                            label: t("general.project-management", {ns: namespaces.common}),
                            value: "PROJECT_MANAGEMENT"
                          },
                          {
                            label: t("general.development", {ns: namespaces.common}),
                            value: "DEVELOPMENT"
                          },
                          {
                            label: t("general.marketing", {ns: namespaces.common}),
                            value: "MARKETING"
                          },
                          {
                            label: t("general.engineering", {ns: namespaces.common}),
                            value: "ENGINEERING"
                          },
                          {
                            label: t("general.art-direction", {ns: namespaces.common}),
                            value: "ART_DIRECTION"
                          },
                          {
                            label: t("general.modelling", {ns: namespaces.common}),
                            value: "MODELLING"
                          },
                          {
                            label: t("general.data-analytics", {ns: namespaces.common}),
                            value: "DATA_ANALYTICS"
                          },
                        ]}
                      />
                    </div>
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
            <ReCAPTCHA
              sitekey="6LfszyMeAAAAALJi3GgI_heeMTWzPLW5HrK5_ebF"
              size="invisible"
              ref={reRef}
              />
            <Modal theme="light" ref={modalRef}>
              <ModalHeader>{t("modal.title", { ns: namespaces.pages.professionalcreate})}</ModalHeader>
              <ModalBody className="review-modal">
                <SingleProfile data={newProfile} />
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
                    {t("buttons.submit", {ns: namespaces.common})}
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        }
      </Formik>
    </div>
  );
}
export default ProfessionalCreate;