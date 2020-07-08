---
title: Dlib Face Identify
description: Instructions on how to integrate Dlib Face Identify into Home Assistant.
ha_category:
  - Image Processing
ha_release: 0.44
ha_domain: dlib_face_identify
---

The `dlib_face_identify` image processing platform allows you to use the [Dlib](http://www.dlib.net/) through Home Assistant. This platform allow you to identify persons on camera and fire an event with identify persons.

Adding more than one face image for each person will make the comparisons more accurate. Please, note that running this platform on a device with limited resources, such as a Raspberry Pi, requires using low resolution images (e.g. VGA) for acceptable performance.

For using the result inside an automation rule, take a look at the [integration](/integrations/image_processing/) page.

### Configuration Home Assistant

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: dlib_face_identify
   source:
    - entity_id: camera.door
   faces:
     /config/faces/
```

{% configuration %}
source:
  description: List of image sources.
  required: true
  type: list
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
faces:
  description: Path to a folder containing the known persons' faces (.jpg, .png etc) organized in subfolders corresponding to each separate person. The name of each subfolder will be used as the name for each returned match. Each subfolder must contain face files of one person, only.
  
  For backwards compatibility the faces files can also be defined individually as a list of names and corresponding files (e.g. "Bob: /config/faces/bob.jpg"). However, only a single file per identity can be added this way.
  required: true
  type: string
confidence:
  description: How much distance between faces to consider it a match. Using tolerance values lower than 0.6 will make the comparison more strict.
  required: false
  type: float
  default: 0.6
{% endconfiguration %}

<div class='note'>
  
Returs a list of matched identities/names and the corresponding distance measure. A lower distance translates to a closer match.

If the platform fails to load because it could not install its requirement, install cmake: `sudo apt-get install cmake`.

</div>