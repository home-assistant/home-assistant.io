---
layout: page
title: "Leaf Spy"
description: "Instructions on how to setup Leaf Spy to post data to Home Assistant."
date: 2019-05-04 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: leafspy.png
ha_category: Car
ha_release: 0.93.0
ha_iot_class: Local Push
---

Leaf Spy is an application for Android and iOS giving Nissan Leaf owners a better insight into their car and supports pushing certain data directly to Home Assistant. It can be set up via the integrations panel in the configuration screen.


### {% linkable_title Configuring the component %}

1. Open the Home Assistant frontend
2. Open Settings -> integrations
3. If you see an Leaf Spy component under 'Configured', delete it.
   - Click on it.
   - Click on the trashcan icon in the upper right corner.
4. Now, look for Leaf Spy in 'Setup new integration' and click on CONFIGURE.
5. The login credentials and configuration for Leaf Spy will be presented to you.
   in a popup window. You will need these in the configuration for the app as mentioned below.
6. Save these credentials somewhere, as you will need to repeat steps 1-5 to reset the password.

### {% linkable_title Configuring the app %}


Open the Leaf Spy app, go to `Menu` -> `Settings` and scroll down to `Server`. 
Change the following settings:
 - `Enable`: Yes
 - `Send Interval` can be whatever you prefer.
 - `ID`: `<Car Name>`
 - `PW`: `<secret from integration setup>`
 - `Http` or `Https` depending on the access to your Home Assistant install.
 - `URL`: `<HA domain/ip>`/api/leafspy/update - Note: **Do not** add http or https to the URL.

Your Nissan Leaf will be known in Home Assistant as device_tracker.leaf_<VIN number>
