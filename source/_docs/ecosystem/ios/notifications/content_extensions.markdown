---
title: "Dynamic content"
description: "Extend your notifications with dynamic content"
redirect_from: /ecosystem/ios/notifications/content_extensions/
---

With the new Content Extension feature found in iOS 10, dynamic content can now be displayed as part of a notification without opening an app.

# Map
Will show a map with a red tipped pin at the coordinates given.
The map will be centered at the coordinates given.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    push:
      category: map
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

## Showing a second pin

You can use the following properties under `action_data` to display a second pin. If used, the first pin will be red and the second green.

- **second_latitude**: The latitude of the second pin. **Must be a string!**
- **second_longitude**: The longitude of the second pin. **Must be a string!**
- **shows_line_between_points**: A Boolean value indicating whether a line should be drawn between the first and second pin.

## Extra configuration

You can also pass the following properties under `action_data` to modify the map in various ways. All are expected to be boolean values unless otherwise noted:

- **shows_compass**: A Boolean indicating whether the map displays a compass control.
- **shows_points_of_interest**: A Boolean indicating whether the map displays point-of-interest information.
- **shows_scale**: A Boolean indicating whether the map shows scale information.
- **shows_traffic**: A Boolean value indicating whether the map displays traffic information.
- **shows_user_location**: A Boolean value indicating whether the map should try to display the user’s location.

<p class='img'>
  <img src='/images/ios/map.png' />
  An example of the map dynamic content.
</p>


# Camera Stream

The notification thumbnail will be a still image from the camera.
The notification content is a real time MJPEG stream of a camera (assuming the camera supports it).

You can use the attachment parameters `content-type` and `hide-thumbnail` with camera to control the thumbnail.

You can view an example [here](https://www.youtube.com/watch?v=LmYwpxPKW0g).

Note: This functionality is only available from iOS 11 onwards.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Motion detected in the Living Room
  data:
    attachment:
      content-type: jpeg
    push:
      category: camera
    entity_id: camera.demo_camera
```

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LmYwpxPKW0g" frameborder="0" allowfullscreen></iframe>
</div>

# Combining with actionable notifications

As you can see the `category` key is used to tell the device what kind of content extension to use. You can use the same category identifiers in your own custom [actions](/ecosystem/ios/notifications/actions/) to add actions to the content extension.

For example this configuration adds actions to a camera content message.

```yaml
ios:
  push:
    categories:
      - name: Camera With Actions
        identifier: 'camera'
        actions:
          - identifier: 'OPEN_COVER'
            title: 'Open Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: no
          - identifier: 'CLOSE_COVER'
            title: 'Close Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
```

# Troubleshooting

If you are having problems with receiving these special notifications try restarting your phone first. The extensions somewhat often fail to register properly until a restart.
