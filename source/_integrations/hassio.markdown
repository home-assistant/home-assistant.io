---
title: Home Assistant Supervisor
description: Control Supervisor Add-ons and OS from Home Assistant
ha_category:
  - Binary Sensor
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
ha_integration_type: system
---

Supervisor integration allows you to monitor and control Supervisor add-ons and operating system from Home Assistant.
This integration is installed automatically if you run Home Assistant OS or Supervised.

## Sensor entities

For each installed add-on Supervisor provides following sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | no | Current version of the add-on
| Newest Version | no | Latest version of the add-on currently available
| CPU Percent| no | The CPU Percent usage of the add-on
| Memory Percent| no | The Memory (RAM) Percent usage of the add-on

For Home Assistant OS Supervisor provides following sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | no | Current version of the Home Assistant OS
| Newest Version | no | Latest version of the Home Assistant OS currently available

## Binary Sensor entities

For each installed add-on Supervisor provides following binary sensors:

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

## Services

### Service hassio.addon_start

Start an add-on.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Service hassio.addon_stop

Stop an add-on.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Service hassio.addon_restart

Restart an add-on.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Service hassio.addon_stdin

Write data to add-on stdin.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Service hassio.addon_update

Update add-on. This service should be used with caution since add-on updates can contain breaking changes. It is highly recommended that you review release notes/change logs before updating an add-on.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Add-on slug

### Service hassio.host_reboot

Reboot the host system.

### Service hassio.host_shutdown

Shutdown the host system.

### Service hassio.backup_full

Create a full backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name` | yes | Name of the backup file. Default is current date and time
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups

### Service hassio.backup_partial

Create a partial backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addons` | yes | List of add-on slugs to backup
| `folders` | yes | List of directories to backup
| `name` | yes | Name of the backup file. Default is current date and time
| `password` | yes | Optional password for backup
| `compressed` | yes | `false` to create uncompressed backups

### Service hassio.restore_full

Restore from full backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `password` | yes | Optional password for backup

### Service hassio.restore_partial

Restore from partial backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `homeassistant` | yes | Whether to restore Home Assistant, `true` or `false`
| `addons` | yes | List of add-on slugs to restore
| `folders` | yes | List of directories to restore
| `password` | yes | Optional password for backup
