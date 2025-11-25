---
title: Entity Migration
description: Find all references to an entity across Home Assistant configurations.
ha_category:
  - Other
ha_release: "2025.12"
ha_codeowners:
  - "@xvanov"
ha_domain: entity_migration
ha_quality_scale: internal
ha_integration_type: system
related:
  - docs: /integrations/search/
    title: Search integration
  - docs: /integrations/automation/
    title: Automations
  - docs: /integrations/script/
    title: Scripts
  - docs: /integrations/scene/
    title: Scenes
  - docs: /integrations/group/
    title: Groups
  - docs: /integrations/person/
    title: Person
  - docs: /dashboards/
    title: Dashboards
---

The **Entity Migration** {% term integration %} allows you to discover all references to an entity across your Home Assistant configuration. This is useful when you want to replace a device, switch integrations, or understand the impact of removing an entity.

The integration scans across:

- [Automations](/integrations/automation/) (UI-created and YAML)
- [Scripts](/integrations/script/) (UI-created and YAML)
- [Scenes](/integrations/scene/)
- [Groups](/integrations/group/)
- [Person](/integrations/person/) configurations
- [Dashboards](/dashboards/) (default, custom, and YAML-mode)

The scanner also detects entity references within Jinja2 templates, including patterns like `states()`, `is_state()`, `state_attr()`, and `expand()`.

The Entity Migration integration is automatically loaded with Home Assistant and does not need to be configured separately.

## Actions

The integration provides the following action.

### Action: Scan for entity references

The `entity_migration.scan` action finds all references to a specified entity across your configuration.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | no       | The entity to scan for references. |

#### Example

```yaml
action: entity_migration.scan
data:
  entity_id: sensor.living_room_temperature
response_variable: scan_result
```

The action returns a response containing:

- `source_entity_id`: The entity that was scanned
- `references`: A dictionary of references grouped by configuration type (automations, scripts, scenes, groups, persons, dashboards)
- `total_count`: The total number of references found

Each reference includes:

- `config_type`: The type of configuration (automation, script, scene, group, person, dashboard)
- `config_id`: The unique identifier of the configuration item
- `config_name`: The human-readable name
- `location`: Where in the configuration the reference appears

## WebSocket API

The integration provides a WebSocket command for real-time scanning from the frontend.

```json
{
  "type": "entity_migration/scan",
  "id": 1,
  "entity_id": "sensor.living_room_temperature"
}
```

This command requires administrator privileges.

## Related integrations

The Entity Migration integration works alongside the [Search](/integrations/search/) integration, which provides relationship discovery between areas, devices, entities, and configuration entries.
