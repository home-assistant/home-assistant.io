---
title: Komfovent
description: Instructions on how to integrate Komfovent ventilation units into Home Assistant.
ha_category:
  - Climate
ha_release: 2023.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@ProstoSanja'
ha_domain: Komfovent
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates Komfovent ventilation units into Home Assistant.

This integration is **fully local** and does not utilize the Komfovent Control cloud interface.

For integration to work your unit has to be connected to your local network via the ethernet cable, as most Komfovent units do not support wireless connectivity. After that you can check the IP address of the unit on the control panel by long pressing the "Settings" button.  
  
For integration you will need the IP address, username ("user" is the default one) and password ("user" is once again the default).  

This integration currently supports the following features:

- Getting the current operating mode (AWAY, NORMAL, INTENSIVE, BOOST)
- Getting the current room temperature
- Setting the operating mode
  
### N.B: Password!  
It is highly suggested you change the password before integrating the unit with the Home Assistant. For that navigate to the IP address of the unit through a web browser and change the password in settings. Beware, password has a **max size of 10 characters** in Komfovent units, so if you put in a bigger string, it will truncate it, but it does not do so when you try and login, which may lead you to believe you forgot your password or something is not working.

{% include integrations/config_flow.md %}
