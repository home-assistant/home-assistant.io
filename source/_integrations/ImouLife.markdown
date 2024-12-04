---
title: Imou Life
description: Integrate IMOU smart devices into Home Assistant.
ha_category:
  - Camera
ha_iot_class: Cloud Polling
ha_release: 0.10
ha_config_flow: true
ha_domain: imoulife
ha_codeowners:
  - '@Imou-OpenPlatform'
ha_platforms:
  - camera
  - button
  - select
  - number
ha_dhcp: true
ha_integration_type: integration
---

The Imou integration uses [Imou Open Platform](https://open.imoulife.com/) APIs to operate Imou camera under the account.

By integrating this component, developers can view real-time previews, control devices, and view camera statuses.

## Prerequisites 
Before using Imou integration, you need to create an Imou Open Platform account and become a developer. Please follow the steps below:

1. Visit the official website of [Imou Open Platform](https://open.imoulife.com/).
2. Register an Imou account (if you already have, log in directly), and click on **control broad** on the official website.
3. Follow the prompts to complete **App Information**, obtain **AppId** and **AppSecret**.
4. Account creation completed, start integrating imou plugin.

{% include integrations/config_flow.md %}

## Add Devices

Please add the camera through the Imou Open Platform or Imou client first. The added camera can be operated on Home Assistant.

## Play camera video

The Imou integration uses HLS stream protocol to play real-time video from the camera.

## Camera PTZ function

Control the rotation of the camera pan tilt, supporting control in four directions: `up`, `down`, `left`, `right`.The premise is that the camera supports PTZ capability.

## Motion detection switch

Enable camera movement detection through integration, which will trigger an alarm event when the camera detects a moving object

## Night vision mode management

Different night vision modes to meet the viewing needs of more monitoring scenarios, free switching of required modes. The premise is that the camera supports night vision function.

| Night vision | Description                          |
| ---------------------- | --------------------------------------------------- |
|`Full color night vision`|  The warm light automatically turns on at night, making the nighttime picture more colorful   |
|`Infrared night vision`|  The infrared light automatically turns on at night, and the video image appears in black and white  |
|`Smart night vision`| Switch between full color night vision or infrared night vision based on environmental fields   |

## Light alarm switch

Enabling the light alarm through integration, the light flashes when a movement event is detected. The premise is that the camera supports light alarm function.

## View camera status

View camera status through integration :

`online status`: including online, offline, sleep.

`storage card status`: Check for the presence and usage of storage cards.

## Restart camera

One click remote restart of camera.

## More information
Please stay tuned for more integrated feature updates.