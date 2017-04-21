Tilt switch for [Home Assistant](https://github.com/home-assistant/home-assistant)

Combines a tilt sensor and a relay switch to control a garage door opener or motorized gate.
When this switch is turned on it will toggle the relay to activate the garage door if it is
not already open. The reverse will happen when it is turned off.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
switch tilt:
  platform: tilt
  switches:
    front_garage_door:
      tilt_sensor:   binary_sensor.my_tilt_switch
      switch:        switch.my_relay_switch
```

Configuration variables:

- **tilt_sensor** (*Required*): The binary_sensor that detectes open and closed states
- **switch** (*Required*): The relay switch that will be toggles to open or close the door
- **contact_delay** (*optional*): The optional on time for switch to simulate button press. default: 1 second
- **run_time** (*optional*): The optional run time for the opener. default: 10 seconds
