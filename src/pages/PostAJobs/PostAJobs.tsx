import { FC } from "react";

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

const PostAJobs:FC = () =>{
  const { t } = useTranslation(namespaces.pages.postajob);

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
        <Typography element="p" variant="body-s" className="label-required">*Required information</Typography>
        <div className="row">
          {/* First Col */}
          <div className="col">
            {/* Input Possition */}
            <div>
              <TextField 
                element="input"
                type="text"
                label="Position offered"
                htmlFor="position-offered"
                required />
            </div>
            {/* Textarea Responsibilities */}
            <div>
              <TextField 
                element="textarea"
                label="Responsibilities"
                htmlFor="responsibilities"
                required />
            </div>
            {/* Benefits */}
            <div>
              <TextField 
                element="input"
                type="text"
                label="Benefits"
                htmlFor="benefits" />
            </div>
            {/* Checkbox's Types of contract */}
            <div>
              <Label type="form" required>Types of contract</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label='Permanent' />
                  <Checkbox label='Temporary' />
                </div>
                <div>
                  <Checkbox label='Freelance' />
                  <Checkbox label='Intership' />
                </div>
              </div>
            </div>
            {/* Checkbox's Fields */}
            <div>
              <Label type="form" required>Fields</Label>
              <div className="checkbox-container">
                <div>
                  <Checkbox label='Design' />
                  <Checkbox label='Development' />
                  <Checkbox label='Engineering' />
                  <Checkbox label='Modelling' />
                </div>
                <div>
                  <Checkbox label='Project Management' />
                  <Checkbox label='Marketing' />
                  <Checkbox label='Art Direction' />
                  <Checkbox label='Data Analytics' />
                </div>
              </div>
            </div>
            {/* Input Experience */}
            <div>
              <Label type="form" required>Experience required</Label>
              <Range />
            </div>
            {/* Checkbox's Working schedule */}
            <div>
              <Label type="form" required>Working schedule</Label>
              <div className="checkbox-inline">
                <Checkbox label='Full-Time' />
                <Checkbox label='Part-Time' />
                <Checkbox label='Per-Hour' />
              </div>
            </div>
            {/* Input Salary */}
            <div>
              <Label type="form">Salary</Label>
              <div className="salary">
                <TextField 
                  element="input"
                  type="text"
                  label="From"
                  htmlFor="from" />
                <TextField 
                  element="input"
                  type="text"
                  label="To"
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
              <Label type="form">Start date</Label>
              <div className="start-date">
                <Dropdown text="September" direction="right">
                  <Dropdown.Menu>
                    <Dropdown.Item text="January" />
                    <Dropdown.Item text="Febrary" />
                    <Dropdown.Item text="March" />
                    <Dropdown.Item text="April" />
                    <Dropdown.Item text="May" />
                    <Dropdown.Item text="June" />
                    <Dropdown.Item text="July" />
                    <Dropdown.Item text="August" />
                    <Dropdown.Item text="September" />
                    <Dropdown.Item text="October" />
                    <Dropdown.Item text="November" />
                    <Dropdown.Item text="Decenber" />
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
                label="Organization or project name"
                htmlFor="project-name"
                required />
            </div>
            <div>
              {/* Input Email */}
              <TextField 
                element="input"
                type="email"
                label="Email"
                htmlFor="email"
                required />
            </div>
            {/* Textarea About */}
            <div>
              <TextField 
                element="textarea"
                label="About"
                htmlFor="about"
                required />
            </div>
            {/* Input logo */}
            <div className="project-logo">
              <Label type="form">Company or project logo</Label>
              <Typography variant="body-s" element="p" className="recomended">Recommended size: 100 x 100px</Typography>
              <Button secondary className="btn-upload">Upload logo</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container">
        <div className="actions">
          <Button primary disabled>Submit</Button>
          <Button secondary disabled>Preview</Button>
        </div>
      </div>
    </div>
  );
}
export default PostAJobs;