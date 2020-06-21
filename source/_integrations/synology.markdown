---
title: Synology
description: Instructions on how to integrate Synology Surveillance Station cameras within Home Assistant.
ha_category:
  - Camera
ha_release: 0.31
ha_iot_class: Local Polling
ha_domain: synology
---

The `synology` camera platform allows you to watch the live streams of your [Synology](https://www.synology.com/) Surveillance Station based IP cameras in Home Assistant.

<div class='note'>

Synology has disabled the livestreaming API and the integration is currently broken if you are using Surveillance Station version 8.2.3-5828.
There is an unsupported preview fix available. (8.2.3-5829) - Instructions can be found [here](https://www.vcloudinfo.com/2019/04/how-to-manually-upgrade-your-synology-surveillance-system-firmware.html) for updating manually.

</div>

## Configuration

To enable your Surveillance Station cameras in your installation, add the following to your `configuration.yaml` file:

```yaml
# Minimum configuration.yaml entry
camera:
  - platform: synology
    url: FULL_URL_OF_SYNOLOGY_NAS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
name:
  description: A name for this Synology camera.
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
whitelist:
  description: A list of which cameras you want to add, the names must be the same as in Surveillance Station. If omitted all cameras are added.
  required: false
  type: list
verify_ssl:
  description: Verify SSL/TLS certificate for HTTPS request.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Full example

A full sample configuration for the `synology` camera platform is shown below:

```yaml
# Example configuration.yaml entry
camera:
  - platform: synology
    url: https://192.168.1.120:5001
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    timeout: 15
    verify_ssl: false
```

<div class='note'>

Most users will need to set `verify_ssl` to false unless they have installed a valid SSL/TLS certificate in place of the built in self-signed certificate.

</div>
