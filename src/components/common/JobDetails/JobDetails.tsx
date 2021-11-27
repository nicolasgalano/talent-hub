import React, { FC } from 'react'

// Files
import './JobDetails.scss';
import { company } from '../../../assets/images';

// Custom component
import Typography from '../Typography/Typography';
import Label from '../Label/Label';

const JobDetails:FC = () => {
  return (
    <div id="job-details">
      {/* Extract */}
      <div className="extract">
        <div className="company-or-project">
          <img src={company} alt="logo" />
          <Typography variant="heading-xxs" element="h2">
            Indicius
          </Typography>
        </div>
        <div className="about">
          <Label type="review">About the organization</Label>
          <Typography variant="body-l" element="p">
            Here goes an introductory text of the organization or project. It could talk about what’s the scope, the main goals, the stage the project is on or what the company does. It shouldn’t be very long, around 150 words max.
          </Typography>
        </div>
      </div>
      {/* Bio */}
      <div className="bio">
        <Typography variant="heading-m" element="h1">Sr. UI Designer</Typography>
        {/* Responsibilities */}
        <Label type="review">Responsibilities</Label>
        <Typography variant="body-l" element="p">
          Here goes a brief description of the responsabilities required for the role. It could talk about what’s expected in terms of professional experience or background too. It shouldn’t be very long, around 150 words max.
        </Typography>
        {/* Benefits */}
        <Label type="review">Benefits</Label>
        <Typography variant="body-l" element="p">
          Healthcare, 3 weeks vacations, budget for courses, lunch ticket.
        </Typography>

        <div className="more-info">
          <div>
            {/* Experience required */}
            <Label type="review">Experience required</Label>
            <Typography variant="body-l" element="p">
              4 - 8 years
            </Typography>
          </div>
          <div>
            {/* Working schedule */}
            <Label type="review">Working schedule</Label>
            <Typography variant="body-l" element="p">
              Full-Time
            </Typography>
          </div>
          <div>
            {/* Start date */}
            <Label type="review">Start date</Label>
            <Typography variant="body-l" element="p">
              September 2021
            </Typography>
          </div>
          <div>
            {/* Type of contract */}
            <Label type="review">Type of contract</Label>
            <Typography variant="body-l" element="p">
              Permanent
            </Typography>
          </div>
          <div>
            {/* Field */}
            <Label type="review">Field</Label>
            <Typography variant="body-l" element="p">
              Test porpose
            </Typography>
          </div>
          <div>
            {/* Salary */}
            <Label type="review">Salary</Label>
            <Typography variant="body-l" element="p">
              $1500 - $2800 USD per month
            </Typography>
          </div>
        </div>
      </div>
      <hr className="divider" />
    </div>
  )
}
export default JobDetails;