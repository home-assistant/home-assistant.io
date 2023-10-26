---
title: tedee
description: Instructions on how to integrate your Tedee lock with Home Assistant.
ha_release: 2023.10
ha_category:
  - Lock
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: tedee
ha_platforms:
  - lock
ha_codeowners:
  - '@zweckj'
  - '@patrickhilker'
ha_integration_type: integration
---

This integration interacts with your [tedee](https://tedee.com) locks, by communicating with the tedee bridge through HTTP. 
The bridge is a requirement for adding your locks through this integration. 
If you do not own the bridge, you can add your locks through the [HomeKit Integration](./_integrations/homekit.markdown) to HomeAssistant, but communication will happen over Bluetooth in that case.

You can choose whether the integration should communicate to your locks via the local API only, the cloud only, or thorugh the local API, with the cloud API as fallback.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your router or in the tedee app under \"Bridge Settings\" -> \"Local API\"."
  required: false
  type: string
Local Access Token:
  description: "The local access token for your bridge. You can find it in the tedee app under \"Bridge Settings\" -> \"Local API\"."
  required: false
  type: string
Home Assistant Token:
  description: "Long lived access token for Home Assistant. This is to allow the bridge to push status updates to Home Assistant. Can be created at the bottom of your Home Assistant user profile."
  required: false
  type: string
Use Cloud:
  description: "Use cloud connections to communicate with your bridge?"
  required: false
  type: boolean
Personal Access Key:
  description: "Personal access key for your lock with **Operate - Lock** & **Devices - Read** scopes. [How to create Personal Access Key](https://tedee-tedee-api-doc.readthedocs-hosted.com/en/latest/howtos/authenticate.html#personal-access-key)"
  required: false
  type: string
{% endconfiguration_basic %}
