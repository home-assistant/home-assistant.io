---
layout: page
title: "SpaceAPI"
description: "Instructions on how to configure the SpaceAPI for Home Assistant."
date: 2018-05-08 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: spaceapi.png
ha_category: Social
ha_release: "0.70"
---

The `spaceapi` component allow Hackerspaces to expose information to web apps or any other application with the [SpaceAPI](http://spaceapi.net/).

## {% linkable_title Configuration %}

To setup the `spaceapi` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
spaceapi:
  space: HACKERSPACE_NAME
  logo: URL_FOR_LOGO
  url: URL
  location:
    address: ADDRESS
  contact:
    email: EMAIL_ADDRESS
  issue_report_channels:
    - email
  state:
    entity_id: binary_sensor.front_door
```

{% configuration %}
space:
  description: Name of the Hackerspace.
  required: true
  type: string
logo:
  description: URL which is publicly accessible of the logo.
  required: true
  type: URL
logo:
  description: URL of the hackerspace's web site.
  required: true
  type: URL
location:
  description: Location of the Hackerspace.
  required: true
  type: map
  keys:
    address:
      description: The physical address of the Hackerspace.
      required: true
      type: String
contact:
  description: Contact information of the Hackerspace.
  required: true
  type: map
  keys:
    email:
      description: The email address of the Hackerspace.
      required: true
      type: String
    irc:
      description: The IRC channel of the Hackerspace
      required: false
      type: String
    mailing_list:
      description: The mailing list of the Hackerspace.
      required: false
      type: String
    twitter:
      description: The Twitter account of the Hackerspace.
      required: false
      type: String
issue_report_channels:
  description: "The reporting channel for issues. Pick an entity from `contact:`."
  required: true
  type: List
state:
  description: The current state of the Hackerspace.
  required: true
  type: list
  keys:
    entity_id:
      description: "The `entity_id` of a binary sensor that represents the current state."
      required: true
      type: entity_id
    icon_open:
      description: The URL which is publicly accessible of the icon for the open Hackerspace.
      required: false
      type: URL
    icon_closed:
      description: The URL which is publicly accessible of the icon for the closed Hackerspace.
      required: false
      type: URL
sensors:
  description: List of sensors to expose.
  required: false
  type: list
  keys:
    temperature:
      description: List of temperature sensors.
      required: true
      type: entity_id
    humidity:
      description: List of humidity sensors.
      required: true
      type: entity_id
{% endconfiguration %}

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this component.

### {% linkable_title Eastermundigen %}

A possible configuration entry for [Eastermundigen](http://www.eastermundigen.ch/), a Hackerspace in Switzerland, could look like this.

```yaml
# Example configuration.yaml entry
spaceapi:
  space: Eastermundigen
  logo: https://eastermundigen.ch/logo.png
  url: https://eastermundigen.ch
  location:
    address: "Steinbruchweg 16, 3072 Ostermundigen, Schweiz"
  contact:
    phone: "+41311111111"
    twitter: "@eastermundigen"
    email: "info@eastermundigen.ch"
  issue_report_channels:
    - email
  state:
    entity_id: binary_sensor.front_door"
    icon_open: https://eastermundigen.ch/open.png
    icon_closed: https://eastermundigen.ch/close.png
  sensors:
    temperature:
      - "sensor.temperature_in"
      - "sensor.temperature_out"
    humidity:
      - "sensor.humidity_in"
      - "sensor.humidity_out"
```
