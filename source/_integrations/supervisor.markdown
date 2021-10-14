---
title: Supervisor
description: Control Supervisor Addons from Home Assistant
ha_category:
  - Binary Sensor
  - Sensor
ha_iot_class: Local Polling
ha_release: 2021.4
ha_domain: hassio
ha_platforms:
  - binary_sensor
  - sensor
---

Supervisor integration allows you to monitor and control Supervisor addons and operating system from Home Assistant.
This integration is installed automatically if you run Home Assistant OS or Supervised.

## Sensors

For each installed addon Supervisor provides following sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | False | Current version of the addon
| Newest Version | False | Latest version of the addon currently available

For Home Assistant OS Supervisor provides following sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Version | False | Current version of the Home Assistant OS
| Newest Version | False | Latest version of the Home Assistant OS currently available

## Binary Sensors

For each installed addon Supervisor provides following binary sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | False | Whether there is an update available for this addon

For Home Assistant OS Supervisor provides following binary sensors:

| Sensor | Enabled by default | Description |
| ------- | ------------------ | ----------- |
| Update Available | False | Whether there is an update available for OS

## Services

### Service hass.addon_start

Start an addon.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Addon slug

### Service hass.addon_stop

Stop an addon.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Addon slug

### Service hass.addon_restart

Restart an addon.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Addon slug

### Service hass.addon_stdin

Write data to add-on stdin.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Addon slug

### Service hass.addon_update

Update add-on. This service should be used with caution since add-on updates can contain breaking changes. It is highly recommended that you review release notes/change logs before updating an add-on.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addon` | no | Addon slug

### Service hass.host_reboot

Reboot the host system.

### Service hass.host_shutdown

Shutdown the host system.

### Service hass.backup_full

Create a full backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `name` | yes | Name of the backup file. Default is current date and time
| `password` | yes | Optional password for backup

### Service hass.backup_partial

Create a partial backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `addons` | yes | List of addon slugs to backup
| `folders` | yes | List of directories to backup
| `name` | yes | Name of the backup file. Default is current date and time
| `password` | yes | Optional password for backup

### Service hass.restore_full

Restore from full backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `slug` | no | Slug of backup to restore from
| `password` | yes | Optional password for backup

### Service hass.restore_partial

Restore from partial backup.

| Service Data Attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `homeassistant` | no | Whether to restore Home Assistant, `true` or `false`
| `slug` | no | Slug of backup to restore from
| `addons` | yes | List of addon slugs to restore
| `folders` | yes | List of directories to restore
| `password` | yes | Optional password for backup
