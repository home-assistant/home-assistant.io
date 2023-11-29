---
title: Komfovent
description: Instructions on how to integrate Komfovent ventilation units into Home Assistant.
ha_category:
  - Climate
ha_release: 2023.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@ProstoSanja'
ha_domain: komfovent
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates Komfovent ventilation units into Home Assistant.

This integration is **fully local** and does not utilize the Komfovent Control cloud interface.

For the integration to work, your unit has to be connected to your local network via Ethernet cable. Most Komfovent units do not support wireless connectivity. Once you have an Ethernet connection, you can check the IP address of the unit on the control panel by long pressing the **Settings** button.  
  
When adding the integration in Home Assistant, you will need the IP address, the username ("user" is the default one) and password ("user" is once again the default).  

This integration currently supports the following features:

- Getting the current operating mode (AWAY, NORMAL, INTENSIVE, BOOST)
- Getting the current room temperature
- Setting the operating mode
  
### N.B: Password!  
It is highly suggested you change the password before integrating the unit with Home Assistant. 
1. To access the device's web interface, enter the unit's IP address in the browser.
2. Change the password in the settings. 
    - The password has a **maximum size of 10 characters** in Komfovent units. Longer passwords are truncated here but not on the login screen.
    -  When you try and fail to login, before recovering the password, check if your password is longer than 10 characters. Drop all characters after 10 and try again.

{% include integrations/config_flow.md %}
