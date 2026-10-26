---
description: Instructions on how to integrate iNELS with Home Assistant.
ha_release: 2025.11
ha_domain: inels
---

The **iNELS** {% term integration %} allows you to control and monitor the devices connected to your control units ([BUS](https://www.elkoep.com/wired) or [eLAN](https://www.elkoep.com/wireless)).

There is currently support for the following device types within Home Assistant:

- Switch

## Prerequisites

- MQTT broker.
- eLAN devices flashed with version `mqtt_1.0` or later.
- BUS devices flashed with version `mqtt_1.0` or later.
- See the [Wiki page](https://wiki.inels.com/) for instructions on how to configure the control units.

{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

### To remove a setting from eLANRF

1. Launch the **IDM** application.
2. Select **Configuration of the central unit** from the menu.
3. Select **MQTT settings** then choose **Not Connect** in the mode options and click **Save to CU**.

### To remove a setting from CU3

1. Open the eLANRF **web** interface.
2. Go to **Settings** and disable MQTT under **MQTT connection**.
