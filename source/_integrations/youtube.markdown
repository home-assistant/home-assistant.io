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

The YouTube integration allows you to connect YouTube channels to Home Assistant.
For every channel you add, it will create sensors for:
- Subscriber count
- The latest uploaded video

## Prerequisites

To be able to configure the integration, you need to have a YouTube channel.
How to create one can be found [here](https://support.google.com/youtube/answer/1646861).

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [Google Mail](/integrations/google_mail) and [Google Sheets](/integrations/google_sheets).
These are not the same as the one for [Google Calendar](/integrations/google).
If you have already set up the correct credentials, you can do step 1 and then skip to step 13 on the below instructions.

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to connect to YouTube.

{% details "OAuth and Device Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Select **Continue**.

4. The page will now display **Link account to Home Assistant?**, note **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a **Success!** message from Home Assistant.

{% enddetails %}
