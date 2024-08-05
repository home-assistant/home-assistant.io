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

The Google Mail integration allows you to connect your [Google Mail](https://mail.google.com) to Home Assistant. The integration adds an action to allow you to set an email auto-response for when you go on vacation. A `notify` action is also added, allowing you to draft or send emails in plain text.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest) and [Google Sheets](/integrations/google_sheets) and [YouTube](/integrations/youtube).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

### Action `google_mail.set_vacation`

You can use the `google_mail.set_vacation` action to set vacation options.

{% details "Create event action  details" %}

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `enabled` | yes | Turn this off to end vacation responses. | True
| `title` | no | The subject for the email. | Vacation
| `message` | yes | Body of the email. | I am on vacation.
| `plain_text` | no | Choose to send message in plain text or HTML. | True
| `restrict_contacts` | no | Restrict automatic reply to contacts. | True
| `restrict_domain` | no | Restrict automatic reply to domain. This only affects GSuite accounts. | False
| `start` | no | First day of the vacation. | 11-20-2022
| `end` | no | Last day of the vacation. | 11-26-2022

{% enddetails %}

The added `notify` service will be named after the email address you chose on the consent screen. For example, an email address named "example@gmail.com" wil display as `notify.example_gmail_com`.

### Google Mail notify action data

The following attributes can be placed inside the `data` key of the action for extended functionality:

| Attribute              | Optional | Description |
| ---------------------- | -------- | ----------- |
| `cc`               |      yes | List of recipients to be carbon copied.
| `bcc`                   |      yes | List of recipients to be back carbon copied.
| `from`                   |      yes | Default is current authenticated user. Typically only applies to GSuite accounts where the user has delegate access to a shared mailbox.
| `send`                 |      yes | Default is true. Set this to false to create a draft instead. Recipients are not required in this instance.

### Examples

This is the full service call to send an email:

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
```

### Video tutorial

This video tutorial explains how to set up Gmail in Home Assistant and how you can create a dashboard and automations to send email and toggle your out-of-office notice.

<lite-youtube videoid="IHKliqSFZvM" videotitle="How To send e-mail PERFECTLY using Gmail in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>
