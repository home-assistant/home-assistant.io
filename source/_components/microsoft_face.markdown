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

The `microsoft_face` component platform is the main component for Microsoft Azure Cognitive service [Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/). All data are in a own private instance in the azure cloud.

You need an API key which is free but requires a [Azure registration](https://azure.microsoft.com/de-de/free/) with your microsoft ID. The free resource (*F0*) is limit to 30K request in a month and 20 per minute.

To enable the Microsoft Face component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
microsoft_face:
  api_key: YOUR_API_KEY
```

Configuration variables:

- **api_key** (*Required*): The API key for your Cognitive resource.
- **timeout** (*Optional)*: Set timeout for api connection (default 10sec).

### {% linkable_title Person and Groups %}

For most of service you need set a group or a person. So it process and detect only stuff they will given with this group. Home-Assistent create for all group a entity and allow your to show the state, person and IDs inside UI.

For manage this feature you have following services they can call with UI, script or rest api.

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

We need add image to a person. We can add multiple image for every person to make the detection better. We can take a picture from a camera or send a local image to our azure resource.

- *microsoft_face.face_person*
```yaml
service: microsoft_face.face_person
data:
  group: family
  name: 'Hans Maier'
  camera_entity: camera.door
```

For the local image we need *curl*. The personId is present in group entity as attribute.

```bash
curl -v -X POST "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{GroupName}/persons/{personId}/persistedFaces" -H "Ocp-Apim-Subscription-Key: {ApiKey}" -H "Content-Type: application/octet-stream" --data "@/tmp/image.jpg"
```

After we done with changes on a group, we need train this group to make our AI fit to handle the new data.

- *microsoft_face.train_group*
```yaml
service: microsoft_face.train_group
data:
  group: family

### {% linkable_title Get API and Secret Key %}

To get your API credentials, you have to declare a new application in the [NetAtmo Developer Page](https://dev.netatmo.com/). Sign in using your username and password from your regular NetAtmo account.
Click on 'Create an App' at the top of the page.

<p class='img'>
<img src='/images/screenshots/netatmo_create.png' />
</p>
You have to fill the form, but only two fields are required : Name and Description. It doesn't really matter what you put into those. Just write something that make sense to you. To submit your new app, click on create at the bottom of the form.

<p class='img'>
<img src='/images/screenshots/netatmo_app.png' />
</p>

That's it. You can copy and paste your new API and secret keys in your Home Assistant configuration file just as said above.

<p class='img'>
<img src='/images/screenshots/netatmo_api.png' />
</p>

<p class='note'>
The Home Assistant Netatmo platform has only be tested with the classic indoor, outdoor module and rainmeter. There is no support for the windmeter module at this time because developers does not own these modules.
</p>
