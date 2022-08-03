---

title: iNELS

description: Instructions on how to integrate iNELS with Home Assistant.

ha_category:

  - Light

  - Sensor

  - Switch

  - Button

ha_release: '0.01'

ha_iot_class: Local Polling

ha_config_flow: true

ha_codeowners:

  - '@nejezchleb'

  - '@jhoralek'

ha_domain: inels

ha_platforms:

  - light

  - sensor

  - switch

  - button

ha_integration_type: integration

---



The iNELS integration allows you to control and monitor the devices connected to your control units ([BUS](https://www.elkoep.com/wired) or [eLAN](https://www.elkoep.com/wireless)).



iNELS control units are configured for native discovery.



Currently supported devices: 

  -  Switch units

  -  Dimmers

  -  Buttons

  -  Shutters

  -  Switching socket-plug



Devices will be automatically added when the eLAN or BUS is connected to Home Assistant.



## Requirements



- MQTT broker and the  set up in Home Assistan.

- iNELS control units MQTT setting configured to communicate with the MQTT broker.

  - eLAN devices flashed with version mqtt_1.0, or later.

  - BUS devices flashed with version mqtt_1.0, or later.



{% include integrations/config_flow.md %}



You must also configure each iNELS device's MQTT settings to communicate with whatever MQTT broker you are using. Enter the broker address under host and enter a username/password combination that allows access to the broker.

