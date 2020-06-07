---
title: "My integration does not show up"
description: "My integration does not show up"
ha_category: Configuration
---

When an integration does not show up, many different things can be the case. Before you try any of these steps, make sure to: 

- Restart the Home Assistant server
  - From the web interface, go to `Configuration > Server Controls > Server Management` and click the "Restart" button
- Look at the `home-assistant.log` file and see if there are any errors related to the integration you are trying to set up

If you have incorrect entries in your configuration files, you can check the configuration to identify the issue(s) using the following methods: 

- Using the `check_config` script, run the following command: `hass --script check_config`. 
- Using the [Home Assistant CLI](https://www.home-assistant.io/hassio/commandline/), run the following command: `ha core check`
- Using the web interface, go to `Configuration > Server Controls` and click the "Check Configuration" button
