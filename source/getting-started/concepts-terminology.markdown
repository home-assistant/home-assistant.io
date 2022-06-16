---
title: "Concepts and terminology"
description: "User explanation of Home Assistant basics"
---
Now you're in Home Assistant, let's go over important parts of Home Assistant and what they do.

### Integrations
Software that connect Home Assistant to other software or platforms. For example, Philips Hue integration allow Home Assistant to talk to the Hue Bridge and read data such as the state of your lights through to controlling the lights themselves.

![Integrations](/images/getting-started/integrations.png)

A full list of compatible integrations can be found [here](/integrations).

Once an integration has been added, the hardware and/or data are shown in Home Assistant as [devices and entities](#devices--entities).

### Devices & Entities
Devices are logical grouping for one or more entities. A device may represent a physical device and the device may have one or more sensors which appear as entities associated to the device. For example, a motion sensor is represented as a device and the motion may provide motion detection, temperature and light levels as entities. Entities have states such as `on` when motion is detected and `off` where is no motion.

Devices and entities can be used in dashboards to [automations](#automations).

![Home Assistant Device](/images/getting-started/home-assistant-device.png)

### Automations
A set of repeatable steps that can be set up to run automatically. More details can be found [here](/automation).

![Automations](/images/getting-started/automation-editor.png)

### Dashboards
Customizable pages to display information connected and available in Home Assistant. More details can be found [here](/dashboards).

![Dashboard](/images/getting-started/lovelace.png)

### Add-ons
Depending on your [installation type](/installation), you may have the ability to install add-ons. Add-ons are usually apps that can be run with Home Assistant but provide a quick and easy way to install, configure and run within Home Assistant. Add-ons provide additional functionality where as integrations connects Home Assistant to other apps.

![Add-ons](/images/getting-started/add-ons.png)

{% include getting-started/next_step.html step="Add an integration" link="/getting-started/integration/" %}