---
title: Entity Migration
description: Discover and migrate entity references across Home Assistant configurations.
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

The **Entity Migration** {% term integration %} allows you to discover and migrate all references to an entity across your Home Assistant configuration. This is useful when you want to replace a device, switch integrations, or understand the impact of removing an entity.

You can access the Entity Migration panel from **Settings** > **Devices & services** > **Entity Migration**.

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

The integration provides the following actions.

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

### Action: Migrate entity references

The `entity_migration.migrate` action migrates all references from one entity to another across your configuration.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `source_entity_id` | no | The entity to migrate references from. |
| `target_entity_id` | no | The entity to migrate references to. |
| `dry_run` | yes | Preview changes without applying them. Default: `false`. |
| `create_backup` | yes | Create a backup of affected files before migration. Default: `false`. |
| `force` | yes | Bypass compatibility warnings and force migration. Default: `false`. |

#### Compatibility validation

Before migration, the system validates compatibility between source and target entities. The following checks are performed:

- **Domain mismatch**: Warning when source and target have different domains (e.g., `sensor` to `binary_sensor`)
- **Device class mismatch**: Warning when device classes differ
- **Unit of measurement mismatch**: Warning when units differ

Warnings do not block migration but indicate potential issues. Use `force: true` to suppress warning checks.

Migration is blocked if the target entity does not exist in the entity registry.

#### Backup

When `create_backup: true` is set, affected configuration files are backed up to `.backup/entity_migration/{timestamp}/` before any changes are applied.

#### Example: Dry-run migration

Preview what would change without applying any modifications:

```yaml
action: entity_migration.migrate
data:
  source_entity_id: sensor.old_temperature
  target_entity_id: sensor.new_temperature
  dry_run: true
response_variable: migration_preview
```

#### Example: Full migration with backup

Execute migration with a backup of affected files:

```yaml
action: entity_migration.migrate
data:
  source_entity_id: sensor.old_temperature
  target_entity_id: sensor.new_temperature
  create_backup: true
response_variable: migration_result
```

#### Example: Force migration despite warnings

Override compatibility warnings (use with caution):

```yaml
action: entity_migration.migrate
data:
  source_entity_id: sensor.temperature_celsius
  target_entity_id: sensor.temperature_fahrenheit
  force: true
response_variable: migration_result
```

#### Response

The action returns a response containing:

- `success`: Whether the migration completed successfully
- `source_entity_id`: The source entity that was migrated from
- `target_entity_id`: The target entity that was migrated to
- `updated`: Dictionary of config types mapped to lists of updated config IDs
- `updated_count`: Total number of references updated
- `errors`: List of any errors that occurred during migration
- `backup_path`: Path to backup directory (if backup was created)
- `dry_run`: Whether this was a dry run

## WebSocket API

The integration provides WebSocket commands for real-time operations from the frontend. All commands require administrator privileges.

### Scan for references

```json
{
  "type": "entity_migration/scan",
  "id": 1,
  "entity_id": "sensor.living_room_temperature"
}
```

Returns scan results with all references grouped by configuration type.

### Validate compatibility

Check compatibility between source and target entities before migration:

```json
{
  "type": "entity_migration/validate",
  "id": 2,
  "source_entity_id": "sensor.old_temperature",
  "target_entity_id": "sensor.new_temperature"
}
```

Returns:

- `valid`: Whether migration can proceed (no blocking errors)
- `source_entity_id`: The source entity validated
- `target_entity_id`: The target entity validated
- `warnings`: List of non-blocking compatibility warnings
- `blocking_errors`: List of errors that prevent migration

### Execute migration

Migrate all references from source to target entity:

```json
{
  "type": "entity_migration/migrate",
  "id": 3,
  "source_entity_id": "sensor.old_temperature",
  "target_entity_id": "sensor.new_temperature",
  "dry_run": false,
  "create_backup": true,
  "force": false
}
```

Parameters:

- `source_entity_id` (required): Entity to migrate from
- `target_entity_id` (required): Entity to migrate to
- `dry_run` (optional): Preview changes without applying. Default: `false`
- `create_backup` (optional): Backup files before migration. Default: `false`
- `force` (optional): Bypass compatibility warnings. Default: `false`

Returns migration results including success status, updated references, and any errors.

## Related integrations

The Entity Migration integration works alongside the [Search](/integrations/search/) integration, which provides relationship discovery between areas, devices, entities, and configuration entries.
