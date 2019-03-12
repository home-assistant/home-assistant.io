---
layout: page
title: "Vizio SmartCast Sound Bar"
description: "Instructions on how to integrate Vizio SmartCast Sound Bar into Home Assistant."
date: 2019-03-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vizio-smartcast.png
ha_category: Media Player
featured: false
ha_release: "0.90"
ha_iot_class: "Local Polling"
---

The `viziosoundbar` component will allow you to control [SmartCast](https://www.vizio.com/smartcast-app) compatible Sound Bars.

## {% linkable_title Finding your Sound Bar's IP %}
Before adding your Sound Bar to Home Assistant you'll need to know it's IP. If you don't already know it, you can find it by performing the following steps these steps:

### {% linkable_title Install pyviziosoundbar %}
#### {% linkable_title PyPi %}
```bash
pip3 install pyviziosoundbar
```

#### {% linkable_title GitHub %}
Install the command-line tool using `pip` (or you can choose to download it manually):

```bash
$ pip3 install git+https://github.com/raman325/pyviziosoundbar.git@master
```

or

```bash
$ pip3 install -I .
```

### {% linkable_title Run discovery %}
Make sure that your Sound Bar is on before continuing. Run following command:

```bash
$ pyviziosoundbar --ip=0 discover
```

All Vizio Sound Bars in the local network of the machine running the command will be returned in a list along with their IPs.

## {% linkable_title Configuration %}
To add your Vizio Sound Bar to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: viziosoundbar
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: IP address of your Sound Bar.
  required: true
  type: string
suppress_warning:
  description: Set to `true` to disable self-signed certificate warnings.
  required: false
  default: false
  type: string
{% endconfiguration %}

## {% linkable_title Notes %}
This integration was tested on a Vizio SB4031-D5 and may not be fully compatible with other models.
