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
google_dev_console_link: https://console.cloud.google.com/apis/library/gmail.googleapis.com
api: Gmail API
api_link: https://console.cloud.google.com/apis/library/gmail.googleapis.com
---

The **Google Mail** {% term integration %} allows you to connect your [Google Mail](https://mail.google.com) to Home Assistant. The integration adds an action to allow you to set an email auto-response for when you go on vacation. A `notify` action is also added, allowing you to draft or send emails in plain text.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest) and [Google Sheets](/integrations/google_sheets) and [YouTube](/integrations/youtube).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Sending emails

The `notify` action added by this integration is named after the email address you chose on the consent screen. For example, an email address named "example@gmail.com" will display as `notify.example_gmail_com`.

The following attributes can be placed inside the `data` key of the action for extended functionality:

- `cc`: List of recipients to be carbon-copied.
- `bcc`: List of recipients to be blind-carbon-copied.
- `from`: Defaults to the current authenticated user. Typically only applies to Google Workspace accounts where the user has delegate access to a shared mailbox.
- `send`: Defaults to `true`. Set this to `false` to create a draft instead. Recipients are not required in this case.
- `alias_from`: Name that is shown to the recipients instead of your email address. To use this option, you must also set `from`.

This is the full action to send an email:

```yaml
action: notify.example_gmail_com
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
    alias_from: "Example alias"
```

{% include integrations/actions.md %}

## Video tutorial

This video tutorial explains how to set up Gmail in Home Assistant and how you can create a dashboard and automations to send email and toggle your out-of-office notice.

<lite-youtube videoid="IHKliqSFZvM" videotitle="How To send e-mail PERFECTLY using Gmail in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>

## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.
