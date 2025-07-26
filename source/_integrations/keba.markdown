---
title: Keba Charging Station
description: Instructions on how to setup your Keba charging station with Home Assistant.
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
ha_platforms:
  - binary_sensor
  - lock
  - notify
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `keba` integrates your Keba charging station/BMW Wallbox into your Home Assistant instance using the UDP Smart Home Interface ([manual](https://www.ifix-solar.shop/wp-content/uploads/shop/Dokumente/KEBA/KeContact_P20_P30_UDP_ProgrGuide_en.pdf)). The fetching interval to the charging station is set to 5 seconds, same as in the official mobile app. In order to use the integration, enable the UDP Smart Home Interface by adjusting the DIP switches within the charging station according to the [installation manual](https://www.keba.com/file/downloads/e-mobility/KeContact_KCP20_30_ih_en.pdf).

This {% term integration %} provides the following platforms:

- Binary sensors: Online state, plug state, charging state and failsafe mode state.
- Lock: Authorization (like with the RFID card).
- Sensors: current set by the user, target energy set by the user, charging power, charged energy of the current session and total energy charged.
- Actions: authorize, deauthorize, set energy target, set the maximum allowed current and manually update the states. More details can be found in the [actions](#actions) section.
- Notify: Show a text on chargers with a built-in LED display.

## Configuration

To enable this integration in your installation, add at least the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
keba:
  host: KEBA_HOST
```

{% configuration %}
keba:
  description: configuration
  required: true
  type: map
  keys:
    host:
      description: Keba host.
      required: true
      type: string
    rfid:
      description: RFID tag used for authorization.
      required: false
      type: string
      default: "00845500"
    failsafe:
      description: Enable failsafe mode at Home Assistant startup.
      required: false
      type: boolean
      default: false
    failsafe_timeout:
      description: Timeout of the failsafe mode in seconds. Allowed values are between 10 seconds and 600 seconds (this parameter is only used if failsafe mode is enabled). Make sure to call the `keba.set_curr` action regularly within this timeout period!
      required: false
      type: integer
      default: 30
    failsafe_fallback:
      description: Fallback current of the failsafe mode in A. Allowed values are between 6 Ampere and 63 Ampere. 0 Ampere disables the running charging process completely (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 6
    failsafe_persist:
      description: Saving the failsafe configuration to internal EEPROM of the Keba charging station. 1 means save it, 0 means do only keep this configuration until the next restart of the charging station (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 0
    refresh_interval:
      description: Refresh interval to fetch new data from the charging station. 5 seconds (same as in the official app) is recommended.
      required: false
      type: integer
      default: 5
{% endconfiguration %}

## Actions

The Keba integration offers several actions. Using these actions will change the state of your charging station. So use these actions with care!

### Authorizing and Deauthorizing `keba.authorize` and `keba.deauthorize`

The charging station can be authorized and deauthorized using actions (`keba.authorize` and `keba.deauthorize`) or via the lock integration that is created automatically for the charging station. In both cases the RFID tag from the configuration is used.

### Start and Stop `keba.start` and `keba.stop`

The `keba.start` and `keba.stop` actions control the charging process if the car is already authorized. Technically it sends `ena 1` or `ena 0` commands to the charging station.

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

### Request New Data `keba.set_failsafe`

The `keba.set_failsafe` action sets the failsafe mode of the charging station. Payload example:

```json
{
  "failsafe_timeout": 30,
  "failsafe_fallback": 6,
  "failsafe_persist": 0
}
```

## Notifications

Some Keba chargers are equipped with a LED text display. The notification platform may be used to display text on this display. To enable this, add the following to your {% term "`configuration.yaml`" %} file:

### Configuration

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: keba
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

The use of the notify action is [described here](/integrations/notify/).

The `message` part of the event payload is shown on the display. Scrolling is performed if needed. A maximum of 23 characters can be shown.

The optional `data` part may contain specifications of the message duration. `min_time` is the minimum time in seconds the text will be shown if another message is requested. `max_time` is the maximum time to display the message when nothing else is requested. By default, the message is shown a minimum of 2 seconds and a maximum of 10 seconds.

```yaml
message: "Welcome home"
data:
  min_time: 4
  max_time: 10
```

## Disclaimer

This software is not affiliated with or endorsed by Keba.
