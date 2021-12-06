import { FC, useRef, useState } from "react";

// UI Semantic
import { Checkbox } from "semantic-ui-react";

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Files
import '../../assets/scss/base/form.scss';
import { createAProfile } from '../../assets/illustrations'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import dataModal from '../../data/single.json';

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import HeroPost from '../../components/common/HeroPost/HeroPost';
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from "../../components/common/Modal/Modal";
import { useHistory } from "react-router";
import SingleProfile from "../../components/common/Single/SingleProfile";

const CreateAProfile:FC = () =>{
  const { t } = useTranslation([namespaces.pages.createaprofile, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const modalRef = useRef<ModalHandle>(null);
  const history = useHistory();

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleSubmit = () => history.push('/professional/create/success');

  return(
    <div className="custom-form" id="create-a-profile">
      <HeroPost 
        imgSrc={createAProfile}
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
            {/* Input Name and surname */}
            <div>
              <TextField
                element="input"
                type="text"
                label={t("general.name-and-surname", {ns: namespaces.common})}
                htmlFor="name-and-surname"
                required />
            </div>
            {/* Input profession */}
            <div>
              <TextField
                element="input"
                type="text"
                label={t("general.profession", {ns: namespaces.common})}
                htmlFor="profession"
                required />
            </div>
            {/* Textarea introduction */}
            <div>
              <TextField 
                element="textarea"
                label={t("general.introduction", {ns: namespaces.common})}
                htmlFor="introduction"
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
            <div>
              {/* Input linkedin */}
              <TextField 
                element="input"
                label={t("general.linkedin", {ns: namespaces.common})}
                htmlFor="linkedin" />
            </div>
            <div>
              {/* Input Online portfolio */}
              <TextField 
                element="input"
                label={t("general.online-portfolio", {ns: namespaces.common})}
                htmlFor="online-portfolio" />
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
                <Checkbox label={t("general.full-time", {ns: namespaces.common})} />
                <Checkbox label={t("general.part-time", {ns: namespaces.common})} />
                <Checkbox label={t("general.per-hour", {ns: namespaces.common})} />
              </div>
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
        <ModalHeader>Apply to Sr. UI Designer</ModalHeader>
        <ModalBody className="review-modal">
          <SingleProfile data={dataModal.candidate_with_gallery} />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>{t("buttons.edit", {ns: namespaces.common})}</Button>
          <Button primary onClick={() => handleSubmit()}>{t("buttons.submit", {ns: namespaces.common})}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default CreateAProfile;