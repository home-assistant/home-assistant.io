---
title: "Home information"
description: "Set the general information about your Home Assistant, such as your home's name, location, time zone, and units of measurement."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
---

As part of the default onboarding process, Home Assistant can detect your location from IP address geolocation. Home Assistant will automatically select a unit system and time zone based on this location. If you didn't adjust this directly during onboarding, you can do it later.

## Editing the home information

To change the home information (formerly called general settings) that were defined during onboarding, follow these steps:

1. To change the name, go to {% my general title="**Settings** > **System** > **Home information**" %}.
   - Under **Home name**, enter a new name and select **Save**.
2. To change location or radius, go to {% my general title="**Settings** > **System** > **Home information**" %}.
   - Under **Location**, select **Edit**. This opens the home zone editor.
   - Then, adjust the location and radius on the map. These changes are saved automatically.
      <img class="no-shadow" src='/images/docs/configuration/change_location_radius.webp' alt='Screencast showing how to zoom and pan to change location and radius on the Edit home page'>
   - To add a new zone, select **Create zone**.
   - To edit an existing zone, select the {% icon "mdi:pencil" %} edit icon next to it. You can then change its name, icon, and radius, among other settings.
   - To apply your changes, select **Save**.
3. To change regional settings, go to {% my general title="**Settings** > **System** > **Home information**" %}.
   - Under **Region**, you can change the following parameters:
     - **Time zone**
     - **Elevation above sea level**
     - **Unit system**: select **Metric** or **US customary**.
     - **Currency**
     - **Country**
     - **Language**
   - To apply your changes, select **Save**.
4. To change network-related configuration, such as the network name, go to {% my network title="**Settings** > **System** > **Network**" %}.
5. Troubleshooting: If any of the settings are grayed out and can't be edited, this is because they are defined in the {% term "`configuration.yaml`" %} file.
   - If you prefer editing the settings in the UI, you have to delete these entries from the {% term "`configuration.yaml`" %} file.
   - For more information about the general settings in YAML, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).

## Actions related to general home information

The settings described here are managed by the [Home Assistant Core integration](/integrations/homeassistant/). If you are interested in the actions available in the core integration, check out the documentation.

## Changing display names and usernames

To change a person's display name or username, refer to [User configuration](/docs/configuration/user-configuration/).
