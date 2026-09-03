---
title: Google Sheets
description: Instructions on how to use Google Sheets in Home Assistant.
ha_category:
  - Utility
ha_iot_class: Cloud Polling
ha_release: '2022.10'
ha_config_flow: true
ha_domain: google_sheets
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
api: Google Drive API
api_link: https://console.cloud.google.com/apis/library/drive.googleapis.com
api2: Google Sheets API
api2_link: https://console.cloud.google.com/apis/library/sheets.googleapis.com
---

The **Google Sheets** {% term integration %} allows you to connect your [Google Drive](https://drive.google.com) to Home Assistant. The integration adds an action to allow you to append rows to a Sheets document. The idea is that you can store data on there for further processing. When you set up a config entry, your drive will have a new sheet called Home Assistant. You can then rename this to whatever you like.

**Note**:
The integration currently only has access to that one document that is created during setup.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [YouTube](/integrations/youtube), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).


{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

{% include integrations/actions.md %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

### Video tutorial

This video tutorial explains how to set up the Google Sheets integration and how you can add data from Home Assistant to a Google Sheet.

<lite-youtube videoid="hgGMgoxLYwo" videotitle="How to use Google Sheets in Home Assistant - TUTORIAL" posterquality="maxresdefault"></lite-youtube>
