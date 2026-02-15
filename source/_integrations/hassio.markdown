---
title: Home Assistant Supervisor
description: Control Supervisor Apps and OS from Home Assistant
ha_category:
  - Backup
  - Binary sensor
  - Sensor
  - Switch
  - Update
ha_iot_class: Local Polling
ha_release: 0.42
ha_domain: hassio
ha_quality_scale: internal
ha_platforms:
  - backup
  - binary_sensor
  - diagnostics
  - sensor
  - switch
  - update
ha_codeowners:
  - '@home-assistant/supervisor'
ha_integration_type: integration
---

The **Home Assistant Supervisor** {% term integration %} allows you to monitor and control Supervisor apps and operating system from Home Assistant.
This integration is already installed if you run {% term "Home Assistant Operating System" %}. Please note that this integration
cannot be installed on {% term "Home Assistant Container" %}.

## Sensor entities

For each installed app, the following sensors are available:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | no | Current version of the app
| Newest Version | no | Latest version of the app currently available
| CPU Percent| no | The CPU Percent usage of the app
| Memory Percent| no | The Memory (RAM) Percent usage of the app

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

For each installed app Supervisor provides following binary sensors:

(These entities are disabled by default and must be re-enabled to appear)

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | no | Whether there is an update available for this app (This is deprecated, use the Update entities instead.)
| Running | no | Whether the app is running or not.

For each network storage Supervisor provides following binary sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Connected | no | Whether the network storage is connected and working properly.

For Home Assistant OS Supervisor provides following binary sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | no | Whether there is an update available for OS

## Switch entities

For each installed app, the following switch is available:

| Switch | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Running | no | Shows whether the app is running or not, and allows you to start or stop the app depending on its current state. |

## Update entities

For all your installed apps, Home Assistant Core, Home Assistant Supervisor, and for the Home Assistant Operating System (if you are running that), this integration will provide [update](/integrations/update) entities that provide information about pending updates, and will allow you to update to them.

## Actions

### Action: Start app

The `hassio.app_start` action starts an app.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `app` | no | App slug

### Action: Stop app

The `hassio.app_stop` action stops an app.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `app` | no | App slug

### Action: Restart app

The `hassio.app_restart` action restarts an app.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `app` | no | app slug

### Action: Write to app stdin

The `hassio.app_stdin` action writes data to app stdin.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `app` | no | app slug

### Action: Reboot host

The `hassio.host_reboot` action reboots the host system.

### Action: Shut down host

The `hassio.host_shutdown` action shuts down the host system.

### Action: Create full backup

The `hassio.backup_full` action creates a full backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name` | yes | By default, the current date and time are used in your local time, which you have set in your general settings.
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups
| `location` | yes | Alternate backup location instead of using the default location for backups
| `homeassistant_exclude_database` | yes | Exclude the Home Assistant database file from backup

### Action: Create partial backup

The `hassio.backup_partial` action creates a partial backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `apps` | yes | List of app slugs to backup
| `folders` | yes | List of directories to backup
| `name` | yes | Name of the backup file. Default is the current date and time in the user's local time
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups
| `location` | yes | Alternate backup location instead of using the default location for backups
| `homeassistant` | yes | Include Home Assistant and associated config in backup
| `homeassistant_exclude_database` | yes | Exclude the Home Assistant database file from backup

### Action: Restore from full backup

The `hassio.restore_full` action restores from a full backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `password` | yes | Optional password for backup

### Action: Restore from partial backup

The `hassio.restore_partial` action restores from a partial backup.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `homeassistant` | yes | Whether to restore Home Assistant, `true` or `false`
| `apps` | yes | List of app slugs to restore
| `folders` | yes | List of directories to restore
| `password` | yes | Optional password for backup
