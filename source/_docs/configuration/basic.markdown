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

## Reload core service

Home Assistant offers a service to reload the core configuration while Home Assistant is running called {% my developer_call_service service="homeassistant.reload_core_config" %}. This allows you to change any of the above sections and see it being applied without having to restart Home Assistant. To call this service, go to the "{% my developer_services %}" tab under {% my developer_services title="Developer Tools" %}, select the {% my developer_call_service service="homeassistant.reload_core_config" %} service and click the "CALL SERVICE" button. Alternatively, you can press the "Location & Customizations" button under {% my server_controls title="Developer Tools > YAML" %}.

