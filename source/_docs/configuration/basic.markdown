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

The general settings described here are managed by the [Home Assistant Core integration](/integrations/homeassistant/). If you are interested in the services offered by this integration, check out the integration documentation.

## Editing the general settings

To change the general settings that were defined during onboarding, follow these steps:

1. Go to {% my general title="**Settings** > **System** > **General**" %} and make your changes.
2. To change network-related configuration, such as the network name, go to {% my network title="**Settings** > **System** > **Network**" %}.
3. If some of the settings are not visible, you may need to enable **Advanced mode**.
   - In the bottom left, select your user name to go to your {% my profile title="**User profile**" %}, and enable **Advanced mode**.
4. **Troubleshooting**: If any of the settings are grayed out and can't be edited, this is because they are defined in the [`configuration.yaml` file](/docs/configuration/).
   - If you prefer editing the settings in the UI, you have to delete these entries from the [`configuration.yaml` file](/docs/configuration/).
   - For more information about the general settings in YAML, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).

    ![Setting fields are grayed out because the configuration settings stored in configuration.yaml file](/images/docs/configuration/general-settings-stored-in-config-yaml.png)

5. To apply the changes, follow the steps on [reloading the configuration](/docs/configuration/#reloading-configuration-changes).
