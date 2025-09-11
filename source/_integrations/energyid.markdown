---
title: EnergyID
description: Instructions on how to integrate EnergyID into Home Assistant to send your sensor data to the EnergyID platform.
ha_category:
  - Energy
ha_iot_class: cloud_push
ha_domain: energyid
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@JrtPec'
  - '@Molier'
ha_release: 2025.10
---

The EnergyID integration allows you to send data from your Home Assistant {% term sensor %} entities to [EnergyID](https://www.energyid.eu/), a cloud-based energy management platform. This enables you to use EnergyID's tools for analysis, reporting, and insights based on data collected by your Home Assistant instance.

## Prerequisites

1. An active account on [EnergyID](https://www.energyid.eu/).
2. A **Provisioning Key** and **Provisioning Secret** generated from your EnergyID portal. These credentials allow Home Assistant to securely connect to your account.
    * For detailed instructions, refer to the [official EnergyID Home Assistant documentation](https://help.energyid.eu/en/apps/home-assistant/).

## Configuration

Adding EnergyID to your Home Assistant instance is done via the user interface.

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

1. Go to {% my integrations title="**Settings > Devices & Services**" %}.
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

* It listens for {% term state %} changes on your mapped sensors.
* When a sensor's value changes, the new value and timestamp are queued.
* The queued data is automatically sent to EnergyID in batches. The upload interval is determined by the policy received from EnergyID (typically every 60 seconds).

This is more efficient than traditional {% term polling %}, as it only sends data when there are new updates.

## Use Cases

* Do **not** let yourself be limited by anything. No PV provider nor dongle firmware and send anything your tinkering heart desires to eid for storage and smart analysis.
* **Benchmarking & Reporting:** Utilize EnergyID's features to compare your energy usage against anonymized data from similar households and generate detailed reports.

## Troubleshooting

### Data not appearing in EnergyID

* **Verify Mappings**: In Home Assistant, go to the EnergyID integration's configuration page and ensure your sensors are correctly mapped.
* **Check Sensor States**: Make sure the source sensors in Home Assistant are available and updating with new values.
* **Reload Integration**: Try reloading the EnergyID integration by going to **Settings > Devices & Services**, finding the EnergyID entry, selecting the three-dot menu, and choosing **Reload**.
* **Check Home Assistant Logs**: Look for any error messages related to the `energyid` component under {% my logs title="**Settings > System > Logs**" %}.
