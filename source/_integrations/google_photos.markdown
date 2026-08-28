---
title: Google Photos
description: Instructions on how to use Google Photos in Home Assistant.
ha_category:
  - Media source
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_config_flow: true
ha_domain: google_photos
ha_codeowners:
  - '@allenporter'
ha_integration_type: service
api: Google Photos Library API
api_link: https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com
related:
  - docs: /integrations/media_source
    title: Media source integration documentation
  - url: https://photos.google.com/
    title: Google Photos
  - url: https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com
    title: Google Developers Console
---

The **Google Photos** {% term integration %} allows you to upload photos to your [Google Photos](https://photos.google.com/) using Home Assistant. The integration adds an action for uploading photos and a
[media source](/integrations/media_source) to view or cast the content uploaded by
Home Assistant. This integration does not give Home Assistant access to your
entire Google Photos library.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [Google Tasks](/integrations/google_tasks), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Photos.

{% details "OAuth and Device Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Select **Continue**. Keep in mind this is giving sensitive access to your private Photo Library.

4. The page will now display **Link account to Home Assistant?**, note **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a **Success!** message from Home Assistant.

{% enddetails %}


{% include integrations/actions.md %}


## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.
