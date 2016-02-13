---
layout: page
title: "MySensors"
description: "Instructions how to integrate MySensors sensors into Home Assistant."
date: 2015-05-14 21:57
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Hub
featured: true
---

The [MySensors](https://www.mysensors.org) project combines Arduino boards with NRF24L01 radio boards to build sensor networks. The component will automatically add all available switches and sensors to Home Assistant.

### Configuration

Integrate your Serial MySensors Gateway by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mysensors:
  gateways:
    - port: '/dev/ttyUSB0'
      persistence_file: 'path/mysensors.json'
      baud_rate: 38400
    - port: '/dev/ttyACM1'
      persistence_file: 'path/mysensors2.json'
      baud_rate: 115200
  debug: true
  persistence: true
  version: '1.5'
```

Configuration variables:

- **port** (*Required*): The port where your board is connected to your Home Assistant host.
- **debug** (*Optional*): Enable or disable verbose debug logging. Default is false.
- **persistence** (*Optional*): Enable or disable local persistence of sensor information. If this is disabled, then each sensor will need to send presentation messages after Home Assistant starts. Default is true.
- **persistence_file** (*Optional*): Path to a file to save sensor information. The file extension determines the file type. Currently supported file types are 'pickle' and 'json'.
- **version** (*Optional*): Specifies the MySensors protocol version to use. Supports 1.4 and 1.5. Default is 1.4.
- **baud_rate** (*Optional*): Specifies baud rate of the connected gateway.

If you are using an original Arduino the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
$ ls /dev/ttyACM*
```

### Presentation

Present a MySensors sensor or actuator, by following these steps:

1. Connect your gateway to your computer.
2. Configure the MySensors component in configuration.yaml.
3. Start hass.
4. Wait for "gateway started" in the log output.
5. Write and upload your MySensors sketch to the sensor. Make sure you:
    - Either use a manual node id, or AUTO for requesting a node id from the controller, in gw.begin().
    - Send sketch name.
    - Present the sensor's S_TYPE.
    - Send at least one initial value per V_TYPE.
6. Start the sensor.

Visit the [library api] of MySensors for more information.

[library api]: https://www.mysensors.org/download/sensor_api_15
