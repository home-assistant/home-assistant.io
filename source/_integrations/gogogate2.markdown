---
title: Gogogate2
description: Instructions on how to integrate Gogogate2-Enabled garage door covers into Home Assistant.
logo: gogogate2.png
ha_category:
  - Cover
ha_release: 0.67
ha_iot_class: Local Polling
ha_domain: gogogate2
---

The GogoGate2 integration lets you control Gogogate2-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your Gogogate2 mobile app.

## Configuration
<div class='note'>

  It is recommended to assign a static IP address to your GogoGate device. This ensures that it won't change IP addresses, so you won't have to change the config if it reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your GogoGate2, check the label on the bottom.

</div>

1. From the Home Assistant front-end, navigate to 'Configuration' then 'Integrations'. Under 'Set up a new integration' locate 'GogoGate2' and click 'Configure'.
2. Enter the ip address, username, password and name for the device and click 'Submit'.
