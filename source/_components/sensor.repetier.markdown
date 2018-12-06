---
layout: page
title: Repetier-Server Sensor
description: "Instructions how to add Repetier-Server sensors to Home Assistant."
date: 2018-12-02 22:12
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.84
ha_iot_class: "Local Polling"
---

This component creates one sensor for each devices in your Repetier-Server installation.
Each sensor contains information about the current state of the device, including job name, start time and percentage done.

Tested against Repetier-Server 0.90.7 with multiple printers attached.

{% configuration %}
url:
  description: The URL to connect to, without the port part.
  required: true
  type: string
port:
  description: The port to connect to the hos at (default Repetier-Server port is 3344)
  required: true
  type: integer
api_key:
  description: API-key for the user used to connect to Repetier-Server
  required: true
  type: string
state_percent:
  description: Use percent as sensor state, otherwise On, Idle and Off are the states.
  required: false
  type: boolean
  default: false
decimals:
  description: How many decimals to show in state percent. Only used if state_percent is true.
  required: false
  type: integer
  default: 1
{% endconfiguration %}

### {% retrieve_api_key Retrieve API-key %}

To generate the needed API-key, go into your Repetier Server web-console, push the settings icon (the gear icon) and select User Profiles.
Create a new user, deselect all options and click Create User.
Edit the newly created user and take note of the API-key for this user, that's the one to use in the Home Assistant Settings
