---
layout: page
title: "Ecobee"
description: "Instructions for how to integrate Ecobee thermostats and sensors within Home Assistant."
date: 2015-11-30 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: ecobee.png
ha_category: Hub
featured: true
---


The Ecobee platform lets you control a thermostats and view sensor data from the [Ecobee](https://ecobee.com) thermostat.

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this component.  To get the key, first you need to register your thermostat. Once you have done that, click on the 'Become a developer' link on the developer site. Login with your ecobee credentials, accept the SDK agreement, fill in the fields, and click save. Now login to the regular consumer portal, and in the hamburger menu there will br a new option 'Developer'. Select that, then select 'Create New'. Give your app a name (it appears to need to be unique across all users, as I tried 'home-assistant' and it said it was already in use) and a summary (neither of these are important as they are not used anywhere). For Authorization method select 'ecobee PIN'. You don't need an Application Icon or Detailed Description. Click Save. Now under the Name and Summary Section you will have an API key. Copy this key and use it in you configuration section below. Click the 'X' to close the Developer section. 

The first time you run Home-Assistant with this component it will give you a PIN code that you need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html).  You can do this by clicking 'Add Application' in the 'My Apps' section in the sidebar. Enter the PIN code from the Home Assistant screeen. To get the PIN code select the item in the Ecobee card. If you do not have an Ecobee card, you may be using groups with default_view that don't show the card. To get around this you can temporarily comment out the default_view section and restart Home Assistant. Once you enter the PIN on the Ecobee site, wait approximately 5 minutes and then click on the 'I have authorized the app' link at the bottom of the Ecobee popup window. If everything worked correctly, you should now be able to restart Home Assistant again to see the full Ecobee card with all of the sensors populated. Now you can re-enable your default_view (if you had to disable it) and add the Ecobee sensors to a group and/or view.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
ecobee:
  api_key: asdfghjklqwertyuiopzxcvbnm 
  hold_temp: True
```

Configuration variables:

- **api_key** (*Required*): Your Ecobee api key.
- **hold_temp** (*Optional*): True/False whether or not to hold changes indefinitely (True) or until the next scheduled event (False, default).

<p class='img'>
  <img src='{{site_root}}/images/screenshots/ecobee-sensor-badges.png' />
  <img src='{{site_root}}/images/screenshots/ecobee-thermostat-card.png' />
</p>
