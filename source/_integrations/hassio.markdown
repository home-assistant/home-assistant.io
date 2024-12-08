---
title: Home Assistant Supervisor
description: Control Supervisor Add-ons and OS from Home Assistant
ha_category:
  - Binary sensor
  - Sensor
  - Update
ha_iot_class: Local Polling
ha_release: 0.42
ha_domain: hassio
ha_quality_scale: internal
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - update
ha_codeowners:
  - '@home-assistant/supervisor'
ha_integration_type: integration
---

Supervisor integration allows you to monitor and control Supervisor add-ons and operating system from Home Assistant.
This integration is already installed if you run Home Assistant OS or Supervised. Please note that this integration
cannot be installed on Home Assistant Container or Core (Python venv) installation types.

## Sensor entities

For each installed add-on, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | no | Current version of the add-on
| Newest Version | no | Latest version of the add-on currently available
| CPU Percent| no | The CPU Percent usage of the add-on
| Memory Percent| no | The Memory (RAM) Percent usage of the add-on

For Home Assistant OS, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | no | Current version of the Home Assistant OS
| Newest Version | no | Latest version of the Home Assistant OS currently available

For Home Assistant Core, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| CPU Percent| no | The CPU Percent usage of the core
| Memory Percent| no | The Memory (RAM) Percent usage of the core

For Home Assistant Supervisor, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| CPU Percent| no | The CPU Percent usage of the supervisor
| Memory Percent| no | The Memory (RAM) Percent usage of the supervisor

For Home Assistant Host, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| OS Agent Version | no | The version of the installed OS Agent
| Apparmor Version | no | The version of apparmor
| Disk Free | no | Free space (in GB) left on the device
| Disk Total | no | Total space (in GB) on the device
| Disk Used | no | Used space (in GB) on the device

## Binary sensor entities

For each installed add-on Supervisor provides following binary sensors:

(These entities are disabled by default and must be reenabled to appear)

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | no | Whether there is an update available for this add-on (This is deprecated, use the Update entities instead.)
| Running | no | Whether the add-on is running or not.

For Home Assistant OS Supervisor provides following binary sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | no | Whether there is an update available for OS

## Update entities

For all your installed add-ons, Home Assistant Core, Home Assistant Supervisor, and for the Home Assistant Operating System (if you are running that), this integration will provide [update](/integrations/update) entities that provide information about pending updates, and will allow you to update to them.

## Actions

### Action hassio.addon_start

Start an add-on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Action hassio.addon_stop

Stop an add-on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Action hassio.addon_restart

Restart an add-on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Action hassio.addon_stdin

Write data to add-on stdin.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Action hassio.addon_update

Update add-on. This action should be used with caution since add-on updates can contain backward-incompatible changes. It is highly recommended that you review release notes/change logs before updating an add-on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Action hassio.host_reboot

Reboot the host system.

### Action hassio.host_shutdown

Shutdown the host system.

### Action hassio.backup_full

Create a full backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name` | yes | By default, the current date and time are used in your local time, which you have set in your general settings.
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups
| `location` | yes | Alternate backup location instead of using the default location for backups
| `homeassistant_exclude_database` | yes | Exclude the Home Assistant database file from backup

### Action hassio.backup_partial

Create a partial backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addons` | yes | List of add-on slugs to backup
| `folders` | yes | List of directories to backup
| `name` | yes | Name of the backup file. Default is the current date and time in the user's local time
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups
| `location` | yes | Alternate backup location instead of using the default location for backups
| `homeassistant` | yes | Include Home Assistant and associated config in backup
| `homeassistant_exclude_database` | yes | Exclude the Home Assistant database file from backup

### Action hassio.restore_full

Restore from full backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `password` | yes | Optional password for backup

### Action hassio.restore_partial

Restore from partial backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `homeassistant` | yes | Whether to restore Home Assistant, `true` or `false`
| `addons` | yes | List of add-on slugs to restore
| `folders` | yes | List of directories to restore
| `password` | yes | Optional password for backup
