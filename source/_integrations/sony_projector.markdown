---
description: Instructions on how to integrate Sony projectors into Home Assistant.
ha_release: 0.89
ha_domain: sony_projector
---

The **Sony Projector** {% term integration %} allows you to turn SDCP-compatible, network-connected projectors from [Sony](https://www.sony.com/) on and off from Home Assistant.

## Prerequisites

In the **Advanced Menu** of your projector's web interface, you may need to:

- Enable or start the **PJ Talk** service.
- Add the IP address of your Home Assistant server to the **Host Address** field.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the projector.
{% endconfiguration_basic %}

## Supported functionality

The integration adds a device for your projector with the following entity.

### Switches

- **Power**
  - **Description**: Turns the projector on or off and shows its current power state. The entity takes the name of the device.

## Data updates

The integration {% term polling polls %} the power state of the projector every 30 seconds.

After you turn the projector on or off, the switch shows the new state right away. The projector can take a while to warm up or cool down, so the state is read from the projector again at the next update.

## Known limitations

The integration only controls the power of the projector. It does not control settings such as the input or the picture mode.

## Troubleshooting

{% details "Can't set up the projector" %}

### Symptom: "Failed to connect"

When you try to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant could not get a response from the projector.

#### Resolution

1. Make sure the projector is connected to your network and that the host is correct.
2. Make sure you have completed the [prerequisites](#prerequisites).

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

If you previously configured the projector in YAML, also remove its `sony_projector` entry from the `switch` section of your {% term "`configuration.yaml`" %} file. Otherwise, Home Assistant adds the integration again the next time it restarts.

{% include integrations/remove_device_service.md %}
