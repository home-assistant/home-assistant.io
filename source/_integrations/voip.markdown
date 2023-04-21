---
title: VoIP
description: Voice over IP
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: voip
ha_integration_type: integration
ha_quality_scale: internal
---

The VoIP integration enables users to talk to [Assist](/docs/assist) using an analog phone and a VoIP adapter such as the [Grandstream HT801](https://www.grandstream.com/products/gateways-and-atas/analog-telephone-adaptors/product/ht801).

<p class='img'>
  <img src="/images/integrations/voip/voip_adapter.png" />
  Connecting a phone to Home Assistant requires an adapter.
</p>

## Getting Started

Start by setting up the VoIP integration. In Home Assistant, go to *Settings*, *Devices & Services*, clicking the *Add Integration* button, and entering "voip":

<p class='img'>
  <img src="/images/integrations/voip/voip_install.jpg" />
  The VoIP integration must be installed before you can call Home Assistant.
</p>

Select "Voice over IP" and confirm the installation. Next, configure your Grandstream VoIP adapter to call Home Assistant.

## Grandstream Configuration

The Grandstream HT801 and HT802 have been tested with the VoIP integration. To connect your phone to Home Assistant, start by logging into your Grandstream device's web interface (default password: "admin"):

<p class='img'>
  <img src="/images/integrations/voip/grandstream_login.jpg" />
  Login page of the Grandstream HT801/HT802 VoIP adapter.
</p>

Navigate to the port configuration page. On the HT801 there will only be a single port to configure, while the HT802 has two ports:

<p class='img'>
  <img src="/images/integrations/voip/grandstream_port_config.jpg" />
  Port configuration page for the HT802. The HT801 only has a single port.
</p>

Locate the "Offhook Auto-Dial" setting and enter `*47<IP>*5060` where `<IP>` is the IP address of your Home Assistant server using `*` instead of `.` between octets. For example, the IP `192.168.1.100` would be entered as `*47192*168*1*100*5060`:

<p class='img'>
  <img src="/images/integrations/voip/grandstream_autodial.jpg" />
  Enable offhook auto-dial, so your phone automatically calls Home Assistant when you pick it up.
</p>

Save your settings at the bottom of the page by clicking the "Apply" button:

<p class='img'>
  <img src="/images/integrations/voip/grandstream_apply.jpg" />
  You must apply the settings before they will take effect.
</p>

## Test Call

If everything is configured correctly, pick up the phone and you should hear Home Assistant speak the following message:

> This is your smart home speaking. Your phone is connected, but you must configure it within Home Assistant.

If you don't hear the message, ensure that your Grandstream is connected to the network and that your phone is connected to the Grandstream. See the [troubleshooting](#troubleshooting) section for other suggestions.

## Allowing Calls

Calls from new devices are blocked by default since voice commands could be used to control sensitive devices, such as locks and garage doors. Ensure that you've configured [Assist](/docs/assist/) to only expose the entities you want to be controllable via voice.

Once a test call is successful, Home Assistant will automatically create a VoIP device that can be configured from the integration:

<p class='img'>
  <img src="/images/integrations/voip/voip_device_available.jpg" />
  Devices are identified by IP address, so only one phone is usable per VoIP adapter.
</p>

Click on the device link to visit the configuration page for your phone. Enable the "Allow Calls" setting under Configuration to allow this phone to control your smart home:

<p class='img'>
  <img src="/images/integrations/voip/voip_configuration.jpg" />
  Calls from new devices are blocked by default since voice commands could be used to open locks, etc.
</p>

## Smart Home Voice Control

With calls enabled, you can now control you smart home with voice! Pick up the phone and listen for a brief chime to indicate that Home Assistant is listening.

Speak a [supported voice command](/docs/assist/builtin_sentences), such as "turn on the living room light". Home Assistant will execute your command and respond with a phrase like "turned on light". You can now speak another command, continuing the conversation.

Home Assistant will also answer questions, such as "is the front door locked?" and "which lights are on the living room?"

## Troubleshooting

If you're unable to call Home Assistant, confirm the following settings in your Grandstream device's web interface.

In the "Preferred Vocoder" list, ensure that OPUS is selected for one of the choices:

<p class='img'>
  <img src="/images/integrations/voip/grandstream_vocoder.jpg" />
  OPUS must be one of the vocoder choices, preferably #1.
</p>

Verify that the "OPUS Payload Type" is 123 (the default):

<p class='img'>
  <img src="/images/integrations/voip/grandstream_opus_payload.jpg" />
  Home Assistant expects a payload type of 123 for OPUS.
</p>
