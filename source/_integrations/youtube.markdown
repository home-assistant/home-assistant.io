---
title: YouTube
description: Instructions on how to integrate YouTube within Home Assistant.
ha_category:
  - Sensor
ha_release: '2023.6'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: youtube
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
google_dev_console_link: https://console.cloud.google.com/apis/library/youtube.googleapis.com
api: YouTube Data API v3
api_link: https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=home-assistant-17698
---

The **YouTube** {% term integration %} allows you to connect YouTube channels to Home Assistant.
For every channel you add, it will create sensors for:
- Views count
- Subscriber count
- The latest uploaded video

## Prerequisites

To be able to configure the {% term integration %}, you need to have a YouTube channel.
To learn how to create one, refer to the [YouTube documentation](https://support.google.com/youtube/answer/1646861).

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [Google Mail](/integrations/google_mail) and [Google Sheets](/integrations/google_sheets).
These are not the same as the one for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}
