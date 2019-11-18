---
title: "Particle"
description: "Instructions on how to connect Home Assistant to the Particle Cloud."
ha_category:
  - DIY
ha_iot_class: Cloud Polling
ha_release: 0.102
logo: particle.png
---

Particle Devices are simple, Wi-Fi-capable boards programmable with an Arduino-based SDK. Particle boards span a few generations, from the Wi-Fi-only Photon to the LTE-, Bluetooth- and Mesh-capable Boron. The Particle Cloud provides a means for Particle devices to publish the local state of devices as Variables and provide webhooks for local behavior via Functions.

The Particle Home Assistant integration makes each Device associated with a Particle account available as Entities, associating that Device's Variables as attributes on the entity, and allowing its Functions to be called via the `particle.call` service.

## Configuration

To integrate Particle devices with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
particle:
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
access_token:
  description: Your Particle Cloud access token. A new token can be created with `particle token create`
  required: true
  type: string
{% endconfiguration %}

Once the integration is up and running, the Home Assistant Overview screen should have a new card, Particle, with a list of all the devices associated with the account.
