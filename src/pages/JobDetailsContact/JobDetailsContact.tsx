import React, { FC, useRef, useState } from 'react'

// Files
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../i18n/i18n.constants';
import '../../assets/scss/base/form.scss';
import './JobDetailsContact.scss';
import detailData from '../../data/single.json';

// UI Decentraland
import { Button } from 'decentraland-ui/dist/components/Button/Button';

// Custom component
import HeroPost from '../../components/common/HeroPost/HeroPost'
import Typography from '../../components/common/Typography/Typography';
import TextField from '../../components/common/TextField/TextField';
import Label from "../../components/common/Label/Label";
import File from '../../components/common/File/File';
import Modal, { ModalBody, ModalFooter, ModalHandle, ModalHeader } from '../../components/common/Modal/Modal';
import SingleProfile from '../../components/common/Single/SingleProfile';

const JobDetailsContact:FC = () => {
  const { t } = useTranslation([namespaces.pages.detailcontact, namespaces.common]);
  const [updateFile, setUploadFile] = useState(false);
  const modalRef = useRef<ModalHandle>(null);
  const history = useHistory();

  const handleOpenModal = () => modalRef.current.openModal();
  const handleCloseModal = () => modalRef.current.closeModal();

  const handleSubmit = () => history.push('/job/contact/success');

  return (
    <div className="custom-form" id="job-details-contact">
      <HeroPost
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
                htmlFor="linkedin"
                required />
            </div>
            <div>
              {/* Input Online portfolio */}
              <TextField 
                element="input"
                label={t("general.online-portfolio", {ns: namespaces.common})}
                htmlFor="online-portfolio"
                required />
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
          <SingleProfile data={detailData.candidate_with_gallery} />
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => handleCloseModal()}>{t("buttons.edit", {ns: namespaces.common})}</Button>
          <Button primary onClick={() => handleSubmit()}>{t("buttons.submit", {ns: namespaces.common})}</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default JobDetailsContact
