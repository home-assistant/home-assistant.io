---
title: EffortlessHome
description: Set up EffortlessHome account helpers, switches, and actions in Home Assistant.
ha_category:
  - Other
  - Switch
ha_release: 2026.4
ha_quality_scale: bronze
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@effortlesshome'
ha_domain: effortlesshome
ha_platforms:
  - switch
ha_integration_type: service
related:
  - url: https://my.effortlesshome.co
    title: EffortlessHome
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **EffortlessHome** {% term integration %} connects your EffortlessHome account to Home Assistant. It adds helper switches and account-based actions you can use to organize entities, create alert records, create alarm events, and deploy EffortlessHome resources such as themes, blueprints, and dashboard files.

Use case: If you manage a Home Assistant installation with EffortlessHome, this integration gives you a central way to sign in, select your system, and run helper actions from Home Assistant.

## Supported devices

The integration supports EffortlessHome systems that are linked to your EffortlessHome account.

After setup, Home Assistant creates one EffortlessHome device and exposes helper switches and actions for that system.

## Unsupported devices

The integration does not automatically create separate Home Assistant entities for every device managed by your EffortlessHome system.

If a device is not exposed through the helper switches or actions provided by the integration, manage that device through its own Home Assistant integration.

## Prerequisites

1. You need an EffortlessHome account. If you are new to EffortlessHome, create one on the [EffortlessHome website](https://my.effortlesshome.co).
2. Your account must already be linked to at least one EffortlessHome system.
3. You need the email address and password for your EffortlessHome account.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following option:

{% configuration_basic %}
Debug mode:
    description: "Enable additional logging for troubleshooting."
{% endconfiguration_basic %}

## Supported functionality

The **EffortlessHome** integration provides the following switches.

### Switches

- **Sleep Mode**
  - Indicates whether your home is in sleep mode
- **Motion Notifications**
  - Controls whether motion notifications are enabled
- **Monitoring Alarm**
  - Helper switch for alarm monitoring workflows
- **Disable Motion Lighting**
  - Helper switch to disable motion-based lighting automations
- **Presence Simulation**
  - Helper switch for presence simulation workflows
- **SmartAppliance1**
  - Helper switch for smart appliance conversion
- **SmartAppliance2**
  - Helper switch for smart appliance conversion
- **SmartAppliance3**
  - Helper switch for smart appliance conversion

## Actions

The integration provides the following actions.

### Action: Clean motion files

The `effortlesshome.clean_motion_files` action removes old motion snapshot files from your Home Assistant configuration.

Data fields:

- `age`
  - Number of days to keep files before they are removed

### Action: Add label to entity

The `effortlesshome.add_label_to_entity` action adds a label to an entity in the entity registry.

Data fields:

- `entity_id`
  - The entity to update
- `label`
  - The label to add

### Action: Create alert

The `effortlesshome.create_alert` action creates an alert record in EffortlessHome.

Data fields:

- `alert_type`
  - The alert type, such as a humidity alert
- `alert_description`
  - A description of the alert
- `status`
  - The alert status

### Action: Update entity

The `effortlesshome.update_entity` action assigns an area to an entity in the entity registry.

Data fields:

- `entity_id`
  - The entity to update
- `area_id`
  - The area to assign

### Action: Deploy latest config

The `effortlesshome.deploy_latest_config` action copies packaged EffortlessHome resources, such as themes, blueprints, and dashboard files, into your Home Assistant configuration.

This action has no additional data fields.

### Action: Create event

The `effortlesshome.create_event` action creates an event for an active alarm based on the selected entity.

Data fields:

- `entity_id`
  - The entity used to create the event

## Data updates

The integration retrieves account and system details from the EffortlessHome cloud when you set it up.

After setup, the helper switches keep their state in Home Assistant, and action calls contact EffortlessHome only when you run them.

## Known limitations

The integration is focused on helper switches and actions.

It does not automatically mirror all devices from your EffortlessHome account as dedicated Home Assistant entities.

## Troubleshooting

### Can't sign in

If the integration shows an invalid authentication error, make sure you are using the same email address and password that you use on the [EffortlessHome website](https://my.effortlesshome.co).

If needed, update your credentials in EffortlessHome first, and then try setting up the integration again.

### No system found

If setup reports that no system was found, confirm that your EffortlessHome account already has a system assigned to it.

If your account is new or your system was recently added, sign in to the EffortlessHome website and verify that the system is available there before trying again.

### Can't connect to EffortlessHome services

If Home Assistant cannot connect to EffortlessHome services, check your internet connection, and then review your Home Assistant logs.

For more information, refer to [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}