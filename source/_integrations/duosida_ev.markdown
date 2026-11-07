---
title: Duosida EV Charger
description: Instructions on how to integrate Duosida EV chargers with Home Assistant.
ha_release: "2026.12"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@americodias'
ha_domain: duosida_ev
ha_platforms:
  - sensor
ha_integration_type: device
---

The **Duosida EV Charger** {% term integration %} connects Home Assistant to Duosida EV wall chargers over your local network, without the cloud.

Use it to follow your charging sessions: see when the car is charging, how much power it draws, and how much energy each session delivered. You can add the charger's energy counter to the [Energy dashboard](/home-energy-management/), or get notified when the car stops charging.

## Supported devices

The following device is known to work with this integration:

- Duosida Mode3 32&nbsp;A wall charger, single-phase, firmware V2.5

Other Duosida chargers that the Duosida app controls in local mode use the same protocol and may also work.

## Prerequisites

- The charger is connected to the same local network as Home Assistant.
- Home Assistant can reach the charger on TCP port 9988.
- To find the charger with a network search, UDP broadcasts on port 48899 must reach it. Otherwise, you need its IP address. You can find it in your router's list of DHCP clients.
- The Duosida app is not connected to the charger in local mode. The charger accepts one local connection at a time.

{% tip %}
Reserve the charger's IP address in your router's DHCP settings, so the address stays the same.
{% endtip %}

{% include integrations/config_flow.md %}

When you add the integration, choose how to find the charger:

- **Search the network**: Home Assistant sends a broadcast on each of its network adapters and lists the chargers that answer. Chargers that are already set up are not listed.
- **Enter the IP address**: For a charger that the search cannot reach, for example one on another subnet.

{% configuration_basic %}
Device:
  description: "The charger to set up, from the list of chargers found by the search."
IP address:
  description: "The IP address of your Duosida charger, for example `192.168.1.100`. Host names are not supported."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per charger, with its model, firmware version, and serial number.

### Sensors

The following sensors are enabled by default:

- **Status**: The charger's state:
  - **Available**: No vehicle is plugged in.
  - **Preparing**: A vehicle is plugged in, and charging has not started yet.
  - **Charging**: The vehicle is charging.
  - **Suspended by the vehicle**: The vehicle is plugged in, but it is not drawing power, for example because its battery is full.
  - **Suspended by the charger**: The charger is not offering power to the vehicle.
  - **Finishing**: The charging session has stopped, and the vehicle is still plugged in.
  - **Reserved**: The charger is reserved.
  - **Inoperative**: The charger cannot start a charging session.
  - **Faulted**: The charger reports a fault.
- **Voltage**: Line voltage in volts (V).
- **Current**: Charging current in amperes (A).
- **Power**: Charging power in watts (W).
- **Session energy**: Energy delivered during the current charging session in kilowatt-hours (kWh). It goes back to 0 when the vehicle is unplugged.
- **Session time**: Duration of the current charging session in hours (h). The value is unknown while there is no session.
- **Total energy**: The charger's energy counter in kilowatt-hours (kWh). Use this sensor when adding the charger to the [Energy dashboard](/home-energy-management/).

The following diagnostic sensors are available:

- **Temperature**: Temperature inside the charger in degrees Celsius (°C).
- **Control pilot voltage**: Voltage of the control pilot signal in volts (V). It is about 12&nbsp;V with no vehicle, 9&nbsp;V with a vehicle plugged in, and 6&nbsp;V while charging. This sensor is disabled by default.

To use an entity that is disabled by default, [enable the entity](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) from the charger device page.

## Duosida EV Charger automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: notify when the car stops charging

Get a notification on your phone when the charger stops charging, for example because the battery is full.

- **Trigger**: Entity: State
  - **Entity**: Status sensor of the charger (`sensor.duosida_ev_charger_status`)
  - **From**: Charging
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the car stops charging" %}

{% example %}
automation: |
  alias: "Notify when the car stops charging"
  triggers:
    - trigger: state
      entity_id: sensor.duosida_ev_charger_status
      from: "charging"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The car stopped charging after
          {{ states('sensor.duosida_ev_charger_session_energy') }} kWh.
{% endexample %}

{% enddetails %}

## Data updates

The integration keeps a connection open to the charger, and the charger pushes its status to Home Assistant about every 10 seconds.

If no status arrives for a minute, the integration reconnects. It waits a minute between attempts, because the charger refuses connections that come too quickly.

## Known limitations

- The charger accepts one local connection at a time. While Home Assistant is connected, the Duosida app cannot connect to it in local mode, and neither can other software.
- The integration only monitors the charger. It cannot start or stop charging, or change the charger's settings.
- **Voltage** and **Current** are reported for one phase. Three-phase chargers have not been tested.
- **Total energy** is the charger's own counter, and it starts again from 0 when the charger loses power. The Energy dashboard counts this as a meter reset, so the energy already recorded is kept.

## Troubleshooting

{% details "The search does not find the charger" %}

### Symptom: "No devices found on the network"

When you select **Search the network**, the setup stops with the message "No devices found on the network".

#### Description

The search uses a broadcast, which only reaches devices on the same network as Home Assistant. Routers do not forward broadcasts from one network to another, and a Home Assistant container without host networking cannot send them to your network.

#### Resolution

1. Make sure the charger is powered on and connected to your network.
2. Add the integration again, and select **Enter the IP address**.

{% enddetails %}

{% details "Home Assistant cannot connect to the charger" %}

### Symptom: "Failed to connect", or the entities are unavailable

The setup shows "Failed to connect", or the integration keeps retrying and its entities are unavailable.

#### Description

The charger accepts a single local connection. It refuses Home Assistant while another app is connected, and it can refuse new connections for several minutes after a connection ended abruptly.

#### Resolution

1. Make sure the charger is powered on, and that Home Assistant can reach it on TCP port 9988.
2. Close the Duosida app if it is connected to the charger in local mode, and stop any other software that connects to the charger.
3. Wait a few minutes. Home Assistant retries every minute.
4. If the charger still refuses connections, switch it off at its circuit breaker for a minute, then switch it back on.

{% enddetails %}

{% details "Another charger answered at this address" %}

### Symptom: The entities are unavailable, and the log shows "Another charger answered at this address"

#### Description

The charger's IP address changed, and another Duosida charger now uses its old address.

#### Resolution

1. Reserve the charger's IP address in your router's DHCP settings.
2. Add the integration again, and select **Search the network** or **Enter the IP address** with the charger's new address. Home Assistant recognizes the charger and updates the address of the existing entry.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. When you remove it, Home Assistant closes its connection, and the charger accepts connections from the Duosida app again.

{% include integrations/remove_device_service.md %}
