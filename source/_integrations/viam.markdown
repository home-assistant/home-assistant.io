---
title: Viam
description: Support for Viam data and vision services using the Python SDK
ha_category:
  - Image Processing
ha_release: '2024.08'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@hipsterbrown'
ha_domain: viam
ha_integration_type: integration
---

The Viam integration allows you to turn your smart home into a smart machine! Use images and data from your Home Assistant setup to train custom machine learning models that run on the device as part of your automation workflow.

## Prerequisites

In order to use this integration, you will need a [Viam account](https://www.viam.com/) and [a device with `viam-server` installed](https://docs.viam.com/installation/).

For authentication, you can use an [organization API key](https://docs.viam.com/manage/cli/#create-an-organization-api-key) or [robot address and location secret](https://docs.viam.com/manage/fleet/#control-with-the-sdks).

To use the classification and detection services, you will need a configured [vision service](https://docs.viam.com/services/vision/) for the integration.

{% include integrations/config_flow.md %}

## Actions

### viam.capture_data

Send arbitrary tabular data to Viam to [view and analyze](https://docs.viam.com/manage/data/view/).

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `values`                | List of data objects to send to Viam. |
| `component_name`        | Name of the sensor or other component to which the data is associated. |
| `component_type`        | Type of the sensor or other component to which the data is associated. |

### viam.capture_image

Send images to Viam for [analytics and machine learning model training](https://docs.viam.com/manage/ml/train-model/).

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `filepath`              | Local file path to the image to be uploaded. |
| `camera`                | The camera entity from which an image is captured. |
| `file_name`             | The name of the file that will be displayed in the metadata within Viam. |
| `component_name`        | Name of the sensor or other component to which the data is associated. |

### viam.get_classifications

Get [a list of classifications](https://docs.viam.com/services/vision/classification/) from an image.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `classifier_name`              | Name of classifier vision service configured in Viam. |
| `confidence`              | Threshold for filtering results returned by the service. |
| `count`              | Number of classifications to return from the service. |
| `robot_address`              | If authenticated using the Org API key, provide the robot address associated with the configured vision service. |
| `robot_secret`              | If authenticated using the Org API key, provide the robot location secret associated with the configured vision service. |
| `filepath`              | Local file path to the image to be analyzed. |
| `camera`                | The camera entity from which an image is captured and analyzed. |

### viam.get_detections

Get [a list of detected objects](https://docs.viam.com/services/vision/detection/) from an image.

| Parameter               | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `detector_name`              | Name of detection vision service configured in Viam. |
| `confidence`              | Threshold for filtering results returned by the service. |
| `robot_address`              | If authenticated using the Org API key, provide the robot address associated with the configured vision service. |
| `robot_secret`              | If authenticated using the Org API key, provide the robot location secret associated with the configured vision service. |
| `filepath`              | Local file path to the image to be analyzed. |
| `camera`                | The camera entity from which an image is captured and analyzed. |
