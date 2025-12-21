---
title: "Setup basic information"
description: "Setting up the basic info of Home Assistant."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
---

As part of the default onboarding process, Home Assistant can detect your location from IP address geolocation. Home Assistant will automatically select a unit system and time zone based on this location. If you didn't adjust this directly during onboarding, you can do it later.

<p class='img'>
    <img class="no-shadow" src='/images/docs/configuration/general-settings.png' alt='Screenshot showing General settings page'>
    Screenshot showing the General settings page.
</p>

The general settings described here are managed by the [Home Assistant Core integration](/integrations/homeassistant/). If you are interested in the actions offered by this integration, check out the integration documentation.

## Editing the general settings

To change the general settings that were defined during onboarding, follow these steps:

1. Go to {% my general title="**Settings** > **System** > **General**" %}.
   - Make your changes.
   - To change location or radius, under **Edit location**, select edit.
   - Then, adjust location and radius.
      <img class="no-shadow" src='/images/docs/configuration/change_location_radius.webp' alt='Screencast showing how to zoom and pan to change location and radius on the Edit home page'>
   - To add a new zone, select **Add zone**.
   - To save your changes, select **Update**.
2. To change network-related configuration, such as the network name, go to {% my network title="**Settings** > **System** > **Network**" %}.
3. If some of the settings are not visible, you may need to enable **Advanced mode**.
   - In the bottom left, select your username to go to your {% my profile title="**User profile**" %}, and enable **Advanced mode**.
4. **Troubleshooting**: If any of the settings are grayed out and can't be edited, this is because they are defined in the {% term "`configuration.yaml`" %} file.
   - If you prefer editing the settings in the UI, you have to delete these entries from the {% term "`configuration.yaml`" %} file.
   - For more information about the general settings in YAML, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).

    ![Setting fields are grayed out because the configuration settings stored in configuration.yaml file](/images/docs/configuration/general-settings-stored-in-config-yaml.png)

5. To apply the changes, follow the steps on [reloading the configuration](/docs/configuration/#reloading-configuration-changes).

## Changing a person's display name

The display name is the name that is shown in Home Assistant. It can differ from the username, which is the name used to log in.

### Prerequisites

- You need administrator rights to change a display name.

## To change a display name

1. To edit the display name of a person using Home Assistant, go to {% my people title="**Settings** > **People**" %} and select the person for which you want to change the display name.
2. Change the display name and select **Update** to save the change.

## Changing a username

The username is the name that is used to log in. It can differ from the display name.

### Prerequisites

- You need owner rights to change a username.

### To change a username

1. To edit the username of a person using Home Assistant, go to {% my people title="**Settings** > **People**" %} and select the person for which you want to change the display name.
2. Change the username and select **Update** to save the change.
   - It must be lowercase and contain no spaces.
   - The log in is case-sensitive.

## Changing authentication settings

To learn how to edit authentication settings such as password or multi-factor authentication, refer to the following topics:

- [Authentication](/docs/authentication/)
- [multi-factor authentication](/docs/authentication/multi-factor-auth/)
- [Help, I'm locked out](/docs/locked_out/)
