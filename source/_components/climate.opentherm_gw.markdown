---
layout: page
title: "OpenTherm Gateway Climate"
description: "Control your OpenTherm Gateway from Home Assistant."
date: 2018-08-29 16:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category: Climate
ha_release: 0.78
ha_iot_class: "Local Push"
---


The `opentherm_gw` climate platform is used to control the [OpenTherm Gateway](http://otgw.tclcode.com/) from Home Assistant.

# {% linkable_title Configuration %}

Configuration of this platform is achieved through the [OpenTherm Gateway Hub](/components/opentherm_gw/) configuration.

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>
