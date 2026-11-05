---
title: Google Docs
description: Instructions on how to use Google Docs in Home Assistant.
ha_categories:
  - productivity_information.documents_photos
ha_iot_class: Cloud Polling
ha_release: '2026.11'
ha_config_flow: true
ha_domain: google_docs
ha_codeowners:
  - '@moryoav'
ha_integration_type: service
ha_quality_scale: bronze
api: Google Docs API
api_link: https://console.cloud.google.com/apis/library/docs.googleapis.com
---

The **Google Docs** {% term integration %} allows you to connect your [Google Drive](https://drive.google.com) to Home Assistant. The integration provides actions to append and read text in a Google document. When you set up a config entry, your drive will have a new document called Home Assistant. You can then rename this to whatever you like.

The integration only accesses the document created during setup. Each config entry creates a separate document. Both actions use the first document tab.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Google Sheets](/integrations/google_sheets/), [Nest](/integrations/nest/), [YouTube](/integrations/youtube/), and [Google Mail](/integrations/google_mail/).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google/).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

{% include integrations/actions.md %}

## Google Docs automation examples

Use the actions to store text from Home Assistant and read it back in scripts or automations.

{% include docs/paste_yaml_tip.md %}

### Automation: append a log entry

Use **Append text** to store a message, such as when your washing machine finishes. Include a newline to keep consecutive entries on separate lines. See the [append text examples](/actions/google_docs.append_text/#more-examples).

- **Action**: Append text
  - **Document**: Your Google Docs document
  - **Text**: The message to store

### Automation: read stored text

Use **Get text** to read the document into a response variable for use in later actions. See the [get text examples](/actions/google_docs.get_text/#more-examples).

- **Action**: Get text
  - **Document**: Your Google Docs document
  - **Response variable**: `document`

## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

If the document is unavailable, check that it still exists and that the Google Docs API is enabled.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration does not delete its Google document. You can delete the document separately in Google Drive if you no longer need it.
