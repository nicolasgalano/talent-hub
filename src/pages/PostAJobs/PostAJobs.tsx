import { FC, useRef, useState } from "react";

// UI Semantic
import { Checkbox, Dropdown } from "semantic-ui-react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files
import './PostAJobs.scss';
import { openings2 } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import Range from "../../components/common/Range/Range";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import Single from "../../components/common/Single/Single";

const PostAJobs:FC = () =>{
  const { t } = useTranslation([namespaces.pages.postajob, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const modalRef = useRef<ModalHandle>(null);

  const handleCloseModal = () => modalRef.current.closeModal();

  return(
    <div id="post-a-job">
      <HeroPost 
        imgSrc={openings2}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        />
      <div className="ui container">
        {/* Title */}
        <Typography element="p" variant="body-s" className="label-required">*{t("form.required-information", {ns: namespaces.common})}</Typography>
        <div className="row">
          {/* First Col */}
          <div className="col">
            {/* Input Possition */}
            <div>
              <TextField 
                element="input"
                type="text"
                label={t("form.position-offered", {ns: namespaces.common})}
                htmlFor="position-offered"
                required />
            </div>
            {/* Textarea Responsibilities */}
            <div>
              <TextField 
                element="textarea"
                label={t("form.responsibilities", {ns: namespaces.common})}
                htmlFor="responsibilities"
                required />
            </div>
            {/* Benefits */}
            <div>
              <TextField 
                element="input"
                type="text"
                label={t("form.benefits", {ns: namespaces.common})}
                htmlFor="benefits" />
            </div>
            {/* Checkbox's Types of contract */}
            <div>
              <Label type="form" required>{t("filters.type-of-contract", {ns: namespaces.common})}</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label={t("form.permanent", {ns: namespaces.common})} />
                  <Checkbox label={t("form.temporary", {ns: namespaces.common})} />
                </div>
                <div>
                  <Checkbox label={t("form.freelance", {ns: namespaces.common})} />
                  <Checkbox label={t("form.intership", {ns: namespaces.common})} />
                </div>
              </div>
            </div>
            {/* Checkbox's Fields */}
            <div>
              <Label type="form" required>{t("filters.fields", {ns: namespaces.common})}</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label={t("form.design", {ns: namespaces.common})} />
                  <Checkbox label={t("form.development", {ns: namespaces.common})} />
                  <Checkbox label={t("form.engineering", {ns: namespaces.common})} />
                  <Checkbox label={t("form.modelling", {ns: namespaces.common})} />
                </div>
                <div>
                  <Checkbox label={t("form.project-management", {ns: namespaces.common})} />
                  <Checkbox label={t("form.marketing", {ns: namespaces.common})} />
                  <Checkbox label={t("form.art-direction", {ns: namespaces.common})} />
                  <Checkbox label={t("form.data-analytics", {ns: namespaces.common})} />
                </div>
              </div>
            </div>
            {/* Input Experience */}
            <div>
              <Label type="form" required>{t("form.experience-required", {ns: namespaces.common})}</Label>
              <Range />
            </div>
            {/* Checkbox's Working schedule */}
            <div>
              <Label type="form" required>{t("filters.working-schedule", {ns: namespaces.common})}</Label>
              <div className="checkbox-inline">
                <Checkbox label={t("form.full-time", {ns: namespaces.common})} />
                <Checkbox label={t("form.part-time", {ns: namespaces.common})} />
                <Checkbox label={t("form.per-hour", {ns: namespaces.common})} />
              </div>
            </div>
            {/* Input Salary */}
            <div>
              <Label type="form">{t("form.salary", {ns: namespaces.common})}</Label>
              <div className="salary">
                <TextField 
                  element="input"
                  type="text"
                  label={t("form.from", {ns: namespaces.common})}
                  htmlFor="from" />
                <TextField 
                  element="input"
                  type="text"
                  label={t("form.to", {ns: namespaces.common})}
                  htmlFor="to" />
                <Dropdown text="USD" direction="left">
                  <Dropdown.Menu>
                    <Dropdown.Item text="USD" />
                    <Dropdown.Item text="EUR" />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown text="Month" direction="left">
                  <Dropdown.Menu>
                    <Dropdown.Item text="Month" />
                    <Dropdown.Item text="Year" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* Select Start date */}
            <div>
              <Label type="form">{t("form.start-date", {ns: namespaces.common})}</Label>
              <div className="start-date">
                <Dropdown text="September" direction="right">
                  <Dropdown.Menu>
                    <Dropdown.Item text={t("months.january", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.febrary", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.march", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.april", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.may", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.june", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.july", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.august", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.september", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.october", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.november", {ns: namespaces.common})} />
                    <Dropdown.Item text={t("months.decenber", {ns: namespaces.common})} />
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown text="2021" direction="right">
                  <Dropdown.Menu>
                    <Dropdown.Item text="2021" />
                    <Dropdown.Item text="2022" />
                  </Dropdown.Menu>
                </Dropdown>
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
                label={t("form.organization", {ns: namespaces.common})}
                htmlFor="project-name"
                required />
            </div>
            <div>
              {/* Input Email */}
              <TextField 
                element="input"
                type="email"
                label={t("form.email", {ns: namespaces.common})}
                htmlFor="email"
                required />
            </div>
            {/* Textarea About */}
            <div>
              <TextField 
                element="textarea"
                label={t("form.about", {ns: namespaces.common})}
                htmlFor="about"
                required />
            </div>
            {/* Input logo */}
            <div className="project-logo">
              <Label type="form">{t("form.company", {ns: namespaces.common})}</Label>
              <Typography variant="body-s" element="p" className="recomended">{t("form.recomended-size", {ns: namespaces.common})}</Typography>
              { updateFile && <File title="CompanyLogo.png" className="companyLogo" /> }
              <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("form.upload-logo", {ns: namespaces.common})}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container">
        <div className="actions">
          <Button 
            disabled={!updateFile}
            primary >
              {t("buttons.submit", {ns: namespaces.common})}
          </Button>
          <Button 
            disabled={!updateFile}
            onClick={() => updateFile && modalRef.current.openModal() }
            secondary >
              {t("buttons.preview", {ns: namespaces.common})}
          </Button>
        </div>
      </div>
      <Modal theme="light" ref={modalRef}>
        <ModalHeader>Review your job</ModalHeader>
        <ModalBody className="review-job">
          <Single />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>Edit</Button>
          <Button primary onClick={() => handleCloseModal()}>Submit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default PostAJobs;