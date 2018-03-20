---
layout: page
title: "Google Assistant"
description: "Enhance your Hass.io installation with Google Assistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
featured: true
---

<p class='note'>
  If you are wanting to integrate your Google Home, or mobile phone running Google Assistant, with Home Assistant then you want the [Google Assistant component](https://home-assistant.io/components/google_assistant/).
</p>

[Google Assistant][GoogleAssistant] is an AI-powered voice assistant that runs on the Raspberry Pi and x86 platforms and interact via the [DialogFlow][comp] integration with Home-Assistant. You can also use [Google Actions][GoogleActions] to extend its functionality.

To enable access to the Google Assistant API, do the following:

1. In the [Cloud Platform Console][project], go to the Projects page. Select an existing project or create a new project
2. Open the project. In the top of the page search for Google Assistant API or use [this link][API] and enable it.
3. Create an [OAuth Client ID][oauthclient], pick type "Other", click "Create" and download the JSON file by clicking the Download JSON button on the right side.

Now install and activate the [Samba] add-on so you can upload your credential file. Connect to the "share" Samba share and copy your credentials over. Name the file `google_assistant.json`.

Now it's time to start Google Assistant for the first time. When the Google Assistant add-on starts, it will output your audio devices in the "Logs" card. You might have to hit "refresh" to get the latest logs:

```text
**** List of PLAYBACK Hardware Devices ****
card 0: ALSA [bcm2835 ALSA], device 0: bcm2835 ALSA [bcm2835 ALSA]
  Subdevices: 8/8
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
  Subdevice #7: subdevice #7
card 0: ALSA [bcm2835 ALSA], device 1: bcm2835 ALSA [bcm2835 IEC958/HDMI]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Microphone [Yeti Stereo Microphone], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

You need to use this information to point the add-on at the right speakers and microphone. The information describes different cards and devices. On a Raspberry Pi 3, card 0 - device 0 is the built-in headset port, card 0 - device 1 is the HDMI port. In the example above, the USB microphone showed up as card 1 - device 0.

Find the microphone and speakers that you want to use and note down their device and card number. We will need that to configure the add-on options `mic` (microphone to use) and `speaker` (speaker to use). The format for these options is `<card #>,<device #>`. Change the configuration options and click save.

The next step is to authenticate your Google account with Google Assistant. Start the add-on and click on the "OPEN WEB UI" button to start authentication.

### Add-On configuration

Configuration example that uses the USB microphone and use the built-in headset audio output on the Raspberry Pi. Note that card and device numbers can differ on your device.

```json
{
  "mic": "1,0",
  "speaker": "0,0",
  "client_secrets": "google_assistant.json"
}
```

Configuration variables:

- **mic**: This is the hardware address of your microphone. Look at the add-on output 
- **speaker**: This is the hardware address of your speakers. Look at the add-on output

### {% linkable_title Home Assistant configuration %}

Use the Home Assistant [DialogFlow component][comp] to integrate the add-on into Home Assistant.


[GoogleAssistant]: https://assistant.google.com/
[GoogleActions]: https://actions.google.com/
[Samba]: /addons/samba/
[comp]: /components/dialogflow/
[project]: https://console.cloud.google.com/project
[API]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
[oauthclient]: https://console.developers.google.com/apis/credentials/oauthclient
