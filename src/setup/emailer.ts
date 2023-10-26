import { EmailClient } from '@ekarpovs/simple-email-client';

export const setupEmailer = () => {
  const emailClientConfig = {
    name: 'gmail',
    user: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  };
  return new EmailClient(emailClientConfig);
};
