---
title: Asterisk Voicemail
description: Instructions on how to integrate your existing Asterisk voicemail within Home Assistant.
ha_category:
  - Mailbox
ha_iot_class: Local Push
ha_release: 0.51
ha_domain: asterisk_mbox
---

The `asterisk_mbox` Asterisk Voicemail integration for Home Assistant allows you to view, listen to, and delete voicemails from an Asterisk voicemail mailbox. The integration includes a panel on the frontend that provides caller-id and speech-to-text transcription (using Google's API) of messages in addition to playback and message deletion. There is also an included sensor that indicates of the number of available messages. There is no requirement that the Asterisk PBX and Home Assistant are running on the same machine.

To enable the component, a configuration is required in both Home Assistant as well as on the Asterisk server.

First follow the [Asterisk PBX configuration guide](/docs/asterisk_mbox/) to setup the necessary server on the Asterisk PBX server (this is needed even if Asterisk and Home Assistant are running on the same server)

## Configuration

Once that is complete, add the following entry `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
asterisk_mbox:
  password: ASTERISK_PBX_PASSWORD
  host: ASTERISK_PBX_SERVER_IP_ADDRESS
  port: ASTERISK_PBX_SERVER_PORT
```

This will add a new 'Mailbox' side-panel, as well as a sensor to indicate # of messages available.

{% configuration %}
password:
  description: The password that was set during Asterisk PBX configuration
  required: true
  type: string
host:
  description: The IP-address of the server that is running the Asterisk PBX
  required: true
  type: string
port:
  description: The port on the Asterisk PBX server that was configured during Asterisk PBX configuration
  required: true
  type: string
{% endconfiguration %}

<div class='note warning'>
Communication between the Asterisk PBX server and Home Assistant is password-protected, but the data transmission is not encrypted. It is recommended to only use this integration when communication is contained within a local area network.
</div>
