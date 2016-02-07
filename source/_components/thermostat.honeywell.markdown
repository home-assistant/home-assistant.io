---
layout: page
title: "Honeywell Thermostat"
description: "Instructions how to integrate Honeywell thermostats within Home Assistant."
date: 2016-02-07 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Thermostat
---


The `honeywell` thermostat platform let you control [Honeywell Connected](http://getconnected.honeywell.com/en/) thermostats from Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: honeywell
  username: YOUR_USERNAME
  password:  YOUR_PASSWORD
```

If you are using a Honeywell thermostat in the US, you also need to provide the thermostat identifier:

```yaml
  id: IDENT
```

Configuration variables:

- **username** (*Required*: The username of an user with access.
- **password** (*Required*): The password for your given admin account.
- **away_temperature** (*optional*): Heating setpoint when away mode is on. If omitted it defaults to 16.0 deg C.
- **id** (*optional*): Thermostat identifier

To find your thermostat identifier, log into your account, choose a thermostat (if applicable) and then look at the URL. It should look something like this:

```
https://mytotalconnectcomfort.com/portal/Device/Control/1234567
```

In this case, the identifier is `1234567`.
