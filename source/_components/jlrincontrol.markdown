---
layout: page
title: "Jaguar/Land Rover InControl"
description: "Setup for Jaguar/Land Rover vehicle API"
date: 2019-06-02 00:55
sidebar: true
comments: false
sharing: true
footer: true
logo: jlr.png
ha_category:
  - Binary Sensor
  - Sensor
  - Car
ha_release: 0.96
ha_iot_class: Cloud Polling
---

The `JLRIncontrol` component allows you to view the status of your Jaguar/Land Rover vehicle in Home Assistant.

## {% linkable_title Prerequisites %}

This assumes you already have an InControl account with JLR and a valid subscription to use the features.

## {% linkable_title Configuration %}

Add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
jlrincontrol:
  username: 'EMAIL_ADDRESS'
  password: 'PASSWORD'
  name:
    17digitvehiclevin: 'Some name for your vehicle'
```
{% configuration %}
username:
  description: The username associated with your JLR account.
  required: true
  type: string
password:
  description: The password for your given JLR account.
  required: true
  type: string
scan_interval:
  description: The time in seconds to poll the JLR servers for new information
  required: false
  type: int
name:
  description: "Make it possible to provide a name for the vehicles. Note: Use all lower case letters when inputing your VIN number."
  required: false
  type: string
{% endconfiguration %}

<p class='note warning'>
  Set scan_interval to something reasonable to avoid hammering the JLR servers unncessarily. Minimum allowed is 60 seconds, and there is no maximum.
</p>
