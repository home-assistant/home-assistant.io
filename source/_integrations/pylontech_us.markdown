---
title: Pylontech US
description: Integration for 48V Pylontech US batteries.
ha_category:
  - Other
ha_release: 2022.9
ha_quality_scale: internal
ha_codeowners:
  - '@danielschramm'
ha_domain: pylontech_us
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `Pylontech US` platform allows you to read data from a low voltage Pylontech
battery stack via RS485 USB adapter.
Supported batteries are:
- US5000
- US3000
- US3000C
- US2000
- US2000C

Config options:
- port: Serial port. This can be a device name (ex. /dev/ttyUSB0) for local attached USB to RS485 adapter or a URL handler (https://pyserial.readthedocs.io/en/latest/url_handlers.html) for Network to RS485 interfaces.
- baudrate: set the RS485 Baudrate here it will be used at least for USB and RFC2217 interfaces. For socket type interfaces it has to be set also in the config of the network interface.
- battery_count: Number of pylontech packs in the stack.

Reported RS485 adapters working:
- FTDI based USB
- USR-DR302 in RFC2217 mode

Reported configurations working;
- Main US5000 in mix with US3000


High voltage Pylontech batteries are not supported!

The Integration can be activated via the configuration wizard.
