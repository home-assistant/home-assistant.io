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
ha_integration_type: integration
related:
  - docs: /integrations/media_source
    title: Media source integration documentation
  - url: https://photos.google.com/
    title: Google Photos
  - url: https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com
    title: Google Developers Console
---

The **Google Photos** integration allows you to upload photos to your [Google Photos](https://photos.google.com/) using Home Assistant. The integration adds an action for uploading photos and a
[media source](/integrations/media_source) to view or cast the content uploaded by
Home Assistant. This integration does not give Home Assistant access to your
entire Google Photos library.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest), [Google Tasks](/integrations/google_tasks), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).

If you have already set up the correct credentials, you can do step 1 and then skip to step 13 on the below instructions.

{% details "Generate Client ID and Client Secret" %}

This section explains how to generate a Client ID and Client Secret on
[Google Developers Console](https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com).

1. First, go to the Google Developers Console to enable [Google Photos Library API](https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com)
2. The wizard will ask you to choose a project to manage your application. Select a project and select **Continue**.
3. Verify that your Google Photos Library API was enabled and select **Go to credentials**.
4. Navigate to **APIs & Services** (left sidebar) > [Credentials](https://console.cloud.google.com/apis/credentials).
5. Click on the field on the left of the screen, **OAuth Consent Screen**.
6. Select **External** and **Create**.
7. Set the **App Name** (the name of the application asking for consent) to anything you want, for example to *Home Assistant*.
8. You then need to select a **Support email**. To do this, from the dropdown menu, select your email address.
9. You finally need to complete the section: **Developer contact information**. To do this, enter your email address (the same as above is fine).
10. Scroll to the bottom and select **Save and Continue**. You don't have to fill out anything else, or it may enable additional review.
11. You will then be automatically taken to the **Scopes** page. You do not need to add any scopes here, so select **Save and Continue** to move to the **Optional info** page. You do not need to add anything to the **Optional info** page, so select **Save and Continue**, which will take you to the **Summary** page. Select **Back to Dashboard**.
12. Select **OAuth consent screen** again and set **Publish Status** to **Production**. Otherwise, your credentials will expire every 7 days.
13. Make sure **Publishing status** is set to production.
14. Select **Credentials** in the menu on the left-hand side of the screen, then select **Create credentials** (at the top of the screen), then select **OAuth client ID**.
15. Set the Application type to **Web application** and give this credential set a name (like "Home Assistant Credentials").
16. Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** then select **Create**. This is not a placeholder and is the URI that must be used.
17. You will then be presented with a pop-up saying **OAuth client created**, showing **Your Client ID** and **Your Client Secret**. Make a note of these (for example, copy and paste them into a text editor), as you will need them shortly. Once you have noted these strings, select **OK**. If you need to find these credentials again at any point, then navigate to **APIs & Services** > **Credentials**, and you will see **Home Assistant Credentials** (or whatever you named them in the previous step) under **OAuth 2.0 Client IDs**. To view both the **Client ID** and **Client secret**, select the pencil icon. This will take you to the settings page for these credentials, and the information will be on the right-hand side of the page.
18. Double-check that the **Google Photos Library API** has been automatically enabled. To do this, select **Library** from the menu, then search for **Google Photos Library API**. If it is enabled, you will see **API Enabled** with a green tick next to it. If it is not enabled, then enable it.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Photos.

{% details "OAuth and Device Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Select **Continue**. Keep in mind this is giving sensitive access to your private Photo Library.

4. The page will now display **Link account to Home Assistant?**, note **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a **Success!** message from Home Assistant.

{% enddetails %}


### Action `google_photos.upload`

You can use the `google_photos.upload` action to upload Photos from Home Assistant
to Google Photos.

{% details "Upload action details" %}

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `filename` | no | Path to the image to upload. | /mnt/image.jpg |
| `album` | no | Album name that is the destination for the uploaded content. | London vacation |
| `config_entry_id` | no | The ID of the Google Photos config entry. | a1bee602deade2b09bc522749bbce48e |

{% enddetails %}


## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.
