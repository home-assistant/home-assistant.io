---
title: Update
description: Instructions on how to use update entities with Home Assistant.
ha_category: []
ha_release: 2022.4
ha_quality_scale: internal
ha_domain: update
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

An update entity is an entity that indicates if an update is available for a
device or service. This can be any update, including update of a firmware
for a device like a light bulb or router, or software updates for things like
add-ons or containers.

The state of the update entity indicates if there is an update pending or not,
and if there is an update available, more information on that update can be
provided by an integration to the entity. For example, the version that is
available, a summary of the release notes, and even links that provide more
information on the available update.

Lastly, there are two services available for the update entity. If possible and
made available by the integration providing the update entity, triggering
the actual update from Home Assistant. The other service exposed allows for
skipping the offered update.

<div class='note'>

Update entities are here to be consumed and provided by other integrations and
are are not designed to be created manually directly.

This page, therefore, does not provide instructions on how to create update
entities. Please see the ["Updates" category](/integrations/#updates) on the
integrations page to find integration offering update entities.

</div>

## The state of an update entity

The state of an update entity reflects whether an update is available or not.
When the state is `on`, it means there is an update available; when everything
is up-to-date, the state is `off`.

Additionally, the following state attributes are exposed to provide more
information on the update state:

- `title`: The title/name of the available software or firmware. As the device
  name or entity name can be changed in Home Assistant, this title will provide
  the actual name of the software or firmware.
- `installed_version`: The current version that is currently installed and in use.
- `latest_version`: The latest version that is available for installation.
- `skipped_version`: If a version update is skipped, this attribute will be set
  and contains the actual version that was skipped.
- `release_summary`: A summary of the release notes for the update available.
- `release_url`: A link to the full release announcement for the update available.

## Device Classes

The way these update entities are displayed in the frontend depend on their
device classes. The following device classes are supported for switches:

- **`None`**: A generic software update. This is the default and doesn't need
  to be set.
- **`firmware`**: This update integration provides firmwares.

## Services

The update entity exposes two services that can be used to install or skip
an offered software update.

### Service {% my developer_call_service service="update.install" %}

The {% my developer_call_service service="update.install" %} service can be used
to install an offered update to the device or service.

This service is only available for an update entity if an integration provides
this capability. Additionally, if allowed by the integration, the service
provides for installing a specific version and even could make a
backup before installing the update.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | String or list of strings that point at `entity_id`s of updates. To target all updates, set `entity_id` to `all`.
| `version`              |     yes  | A specific update version to install, if not provided, the latest available update will be installed. Availability of this atrribute is dependent on the integration.
| `backup`               |     yes  | If set to `true`, a backup will be made before installing the update. Availability of this attribute is dependent on the integration.

Example service call:

```yaml
service: update.install
target:
  entity_id:
    - update.my_light_bulb
```

### Service {% my developer_call_service service="update.skip" %}

The {% my developer_call_service service="update.skip" %} service can be used
to skip an offered update to the device or service.

After skipping an offered update, the entity will return to the `off` state,
which means there is no update available.

```yaml
service: update.skip
target:
  entity_id:
    - update.my_light_bulb
```

Even if an update is skipped and shows as `off` (meaning no update), if there
is a newer version available, calling the `update.install` service on the entity
will still install the latest version.

### Service {% my developer_call_service service="update.clear_skipped" %}

The {% my developer_call_service service="update.clear_skipped" %} service can
be used to remove skipped version marker of a previously skipped an offered
update to the device or service.

After skipping an offered update, the entity will return to the `off` state,
but will not return to it until a newer version becomes available again.

Using the `update.clear_skipped` service, the skipped version marker can be
removed and thus the entity will return to the `on` state and the update
notification will return.

```yaml
service: update.clear_skipped
target:
  entity_id:
    - update.my_light_bulb
```

This can be helpful to, for example, in an automation that weekly unskips
all updates you have previously marked as skipped; as a reminder to update.

## Example: Sending update available notifications

A common use case for using update entities is to notify you if an update
has become available for installation. Using the update entities,
this is fairly straightforward to do.

This is a YAML example for an automation that sends out a notification when
the update for a light bulb becomes available.

```yaml
automation:
  - alias: "Send notification when update available"
    trigger:
      platform: state
      entity_id: update.my_light_bulb
      to: "on"
    action:
      alias: "Send notification to my phone about the update"
      service: notify.iphone
      data:
        title: "New update available"
        message: "New update available for my_light_bulb!"
```
