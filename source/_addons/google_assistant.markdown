---
title: "Google Assistant"
description: "Enhance your Hass.io installation with Google Assistant."
featured: true
---

<div class='note'>

If you want to integrate your Google Home or mobile phone running Google Assistant, with Home Assistant, then you want the [Google Assistant component][AssistantIntergration].

</div>

[Google Assistant][GoogleAssistant] is an AI-powered voice assistant that runs on the Raspberry Pi and x86 platforms and interacts via the [DialogFlow][comp] integration or the [Google Assistant component][AssistantIntergration] with Home-Assistant. You can also use [Google Actions][GoogleActions] to extend its functionality.

To enable access to the Google Assistant API, do the following:
1. Go to the [Google Actions Console][GActionsConsole] and create a new project.
1. After you created the project on the bottom of the page click "Device registration". Keep this tab open for later use.
1. Enable the Google Assistant API on the new project through [this][enableAPI] link. Make sure you have the right project selected (shown in the middle of the screen in the top bar). If you can't select the right project, it may help to open the link in an incognito window. 
1. Configure the [OAuth consent screen][OAuthConcent]. Also again check that you have the right project and don't forget to hit "Save" at the bottom of the page. You only have to fill in a project name and your e-mail.
1. You back to you device registration tab and click "Device registration". Or open you project in the [Google Actions Console][GActionsConsole] start the Quick setup, and in the left bar click "Device registration".
1. Give you project a name, think of a nice manufacturer and for device type select "speaker".
1. Edit you "model id", if you want to and copy it for later use.
1. Download the credentials.
1. Click "Next" and click "Skip".
1. Upload your credentials as "google_assistant.json" to the "hassio/share" folder, for example by using the [Samba] add-on.
1. In the Add-on configuration field fill-in you "project id" and your "model-id" and hit "Save". Your project id can be found in the Google Actions console by clicking on the top right menu button and selecting "Project settings". This id may differ from the project name that you choose!
1. Below the "Config" window select the microphone and speaker that you want to use. On a Raspberry Pi 3, ALSA device 0 is the built-in headset port and ALSA device 1 is the HDMI port. Also don't forget to click "Save".
1. Start the add-on. Check the log and click refresh till it says: "ENGINE Bus STARTED".
1. Now click "Open Web UI" and follow the authentication process. You will get an empty response after you have send your token.

That's it. You should now be able to use the Google Voice assistant. 

### Add-on configuration

```json
{
  "client_secrets": "google_assistant.json",
  "project_id": "you-project-id",
  "model_id": "your-model-id"
}
```

{% configuration %}
client_secrets:
  description: The file downloaded from the [Google Actions Console](https://console.actions.google.com/), you can redownload them under the "Develop - Device registration" tab. By default the add-on look in the "hassio/share" folder.
  required: true
  type: string
project_id:
  description: The project id can be found in your "google_assistant.json" file or under project settings in the [Google Actions Console](https://console.actions.google.com/).
  required: true
  type: string
model_id:
  description: The model id can also be found under the "Develop - Device registration tab" in the [Google Actions Console](https://console.actions.google.com/).
  required: true
  type: string
{% endconfiguration %}

### Home Assistant configuration

Use the Home Assistant [DialogFlow component][comp] to integrate the add-on into Home Assistant or combine it with the [Google Assistant component][AssistantIntergration].

[AssistantIntergration]: /integrations/google_assistant/
[GoogleAssistant]: https://assistant.google.com/
[GoogleActions]: https://actions.google.com/
[GActionsConsole]: https://console.actions.google.com/
[enableAPI]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
[OAuthConcent]: https://console.developers.google.com/apis/credentials/consent
[Samba]: /addons/samba/
[comp]: /integrations/dialogflow/
[project]: https://console.cloud.google.com/project
[API]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
[oauthclient]: https://console.developers.google.com/apis/credentials/oauthclient
[cloudConsole]: https://console.cloud.google.com/cloud-resource-manager
