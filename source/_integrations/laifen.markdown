---
description: Instructions on how to integrate your Laifen Wave electric toothbrush with Home Assistant.
ha_release: '2027.1'
ha_domain: laifen
---

The **Laifen** {% term integration %} allows you to monitor your [Laifen](https://www.laifentech.com/) Wave electric toothbrush in Home Assistant. It shows the battery level of the toothbrush and how long you last brushed.

The toothbrush is reached over Bluetooth. It only advertises while it is awake: after you press its button, and while it stays on its charger. Off the charger, it falls asleep again about a minute after the last button press or after it stops brushing. Home Assistant connects as soon as the toothbrush wakes up and keeps the connection while it is awake.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) setup within range of the toothbrush. [ESPHome Bluetooth proxies](https://esphome.io/projects/?type=bluetooth) work well for a toothbrush in the bathroom.
- Close the Laifen app on your phone, or turn off the Bluetooth of the phone. The toothbrush accepts only one connection, and the app can keep it connected in the background.
- Press the button of the toothbrush to wake it up before you add it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device:
  description: "The Bluetooth device that is your toothbrush."
{% endconfiguration_basic %}

## Supported devices

- Laifen Wave (`LFTB01-P`), tested with firmware V2.0.93

Other Laifen toothbrushes are not supported.

## Supported functionality

### Sensors

- **Battery**: The battery level of the toothbrush.
- **Last brushing duration**: How long the last brushing took. Runs of the motor shorter than five seconds, such as the short vibrations that confirm a button press, are not counted.

The sensors keep their last value while the toothbrush is asleep.

## Data updates

The integration connects when the toothbrush wakes up and advertises, and the toothbrush then pushes every change of its state over the connection. The toothbrush does not push changes of the battery level, so while it stays connected, for example on its charger, the integration reads its state every minute.

## Examples

The example uses the entity ID of a toothbrush named `LFTB01-P-1234`. Replace it with the entity ID of your toothbrush.

### Notify when the battery is low

```yaml
automation:
  - alias: "Toothbrush battery low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.lftb01_p_1234_battery
        below: 20
    actions:
      - action: notify.notify
        data:
          message: "Charge the toothbrush, its battery is at {{ states('sensor.lftb01_p_1234_battery') }}%."
```

## Use cases

- Keep track of how long everyone in the household brushed their teeth.
- Get a reminder when the battery of the toothbrush runs low.

## Known limitations

- The toothbrush accepts only one connection at a time. While Home Assistant is connected, which is the whole time the toothbrush sits on its charger, the Laifen app cannot connect, and the other way around.
- While the toothbrush sits on its charger, it permanently uses one of the few connection slots of the Bluetooth adapter or proxy that reaches it.
- Brushing sessions are measured by Home Assistant while it is connected. A session can start a few seconds before Home Assistant connects, so its duration can be a little short, and a session during which Home Assistant is not connected is not recorded. If the connection drops during a session, the session continues when Home Assistant reconnects within a minute while the toothbrush still runs; if it would then last more than five minutes, the toothbrush was stopped and started again in between, and the session is recorded from the reconnection. If Home Assistant reconnects later, only the rest of the session is recorded. If the toothbrush has stopped by the time Home Assistant reconnects, the session is not recorded.
- The brushing history stored in the toothbrush is not read, because reading it removes it from the toothbrush.
- The toothbrush does not report whether it is charging.
- The firmware version is only shown for firmware that reports it in a known format.

## Troubleshooting

{% details "The toothbrush is not discovered or does not connect" %}

1. Close the Laifen app on your phone, or turn off the Bluetooth of the phone. The toothbrush does not advertise while the app is connected to it.
2. Press the button of the toothbrush to wake it up.
3. Make sure the toothbrush is within range of a Bluetooth adapter or proxy.

{% enddetails %}

{% details "The firmware of the toothbrush is not supported" %}

The toothbrush reports its state in a format the integration does not know, which can happen after a firmware update of the toothbrush. Home Assistant then does not set it up, or logs a warning when it connects to it. Update Home Assistant, as a newer version may support the firmware, and reload the integration.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
