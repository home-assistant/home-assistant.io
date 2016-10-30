---
layout: page
title: "myStrom Switch"
description: "Instructions how to integrate myStrom switches into Home Assistant."
date: 2015-11-25 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mystrom.png
ha_category: Switch
---


The `mystrom` switch platform allows you to control the state of your [myStrom](https://mystrom.ch/en/) switches. The built-in sensor is measuring the power consumption while the switch is on. 

To use your myStrom switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mystrom
    host: IP_ADRRESS
```

Configuration variables:

- **host** (*Required*): The IP address of your myStrom switch, eg. `http://192.168.1.32`.
- **name** (*Optional*): The name to use when displaying this switch.

Check if you are able to access the device located at `http://IP_ADRRESS`. The details about your switch is provided as a JSON response.

```bash
$ curl -X GET -H "Content-Type: application/json" http://IP_ADDRESS/report
{
	"power":	0,
	"relay":	false
}
```

or change its state:

```bash
$ curl -G -X GET http://IP_ADDRESS/relay -d 'state=1'
```

