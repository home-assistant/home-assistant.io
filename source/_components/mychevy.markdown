---
layout: page
title: "MyChevy"
description: "Instructions on how to integrate Chevy Bolt car into Home Assistant."
date: 2017-08-28 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: chevy.png
ha_category: Hub
ha_release: 0.62
ha_iot_class: "Cloud Polling"
---

The `MyChevy` component communicates with the
[my.chevrolet](https://my.chevrolet.com) website using selenium to log
in as your user, and screen scrape the data provided. GM does not
make it easy to sign up for any official development program, so this
provides a workaround to get access to your data.

This component provides the following platforms:
 - Binary sensors - if the car is plugged in
 - Sensors - such as Battery Level, Charge Mode, EST Range, Total
   Distance Traveled

To use MyChevy in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mychevy:
  username: email
  password: password
```

Configuration variables:

{% configuration %}
username:
    description: The email address associated with your my.chevrolet account
    required: true
    type: string
password:
    description: The password for your given my.chevrolet account
    required: true
    type: string
{% endconfiguration %}


#### {% linkable_title Installation %}

Because this uses selenium behind the scenes, installation is more
complicated than merely pip install. See the installation instructions
at https://github.com/sdague/mychevy.

#### {% linkable_title Limitations %}

The architecture of the GM automotive networking imposes some
limitations on the functionality of the component.

The OnStar network link is very slow, and takes 1 - 3 minutes to get
information back from the car. As such the mychevy component only
polls every 30 minutes to not overwhelms that connection.

The OnStar network (or more specifically the gateway used by the
my.chevrolet website) appears to suffer more than most networks when
the car is a) in a garage, and b) it's cold outside (like < 15 degrees
F). One of the provided sensors is a status sensor which indicates if
we got connectivity with the car on the last polling cycle or not.

The "API" for this is written by web scraping. As such, it only
currently is known to work if you have a Chevy Bolt EV, and only 1
Chevy car connected to OnStar. Patches for extended support should go
to the https://github.com/sdague/mychevy project first, then
Home Assistant can be extended.
