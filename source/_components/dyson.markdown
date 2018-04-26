---
layout: page
title: "Dyson"
description: "Instructions on how to integrate Dyson into Home Assistant."
date: 2017-05-27 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.47
---

The `dyson` component is the main component to integrate all [Dyson](https://dyson.com) related platforms: [Fans](/components/fan/dyson/) and [Robot vacuum](/components/vacuum/dyson/).

## {% linkable_title Configuration %}

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
dyson:
  username: YOUR_DYSON_USERNAME
  password: YOUR_DYSON_PASSWORD
  language: YOUR_DYSON_ACCOUNT_LANGUGAGE
  devices:
    - device_id: DEVICE_ID_1 # eg. Serial number: XXX-XX-XXXXXXXX
      device_ip: DEVICE_ID_1
    - device_id: DEVICE_ID_2
      device_ip: DEVICE_ID_2
```

Configuration variables:

- **username** (*Required*): Dyson account username (email address).
- **password** (*Required*): Dyson account password.
- **language** (*Required*): Dyson account language country code. Known working codes: `FR`, `NL`, `GB`, `AU`. But others codes should work.
- **devices** (*Optional*): List of devices.
  - **device_id** (*Required*): Device ID. The Serial Number of the device. Found in the mobiles applications device settings page.
  - **device_ip** (*Required*): Device IP address.

`devices` list is optional but you'll have to provide them if discovery is not working (warnings in the logs and the devices are not available in Home Assistant web interface).
*If your are using a robot vacuum (Dyson 360 Eye), discovery is not yet supported so you have to provide `devices` list.*

To find devices IP address, you can use your router or `nmap`:

```bash
$ nmap -p 1883 XXX.XXX.XXX.XXX/YY -- open
```

Where:

- **XXX.XXX.XXX.XXX** is your network address
- **YY** is your network mask

For example:

```bash
$ nmap -p 1883 192.168.0.0/24 -- open
```
