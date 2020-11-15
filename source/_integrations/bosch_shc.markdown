---
title: Bosch SHC
description: Integrate Bosch SHC.
ha_category:
  - Binary Sensor
ha_release: 0.118
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@tschamm'
ha_domain: bosch_shc
ha_config_flow: true
---

The `bosch_shc` integration allows you to integrate your [Bosch SHC](https://www.bosch-smarthome.com) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)

## Configuration

You will need the IP Address of your SHC and a registered client with a valid SSL certificate/key pair to use this module.

To add `Bosch SHC` to your installation, go to **Configuration** >> **Integrations** in the UI. If the `SHC` is on the same network as Home Assistant, it is discovered automatically. Clicking "Configure" on the discovered device, adds it to Home Assistant. If your device isn't discovered automatically, click the button with `+` sign on the integrations page and from the list of integrations, select **Bosch SHC** and follow the instructions shown.

### Binary Sensor

The binary sensor platform allows you to monitor the states of your Shutter Contacts and Smoke Detectors. Binary sensors are added for each Door/Window Contact and Smoke Detector.

## Client registration

Before accessing the Bosch Smart Home Controller, a client must be registered on the controller. For this, a valid SSL cert/key pair must be registered on the controller. To start the client registration, press and hold the button on the controller until the LED starts flashing. For more information, follow the [client registration](https://github.com/BoschSmartHome/bosch-shc-api-docs/tree/master/postman#register-a-new-client-to-the-bosch-smart-home-controller) steps described in the Bosch SHC API documentation.
