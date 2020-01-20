---
title: Synology
description: Instructions on how to integrate Synology Surveillance Station within Home Assistant.
logo: synology.png
ha_category:
  - Camera
  - Switch
ha_release: 0.31
ha_iot_class: Local Polling
---

The `synology` platform allows you to integrate your [Synology](https://www.synology.com/) Surveillance Station with Home Assistant.

There is currently support for the following device:

- [Camera](/integrations/synology/#camera)
- [Switch](/integrations/synology/#switch)

## Configuration

To enable your Surveillance Station in your installation, add the following to your `configuration.yaml` file:

```yaml
synology:
  url: SYNOLOGY_URL
  username: USERNAME
  password: PASSWORD
```

{% configuration %}
name:
  description: A name for this Synology.
  required: false
  type: string
  default: Synology Camera
url:
  description: The URL to your Synology, including port.
  required: true
  type: string
username:
  description: The username for accessing Surveillance Station.
  required: true
  type: string
password:
  description: The password for accessing Surveillance Station.
  required: true
  type: string
timeout:
  description: The timeout in seconds used when connecting to the Surveillance Station.
  required: false
  type: integer
  default: 5
verify_ssl:
  description: Verify SSL/TLS certificate for HTTPS request.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Camera

<div class='note'>

Synology has disabled the live streaming API and the integration is currently broken if you are using Surveillance Station version 8.2.3-5828.
There is an unsupported preview fix available. (8.2.3-5829) - Instructions can be found [here](https://www.vcloudinfo.com/2019/04/how-to-manually-upgrade-your-synology-surveillance-system-firmware.html) for updating manually.

</div>

Once you have enabled the `synology` component, add the following to your `configuration.yaml` file:

```yaml
camera:
  - platform: synology
```

{% configuration %}
whitelist:
  description: A list of which cameras you want to add, the names must be the same as in Surveillance Station. If omitted all cameras are added.
  required: false
  type: list
{% endconfiguration %}

### Switch

Once you have enabled the `synology` component, add the following to your `configuration.yaml` file:

```yaml
switch:
  - platform: synology
```

#### Switch Types

- Switch for enabling or disabling the [Surveillance Station Home Mode](https://www.synology.com/en-global/knowledgebase/Surveillance/help/SurveillanceStation/home_mode)  

## Full example

A full sample configuration for the `synology` camera platform is shown below:

```yaml
# Example configuration.yaml entry
synology:
  url: SYNOLOGY_URL
  username: USERNAME
  password: PASSWORD

camera:
  - platform: synology

switch:
  - platform: synology
```

<div class='note'>

Most users will need to set `verify_ssl` to false unless they have installed a valid SSL/TLS certificate in place of the built in self-signed certificate.

</div>
