---
title: Connector
description: Instructions on how to integrate connector into Home Assistant.
ha_category:
  - Cover
ha_iot_class: local push
ha_release: 2023.4
ha_domain: connector
ha_codeowners:
  - '@Lucas'
ha_config_flow: true
---

The integration allows you to control Connector APP.

To add a Connector HUB to your installation, click Configuration in the sidebar, then click Integrations. Click the + icon in the lower right. Then search for "connector" and enter the setup.

You will be asked for the IP address of the Connector HUB, e.g., 192.168.31.100. Note that a static IP address is required in order for this integration to keep working properly.

## Retrieving the API Key

The Connector API uses a 16 character key that can be retrieved from the official "Connector" app for [IOS](https://apps.apple.com/cn/app/connector/id1344058317) or [Android](https://play.google.com/store/apps/details?id=com.smarthome.app.connector).

Open the app, click the button in the upper left corner to expand the page, then click the setting button in the upper left corner to enter the "Settings page", click the About option to enter the "About page",Please quickly tap this "Connector Shades About" page 5 times, a popup will apear that gives you the key.

Please note that "-" characters need to be included in the key when providing it to Home Assistant. The key needs to be similar to `12ab345c-d67e-8f`

<p class='img'>
<img src='/images/integrations/connector/About_page.jpg' />
<img src='/images/integrations/connector/key.jpg' />
</p>
