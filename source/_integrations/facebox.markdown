---
title: Facebox
description: Detect and recognize faces with Facebox.
ha_category:
  - Image Processing
ha_iot_class: Local Push
ha_release: 0.7
ha_domain: facebox
ha_integration_type: integration
---

The `facebox` image processing platform allows you to detect and recognize faces in a camera image using [Facebox](https://machinebox.io/docs/facebox). The state of the entity is the number of faces detected, and recognized faces are listed in the `matched_faces` attribute. An `image_processing.detect_face` event is fired for each recognized face, and the event `data` provides the `confidence` of recognition, the `name` of the person, the `image_id` of the image associated with the match, the `bounding_box` that contains the face in the image, and the `entity_id` that processing was performed on.

## Setup

Facebox runs in a Docker container and it is recommended that you run this container on a x86 machine with a minimum of 2 GB RAM (an ARM version is not available). On your machine with Docker, run the Facebox container with:

```bash
MB_KEY="INSERT-YOUR-KEY-HERE"

sudo docker run --name=facebox --restart=always -p 8080:8080 -e "MB_KEY=$MB_KEY"  machinebox/facebox
```

or using `docker-compose`:

```yaml
version: '3'
services:
  facebox:
    image: machinebox/facebox
    container_name: facebox
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - MB_KEY=${MB_KEY}
      - MB_FACEBOX_DISABLE_RECOGNITION=false
```

You can run Facebox with a username and password by adding `-e "MB_BASICAUTH_USER=my_username" -e "MB_BASICAUTH_PASS=my_password"` but bear in mind that the integration does not encrypt these credentials and this approach does not guarantee security on an unsecured network.

After you created an account at [Machinebox](https://machinebox.io/account), you can grab your `MB_KEY` at [your Account page](https://developer.veritone.com/machinebox/overview).

If you only require face detection (number of faces) you can disable face recognition by adding `-e "MB_FACEBOX_DISABLE_RECOGNITION=true"` in the `docker run` command.

If your host machine does not support [AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions) and you experience issues running the `machinebox/facebox` image there is an alternative image without AVX support available at `machinebox/facebox_noavx`(*HINT*: This image is currently not supported by machinebox and should only be used if necessary) 

## Configuration

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: facebox
    ip_address: 192.168.0.1
    port: 8080
    source:
      - entity_id: camera.local_file
        name: my_custom_name
```

{% configuration %}
ip_address:
  description: The IP address of your machine hosting Facebox.
  required: true
  type: string
port:
  description: The port which Facebox is exposed on.
  required: true
  type: string
username:
  description: The Facebox username if you have set one.
  required: false
  type: string
password:
  description: The Facebox password if you have set one.
  required: false
  type: string
source:
  description: The list of image sources.
  required: true
  type: map
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
{% endconfiguration %}

## Automations

Use the `image_processing.detect_face` events to trigger automations, and breakout the `trigger.event.data` using a [template](/docs/automation/templating/). The following example automation sends a notification when Ringo Star is recognized:

{% raw %}

```yaml
- id: '12345'
  alias: "Ringo Starr recognised"
  trigger:
    platform: event
    event_type: image_processing.detect_face
    event_data:
      name: "Ringo_Starr"
  action:
    service: notify.platform
    data:
      message: Ringo_Starr recognised with probability {{ trigger.event.data.confidence }}
      title: Door-cam notification
```

{% endraw %}

## Service `facebox.teach_face`

The service `facebox.teach_face` can be used to teach Facebox faces.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Entity ID of Facebox entity.
| `name` | no | The name to associate with a face.
| `file_path` | no | The path to the image file.

A valid service data example:

{% raw %}

```yaml
{
  "entity_id": "image_processing.facebox_local_file",
  "name": "superman",
  "file_path": "/images/superman_1.jpeg"
}
```

{% endraw %}

You can use an automation to receive a notification when you train a face:

{% raw %}

```yaml
- id: '1533703568569'
  alias: "Face taught"
  trigger:
  - event_data:
      service: facebox.teach_face
    event_type: call_service
    platform: event
  condition: []
  action:
  - service: notify.pushbullet
    data_template:
      message: '{{ trigger.event.data.service_data.name }} taught
      with file {{ trigger.event.data.service_data.file_path }}'
      title: Face taught notification
```

{% endraw %}

Any errors on teaching will be reported in the logs. If you enable [system_log](/integrations/system_log/) events:

```yaml
system_log:
  fire_event: true
```

you can create an automation to receive notifications on Facebox errors:

{% raw %}

```yaml
- id: '1533703568577'
  alias: "Facebox error"
  trigger:
    platform: event
    event_type: system_log_event
  condition:
    condition: template
    value_template: '{{ "facebox" in trigger.event.data.message }}'
  action:
  - service: notify.pushbullet
    data_template:
      message: "{{ trigger.event.data.message }}"
      title: Facebox error
```

{% endraw %}
