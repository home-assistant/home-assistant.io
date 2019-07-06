---
layout: page
title: "Keba Charging Station"
description: "Instructions on how to setup your Keba charging station with Home Assistant."
date: 2019-07-06 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: keba.png
ha_category:
  - Binary Sensor
  - Lock
  - Sensor
ha_release: 0.96
---

The `keba` integrates your Keba charging station (wallbox) into your home assistant instance. It was tested with a BMW Wallbox but should also work with a Keba P20 as well as P30 according to the developers manual.

This component provides the following platforms:

- Binary Sensors: Online state, plug state, Charging state and failsafe mode state.
- Lock: Authorization (like with the RFID card).
- Sensors: current set by the user, target energy set by the user, charging power, charged energy of the current session and total energy charged.
- Services: authorize, deauthorize, set energy target, set maximum allowed current and manually update the states. More details can be found [here](/components/keba/#services).

## {% linkable_title Configuration %}

To enable this component in your installation, add at least the following to your
`configuration.yaml` file:

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
      description: Enable failsafe mode at home assistant startup.
      required: false
      type: boolean
      default: false
    failsafe_timeout:
      description: Timeout of the failsafe mode in seconds. Allowed values are between 10 seconds and 600 seconds (this parameter is only used if failsafe mode is enabled). Make sure to call the `keba.set_curr` service regularly within this timeout period!
      required: false
      type: integer
      default: 30
    failsafe_fallback:
      description: Fallback current of the failsafe mode in A. Allowed values are between 6 Ampere and 63 Ampere. 0 Ampere disables the running charging process completely (this parameter is only used if failsafe mode is enabled).
      required: false
      type: integer
      default: 6
    failsafe_save:
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

## {% linkable_title Services %}

The `keba` component offers several services. Using these services will change the state of your charging station. So use these services with care!

### {% linkable_title Authorizing and Deauthorizing %}

The charging station can be authorize and deauthorize vai service calls (`keba.authorize` and `keba.deauthorize`) or via the lock component that is created automatically for the charging station. In both cases the RFID tag from the configuration is used.

### {% linkable_title Set Target Energy %}

The service `keba.set_energy` sets the target energy for the current session to the given energy attribute in kWh. Payload example:
```json
{
  "energy": 10.0
}
```

### {% linkable_title Set Maximum Current %}

The service `keba.set_curr` sets the maximum current to the given current attribute in Ampere. Payload example:
```json
{
  "current": 16.0
}
```

## {% linkable_title Disclaimer %}

This software is not affiliated with or endorsed by Keba.
