---
layout: page
title: "Microsoft Face"
description: "Instructions on how to integrate Microsoft Face component into Home Assistant."
date: 2017-01-25 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: microsoft.png
ha_category: Hub
ha_release: "0.37"
---

The `microsoft_face` component platform is the main component for Microsoft Azure Cognitive service [Face](https://www.microsoft.com/cognitive-services/en-us/face-api). All data are stored in your own private instance in the Azure cloud.

You need an API key, which is free, but requires an [Azure registration](https://azure.microsoft.com/de-de/free/) using your Microsoft ID. The free resource (*F0*) is limited to 20 requests per minute and 30k requests in a month. If you don't want to use the Azure cloud, you can also get an API key by registering with [cognitive-services](https://www.microsoft.com/cognitive-services/en-us/subscriptions). Please note that all keys on cognitive services must be recreated every 90 days.

To enable the Microsoft Face component, add the following to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
microsoft_face:
  api_key: YOUR_API_KEY
  azure_region: eastus2
```

Configuration variables:

- **api_key** (*Required*): The API key for your Cognitive resource.
- **azure_region** (*Optional*): The region where you instantiated your Microsoft Cognitive services endpoint
- **timeout** (*Optional)*: Set timeout for the API connection. Defaults to 10s.

### {% linkable_title Person and Groups %}

For most services, you need to set up a group or a person. This limits the processing and detection to elements provided by the group. Home Assistant creates an entity for all groups and allows you to show the state, person, and IDs directly on the frontend.

The following services are available for managing this feature and can be called via the Frontend, a script, or the REST API.

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

For the local image we need `curl`. The `{personId}` is present in group entity as attribute.

```bash
$ curl -v -X POST "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{GroupName}/persons/{personId}/persistedFaces" \
  -H "Ocp-Apim-Subscription-Key: YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" --data-binary "@/tmp/image.jpg"
```

After we're done with changes on a group, we need train this group to teach the AI how to handle the new data.

- *microsoft_face.train_group*

```yaml
service: microsoft_face.train_group
data:
  group: family
```
