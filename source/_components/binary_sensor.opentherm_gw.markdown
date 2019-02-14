---
layout: page
title: "OpenTherm Gateway Binary Sensor"
description: "Expose internal data from the OpenTherm Gateway."
date: 2018-10-19 18:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category: Binary Sensor
ha_release: 0.81
ha_iot_class: "Local Push"
---

The `opentherm_gw` binary sensor platform is used to expose internal data from the [OpenTherm Gateway](http://otgw.tclcode.com/) in Home Assistant.

# {% linkable_title Configuration %}

Configuration of this platform is achieved through the [OpenTherm Gateway Hub](/components/opentherm_gw/) configuration.

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>
