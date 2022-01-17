import { FC, useRef, useState } from "react";

// UI Semantic
import { Checkbox } from "semantic-ui-react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files & Library
import '../../assets/scss/base/form.scss';
import { createAProfile } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import dataModal from '../../data/single.json';
import { useHistory } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ErrorFocus } from "../../utils/ErrorFocus";

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import SingleProfile, { SingleProfileType } from "../../components/common/Single/SingleProfile";
import TextFieldNew from "../../components/common/TextField/TextFieldNew";
import CheckboxGroup from "../../components/common/CheckboxGroup/CheckboxGroup";
import { setMultipleField } from "../../utils/formatData";

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
  IsFeatured: boolean;
  Slug: string;
  TypesOfContract: Array<string>;
  Fields: Array<string>;
  WorkingSchedule: Array<string>;
  Experience: number;
  BestWork: Array<string>;
  Preview: boolean;
}

const ProfessionalCreate:FC = () =>{
  const { t } = useTranslation([namespaces.pages.professionalcreate, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const [newProfile, setNewProfile] = useState<SingleProfileType>(null)
  const modalRef = useRef<ModalHandle>(null);
  const history = useHistory();

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleSubmit = () => history.push('/professional/create/success');

  const handlePreview = (doc: FormInterface) => {
    const dataFormated: SingleProfileType = {
      company_project_candidate: doc.Fullname,
      profession_job_name: doc.Profession,
      introduction: doc.Introduction,
      email: doc.Email,
      portfolio: doc.Portfolio,
      linkedin: doc.Linkedin,
      gallery: doc.BestWork,
      experience: doc.Experience,
      image: doc.ProfilePicture,
      workgin_shedule: setMultipleField(doc.WorkingSchedule, 'WorkingSchedule'),
      type_of_contract: setMultipleField(doc.TypesOfContract, 'TypesOfContract'),
      fields: setMultipleField(doc.Fields, 'Fields'),
    }

    console.log('handlePreview:', dataFormated);

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
    CV: '',
    Portfolio: '',
    ProfilePicture: '',
    IsFeatured: false,
    Slug: '',
    TypesOfContract: [],
    Fields: [],
    WorkingSchedule: [],
    Experience: 0,
    BestWork: [],
    Preview: false,
  }

  const formSchema = Yup.object().shape({
    Fullname: Yup.string()
      .required(),
    Profession: Yup.string()
      .required(),
    Introduction: Yup.string()
      .required(),
    Email: Yup.string()
      .email(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.invalid-email", {ns: namespaces.common}))
      .required(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Linkedin: Yup.string(),
    OnlinePortfolio: Yup.string(),
    TypesOfContract: Yup.array()
      .min(1, t("general.type-of-contract", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
    Fields: Yup.array()
      .min(1, t("general.fields", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
    WorkingSchedule: Yup.array()
      .min(1, t("general.working-schedule", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(),
  });

  return(
    <div className="custom-form" id="create-a-profile">
      <HeroPost 
        imgSrc={createAProfile}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        />
      <Formik 
        initialValues={initialValues}
        // validationSchema={formSchema}
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
                <div className="col uploads">
                  {/* Input picture */}
                  <div className="upload-box">
                    <Label type="form">{t("general.picture", {ns: namespaces.common})}</Label>
                    { !updateFile && <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 100 x 100px</Typography>}
                    { updateFile && <File title="ProfilePicture.png" className="file" /> }
                    { !updateFile && <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-picture", {ns: namespaces.common})}</Button>}
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
                        name="TypesOfContract"
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
                            value: "INTERSHIP"
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
                  type="submit"
                  primary 
                  onClick={() => handleSubmit()}>
                    {t("buttons.submit", {ns: namespaces.common})}
                </Button>
                <Button 
                  disabled={!formik.isValid}
                  type="submit"
                  onClick={() => {
                    // if not set timeout, the validation is not working
                    setTimeout(() => {
                      formik.setFieldValue('Preview', true)
                    }, 10); 
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
        <ModalHeader>Apply to Sr. UI Designer</ModalHeader>
        <ModalBody className="review-modal">
          <SingleProfile data={newProfile} />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>{t("buttons.edit", {ns: namespaces.common})}</Button>
          <Button primary onClick={() => handleSubmit()}>{t("buttons.submit", {ns: namespaces.common})}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ProfessionalCreate;