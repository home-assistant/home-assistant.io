**Description:**
Tilt Cover for [Home Assistant](https://github.com/home-assistant/home-assistant)

Combines a tilt sensor and a relay switch to control a garage door opener or motorized gate.
When this switch is turned on it will toggle the relay to activate the garage door if it is
not already open. The reverse will happen when it is turned off.

configuration.yaml

````yaml
cover tilt:
  platform: tilt
  covers:
    front_garage_door:
      tilt_sensor:   binary_sensor.my_tilt_switch
      switch:        switch.my_relay_switch
      contact_delay: 1  #optional on time for switch to simulate button press. default: 1 second
      run_time:      10 #optional run time for the opener. default: 10 seconds
````
