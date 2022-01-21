import { FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

// Files & Library
import '../../assets/scss/base/form.scss';
import { openings2 } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { setMultipleField } from "../../utils/formatData";
import { ErrorFocus } from "../../utils/ErrorFocus";
import ReCAPTCHA from "react-google-recaptcha";
import validateReCaptcha from "../../utils/validateReCaptcha";
import useApi from "../../components/hooks/useApi";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// UI Custom Component
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import Range from "../../components/common/Range/Range";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import TextField from "../../components/common/TextField/TextField";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import CheckboxGroup from "../../components/common/CheckboxGroup/CheckboxGroup";

// Types
import SingleOrganizationAndProject, { SingleOrganizationAndProjectType } from "../../components/common/Single/SingleOrganizationAndProject";

interface FormInterface {
  PositionOffered: string;
  OrganizationName: string;
  Organization: string;
  Responsibilities: string;
  Benefits: string;
  TypeOfContract: Array<string>;
  Fields: Array<string>;
  ExperienceFrom: number;
  ExperienceTo?: number;
  WorkingSchedule: Array<string>;
  Email: string;
  About: string;
  SalaryFrom: number;
  SalaryTo: number;
  Currency: string;
  SalaryType: string;
  Month: string;
  Year: string;
  StartDate: string;
  OrganizationProject: string;
  Image?: string;
  Preview: boolean;
  published_at: boolean;
}

const OpeningCreate:FC = () =>{
  const { t } = useTranslation([namespaces.pages.openingcreate, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const [modalData, setModalData] = useState<SingleOrganizationAndProjectType>(null);
  const [formData, setFormData] = useState<FormInterface>(null);
  const history = useHistory();
  const modalRef = useRef<ModalHandle>(null);
  const reRef = useRef<ReCAPTCHA>();

  const { 
    response: responseSubmit, 
    loading: loadingSubmit, 
    error: errorSubmit,
    sendData } = useApi({
      url: '/jobs',
      method: 'POST',
      data: JSON.stringify(formData),
  });

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handlePreview = (doc: FormInterface) => {
    const dataFormated: SingleOrganizationAndProjectType = {
      profession_job_name: doc.PositionOffered,
      company_project_candidate: doc.OrganizationName,
      about: doc.About,
      responsabilities: doc.Responsibilities,
      benefits: doc.Benefits,
      experience_from: '1', //TODO: Only for testing
      experience_to: '3', //TODO: Only for testing
      start_date: moment((doc.Month + ' ' + doc.Year), "MMMM YYYY").format('YYYY-MM-DD'),
      salary_from: doc.SalaryFrom && doc.SalaryFrom.toString(),
      salary_to: doc.SalaryTo && doc.SalaryTo.toString(),
      salary_currency: doc.Currency,
      salary_type: doc.SalaryType,
      organizationProject: doc.OrganizationProject,
      image: 'https://talent-hub-website-53698d6.s3.amazonaws.com/logo_indicius_a73c00b319.jpg',
      workgin_shedule: setMultipleField(doc.WorkingSchedule, 'WorkingSchedule'),
      type_of_contract: setMultipleField(doc.TypeOfContract, 'TypeOfContract'),
      fields: setMultipleField(doc.Fields, 'Fields'),
    }

    // console.log('handlePreview:', dataFormated);

    setModalData(dataFormated);
    handleOpenModal();
  }

  const initialValues: FormInterface = {
    PositionOffered: '',
    OrganizationName: '',
    Organization: '',
    Responsibilities: '',
    Benefits: '',
    TypeOfContract: [],
    Fields: [],
    ExperienceFrom: 1,
    ExperienceTo: null,
    WorkingSchedule: [],
    Email: '',
    About: '',
    SalaryFrom: null,
    SalaryTo: null,
    Currency: 'USD',
    SalaryType: 'YEAR',
    Month: 'September',
    Year: '2021',
    StartDate: '',
    OrganizationProject: '',
    Preview: false,
    published_at: null
  }

  const formSchema = Yup.object().shape({
    PositionOffered: Yup.string()
      .required(t("general.position-offered", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    OrganizationName: Yup.string()
      .required(t("general.organization", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Responsibilities: Yup.string()
      .required(t("general.responsabilities", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    TypeOfContract: Yup.array()
      .min(1, t("general.type-of-contract", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(t("general.type-of-contract", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Fields: Yup.array()
      .min(1, t("general.fields", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(t("general.fields", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    WorkingSchedule: Yup.array()
      .min(1, t("general.working-schedule", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
      .required(t("general.working-schedule", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    Email: Yup.string()
      .email(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.invalid-email", {ns: namespaces.common}))
      .required(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    About: Yup.string()
      .required(t("general.about", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
    OrganizationProject: Yup.string()
      .required(t("general.organization-or-project", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common})),
  });

  useEffect(() => {
    // launch when setState is ready when handleSubmit was executed
    formData !== null && sendData();
  }, [formData])

  useEffect(() => {
    if(responseSubmit){
      if(responseSubmit.status === 200){
        history.push('/openings/post-a-job/success');
      }
    }
  }, [responseSubmit]);
  

  return(
    <div className="custom-form" id="post-a-job">
      <HeroPost 
        imgSrc={openings2}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        buttonLink="/openings"
        />
      <Formik 
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          // GET token ReCaptcha
          const token = await reRef.current.executeAsync();
          reRef.current.reset();
          // Validate captcha
          const isValidCaptcha = await validateReCaptcha(token);
          if(!isValidCaptcha){
            return alert('invalid captcha');
          }

          if(values.Preview){
            handlePreview(values);
            // Reset variable
            actions.setFieldValue('Preview', false);
          }else{
            let data: FormInterface = Object.assign({}, values);


            // handle Organization Field. That's because there is a conflict with the name
            data.Organization = data.OrganizationName;
            delete data.OrganizationName;

            // Format fields that would be an array
            data.TypeOfContract = setMultipleField(data.TypeOfContract, 'TypeOfContract');
            data.Fields = setMultipleField(data.Fields, 'Fields');
            data.WorkingSchedule = setMultipleField(data.WorkingSchedule, 'WorkingSchedule');

            // Format fields for Strapi
            data.StartDate = moment((data.Month + ' ' + data.Year), "MMMM YYYY").format();
            delete data.Month;
            delete data.Year;

            setFormData(data);

            // handle submit on useEffect FormData
            console.log(JSON.stringify(data, null, 2));
          }
          // prevent submit
          actions.setSubmitting(false);
        }}>
        {(formik) => (
          <Form>
            <div className="ui container">
              {/* Title */}
              <Typography element="p" variant="body-s" className="label-required">*{t("general.required-information", {ns: namespaces.common})}</Typography>
              <div className="row">
                {/* First Col */}
                <div className="col">
                  {/* Input Possition */}
                  <div>
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.position-offered", {ns: namespaces.common})}
                      id="PositionOffered"
                      name="PositionOffered"
                      required />
                  </div>
                  {/* Textarea responsabilities */}
                  <div>
                    <TextField
                      element="textarea"
                      label={t("general.responsabilities", {ns: namespaces.common})}
                      name="Responsibilities"
                      id="Responsibilities"
                      required />
                  </div>
                  {/* Benefits */}
                  <div>
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.benefits", {ns: namespaces.common})}
                      name="Benefits"
                      id="Benefits" />
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
                  {/* Input Experience */}
                  <div>
                    <Label type="form" required>{t("general.experience-required", {ns: namespaces.common})}</Label>
                    <Range />
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
                  {/* Input Salary */}
                  <div>
                    <Label type="form">{t("general.salary", {ns: namespaces.common})}</Label>
                    <div className="salary">
                      <TextField
                        element="input"
                        type="number"
                        label={t("general.from", {ns: namespaces.common})}
                        name="SalaryFrom"
                        id="SalaryFrom" />
                      <TextField
                        element="input"
                        type="number"
                        label={t("general.to", {ns: namespaces.common})}
                        name="SalaryTo"
                        id="SalaryTo" />

                      <Dropdown
                        name="Currency"
                        options={Array('USD', 'EUR')}
                        optionDefault="USD" 
                        direction="left" />

                      <Dropdown
                        name="SalaryType"
                        options={Array('MONTH', 'YEAR')}
                        optionDefault="Month" 
                        direction="left" />
                    </div>
                  </div>
                  {/* Select Start date */}
                  <div>
                    <Label type="form">{t("general.start-date", {ns: namespaces.common})}</Label>
                    <div className="start-date">
                      <Dropdown
                        name="Month"
                        options={Array(
                          t("months.january", {ns: namespaces.common}),
                          t("months.febrary", {ns: namespaces.common}),
                          t("months.march", {ns: namespaces.common}),
                          t("months.april", {ns: namespaces.common}),
                          t("months.may", {ns: namespaces.common}),
                          t("months.june", {ns: namespaces.common}),
                          t("months.july", {ns: namespaces.common}),
                          t("months.august", {ns: namespaces.common}),
                          t("months.september", {ns: namespaces.common}),
                          t("months.october", {ns: namespaces.common}),
                          t("months.november", {ns: namespaces.common}),
                          t("months.decenber", {ns: namespaces.common})
                        )}
                        optionDefault={t("months.september", {ns: namespaces.common})}
                        direction="right" />

                      <Dropdown
                        name="Year"
                        options={Array('2021', '2022')}
                        optionDefault="2021" 
                        direction="right" />

                    </div>
                  </div>
                </div>
                {/* Second Col */}
                <div className="col">
                  {/* Input Organization or project name */}
                  <div>
                    <TextField
                      element="input"
                      type="text"
                      label={t("general.organization", {ns: namespaces.common})}
                      name="OrganizationName"
                      id="OrganizationName"
                      required />
                  </div>
                  {/* Radio button - Organization or project */}
                  <div>
                    <Label type="form" required>{t("general.organization-or-project", {ns: namespaces.common})}</Label>
                    <div className="checkbox-inline">
                      <CheckboxGroup
                        name="OrganizationProject"
                        radio
                        options={[
                          {
                            label: t("general.organization-1", {ns: namespaces.common}),
                            value: "Organization"
                          },
                          {
                            label: t("general.project", {ns: namespaces.common}),
                            value: "Project"
                          },
                        ]}
                        />
                      </div>
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
                  {/* Textarea About */}
                  <div>
                    <TextField
                      element="textarea"
                      label={t("general.about", {ns: namespaces.common})}
                      name="About"
                      id="About"
                      required />
                  </div>
                  {/* Input logo */}
                  <div className="upload-box">
                    <Label type="form">{t("general.company", {ns: namespaces.common})}</Label>
                    <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 100 x 100px</Typography>
                    { updateFile && <File title="CompanyLogo.png" className="file" /> }
                    <Button secondary className="btn-upload" type="button" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-logo", {ns: namespaces.common})}</Button>
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
                  primary 
                  >
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
              <ModalHeader>{t("modal.title", { ns: namespaces.pages.openingcreate})}</ModalHeader>
              <ModalBody className="review-modal">
                <SingleOrganizationAndProject data={modalData} />
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
        )}
      </Formik>
    </div>
  );
}
export default OpeningCreate;