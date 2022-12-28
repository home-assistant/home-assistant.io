---
title: Google Assistant SDK
description: Instructions on how to use Google Assistant SDK in Home Assistant.
ha_category:
  - Utility
ha_iot_class: Cloud Polling
ha_release: 2023.1
ha_config_flow: true
ha_domain: google_assistant_sdk
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_platforms:
  - notify
---

The Google Assistant SDK integration allows Home Assistant to interact with Google Assistant. If you want to use Google Assistant (for example, from your phone or Google Home device) to interact with your Home Assistant managed devices, then you want the [Google Assistant](/integrations/google_assistant) integration.

This integration allows:

- Sending text commands to Google Assistant to control devices supported by Google Assistant but not by Home Assistant. Examples:
  - Set Nest Guard to home and guarding
  - Start vacuuming
  - Stream front door on living room TV
  - Turn off kitchen TV
  - Play rain sounds on bedroom speaker
- Broadcast messages to Google Assistant speakers and displays without interrupting music/video playback. Examples:
  - Coffee is ready
  - Someone is at the front door
  - Smoke detected in the master bedroom
  - Water leak detected in the master bathroom

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Nest](/integrations/nest) or [Google Sheets](/integrations/google_sheets).
If you have already set up credentials, you can do step 1 and then skip to step 13 on the below instructions.

{% details "Generate Client ID and Client Secret" %}

This section explains how to generate a Client ID and Client Secret on
[Google Developers Console](https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview).

1. First go to the Google Developers Console to enable [Google Assistant API](https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview)
2. Select an existing project or create a new one from the dropdown menu in the upper left corner.
3. Click to enable this API.
4. From the left sidebar click on [Credentials](https://console.cloud.google.com/apis/credentials)
5. Click on the field on the left of the screen, **OAuth Consent Screen**.
6. Select **External** and **Create**.
7. Set the *App Name* (the name of the application asking for consent) to anything you want e.g.  *Home Assistant*.
8. You then need to select a *Support email*. To do this, simply click the drop down box and select your email address.
9. You finally need to complete the section: *Developer contact information*. To do this, simply enter your email address (same as above is fine).
10. Scroll to the bottom and click **Save and Continue**. Don't have to fill out anything else or it may enable additional review.
11. You will then be automatically taken to the Scopes page. You do not need to add any scopes here so click Save and Continue to move to the Optional info page. You do not need to add anything to the Optional info page so click Save and Continue which will take you to the Summary page. Click Back to Dashboard.
12. Click **OAuth consent screen** again and set *Publish Status* to **Production** otherwise your credentials will expire every 7 days.
13. Make sure **Publishing status** is set to production.
14. Click **Credentials** in the menu on the left hand side of the screen, then click **Create credentials** (at the top of the screen), then select *OAuth client ID*.
15. Set the Application type to *Web application* and give this credential set a name (like "Home Assistant Credentials").
16. Add https://my.home-assistant.io/redirect/oauth to *Authorized redirect URIs* then click **Create**.
17. You will then be presented with a pop-up saying *OAuth client created* showing *Your Client ID* and *Your Client Secret*. Make a note of these (for example, copy and paste them into a text editor) as you will need these shortly. Once you have noted these strings, click **OK**. If you need to find these credentials again at any point then simply navigate to *APIs & Services > Credentials* and you will see *Home Assistant Credentials* (or whatever you named them in the previous step) under *OAuth 2.0 Client IDs*. To view both the *Client ID* and *Client secret*, click on the pencil icon, this will take you to the settings page for these credentials and the information will be on the right hand side of the page.
18. Double check that the *Google Assistant API* has been automatically enabled. To do this, select **Library** from the menu, then search for *Google Assistant API*. If it is enabled you will see *API Enabled* with a green tick next to it. If it is not enabled, then enable it.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Assistant API.

{% details "Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Click **Continue**.

4. The page will now display *Link account to Home Assistant?*, note *Your instance URL*. If this is not correct, please refer to [My Home Assistant](/integrations/my). If everything looks good, click **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a *Success!* message from Home Assistant.

{% enddetails %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

## Configuration

On the configure page, you can set the language code of the interactions with Google Assistant. If not configured, the integration picks one based on Home Assistant's configured language and country.

## Services

### Service `google_assistant_sdk.send_text_command`

You can use the service `google_assistant_sdk.send_text_command` to send commands to Google Assistant.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `command`              | no       | Command to send to Google Assistant. | turn off kitchen TV |

Example:

```yaml
service: google_assistant_sdk.send_text_command
data:
  command: turn off kitchen TV
```

### Service `notify.google_assistant_sdk`

You can use the service `notify.google_assistant_sdk` to broadcast messages to Google Assistant speakers and displays without interrupting music/video playback.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `message`              | no       | Message to broadcast. | someone is at the front door |
| `target`               | yes      | Rooms (in Google Assistant) | bedroom |

Example to broadcast to all speakers:

```yaml
service: notify.google_assistant_sdk
data:
  message: time for dinner
```

Example to broadcast to speakers in selected rooms:

```yaml
service: notify.google_assistant_sdk
data:
  message: time for dinner
  target:
    - bedroom
    - basement
```
