---
title: Motion Blinds
description: Instructions on how to integrate Motion Blinds from Coulisse B.V. into Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Polling
ha_release: 0.119.0
ha_domain: motion_blinds
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
---

The `motion_blinds` platform allows you to control [Motion Blinds](https://motion-blinds.com) from [Coulisse B.V.](https://coulisse.com/products/motion) within Home Assistant.

To add a Motion Bridge to your installation, click Configuration in the sidebar, then click Integrations. Click the + icon in the lower right. Then search for "Motion Blinds" and enter the setup.

{% configuration %}
host:
  description: IP address of the Motion Bridge, e.g., 192.168.1.100.
  required: true
  type: string
API Key:
  description: The API Key of your Motion Bridge, see [Retrieving the API Key](#retrieving-the-api-key).
  required: true
  type: string
{% endconfiguration %}

###Retrieving the API Key
Retrieving Key

The Motion Blinds API uses a 16 character key that can be retrieved from the official "Motion Blinds" app for [Ios](https://apps.apple.com/us/app/motion-blinds/id1437234324) or [Android](https://play.google.com/store/apps/details?id=com.coulisse.motion).
Open the app, click the 3 dots in the top right corner, go to "settings", go to "Motion APP About", Please quickly tap this "Motion APP About" page 5 times, a popup will apear that gives you the key.
Please note that "-" characters need to be included in the key when providing it to HomeAssistant. The key needs to be simular to "12ab345c-d67e-8f"

![alt text](https://raw.githubusercontent.com/starkillerOG/motion-blinds/main/pictures/Motion_App__get_key_1.jpg)
![alt text](https://raw.githubusercontent.com/starkillerOG/motion-blinds/main/pictures/Motion_App__get_key_2.jpg)

[Motion Blinds]: /integrations/motion_blinds
