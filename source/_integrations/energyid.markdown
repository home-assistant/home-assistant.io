---
title: EnergyID
description: Instructions on how to integrate EnergyID into Home Assistant to send your sensor data to the EnergyID platform.
ha_category:
  - Energy
ha_iot_class: Cloud Push
ha_domain: energyid
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@JrtPec'
  - '@Molier'
ha_release: 2025.12
ha_quality_scale: silver
---

The **EnergyID** {% term integration %} connects your Home Assistant to [EnergyID](https://www.energyid.eu/)—a cloud platform for energy monitoring and optimization. This integration uploads your Home Assistant sensor data and provides advanced analytics and performance tracking for solar, battery, energy consumption, and more.

## Prerequisites

1. An active account on [EnergyID](https://www.energyid.eu/).

2. A **Provisioning Key** and **Provisioning Secret** generated from your EnergyID portal. These credentials allow Home Assistant to securely connect to your account.

- For detailed instructions, refer to the [official EnergyID Home Assistant documentation](https://help.energyid.eu/en/apps/home-assistant/).


{% include integrations/config_flow.md %}

During the setup, you will be prompted for the following information:

{% configuration_basic %}
Provisioning Key:
  description: The Provisioning Key obtained from your EnergyID portal.

Provisioning Secret:
  description: The Provisioning Secret associated with your key, obtained from your EnergyID portal.
{% endconfiguration_basic %}

### Initial setup steps

1. After adding the integration, you will first be asked to enter your **Provisioning Key** and **Secret**.
    <p class='img'><img src='/images/integrations/energyid/image-2.png' alt="Screenshot of the EnergyID connection screen in Home Assistant, asking for Provisioning Key and Secret."/></p>
2. If this is the first time you are connecting this Home Assistant instance, you will be directed to the EnergyID website to **claim** your device. This step links your Home Assistant instance to a specific record (e.g., your house) in your EnergyID account.
3. Once claimed, the setup will automatically complete.

## Managing sensor mappings

After the initial setup, you can manage which Home Assistant sensors send data to EnergyID.

1. Go to {% my integrations title="**Settings > Devices & services**" %}.
2. Find the EnergyID integration and select **Configure**.

From here, you can add new sensor mappings. When adding a mapping, you will be asked for the following:

{% configuration_basic %}
Home Assistant sensor:
  description: Select the sensor entity from your Home Assistant instance whose data you want to send. The list is automatically filtered to suggest suitable numeric sensors.
{% endconfiguration_basic %}

<p class='img'><img src='/images/integrations/energyid/image-1.png' alt="Screenshot of the EnergyID configuration screen in Home Assistant, showing options to add and manage sensor mappings."/></p>

When you select a sensor, its `object_id` (the part of the entity ID after the dot) will be used as the **EnergyID Metric Key**. For example, mapping `sensor.total_active_power` will send data to EnergyID with the key `total_active_power`.

## Data updates

The EnergyID integration uses a push-based mechanism with batching:

- It listens for {% term state %} changes on your mapped sensors.
- When a sensor's value changes, the new value and timestamp are queued.
- The queued data is automatically sent to EnergyID in batches. The upload interval is determined by the policy received from EnergyID (typically every 60 seconds).

This is more efficient than traditional {% term polling %}, as it only sends data when there are new updates.

## Use cases

1. Send anything in Home Assistant to EnergyID for long term storage/graphing and detailed analysis.
2. Utilize EnergyID's features to compare your energy usage against anonymized data from similar households and generate detailed reports.
3. Many more [advantages of EnergyID](https://help.energyid.eu/en/using-energyid/getting-started-with-energyid/) and a brief intro can be found.

## Troubleshooting

If you're experiencing issues with your EnergyID integration, please try these general troubleshooting steps:

### Data not appearing in EnergyID

1. Verify that the linked entities from your Home Assistant are actually being updated and are not just stationary or stale. Not all entities send out changes frequently.
2. Make sure that your entities are correctly mapped in the integration settings.
3. Try reloading the EnergyID integration or even try reloading the integration of the entity which is not updating data in EnergyID
4. Be sure to check Home Assistant logs for any errors or issues, or turn on debugging for the integration to receive more info on its workings.{% my logs title="**Settings > System > Logs**" %}
