---
layout: page
title: "Neato Robotics"
description: "Instructions on how to integrate your Neato within Home Assistant."
date: 2016-10-09 20:15
sidebar: true
comments: false
sharing: true
footer: true
logo: neato.png
ha_category:
  - Camera
  - Switch
  - Vacuum
ha_release: 0.33
redirect_from:
  - /components/camera.neato/
  - /components/switch.neato/
  - /components/vacuum.neato/
---

The `neato` component allows you to control your [Neato Botvac Connected Robots](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/).

To enable `neato` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
neato:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username for the Neato account.
  required: true
  type: string
password:
  description: Password for the Neato account.
  required: true
  type: string
{% endconfiguration %}

<p class='note'>
After the update to firmware 4.0 (which adds cleaning maps) there is also support for displaying the maps of the Botvac D3 Connected and Botvac D5 Connected robots. More information on how to update can be found [here](https://support.neatorobotics.com/hc/en-us/articles/115004320694-Software-Update-4-0-for-Neato-Botvac-Connected-D3-D5-). 
</p>

## {% linkable_title Vacuum %}

The `neato` vacuum platform allows you to control your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/).
The status will contain attributes on the robots last clean session.

<p class='note'>
If you notice the robot stops responding to commands check the state to see if the robot is "unavailable". If you see "unavailable" first try to restart the vacuum and wait about 5 minutes to see if it is no longer "unavailable". If you are still having issues check the Neato app and make sure your robot is connected and working. If it is not then follow the steps in the app to reset your robot and give it the same name as before then restart Home Assistant.
</p>

### {% linkable_title Configuration %}

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `spot_clean`

## {% linkable_title Camera %}

The `neato` camera platform allows you to view the latest cleaning map of your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

## {% linkable_title Switch %}

The `neato` switch platform allows you to enable or disable the schedule of your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

To add `neato` switch, camera and vacuum to your installation, follow instructions above.