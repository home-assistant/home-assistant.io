---
title: "Google Assistant"
description: "Enhance your Hass.io installation with Google Assistant."
featured: true
---

<div class='note'>

If you want to integrate your Google Home or mobile phone running Google Assistant, with Home Assistant, then you want the [Google Assistant component](/integrations/google_assistant/).

</div>

[Google Assistant][GoogleAssistant] is an AI-powered voice assistant that runs on the Raspberry Pi and x86 platforms and interact via the [DialogFlow][comp] integration with Home-Assistant. You can also use [Google Actions][GoogleActions] to extend its functionality.

To enable access to the Google Assistant API, do the following:

1. In the [Cloud Platform Console][project], go to the Projects page. Select an existing project or create a new project
1. Open the project. In the top of the page search for Google Assistant API or use [this link][API] and enable it.
1. Create an [OAuth Client ID][oauthclient], pick type "Other", click "Create" and download the JSON file by clicking the Download JSON button on the right side.
1. Upload your "google_assistant.json" file to the "hassio/share" folder, for example by using the [Samba] add-on.
1. In the config window, fill in your "project-id", which can be found in your "google_assistant.json" file or in on the [Cloud Platform Resource Manager][cloudConsole]. Also choose a "model_id".
1. Below the "Config" window select the microphone and speaker that you want to use. On a Raspberry Pi 3, card 0 - device 0 is the built-in headset port, card 0 - device 1 is the HDMI port.

You are now ready to start the add-on. The next step is to authenticate your Google account with Google Assistant. After starting the add-on and click on the "OPEN WEB UI" button to start authentication.

### Add-on configuration

Configuration example that uses the USB microphone and the built-in headset audio output on the Raspberry Pi. Note that card and device numbers can differ on your device.

```json
{
  "client_secrets": "google_assistant.json",
  "project_id": null,
  "model_id": null
}
```

{% configuration %}
client_secrets:
  description: The file downloaded from the Google Cloud Platform Console - Google Assistant API page. By default the add-on look in the "hassio/share" folder.
  required: true
  type: string
project_id:
  description: The project id can be found in your "google_assistant.json" file.
  required: true
  type: string
model_id:
  description: A chosen model_id.
  required: true
  type: string
{% endconfiguration %}

### Home Assistant configuration

Use the Home Assistant [DialogFlow component][comp] to integrate the add-on into Home Assistant.

[GoogleAssistant]: https://assistant.google.com/
[GoogleActions]: https://actions.google.com/
[Samba]: /addons/samba/
[comp]: /integrations/dialogflow/
[project]: https://console.cloud.google.com/project
[API]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
[oauthclient]: https://console.developers.google.com/apis/credentials/oauthclient
[cloudConsole]: https://console.cloud.google.com/cloud-resource-manager
