---
title: Laifen
description: Instructions on how to integrate your Laifen Wave electric toothbrush with Home Assistant.
ha_release: '2027.1'
ha_categories:
  - health_wellbeing
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@bzumik1'
ha_domain: laifen
ha_integration_type: device
ha_platforms:
  - sensor
ha_quality_scale: bronze
ha_bluetooth: true
---

The **Laifen** {% term integration %} lets you monitor your [Laifen](https://www.laifentech.com/) Wave electric toothbrush in Home Assistant.
It shows the battery level of the toothbrush and the duration of the last brushing session.
For example, you can get a notification when the battery runs low, or follow how long each brushing session lasts.

Home Assistant connects to the toothbrush over Bluetooth.
The toothbrush only shows up over Bluetooth while it is awake: after you press its button and while it stays on its charger.
Off the charger, it falls asleep again about a minute after the last button press or after it stops brushing.
Home Assistant connects as soon as the toothbrush wakes up and keeps the connection while it is awake.

## Supported devices

The following devices are known to be supported by the integration:

- Laifen Wave (`LFTB01-P`), tested with firmware V2.0.93

## Unsupported devices

The following devices are not supported by the integration:

- Other Laifen toothbrushes

## Prerequisites

1. Set up [Bluetooth](/integrations/bluetooth/) in Home Assistant, with a Bluetooth adapter or proxy within range of the toothbrush. The adapter or proxy must support [active connections](/connectivity/bluetooth/#connection). An adapter or proxy that can only listen for advertisements cannot connect to the toothbrush. [ESPHome Bluetooth proxies](https://esphome.io/projects/?type=bluetooth) work well for a toothbrush in the bathroom.
2. Close the Laifen app on your phone, or turn off Bluetooth on your phone. The toothbrush accepts only one connection, and the app can keep it connected in the background.
3. Press the button of the toothbrush to wake it up.

{% include integrations/config_flow.md %}

While the toothbrush is awake, Home Assistant discovers it automatically.
It then shows up under {% my integrations title="**Settings** > **Devices & services**" %} as **Discovered**, and you can set it up right away.

{% configuration_basic %}
Device:
  description: "The Bluetooth device that is your toothbrush."
{% endconfiguration_basic %}

## Supported functionality

The **Laifen** integration provides the following entities.

### Sensors

- **Battery**
  - **Description**: The battery level of the toothbrush, in percent.
- **Last brushing duration**
  - **Description**: The duration of the last brushing session.
  - **Remarks**: The integration ignores runs of the motor shorter than five seconds, such as the short vibrations that confirm a button press.

The sensors keep their last value while the toothbrush is asleep.

## Laifen automation examples

Use the battery level of your toothbrush to know when it needs charging.

{% include docs/paste_yaml_tip.md %}

### Automation: Get a notification when the battery is low

Get a message on your phone when the battery of the toothbrush runs low, so you can put it on its charger in time.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: LFTB01-P-1234 Battery (`sensor.lftb01_p_1234_battery`)
  - **Below**: `20`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when the battery is low" %}

The example uses the entity ID of a toothbrush named `LFTB01-P-1234`. Replace it with the entity ID of your toothbrush.

{% example %}
automation: |
  alias: "Notify when the toothbrush battery is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.lftb01_p_1234_battery
      below: 20
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Charge the toothbrush, its battery is at
          {{ states('sensor.lftb01_p_1234_battery') }}%.
{% endexample %}

{% enddetails %}

## Data updates

Home Assistant connects when the toothbrush wakes up, and the toothbrush then pushes every change of its state over the connection.
The toothbrush does not push changes of its battery level, so while it stays connected, for example on its charger, the integration {% term polling polls %} its state every minute.

## Known limitations

- The toothbrush accepts only one connection at a time. While Home Assistant is connected, which is the whole time the toothbrush sits on its charger, the Laifen app cannot connect, and the other way around.
- While the toothbrush sits on its charger, it permanently uses one of the few connection slots of the Bluetooth adapter or proxy that reaches it.
- Home Assistant measures brushing sessions while it is connected. If a session started before Home Assistant connected, Home Assistant measures it from the connection, so its duration can be a few seconds short. Home Assistant does not record sessions while it is not connected.
- If the connection drops during a session and comes back within a minute while the toothbrush still runs, the session continues. If it comes back later, Home Assistant only records the rest of the session. If the toothbrush has stopped by the time Home Assistant reconnects, Home Assistant does not record the session.
- Home Assistant does not read the brushing history stored in the toothbrush, because reading it may remove it from the toothbrush before the Laifen app collects it.
- The toothbrush does not report whether it is charging.
- Home Assistant only shows the firmware version for firmware that reports it in a known format.

## Troubleshooting

{% details "The toothbrush is not discovered" %}

### Symptom: The toothbrush does not show up as discovered

Home Assistant does not show the toothbrush as **Discovered**, or when you add it, the setup stops with the message "No devices found on the network".

#### Description

Home Assistant only finds the toothbrush while it is awake and within range of a Bluetooth adapter or proxy that supports active connections. The toothbrush does not show up over Bluetooth while the Laifen app is connected to it.

#### Resolution

1. Close the Laifen app on your phone, or turn off Bluetooth on your phone.
2. Press the button of the toothbrush to wake it up.
3. Make sure the toothbrush is within range of a Bluetooth adapter or proxy that supports active connections.

{% enddetails %}

{% details "Failed to connect" %}

### Symptom: "Failed to connect. Press the button of the toothbrush to wake it up and try again."

When you add the toothbrush, the form shows the message "Failed to connect. Press the button of the toothbrush to wake it up and try again."

#### Description

Home Assistant could not connect to the toothbrush. The toothbrush might have fallen asleep, or another device, like your phone, might be connected to it.

#### Resolution

1. Close the Laifen app on your phone, or turn off Bluetooth on your phone.
2. Press the button of the toothbrush to wake it up.
3. Try to add the toothbrush again.

{% enddetails %}

{% details "The firmware of this toothbrush is not supported" %}

### Symptom: "The firmware of this toothbrush is not supported."

When you add the toothbrush, the setup stops with the message "The firmware of this toothbrush is not supported."
For a toothbrush that is already set up, Home Assistant logs a warning like "LFTB01-P-1234 sends a state that is not supported".

#### Description

The toothbrush reports its state in a format that the integration does not know.
This can happen after a firmware update of the toothbrush.

#### Resolution

A newer version of Home Assistant might support the firmware.

- If the setup stopped with this message, update Home Assistant, and then add the toothbrush again.
- If the toothbrush is already set up, update Home Assistant, and then reload the integration. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Laifen**, and in the {% icon "mdi:dots-vertical" %} menu of the toothbrush, select **Reload**.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
