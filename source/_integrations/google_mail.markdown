---
title: Google Mail
description: Instructions on how to use Google Mail in Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Polling
ha_release: '2023.2'
ha_config_flow: true
ha_domain: google_mail
ha_platforms:
  - notify
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

The Google Mail integration allows you to connect your [Google Mail](https://mail.google.com) to Home Assistant. The integration adds a service to allow you to set an email auto-response for when you go on vacation. A `notify` service is also added, allowing you to draft or send emails in plain text.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest) and [Google Sheets](/integrations/google_sheets).
These are not the same as the one for [Google Calendar](/integrations/google).
If you have already set up the correct credentials, you can do step 1 and then skip to step 13 on the below instructions.

{% details "Generate Client ID and Client Secret" %}

This section explains how to generate a Client ID and Client Secret on
[Google Developers Console](https://console.cloud.google.com/apis/library/gmail.googleapis.com?project=home-assistant-17698).

1. First, go to the Google Developers Console to enable [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com?project=home-assistant-17698)
2. The wizard will ask you to choose a project to manage your application. Select a project and click continue.
3. Verify that your Gmail API was enabled and click 'Go to credentials'
4. Navigate to APIs & Services (left sidebar) > [Credentials](https://console.cloud.google.com/apis/credentials)
5. Click on the field on the left of the screen, **OAuth Consent Screen**.
6. Select **External** and **Create**.
7. Set the *App Name* (the name of the application asking for consent) to anything you want, e.g., *Home Assistant*.
8. You then need to select a *Support email*. To do this, click the drop-down box and select your email address.
9. You finally need to complete the section: *Developer contact information*. To do this, enter your email address (the same as above is fine).
10. Scroll to the bottom and click **Save and Continue**. You don't have to fill out anything else, or it may enable additional review.
11. You will then be automatically taken to the Scopes page. You do not need to add any scopes here, so click Save and Continue to move to the Optional info page. You do not need to add anything to the Optional info page, so click Save and Continue, which will take you to the Summary page. Click Back to Dashboard.
12. Click **OAuth consent screen** again and set *Publish Status* to **Production** otherwise your credentials will expire every 7 days.
13. Make sure **Publishing status** is set to production.
14. Click **Credentials** in the menu on the left-hand side of the screen, then click **Create credentials** (at the top of the screen), then select *OAuth client ID*.
15. Set the Application type to *Web application* and give this credential set a name (like "Home Assistant Credentials").
16. Add https://my.home-assistant.io/redirect/oauth to *Authorized redirect URIs* then click **Create**. This is not a placeholder and is the URI that must be used.
17. You will then be presented with a pop-up saying *OAuth client created* showing *Your Client ID* and *Your Client Secret*. Make a note of these (for example, copy and paste them into a text editor), as you will need these shortly. Once you have noted these strings, click **OK**. If you need to find these credentials again at any point, then navigate to *APIs & Services > Credentials*, and you will see *Home Assistant Credentials* (or whatever you named them in the previous step) under *OAuth 2.0 Client IDs*. To view both the *Client ID* and *Client secret*, click on the pencil icon; this will take you to the settings page for these credentials, and the information will be on the right-hand side of the page.
18. Double-check that the *Gmail API* has been automatically enabled. To do this, select **Library** from the menu, then search for *Gmail API*. If it is enabled you will see *API Enabled* with a green tick next to it. If it is not enabled, then enable it.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Mail.

{% details "OAuth and Device Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Click **Continue**.

4. The page will now display *Link account to Home Assistant?*, note *Your instance URL*. If this is not correct, please refer to [My Home Assistant](/integrations/my). If everything looks good, click **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a *Success!* message from Home Assistant.

{% enddetails %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

### Service `google_mail.set_vacation`

You can use the service `google_mail.set_vacation` to set vacation options.

{% details "Create Event Service details" %}

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `enabled` | yes | Turn this off to end vacation responses. | True
| `title` | | no | The subject for the email. | Vacation
| `message` | yes | Body of the email. | I am on vacation.
| `plain_text` | no | Choose to send message in plain text or HTML. | True
| `restrict_contacts` | no | Restrict automatic reply to contacts. | True
| `restrict_domain` | no | Restrict automatic reply to domain. This only affects GSuite accounts. | False
| `start` | no | First day of the vacation. | 11-20-2022
| `end` | no | Last day of the vacation. | 11-26-2022

{% enddetails %}

The added `notify` service will be named after the email address you chose on the consent screen. For example, an email address named "example@gmail.com" wil display as `notify.example_gmail_com`.

### Google Mail Notify Service Data

The following attributes can be placed inside the `data` key of the service call for extended functionality:

| Attribute              | Optional | Description |
| ---------------------- | -------- | ----------- |
| `cc`               |      yes | List of recipients to be carbon copied.
| `bcc`                   |      yes | List of recipients to be back carbon copied.
| `from`                   |      yes | Default is current authenticated user. Typically only applies to GSuite accounts where the user has delegate access to a shared mailbox.
| `send`                 |      yes | Default is true. Set this to false to create a draft instead. Recipients are not required in this instance.

### Examples

This is the full service call to send an email:

```yaml
service: notify.example_gmail_com
data:
  message: "test"
  title: "test email"
  target:
    - "example2@gmail.com"
  data:
    cc:
      - "example3@gmail.com"
    bcc:
      - "example4@gmail.com"
    from: "example@gmail.com"
```
