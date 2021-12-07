import { FC, useRef, useState } from "react";

// UI Semantic
import { Checkbox, Dropdown } from "semantic-ui-react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files
import '../../assets/scss/base/form.scss';
import { openings2 } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import dataModal from '../../data/single.json';

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import Range from "../../components/common/Range/Range";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import SingleOrganizationAndProject from "../../components/common/Single/SingleOrganizationAndProject";
import { useHistory } from "react-router";

const OpeningCreate:FC = () =>{
  const { t } = useTranslation([namespaces.pages.openingcreate, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const modalRef = useRef<ModalHandle>(null);
  const history = useHistory();

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleSubmit = () => history.push('/openings/post-a-job/success');

  return(
    <div className="custom-form" id="post-a-job">
      <HeroPost 
        imgSrc={openings2}
        title={ t("hero.title") }
        description={ t("hero.description") }
        buttonText={t("hero.button")}
        />
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
                htmlFor="position-offered"
                required />
            </div>
            {/* Textarea responsabilities */}
            <div>
              <TextField 
                element="textarea"
                label={t("general.responsabilities", {ns: namespaces.common})}
                htmlFor="responsabilities"
                required />
            </div>
            {/* Benefits */}
            <div>
              <TextField 
                element="input"
                type="text"
                label={t("general.benefits", {ns: namespaces.common})}
                htmlFor="benefits" />
            </div>
            {/* Checkbox's Types of contract */}
            <div>
              <Label type="form" required>{t("general.type-of-contract", {ns: namespaces.common})}</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label={t("general.permanent", {ns: namespaces.common})} />
                  <Checkbox label={t("general.temporary", {ns: namespaces.common})} />
                </div>
                <div>
                  <Checkbox label={t("general.freelance", {ns: namespaces.common})} />
                  <Checkbox label={t("general.intership", {ns: namespaces.common})} />
                </div>
              </div>
            </div>
            {/* Checkbox's Fields */}
            <div>
              <Label type="form" required>{t("general.fields", {ns: namespaces.common})}</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label={t("general.design", {ns: namespaces.common})} />
                  <Checkbox label={t("general.development", {ns: namespaces.common})} />
                  <Checkbox label={t("general.engineering", {ns: namespaces.common})} />
                  <Checkbox label={t("general.modelling", {ns: namespaces.common})} />
                </div>
                <div>
                  <Checkbox label={t("general.project-management", {ns: namespaces.common})} />
                  <Checkbox label={t("general.marketing", {ns: namespaces.common})} />
                  <Checkbox label={t("general.art-direction", {ns: namespaces.common})} />
                  <Checkbox label={t("general.data-analytics", {ns: namespaces.common})} />
                </div>
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
                <Checkbox label={t("general.full-time", {ns: namespaces.common})} />
                <Checkbox label={t("general.part-time", {ns: namespaces.common})} />
                <Checkbox label={t("general.per-hour", {ns: namespaces.common})} />
              </div>
            </div>
            {/* Input Salary */}
            <div>
              <Label type="form">{t("general.salary", {ns: namespaces.common})}</Label>
              <div className="salary">
                <TextField 
                  element="input"
                  type="text"
                  label={t("general.from", {ns: namespaces.common})}
                  htmlFor="from" />
                <TextField 
                  element="input"
                  type="text"
                  label={t("general.to", {ns: namespaces.common})}
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
              <Label type="form">{t("general.start-date", {ns: namespaces.common})}</Label>
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
                label={t("general.organization", {ns: namespaces.common})}
                htmlFor="project-name"
                required />
            </div>
            <div>
              {/* Input Email */}
              <TextField 
                element="input"
                type="email"
                label={t("general.email", {ns: namespaces.common})}
                htmlFor="email"
                required />
            </div>
            {/* Textarea About */}
            <div>
              <TextField 
                element="textarea"
                label={t("general.about", {ns: namespaces.common})}
                htmlFor="about"
                required />
            </div>
            {/* Input logo */}
            <div className="upload-box">
              <Label type="form">{t("general.company", {ns: namespaces.common})}</Label>
              <Typography variant="body-s" element="p" className="recomended">{t("general.recomended-size", {ns: namespaces.common})} 100 x 100px</Typography>
              { updateFile && <File title="CompanyLogo.png" className="file" /> }
              <Button secondary className="btn-upload" onClick={() => setUploadFile(!updateFile)}>{t("general.upload-logo", {ns: namespaces.common})}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container">
        <div className="actions">
          <Button 
            disabled={!updateFile}
            primary 
            onClick={() => handleSubmit()}>
              {t("buttons.submit", {ns: namespaces.common})}
          </Button>
          <Button 
            disabled={!updateFile}
            onClick={() => handleOpenModal() }
            secondary >
              {t("buttons.preview", {ns: namespaces.common})}
          </Button>
        </div>
      </div>
      <Modal theme="light" ref={modalRef}>
        <ModalHeader>Review your job</ModalHeader>
        <ModalBody className="review-modal">
          <SingleOrganizationAndProject data={dataModal.organization} />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>{t("buttons.edit", {ns: namespaces.common})}</Button>
          <Button primary onClick={() => handleSubmit()}>{t("buttons.submit", {ns: namespaces.common})}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default OpeningCreate;