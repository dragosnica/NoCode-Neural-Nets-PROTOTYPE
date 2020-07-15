import mjml2html from 'mjml';
import * as emailLayouts from './emailLayouts';

function mjmlToHTML(mjmlTemplate) {
  const output = mjml2html(mjmlTemplate);
  return output.html;
}

export function renderConfirmationEmail(req) {
  const emailSubject = `No Code Neural Nets signup confirmation - ${req.body.username}`;
  const templateOptions = {
    heading: 'Signup email confirmation',
    greeting: `Hi, ${req.body.username}`,
    message: "To confirm you'd like to associate this email address with your ".concat(
      'NoCode Neural Nets account, click on the button below:'
    ),
    link: req.body.link,
    buttonText: 'Verify email',
    directLinkText: 'You can also copy and paste this URL into your browser:',
    note: 'This link is only valid for the next 24 hours.',
    meta: {
      keywords: 'NoCode Neural Nets, neural networks, no code',
      description: 'NoCode Neural Nets is a no-code development platform (NCDP)'.concat(
        'for rapid prototyping and visualization of neural networks behaviour on custom data.'
      )
    }
  };

  const emailTemplateMJML = emailLayouts.signupConfirmationEmailLayout(templateOptions);
  const emailTemplateHTML = mjmlToHTML(emailTemplateMJML);

  return {
    ...req,
    emailTemplateHTML,
    emailSubject,
  };
}

export function renderResetPasswordEmail(req) {
  const emailSubject = `No Code Neural Nets password reset - ${req.body.username}`;
  const templateOptions = {
    heading: 'Password reset',
    greeting: `Hi, ${req.body.username}`,
    message: 'A request to reset the password for your No Code Neural Nets account was received. '.concat(
      'Enter the password reset code below on the page you were redirect to: '
    ),
    tokenText: `${req.body.token}`,
    urlMessage: 'Click below in case you closed the page for password reset',
    link: req.body.link,
    buttonText: 'Reset password',
    note: 'This code is only valid for the next 24 hours. '.concat(
      "If you didn't submit this request, please ignore this email. "
    ).concat('Your password will remain unchanged'),
    meta: {
      keywords: 'NoCode Neural Nets, neural networks, no code',
      description: 'NoCode Neural Nets is a no-code development platform (NCDP)'.concat(
        'for rapid prototyping and visualization of neural networks behaviour on custom data.'
      )
    }
  };

  const emailTemplateMJML = emailLayouts.resetPasswordEmailLayout(templateOptions);
  const emailTemplateHTML = mjmlToHTML(emailTemplateMJML);

  return {
    ...req,
    emailTemplateHTML,
    emailSubject,
  };
}

export function renderPasswordChangedEmail(req) {
  const emailSubject = `No Code Neural Nets password changed - ${req.body.username}`;
  const templateOptions = {
    heading: 'Password changed',
    greeting: `Hi, ${req.body.username}`,
    message: 'This is just a confirmation that the password for '.concat(
      'your No Code Neural Nets account has been successfully updated.'
    ),
    greeting2: 'Have a nice day !',
    meta: {
      keywords: 'NoCode Neural Nets, neural networks, no code',
      description: 'NoCode Neural Nets is a no-code development platform (NCDP)'.concat(
        'for rapid prototyping and visualization of neural networks behaviour on custom data.'
      )
    }
  };

  const emailTemplateMJML = emailLayouts.passwordChangedEmailLayout(templateOptions);
  const emailTemplateHTML = mjmlToHTML(emailTemplateMJML);

  return {
    ...req,
    emailTemplateHTML,
    emailSubject,
  };
}
