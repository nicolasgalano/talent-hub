import { FC, useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'
import { Button } from 'decentraland-ui/dist/components/Button/Button';
import { subscriptionSuccess, subscriptionMailbox } from '../../../assets/illustrations';
import Typography from '../Typography/Typography';
import { ErrorMessage, Form, Formik, useField, Field } from "formik";
import * as yup from "yup";
import TextField from "../TextField/TextField";
import useApi from "../../hooks/useApi";
import { namespaces } from '../../../i18n/i18n.constants';
import { useTranslation } from 'react-i18next';

import './SubscriptionBox.scss';

interface SubscriptionBoxProps {
  title: string;
  description: string;
  thankyou_title: string;
  thankyou_description: string;
  placeholder: string;
  buttonText: string;
}    

interface Subscription {
  success: boolean;
}

interface FormInterface {
  Email: string;
}

const SubscriptionBox:FC<SubscriptionBoxProps> = ({title, description, thankyou_title, thankyou_description, placeholder, buttonText}) => {
  const { t } = useTranslation([namespaces.pages.openingcreate, namespaces.common]);
  const [subscription, setSubscription] = useState<Subscription>({success: false});
  const [formData, setFormData] = useState<FormInterface>(null);
  const onClick = () => setSubscription({ success: true });

  const initialValues: FormInterface = {
    Email: '',
  };

  const formSchema = yup.object().shape({
    Email: yup.string().email(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.invalid-email", {ns: namespaces.common}))
      .required(t("general.email", {ns: namespaces.common}) + ' ' + t("forms.required", {ns: namespaces.common}))
  });

  const {
    response: responseSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
    sendData } = useApi({
    url: '/Newsletters',
    method: 'POST',
    data: JSON.stringify(formData),
  });

  useEffect(() => {
    if (formData !== null) {
      sendData();
    }
  }, [formData]);

  useEffect(() => {
    console.log('responseSubmit', responseSubmit);
    if (responseSubmit && responseSubmit.status == 200) {
      setSubscription({ success: true });
    }
  }, [responseSubmit]);

  return (
    <div className={`subscription-box ${subscription.success ? 'subscription-success' : ''}`}>
      <div className="illustration">
        {!subscription.success && (
          <img src={subscriptionMailbox} alt={title} />
        )}
        {subscription.success && (
          <img src={subscriptionSuccess} alt={title} />
        )}
      </div>
      <div className="info">
        {!subscription.success && (
          <div className="info-cont">
            <Typography variant="heading-s" element="h3" className="title">{title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{description}</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={formSchema}
              onSubmit={(values, action) => {
                let data: FormInterface = Object.assign({}, values);
                console.log(data, values);
                setFormData(data);
              }}>
              {(formik) => (
                <Form>
                  <div className="form">
                    {/*<Input className="field" icon placeholder={placeholder}>
                      <input className="body-s" />
                    </Input>*/}
                    <div className="ui icon input field">
                      <Field name="Email">
                        {({ field, form, meta }) => {
                          console.log(field);
                          return (
                            <>
                              <input className="body-s" type="email" {...field} placeholder={placeholder} />
                              {meta.touched &&
                                meta.error && <ErrorMessage name="Email" className="form-message error" component="div"/>}
                            </>
                          )
                        }}
                      </Field>
                    </div>
                    {/*<TextField
                      element="input"
                      type="email"
                      label={placeholder}
                      name="Email"
                      id="Email"
                      required />*/}
                    <Button
                      primary
                      loading={loadingSubmit}
                      size="large">
                      {buttonText}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            {/*<div className="form">
              <Input className="field" icon placeholder={placeholder}>
                <input className="body-s" />
              </Input>
              <Button primary size="large" onClick={onClick}>
                {buttonText}
              </Button>
            </div>*/}
          </div>
        )}
        {subscription.success && (
          <div className="info-cont">
            <Typography variant="heading-s" element="h3" className="title">{thankyou_title}</Typography>
            <Typography variant="body-xl" element="p" className="description">{thankyou_description}</Typography>
          </div>
        )}
        
      </div>
    </div>
  );
}
 
export default SubscriptionBox;