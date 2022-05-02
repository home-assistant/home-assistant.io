---
title: Elro Connects
description: Instructions on integrating Elro Connects with Home Assistant.
ha_category:
  - Siren
ha_release: 2022.6.0
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

{% include integrations/config_flow.md %}

As a prerequisite the Elro K1 Connector needs to be already setup and the alarm devices need to be pre-registered on the Elro Connects K1 connector.

Make sure the K1 connector connects to a Wi-Fi network where Home Assistant has access.

During setup you will need the `IP-address` (or `hostname`) assigned to the K1 connector and the `connector ID`. This connector ID can be found in the Elro Connects App at `Home -> Settings -> Current connector`. The connector ID has the format `ST_xxxxxxxxxxxx`.

The default polling interval is 15 seconds, and can be set to an interval between 10 and 60 seconds.

The polling interval, IP address/hostname and port can be changed after setting up.

## Platforms

### Siren platform

The siren platform should support Fire, Heat, Smoke, Water and CO alarms.
Additional attributes for `battery`, `signal` (range 0-4) and `device_state` are added.

> Not all device types have been fully tested yet. Fire alarm devices are tested should work as expected.

## Services

### Service `siren` turn on

Sends a test alarm command to an Elro Connects alarm device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | Send a `test alarm` request.  |

> Note. When the K1 connector receives multiple `test alarm` requests simultaneously only the first siren signal will be processed. To test multiple alarms, make sure to add a few seconds delay between the requests.

### Service `siren` turn off

Send a silence request to stop an alarm or test alarm command to an Elro Connects alarm device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | Send a `silence` alarm request.  |
