---
layout: page
title: "ecobee"
description: "Instructions for how to integrate Ecobee thermostats and sensors within Home Assistant."
date: 2015-11-30 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: ecobee.png
ha_category: Hub
featured: true
ha_release: 0.9
ha_iot_class: "Cloud Push"
---

The `ecobee` component lets you control a thermostats and view sensor data from [ecobee](https://ecobee.com) thermostats.

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this component. To get the key, first you need to register your thermostat which should be done as part of the ecobee installation. Once you have done that perform the following steps.

1. Click on the **Become a developer** link on the [developer site](https://www.ecobee.com/developers/).
2. Login with your ecobee credentials.
3. Accept the SDK agreement.
4. Fill in the fields.
5. Click **save**.

Now login to the regular consumer portal, and in the hamburger menu there will be a new option **Developer**. Now we can create the Application to hook up to Home Assistant.

1. Select the Developer option.
2. Select **Create New**.
3. Give your app a name (it appears to need to be unique across all users, as I tried 'home-assistant' and it said it was already in use. Try <yournameoralias>-home-assistant) and a summary (neither of these are important as they are not used anywhere).
4. For Authorization method select **ecobee PIN**.
5. You don't need an Application Icon or Detailed Description.
6. Click **Create**.

Now under the Name and Summary Section you will have an API key. Copy this key and use it in you configuration section below. Click the **X** to close the Developer section.

The first time you run Home Assistant with this component it will give you a PIN code that you need to authorize in the [ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html). You can do this by clicking **Add Application** in the **My Apps** section in the sidebar.

The PIN can be found from the Home Assistant portal on the Ecobee card or from the **configurator.ecobee** entity in states in the portal.

- If you do not have an ecobee card, you may be using groups with `default_view` that don't show the card. To get around this you can temporarily comment out the `default_view` section or add the `configurator.ecobee` component to your `default_view` and restart Home Assistant.

Once you enter the PIN on the ecobee site, wait approximately 5 minutes and then click on the **I have authorized the app** link at the bottom of the ecobee pop-up window. If everything worked correctly, you should now be able to restart Home Assistant again to see the full ecobee card with all of the sensors populated or see the list of sensors in the developer tools. Now you can re-enable your `default_view` (if you had to disable it) and add the ecobee sensors to a group and/or view.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ecobee:
  api_key: asdfghjklqwertyuiopzxcvbnm
```

Configuration variables:

- **api_key** (*Required*): Your ecobee API key. This is only needed for the initial setup of the component. Once registered it can be removed. If you revoke the key in the ecobee portal you will need to update this again and remove the ecobee.conf file in the `.homeassistant` configuration path.
- **hold_temp** (*Optional*): `true`/`false` whether or not to hold changes indefinitely (`true`) or until the next scheduled event. Defaults to `false`.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/ecobee-sensor-badges.png' />
  <img src='{{site_root}}/images/screenshots/ecobee-thermostat-card.png' />
</p>

If for whatever reason you delete and re-create your ecobee app at ecobee.com such that your developer API key changes, you will need to delete your `/conf/ecobee.conf file`. You will also need to update the `api_key:` in the `configuration.yaml` or `secrets.yaml` file.
