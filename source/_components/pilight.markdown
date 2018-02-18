---
layout: page
title: "Pilight"
description: "Instructions how to setup Pilight within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pilight.png
ha_category: Hub
ha_release: 0.26
ha_iot_class: "Local Push"
---

[Pilight](https://www.pilight.org/) is a modular and open source solution to communicate with 433 MHz devices and runs on various small form factor computers. A lot of common [protocols](https://manual.pilight.org/protocols/index.html) are already available.

This pilight hub connects to the [pilight-daemon](https://manual.pilight.org/programs/daemon.html) via a socket connection to receive and send codes. Thus Home Assistant does not have to run on the computer in charge of the RF communication. 

The received and supported RF codes are put on the event bus of Home Assistant and are therefore directly usable by other components (e.g. automation). Additionally a send service is provided to send RF codes.

To integrate pilight into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
pilight:
  host: 127.0.0.1
  port: 5000
```

Configuration variables:

- **host** (*Required*): The IP address of the computer running the pilight-daemon, e.g. 192.168.1.32.
- **port** (*Required*): The network port to connect to. The usual port is [5000](https://manual.pilight.org/development/api.html).
- **send_delay** (*Optional*): You can define a send delay as a fraction of seconds if you experience transmission problems when you try to switch multiple switches at once. This can happen when you use a [pilight USB Nano](https://github.com/pilight/pilight-usb-nano) as hardware and switches a whole group of multiple switches on or off. Tested values are between 0.3 and 0.8 seconds depending on the hardware.
- **whitelist** (*Optional*): You can define a whitelist to prevent that too many unwanted RF codes (e.g. the neighbors weather station) are put on your HA event bus. All defined subsections have to be matched. A subsection is matched if one of the items are true.

In this example only received RF codes using a daycom or Intertechno protocol are put on the event bus and only when the device id is 42. For more possible settings please look at the receiver section of the pilight [API](https://manual.pilight.org/development/api.html).

A full configuration sample could look like the sample below:

```yaml
# Example configuration.yaml entry
pilight:
  host: 127.0.0.1
  port: 5000
  send_delay: 0.4
  whitelist:  # optional
    protocol:
      - daycom
      - intertechno
    id:
      - 42
```

## {% linkable_title Troubleshooting %}

- A list of tested RF transceiver hardware is available [here](https://manual.pilight.org/electronics/index.html). This might be useful before buying.
- Sending commands is simple when the protocol is known by pilight, but receiving commands can be rather difficult. It can happen that the code is not correctly recognized due to different timings in the sending hardware or the RF receiver. If this happens follow these steps:

1. [Install](https://manual.pilight.org/installation.html) pilight from source (do not worry that is very easy) and only activate the protocols you are expecting in the pop up menu. This reduces false positives.
2. Check the real timings of your device + RF receiver by running `pilight-debug`. Remember the `pulslen` parameter.
3. Go to the `libs/pilight/protocols/433.92` subfolder of the pilight source code and open the .c file of your protocol. Search for `MIN_PULSE_LENGTH`, `MAX_PULSE_LENGTH ` and `AVG_PULSE_LENGTH`. Change the pulse lengths to match your measured one. Recompile and install pilight by re-running `$ sudo ./setup.sh`.
