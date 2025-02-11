---
title: Google Assistant SDK
description: Instructions on how to use Google Assistant SDK in Home Assistant.
ha_category:
  - Notifications
  - Voice
ha_iot_class: Cloud Polling
ha_release: 2023.1
ha_config_flow: true
ha_domain: google_assistant_sdk
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_platforms:
  - diagnostics
  - notify
google_dev_console_link: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
api: Google Assistant API
api_link: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
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
These credentials are the same as the ones for [Nest](/integrations/nest) or [Google Sheets](/integrations/google_sheets), [YouTube](/integrations/youtube), and [Google Mail](/integrations/google_mail).

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Google Assistant API.

{% details "Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. If your Google account settings are set to a language not supported by the SDK -- which can be noticed by the authentication screen of Google being localized in that language -- the authorization will fail without a clear error. Changing the language at the bottom of the error page to one that is [supported](https://developers.google.com/assistant/sdk/reference/rpc/languages) by the SDK will allow you to continue to the link page of Home Assistant.

3. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

4. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Click **Continue**.

5. The page will now display _Link account to Home Assistant?_, note _Your instance URL_. If this is not correct, please refer to [My Home Assistant](/integrations/my). If everything looks good, click **Link Account**.

6. You may close the window, and return back to Home Assistant where you should see a _Success!_ message from Home Assistant.

{% enddetails %}

## Enable personal results (for advanced users)

This guide shows you how to enable personal commands such as "remind me tomorrow at 9 pm to take out the trash".

This guide is for advanced users only. It requires creating an OAuth client ID of the Desktop app, running a Python program on your desktop or laptop, copying the resulting credentials to your Home Assistant config files, and likely running an Android emulator.

 ### Prerequisites
 
- Successfully installed the Google Assistant integration.

{% details "Create credentials" %}

1. Navigate to [Google Developers Console > Credentials](https://console.cloud.google.com/apis/credentials).
2. Select the project you created earlier from the dropdown menu in the upper left corner.
3. Select **Create credentials** (at the top of the screen), then select **OAuth client ID**.
4. Set the Application type to **Desktop app** and give this credential set a name (like "Home Assistant Desktop Credentials").
5. Select **Create**.
6. In the OAuth client-created screen, select **Download JSON**.
7. Rename the downloaded file to `client_secret.json`.
8. On your Windows, Linux, or Mac machine, download Python if you don't have it already.
9. Open the terminal (on Windows, select **Start** and then type `cmd`).
10. In the terminal, run the following commands (preferably in a Python virtual environment):
11. `python -m pip install --upgrade google-auth-oauthlib[tool]`
  - Under Windows: `google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --scope https://www.googleapis.com/auth/gcm --save --client-secrets %userprofile%\Downloads\client_secret.json`
  - Under Linux: `google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --scope https://www.googleapis.com/auth/gcm --save --client-secrets ~/Downloads/client_secret.json`
  - **Result**: A browser window will open, asking you to select the account to continue to the cloud project you created earlier.
12. Once you select the correct account, select both checkboxes:
  - **Use your Google Assistant: broad access to your Google account**
  - **Send information to your Android device**
13. Select **Continue**.
  - **Result**: If everything was successful, you will get a **The authentication flow has completed. You may close this window** message in your browser.
  - In your terminal you will see the path where the credentials were saved. For example: `credentials saved: C:\Users\user\AppData\Roaming\google-oauthlib-tool\credentials.json`
14. Open the `credentials.json` in a text editor. Keep it open since you will need to copy several values from it.
15. In the file editor of your Home Assistant, typically http://homeassistant.local:8123/core_configurator, open `/homeassistant/.storage/application_credentials`.
  - Locate the entry for `google_assistant_sdk` and modify `client_id` and `client_secret` to match the ones from `credentials.json`.
  - Save the file.
16. Open `/homeassistant/.storage/core.config_entries`.
  - Locate the entry for `google_assistant_sdk` and modify `refresh_token` to match the one from `credentials.json`.
  - Save the file.
17. Restart Home Assistant.

{% enddetails %}

{% details "Enable personal results" %}

1. Go to  **{% my developer_services title="Developer Tools > Actions" %}** and issue a query that requires personal results, for example call `google_assistant_sdk.send_text_command` with `command: "what is my name"`
2. On your phone, you should receive a notification **Allow personal answers** **Allow Google Assistant to answer your questions about your calendar, trips, and more**.
3. DO NOT tap on **ALLOW** (it won't work until you enter a device name). Instead, tap on the notification text.
4. If the app doesn't open, you need to retry on a device running Android 12. If you don't have such a device, you can use an Android emulator.
5. Tap on **Device Name**, enter any device name (like Home Assistant), and tap on **OK**.
6. Only after having a non-empty device name, enable the checkbox next to **Personal results**.

{% enddetails %}

## Troubleshooting

If you have an error with your credentials you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

If commands don't work try removing superfluous words such as "the". E.g. "play rain sounds on bedroom speaker" instead of "play rain sounds on the bedroom speaker".

If broadcasting doesn't work, make sure: the speakers aren't in do not disturb mode, the Home Assistant server is in the same network as the speakers.

The easiest way to check if the integration is working is to check [My Google Activity](https://myactivity.google.com/myactivity) for the issued commands and their responses.

## Limitations/known issues

- Multiple Google accounts are not supported.
- If you see the issued commands in [My Google Activity](https://myactivity.google.com/myactivity), the integration is working fine. If the commands don't have the expected outcome, don't open an issue in the Home Assistant Core project or the [underlying library](https://github.com/tronikos/gassist_text). You should instead report the issue directly to Google [here](https://github.com/googlesamples/assistant-sdk-python/issues). Examples of known Google Assistant API issues:
  - Media playback commands (other than play news, play podcast, play white noise, or play rain sounds) don't work.
  - Routines don't work.
  - Google Assistant automations that use `assistant.event.OkGoogle` as a starter cannot be triggered.
  - Broadcast to specific rooms often doesn't work for non-English languages.
  - Commands that need to verify your identity through voice match do not work.

## Configuration

On the configure page, you can set the language code of the interactions with Google Assistant. If not configured, the integration picks one based on Home Assistant's configured language and country. Supported languages are listed [here](https://developers.google.com/assistant/sdk/reference/rpc/languages).

## Actions

### Send text command

You can use the `google_assistant_sdk.send_text_command` action to send commands to Google Assistant.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `command`              | no       | Command(s) to send to Google Assistant. |
| `media_player`         | yes      | Name(s) of media player entities to play response on |

Examples:

```yaml
action: google_assistant_sdk.send_text_command
data:
  command: "turn off kitchen TV"
```

```yaml
# Say a joke on the living room speaker
action: google_assistant_sdk.send_text_command
data:
  command: "tell me a joke"
  media_player: media_player.living_room_speaker
```

You can send multiple commands in the same conversation context which is useful to unlock doors or open covers that need a PIN. Example:

```yaml
action: google_assistant_sdk.send_text_command
data:
  command:
    - "open the garage door"
    - "1234"
```

You can get responses. Example:

```yaml
action: google_assistant_sdk.send_text_command
data:
  command:
    - "tell me a joke"
    - "tell me another one"
```

returns:

```yaml
responses:
  - text: |-
      What do you call a belt made of watches?
      A waist of time 👖 🕝
  - text: |-
      What's the most musical part of the turkey?
      The drumsticks 🍗
```

### Action `notify.google_assistant_sdk`

You can use the `notify.google_assistant_sdk` action to broadcast messages to Google Assistant speakers and displays without interrupting music/video playback.

| Data attribute | Optional | Description                 | Example                      |
| ---------------------- | -------- | --------------------------- | ---------------------------- |
| `message`              | no       | Message to broadcast.       | someone is at the front door |
| `target`               | yes      | Rooms (in Google Assistant) | bedroom                      |

Example to broadcast to all speakers:

```yaml
action: notify.google_assistant_sdk
data:
  message: time for dinner
```

Example to broadcast to speakers in selected rooms:

```yaml
action: notify.google_assistant_sdk
data:
  message: time for dinner
  target:
    - bedroom
    - basement
```

## Conversation agent

You can add an assistant with the conversation agent set to "Google Assistant SDK".
See setup your assistant section [here](/voice_control/voice_remote_local_assistant/).
Then you can converse with Google Assistant by tapping the Assist icon at the top right of your dashboard:

![Screenshot Conversation](/images/integrations/google_assistant_sdk/conversation.png)

Or by calling the `conversation.process` action.

Note: due to a bug in the Google Assistant API, not all responses contain text, especially for home control commands, like turn on the lights. These will be shown as `<empty response>`. For those, Google Assistant responds with HTML and Home Assistant integrations are [not allowed](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md) to parse HTML.
