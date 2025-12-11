---
title: Bbox
description: Instructions on how to integrate Bouygues Bbox routers into Home Assistant.
ha_category:
  - Network
  - Presence detection
  - Sensor
ha_release: 0.31
ha_iot_class: Local Polling
ha_domain: bbox
ha_platforms:
  - device_tracker
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `bbox` {% term integration %} uses the [Bbox Modem Router](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) from the French Internet provider Bouygues Telecom. Sensors are mainly bandwidth measures.

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection)
- [Sensor](#sensor)

{% note %}
Due to third party limitation, the sensors will only be available if Home Assistant and the Bbox are on the same local area network. You can check this by going to 192.168.1.254 with your web browser.
{% endnote %}

## Presence detection

The `bbox` {% term integration %} offers presence detection by looking at connected devices to a [Bbox](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) based router from [Bouygues](https://www.bouyguestelecom.fr/), which is one of the main Internet provider in France.

Bbox is a generic name for different hardware routers. The {% term integration %} has been tested with the following devices:

- Sagem F@st 5330b

### Configuration

To use an Bbox router in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bbox
```

{% configuration %}
host:
  description: IP address of your Bbox device.
  required: false
  type: string
  default: 192.168.1.254
{% endconfiguration %}

{% important %}
For now and due to third party limitation, the Bbox must be on the same local network as the Home Assistant installation.
{% endimportant %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

## Sensor

To add Bbox sensors to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bbox
    monitored_variables:
      - down_max_bandwidth
      - up_max_bandwidth
      - current_down_bandwidth
      - current_up_bandwidth
      - uptime
      - number_of_reboots
```

{% configuration %}
name:
  description: Name to display in the frontend.
  required: false
  default: Bbox
  type: string
monitored_variables:
  description: Sensors to display in the frontend.
  required: true
  type: list
  keys:
    down_max_bandwidth:
      description: Maximum bandwidth available for download.
    up_max_bandwidth:
      description: Maximum bandwidth available for upload.
    current_down_bandwidth:
      description: Instant measure of the current used bandwidth for download.
    current_up_bandwidth:
      description: Instant measure of the current used bandwidth for upload.
    uptime:
      description: Uptime since the last boot.
    number_of_reboots:
      description: Number of reboot since the initial configuration of the router.
{% endconfiguration %}
