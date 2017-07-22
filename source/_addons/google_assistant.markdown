---
layout: page
title: "Google Assistant"
description: "Enhance your Hass.io installation with google assistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

[Google Assistant][GoogleAssistant] is an AI-powered voice assistant that runs on the Raspberry Pi and x86 platforms and interact over [api.ai] with Home-Assistant. You can also use [Google Actions][GoogleActions] to make extended functionality.

To enable access to the Google Assistant API, do the following:
1. In the Cloud Platform Console, go to the Projects page. Select an existing project or create a new [project]
2. Enable the Google Assistant [API] on the project you selected
3. Create an [OAuth Client ID][oauthclient] as type "others" and download the json file with arrow done on the right site.

Now install and activate the [Samba] add-on so you can upload your credential file. Connect to the "share" Samba share and copy your training data over. Name the file `google_assistant.json`.

Now it's time to start Google Assistant for the first time. When the Google Assistant add-on starts, it will output your audio devices:

```plain
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
```

You need to use this information to configure the `mic` and `speaker` configuration options. The format is `<card #>,<device #>`. On a Raspberry Pi 3, `0,0` is the built-in headset port, `0,1` is the HDMI port.

We need also connect our Google Assistant with google account. Try open the oauth2 interface with http://hassio.local:9324 and follow the steps on that page.

Now that you've found the microphone and speaker addresses, it's time to configure Google Assistant and restart the add-on.

### Add-On configuration

```json
{
  "mic": "1,0",
  "speaker": "1,0",
  "service_account": "service_account.json",
}
```

Configuration variables:

- **mic**: This is the hardware address of your microphone. Look at the add-on output 
- **speaker**: This is the hardware address of your speakers. Look at the add-on output

### {% linkable_title Home Assistant configuration %}

Use the Home Assistant [api.ai component][comp] to integrate the add-on into Home Assistant.


[GoogleAssistant]: https://assistant.google.com/
[GoogleActions]: https://actions.google.com/
[api.ai]: https://api.ai/
[Samba]: /addons/samba/
[comp]: /components/apiai/
[project]: https://console.cloud.google.com/project
[API]: https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
[oauthclient]: https://console.developers.google.com/apis/credentials/oauthclient
