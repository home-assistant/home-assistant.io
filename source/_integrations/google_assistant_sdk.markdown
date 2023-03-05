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
ha_quality_scale: platinum
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
- Playback Google Assistant audio response for any query on any media player. Examples:
  - Tell me a joke
  - Say the ABC
  - Sing happy birthday
  - What does the elephant say?
- Having a conversation with Google Assistant using the [conversation](/integrations/conversation/) integration via text or voice.

<lite-youtube videoid="a-Is8GtLJCs" videotitle="Controlling Google Home With Home Assistant!" posterquality="maxresdefault"></lite-youtube>

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
4. Click on the field on the left of the screen, **OAuth Consent Screen**.
5. Select **External** and **Create**.
6. Set the _App Name_ (the name of the application asking for consent) to anything you want e.g. _Home Assistant_.
7. You then need to select a _Support email_. To do this, simply click the drop down box and select your email address.
8. You finally need to complete the section: _Developer contact information_. To do this, simply enter your email address (same as above is fine).
9. Scroll to the bottom and click **Save and Continue**. Don't have to fill out anything else or it may enable additional review.
10. You will then be automatically taken to the Scopes page. You do not need to add any scopes here so click Save and Continue to move to the Optional info page. You do not need to add anything to the Optional info page so click Save and Continue which will take you to the Summary page. Click Back to Dashboard.
11. Click **OAuth consent screen** again and set _Publish Status_ to **Production** otherwise your credentials will expire every 7 days.
12. Make sure **Publishing status** is set to production.
13. Click **Credentials** in the menu on the left hand side of the screen, then click **Create credentials** (at the top of the screen), then select _OAuth client ID_.
14. Set the Application type to _Web application_ and give this credential set a name (like "Home Assistant Credentials").
15. Add https://my.home-assistant.io/redirect/oauth to _Authorized redirect URIs_ then click **Create**.
16. You will then be presented with a pop-up saying _OAuth client created_ showing _Your Client ID_ and _Your Client Secret_. Make a note of these (for example, copy and paste them into a text editor) as you will need these shortly. Once you have noted these strings, click **OK**. If you need to find these credentials again at any point then simply navigate to _APIs & Services > Credentials_ and you will see _Home Assistant Credentials_ (or whatever you named them in the previous step) under _OAuth 2.0 Client IDs_. To view both the _Client ID_ and _Client secret_, click on the pencil icon, this will take you to the settings page for these credentials and the information will be on the right hand side of the page.
17. Double check that the _Google Assistant API_ has been automatically enabled. To do this, select **Library** from the menu, then search for _Google Assistant API_. If it is enabled you will see _API Enabled_ with a green tick next to it. If it is not enabled, then enable it.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Assistant API.

{% details "Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Click **Continue**.

4. The page will now display _Link account to Home Assistant?_, note _Your instance URL_. If this is not correct, please refer to [My Home Assistant](/integrations/my). If everything looks good, click **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a _Success!_ message from Home Assistant.

{% enddetails %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

If commands don't work try removing superfluous words such as "the". E.g. "play rain sounds on bedroom speaker" instead of "play rain sounds on the bedroom speaker".

If broadcasting doesn't work, make sure: the speakers aren't in do not disturb mode, the Home Assistant server is in the same network as the speakers, and IPv6 is disabled in the router.

## Limitations/known issues

Multiple Google accounts are not supported.

Limitations of the underlying library are listed [here](https://github.com/tronikos/gassist_text#limitationsknown-issues) (media playback, routines, and personal results are not working).

## Configuration

On the configure page, you can set the language code of the interactions with Google Assistant. If not configured, the integration picks one based on Home Assistant's configured language and country. Supported languages are listed [here](https://developers.google.com/assistant/sdk/reference/rpc/languages)

## Services

### Service `google_assistant_sdk.send_text_command`

You can use the service `google_assistant_sdk.send_text_command` to send commands to Google Assistant.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `command`              | no       | Command(s) to send to Google Assistant. | turn off kitchen TV |
| `media_player`         | yes      | Name(s) of media player entities to play response on | media_player.living_room_speaker |

Examples:

```yaml
service: google_assistant_sdk.send_text_command
data:
  command: "turn off kitchen TV"
```

```yaml
# Say a joke on the living room speaker
service: google_assistant_sdk.send_text_command
data:
  command: "tell me a joke"
  media_player: media_player.living_room_speaker
```

You can also send multiple commands in the same conversation context which is useful to unlock doors or open covers that need a PIN. Example:

```yaml
service: google_assistant_sdk.send_text_command
data:
  command:
    - "open the garage door"
    - "1234"
```

### Service `notify.google_assistant_sdk`

You can use the service `notify.google_assistant_sdk` to broadcast messages to Google Assistant speakers and displays without interrupting music/video playback.

| Service data attribute | Optional | Description                 | Example                      |
| ---------------------- | -------- | --------------------------- | ---------------------------- |
| `message`              | no       | Message to broadcast.       | someone is at the front door |
| `target`               | yes      | Rooms (in Google Assistant) | bedroom                      |

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

## Conversation agent

In the configure options of the integration, enable the conversation agent and then you can converse with Google Assistant by tapping the Assist icon at the top right of your dashboard:

![Screenshot Conversation](/images/integrations/google_assistant_sdk/conversation.png)

Or by calling the `conversation.process` service with the transcribed text:

```yaml
service: conversation.process
data:
  text: "Dim the family room lights"
```

Note: due to a bug in the Google Assistant API, not all responses contain text, especially for home control commands, like turn on the lights. These will be shown as `<empty response>`. For those, Google Assistant responds with HTML and Home Assistant integrations are [not allowed](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md) to parse HTML.
