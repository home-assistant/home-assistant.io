---
title: Elro Connects
description: Instructions on integrating Elro Connects with Home Assistant.
ha_category:
  - Siren
ha_release: 2022.7.0
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@jbouwh'
ha_domain: elro_connects
ha_platforms:
  - siren
ha_integration_type: integration
---

The Elro Connects integration will allow users to integrate their Elro Connects fire, heat, CO, water, or smoke alarms as a siren entity into Home Assistant. The alarms can be tested (and silenced) through the siren turn on (and turn off) services. The integration discovers entities (automatically) through an Elro Connects K1 connector plug. The entity names assigned in the Elro Connects app will be synced as entity names in Home Assistant.

## Prerequisites

As a prerequisite the Elro K1 Connector needs to be already setup and the alarm devices need to be pre-registered on the Elro Connects K1 connector.

Make sure the Elro Connects K1 connector connects to a Wi-Fi network where Home Assistant has access.

{% include integrations/config_flow.md %}

The Connector ID of the Elro Connects K1 connector can be found in the Elro Connects App at `Home -> Settings -> Current connector`. The format is `ST_xxxxxxxxxxxx`. The hostname or IP-address and port are related to the Elro Connects K1 connector. They be changed after setup. Note that the polling interval to the Elro Connects K1 connector is 15 seconds.

## Platforms

### Siren platform

The siren platform supports Elro Connects Fire, Heat, Smoke, Water and CO alarms.
When a siren is turned on manually `test alarm` request will be sent. Turning the siren off will send a `silence` request to the device.

<div class='note info'>
When the K1 connector receives multiple test alarm requests simultaneously only the first siren signal will be processed. To test multiple alarms, make sure to add a few seconds delay between the requests.
</div>
