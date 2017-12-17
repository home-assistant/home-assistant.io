---
layout: page
title: "My component does not show up"
description: "My component does not show up"
date: 2017-06-18 09:00
comments: false
sharing: true
footer: true
ha_category: Configuration
---


When a component does not show up, many different things can be the case. Before you try any of these steps, make sure to look at the `home-assistant.log` file and see if there are any errors related to your component you are trying to set up.

If you have incorrect entries in your configuration files you can use the `check_config` script to assist in identifying them: `hass --script check_config`.
