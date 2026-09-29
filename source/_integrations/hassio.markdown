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
This integration is already installed if you run {% term "Home Assistant Operating System" %}. It
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

{% include integrations/actions.md %}

