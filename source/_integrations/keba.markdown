---
title: Keba Charging Station
description: Instructions on how to set up your Keba charging station with Home Assistant.
ha_category:
  - Binary sensor
  - Lock
  - Notifications
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.98
ha_codeowners:
  - '@dannerph'
ha_domain: keba
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - notify
  - sensor
ha_integration_type: integration
---

The **Keba Charging Station** {% term integration %} integrates your Keba P30/P20 charging station/BMW Wallbox into your Home Assistant instance using the UDP Smart Home Interface ([manual](https://www.ifix-solar.shop/wp-content/uploads/shop/Dokumente/KEBA/KeContact_P20_P30_UDP_ProgrGuide_en.pdf)). Keba P40 charging stations are not yet supported as they use a different protocol. The fetching interval to the charging station is set to 5 seconds, same as in the official mobile app. To use the integration, enable the UDP Smart Home Interface by adjusting the DIP switches within the charging station according to the [installation manual](https://www.keba.com/file/downloads/e-mobility/KeContact_KCP20_30_ih_en.pdf).

This {% term integration %} provides the following platforms:

- Binary sensors: Online state, plug state, charging state and failsafe mode state.
- Lock: Authorization (like with the RFID card).
- Sensors: current set by the user, target energy set by the user, charging power, charged energy of the current session and total energy charged.
- Actions: authorize, deauthorize, set energy target, set the maximum allowed current and manually update the states. More details can be found in the [actions](#actions) section.
- Notify: Show a text on chargers with a built-in LED display.

{% include integrations/config_flow.md %}

## Breaking change

The KEBA integration now uses the UI for setup. If you have an existing `keba:` entry in `configuration.yaml`, it will be automatically imported as a config entry on the first startup after this update. A repair issue will then appear, asking you to remove the `keba:` block from `configuration.yaml`.

## Actions

The Keba integration offers several actions. Using these actions will change the state of your charging station. So use these actions with care!

### Authorizing and Deauthorizing `keba.authorize` and `keba.deauthorize`

The charging station can be authorized and deauthorized using actions (`keba.authorize` and `keba.deauthorize`) or via the lock integration that is created automatically for the charging station. In both cases the RFID tag from the configuration is used.

### Enable and Disable `keba.enable` and `keba.disable`

The `keba.enable` and `keba.disable` actions send the `ena 1` or `ena 0` command to start or stop the charging process on the station.

### Set Target Energy `keba.set_energy`

The action `keba.set_energy` sets the target energy for the current session to the given energy attribute in kWh. Payload example:

```json
{
  "energy": 10.0
}
```

### Maximum Current `keba.set_curr`

The `keba.set_curr` action sets the maximum current to the given current attribute in Ampere. Payload example:

```json
{
  "current": 16.0
}
```

### Request New Data `keba.request_data`

The `keba.request_data` action sends data update requests to the charging station.

### Failsafe Mode `keba.set_failsafe`

The `keba.set_failsafe` action sets the failsafe mode of the charging station. Payload example:

```json
{
  "failsafe_timeout": 30,
  "failsafe_fallback": 6,
  "failsafe_persist": 0
}
```

## Notifications

Some Keba chargers are equipped with an LED text display. Use the notify entity to display text on this display.

The `message` field of the notify action is shown on the display. Scrolling is performed if needed. A maximum of 23 characters can be shown.

The optional `data` part may contain specifications of the message duration. `min_time` is the minimum time in seconds the text will be shown if another message is requested. `max_time` is the maximum time to display the message when nothing else is requested. By default, the message is shown a minimum of 2 seconds and a maximum of 10 seconds.

```yaml
message: "Welcome home"
data:
  min_time: 4
  max_time: 10
```

## Disclaimer

This software is not affiliated with or endorsed by Keba.
