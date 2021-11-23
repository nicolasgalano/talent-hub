import { FC, Fragment } from "react";

// Files
import './PostAJobs.scss';

// UI Custom Component
import TextField from "../../components/common/TextField/TextField";
import Typography from "../../components/common/Typography/Typography";
import Label from "../../components/common/Label/Label";
import Range from "../../components/common/Range/Range";

const PostAJobs:FC = () =>{
  return(
    <div id="post-a-jobs">
      <div className="fakeHero"></div>
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
            {/* Checkbox's Fields */}
            <div>
              <Label type="form" required>Fields</Label>
            </div>
            {/* Input Experience */}
            <div>
              <Label type="form" required>Experience required</Label>
              <Range />
            </div>
            {/* Checkbox's Working schedule */}
            <div>
              <Label type="form" required>Working schedule</Label>
            </div>
            {/* Input Salary */}
            <div>
              <Label type="form" required>Salary</Label>
            </div>
            {/* Select Start date */}
            <div>
              <Label type="form" required>Start date</Label>
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
            <div>
              <Label type="form">Company or project logo</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostAJobs;