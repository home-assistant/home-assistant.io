---
layout: page
title: "Microsoft Face"
description: "Instructions how to integrate Microsoft Face component into Home Assistant."
date: 2017-01-25 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft.png
ha_category: Hub
ha_release: "0.37"
---

The `microsoft_face` component platform is the main component for Microsoft Azure Cognitive service [Face](https://www.microsoft.com/cognitive-services/en-us/face-api). All data are in a own private instance in the Azure cloud.

You need an API key which is free but requires a [Azure registration](https://azure.microsoft.com/de-de/free/) with your microsoft ID. The free resource (*F0*) is limit to 30k requests in a month and 20 per minute. If you don't want use a the Azure cloud, you can also get a API key with registration on [cognitive-services](https://www.microsoft.com/cognitive-services/en-us/subscriptions) but they need to recreate all 90 days.

To enable the Microsoft Face component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
microsoft_face:
  api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): The API key for your Cognitive resource.
- **timeout** (*Optional)*: Set timeout for the API connection. Defaults to 10s.

### {% linkable_title Person and Groups %}

For most of the services you need to set up a group or a person. This limits the processing and detection to elements provided by group. Home Assistent creates for all group a entity and allow you to show the state, person and IDs directly on the frontend.

For managing this feature, you have the following services. They can be called with the Frontend, a script, or the REST API.

- *microsoft_face.create_group*
- *microsoft_face.delete_group*

```yaml
service: microsoft_face.create_group
data:
  name: 'Family'
```

- *microsoft_face.create_person*
- *microsoft_face.delete_person*

```yaml
service: microsoft_face.create_person
data:
  group: family
  name: 'Hans Maier'
```

You need to add an image of a person. You can add multiple images for every person to make the detection better. You can take a picture from a camera or send a local image to your Azure resource.

- *microsoft_face.face_person*

```yaml
service: microsoft_face.face_person
data:
  group: family
  name: 'Hans Maier'
  camera_entity: camera.door
```

For the local image we need `curl`. The person ID is present in group entity as attribute.

```bash
$ curl -v -X POST "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{GroupName}/persons/{personId}/persistedFaces" \
  -H "Ocp-Apim-Subscription-Key: YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" --data "@/tmp/image.jpg"
```

After we done with changes on a group, we need train this group to make our AI fit to handle the new data.

- *microsoft_face.train_group*

```yaml
service: microsoft_face.train_group
data:
  group: family
