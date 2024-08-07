---
title: "Using presence detection in automation"
description: "Instructions on how to use presence detection in automations."
---

Now that you have [set up a device for presence detection](/getting-started/presence-detection/), you can use it in automations.

## Using presence detection as condition in automations

In this tutorial, our goal is to run the [turning on the lights before sunset](/getting-started/automation/#turning-on-the-lights-before-sunset) automation only if we are home. This automation is triggered by the sunset. We want to add a condition.

### Prerequisites

- For this tutorial, we are going to work with the automation created in the tutorial on [Automating Home Assistant](/getting-started/automation/). But you can apply these steps in other automations you may already have.
- You have completed the tutorial on [presence detection](/getting-started/presence-detection/) and set up at least one device tracker.

### To use presence detection as a condition in automation

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation we created before, on [turning on the lights before sunset](/getting-started/automation/#turning-on-the-lights-before-sunset).
2. Select **Add condition**.
3. There are multiple ways to add a condition based on presence. Choose one of the options:
   - **Option 1**: If there are multiple people in this home, and you want the light to turn on if at least one person is home:
     - Under **Search condition**, enter `num`, and select **Numeric state**.
     - Under **Entity**, enter `zone`, and select the home zone: `zone.home`.
     - Under **Attribute**, select **Persons**.
     - Select **Fixed number**.
     - Under **Above**, enter `0`.

      ![Screenshot showing an automation condition when someone is home](/images/getting-started/condition_zone_persons_home.png)

   - **Option 2**: If you want to run this automation only if a specific device is home, follow this steps:
     - Select **Entity**, then **State**.
     - Under **Entity**, enter `device_`. This will bring up the list of device trackers. Select it. In this example, it is the `device_tracker.pixel_7_pro`.
     - Under **State**, select **Home**.
     - Now, the light will only turn on, when this specific device is home.

      ![Screenshot showing an automation condition when someone is home](/images/getting-started/condition_zone_device_home.png)

4. Select **Save**.
5. Congratulations! Now, your automation will only run if someone is home.

[routers]: /integrations/#presence-detection
[nmap]: /integrations/nmap_tracker
[ha-bluetooth]: /integrations/bluetooth_tracker
[ha-bluetooth-le]: /integrations/bluetooth_le_tracker
[ha-locative]: /integrations/locative
[ha-gpslogger]: /integrations/gpslogger
[ha-presence]: /integrations/#presence-detection
[mqtt-self]: /integrations/mqtt/#run-your-own
[mqtt-cloud]: /integrations/mqtt/#cloudmqtt
[zone]: /integrations/zone/
[trigger]: /getting-started/automation-trigger/#zone-trigger
[condition]: /getting-started/automation-condition/#zone-condition
[companion]: https://companion.home-assistant.io/

{% include getting-started/next_step.html step="Join the Community" link="/getting-started/join-the-community/" %}
