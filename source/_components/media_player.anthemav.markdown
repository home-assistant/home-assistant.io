---
layout: page
title: "Anthem A/V Receivers"
description: "Instructions how to integrate Anthem A/V Receivers into Home Assistant."
date: 2016-12-31 23:11
sidebar: true
comments: false
sharing: true
footer: true
logo: anthemav.png
ha_category: Media Player
ha_iot_class: "Local Push"
ha_release: 0.36
---

Both [Anthem]'s current and last generation of A/V Receivers and and Processors
support IP-based, network control.  This Home Assistant platform adds proper
"local push" support for and of these receivers on your network.

## {% linkable_title Supported Models %}

* MRX 520, MRX 720, MRX 1120, and AVM 60
* MRX 310, MRX 510, MRX 710

Support is provided through the Python [anthemav] module.  Older, RS-232
serial-based units like the D2v use a different protocol entirely and are not
currently supported.

[Anthem]:	http://www.anthemav.com/
[anthemav]: https://github.com/nugget/python-anthemav


## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: anthemav
    host: IP_ADDRESS
    port: 14999
```

### Supported Options

Item Name       | Type | Required?   | Description
----------------|------|-------------|-------------------------------------------
`host`          | str  | *required*  | Hostname or IP Address of device
`port`          | int  | *required*  | TCP port number of device
`name`          | str  |  optional   | Defaults to model name if not provided
`scan_interval` | int  |  optional   | Unused.  Defaults to 120 (seconds)

## Notes and Limitations

- The tuner is currently unsupported as are the `media_player` play, pays,
  prev, and next controls.

- Enabling this platform will set and enforce "Standby IP Control On" in your Anthem
  device.  You almost certainly want this.  If you disable it on the device, it
  will just get re-enabled by Home Assistant.

- Only Zone 1 is currently supported.

<p class='note warning'>
  This platform will maintain a persistent connection to the network control
  port which will prevent any other application from communicating with the
  receiver.  This includes the Anthem iOS and Android remote control apps as
  well as the ARC-2 Anthem Room Calibration software. You will need to disable
  this platform and restart Home Assistant if you want to use another
  application that makes use of the network control port.
  <br /><br />
  *The underlying Python module has hooks for halting and resuming the network
  connection but those functions are currently unsupported by the Home
  Assistant platform.*
</p>
