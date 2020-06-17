---
title: Clarifai
description: Instructions on how to integrate Clarifai with Home Assistant.
ha_category:
  - Image Processing
ha_release: 0.112
ha_domain: clarifai
ha_codeowners:
  - '@djbowers'
---

The `clarifai` integration allows you to use the
[Clarifai](https://www.clarifai.com/) API through Home Assistant.
To get started, create a free account on the Clarifai [Portal](https://portal.clarifai.com/signup).

For step-by-step instructions on creating a model using the Clarifai Portal,
visit the Clarifai [docs](https://docs.clarifai.com/portal-guide/portal_overview).

## Setup

To authenticate with the Clarifai API, users must first create a [Personal Access Token](https://docs.clarifai.com/getting-started/authentication/personal-access-tokens)
using the Clarifai Portal, then save that token to their Home Assistant configuration file.

## Configuration

To enable the Clarifai integration,
add the following snippet to your `configuration.yaml` file:

```yaml
# To set up the Clarifai integration
clarifai:
  access_token: YOUR_PERSONAL_ACCESS_TOKEN
```

{% configuration %}
access_token:
  description: The Personal Access Token used to access your Clarifai applications.
  required: true
  type: string
{% endconfiguration %}

## Predict Service

Once the integration has been configured, the `clarifai.predict` service can be used
to manually send images to Clarifai to be processed. The service can be used in automations,
either as a trigger or triggered by other automations. It can also be called by a script
or via the Amazon Echo. See the Home Assistant [docs](/docs/scripts/service-calls/)
for instructions on using service calls.

- *clarifai.predict*

```yaml
service: clarifai.predict
data:
  app_id: YOUR_APP_ID
  workflow_id: YOUR_WORKFLOW_ID
  result_format: flat # or nested
  entity_id: camera.<NAME>
```

{% configuration %}
app_id:
  description: The ID of the Clarifai Application to be used.
  example: 5fd9c2eca5564d1da2474be3709bfcf9
  required: true
  type: string
workflow_id:
  description: The ID of the Workflow to be used.
  example: Face
  required: true
  type: string
result_format:
  description: The workflow result can be returned either flat or nested.
  example: flat
  required: false
  default: nested
  type: string
entity_id:
  description: The camera entity to scan for images.
  example: camera.front_door
  required: true
  type: string
{% endconfiguration %}

## Image Processing Platform

In addition to the `clarifai.predict` service call, predictions can be made using the
`clarifai` platform for image processing. When using the image processing platform,
the configured camera source will be scanned on a regular interval, and the images will
be sent to Clarifai for processing.

To setup the image processing platform, add the following to your `configuration.yaml` file.
Most of the configuration variables are the same as when making a service call. The only additional
variable that must be configured is the scan interval. 

```yaml
# To set up the Clarifai image processing platform
image_processing:
  - platform: clarifai
    app_id: YOUR_APP_ID
    workflow_id: YOUR_WORKFLOW_ID
    result_format: flat # or nested
    scan_interval: 10000 # reduce this but be careful with API limit
    source:
      - entity_id: camera.front_door
```

{% configuration %}
scan_interval:
  description: The interval in seconds between scans of the configured camera.
  example: 60
  required: true
  type: string
{% endconfiguration %}

**NOTE** – The Clarifai community plan limits the maximum number of requests 
per month. Therefore, it is strongly recommended that you limit the `scan_interval` when 
setting up an instance of this entity as detailed on the main [Image Processing component](/integrations/image_processing/) page.

## Result Format

There are two options for the result format returned from a prediction. 

- *nested*

The nested result format returns the results from a workflow prediction in the original nested
format returned from Clarifai. See the Clarifai [docs](https://docs.clarifai.com/api-guide/workflows/workflow-predict)
for more info on the nested result format. 

- *flat*

The flat result format parser recursively crawls through the nested region data for each output and 
aggregates the concepts and regions into lists. This preserves the confidence values for each concept
by storing them as a list so that the user can easily take the maximum value from the list for use in 
automations. 

Below is an example result that has been formatted with the flat parser. 

```json
"concepts": {
        "3D-P27": [
            0,
            0
        ],
        "3D-P30": [
            0,
            0
        ]
    },
"regions": [
    {
        "boundingBox": {
            "topRow": 0.07539025,
            "leftCol": 0.2703206,
            "bottomRow": 0.7358365,
            "rightCol": 0.7092912
        }
    }
]
```

## Prediction Event

When a response from a prediction is successfully returned from Clarifai, whether using
a service call or the image processing platform, the results are
saved as a `clarifai.prediction` event on the Home Assistant event bus. 

For general information on using an event as a part of an automation, see the Home Assistant
event [docs](/docs/configuration/events/).

To use the `clarifai.prediction` event as a trigger for automations, add the following to
your `configuration.yaml` file. 

```yaml
automation:
  trigger:
    platform: event
    event_type: clarifai.prediction
```

## Example Automation

The following snippet will configure an automation that will write to an output file when a prediction event is fired.
In this example, we are looking for a specific concept named `Test` in the list of concepts returned
by the prediction. If the concept is found and the highest confidence value returned for that concept
is above 90%, then we grant access to that name. If the concept is not found or if the maximum 
confidence level returned for that concept is lower than 90%, we deny access. 

```yaml
{% raw %}
# To create an automation using the clarifai.prediction event
automation:
  - trigger:
      platform: event
      event_type: clarifai.prediction
    action:
      service: notify.test
      data_template:
        message: >
          {% set concepts = trigger.event.data.concepts %}
          {% set name = 'Test' %}
          {% set confidence = 0.9 %}
          {% if name in concepts and concepts[name]|max > confidence %}
            Access granted: {{name}}
          {% else %}
            Access denied
          {% endif %}
{% endraw %}
```