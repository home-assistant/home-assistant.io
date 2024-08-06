---
title: "Setting up presence detection"
description: "Instructions on how to set up zone presence detection within Home Assistant."
---

Zone presence detection detects if people are within a certain zone, which can be valuable input for automation. Knowing who is home or where they are opens a range of automation options:

- Send me a notification when my child arrives at school
- Turn on the AC when I leave work

<p class='img'>
    <img src="/images/screenshots/map.png" alt="Screenshot of a map dashboard in Home Assistant showing a school, work and home zone and two people."/>
    Map dashboard showing a school, work, and a home zone and the location of two people.
</p>

## About setting up zone presence detection

There are different ways of setting up zone presence detection. One way is to run an app on your phone to provide detailed location information to your Home Assistant instance. Another way to detect presence is by checking which {% term devices %} are connected to the network. You can do that if you have one of our [supported routers][routers]. By leveraging what your router already knows, you can detect if people are at home.

## Adding zone presence detection with a mobile phone

### Prerequisites

- [Home Assistant installed](/installation/)
- [Onboarding steps](/getting-started/onboarding/) completed
- [Remote access enabled](https://www.home-assistant.io/docs/configuration/remote/)
  - The easiest way to do this is by enabling
    - [Home Assistant Cloud](https://nabucasa.com/config/)
- Mobile phone:
  - Android phone (Android 5 or later) or iPhone (iOS 10 or later)
  - Phone plan with Internet access
  - Access to your local network where Home Assistant is running
- [Home Assistant companion app installed](https://companion.home-assistant.io/docs/getting_started/) on your phone.
  - During the setup procedure, make sure to grant **Location access**.
    - Location access creates a `device_tracker` entity for that device. This entity can be used in automations and conditions.

### To add zone presence detection with a mobile phone

1. Open the companion app on your phone and log in to your Home Assistant instance.
2. On the screen to **Connect to Home Assistant**, make sure you activate **Enable location tracking**.
   - Select **Continue**.
3. Go to {% my integrations title="**Settings** > **Devices** & **Services**" %} and look for the new integration that was added: **Mobile App**.
   - On the integration card, select **1 Device**. This opens the device info page.
   - You now see your phone name and its entities.
4. To view the location of your phone on the map, open the **Map** dashboard.
   - You now see a circle on that map with your initial.
   - It shows the current location of your phone.
   - To view the details, select that initial.
     - Open the **Attributes** list to see the phone's **Latitude**, **Longitude**, and the **Source** of information.
     - The source is the `device_tracker` entity for that device, for example `device_tracker_pixel_7_pro`.
5. To view the entity details and the history, go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and in the search field, enter `devi` and select your `device_tracker` entity from the list.
6. Check your [Zones](/integrations/zone/) to prepare them for automations.
   - Your home zone was set up during onboarding, but you can edit it.
   - You can add other zones if you want to automate on them.
     - For example, if you want the heating to start when you leave your office, you can add a zone called **Office**.
     - In this case, leaving the office zone would be an automation {% term trigger %}.
     - You could also use the location information as an automation {% term condition %}, for example, when you have an automation to turn on the light at sunset, but only when you are home.


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
