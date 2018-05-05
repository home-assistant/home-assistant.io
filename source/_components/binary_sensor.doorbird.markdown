The `doorbird` implementation allows you to use motion and doorbell events from your [DoorBird](http://www.doorbird.com/) device in Home Assistant.

<p class='note'>
  You must have the [DoorBird component](/components/doorbird/) configured to use this sensor.
</p>

<p class="note warning">
Enabling this sensor will delete all registered notification services for each configured device every time Home Assistant starts. This will not affect notifications delivered by the DoorBird mobile app.
</p>

To enable event tracking for motion and doorbell events, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: doorbird
    monitored_conditions:
      - doorbell
      - motion
```
