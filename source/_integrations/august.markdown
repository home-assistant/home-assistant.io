---
title: August
description: Instructions on how to integrate your August devices into Home Assistant.
ha_category:
  - Doorbell
  - Binary Sensor
  - Sensor
  - Camera
  - Lock
ha_release: 0.64
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: august
---

The `august` integration allows you to integrate your [August](https://august.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Doorbell
- Binary Sensor
- Sensor
- Camera
- Lock

<div class='note'>
August Lock 2nd Gen will need either August Connect or Doorbell to connect to Home Assistant.
</div>

## Configuration

You will need your August login information (username (either phone# or email), and password) to use this module.

To add `August` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **August**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
august:
  login_method: phone
  username: "+16041234567"
  password: YOUR_PASSWORD
```

{% configuration %}
login_method:
  description: Method to login to your August account, either "email" or "phone". A verification code will be sent to your email or phone during setup.
  required: true
  type: string
username:
  description: The username for accessing your August account. This depends on your login_method, if login_method is email, this will be your email of the account. Otherwise, this will be your phone number.
  required: true
  type: string
password:
  description: The password for accessing your August account.
  required: true
  type: string
timeout:
  description: Timeout to wait for connections.
  required: false
  type: integer
  default: 10
{% endconfiguration %}

Once Home Assistant is started, a configurator will pop up asking you to enter verification code that is sent to your phone number or email.

### Binary Sensor

If you have an August Doorbell, once you have enabled the August component, you should see following sensors:

- Doorbell ding sensor
- Doorbell motion sensor
- Doorbell online sensor

If you have an August Smart Lock with DoorSense, once you have enabled the August component, you should see the following sensors:

- Door sensor

### Camera

The `august` camera platform allows you to view the latest camera image (triggered by motion) by your [August](https://august.com/) device in Home Assistant.

### Sensor

If you have an August Doorbell with a battery, once you have enabled the August component, you should see the following sensors:

- Doorbell Battery

If you have an August Smart Lock, once you have enabled the August component, you should see the following sensors:

- Lock Battery
- Lock Operation

If you have an August Keypad, once you have enabled the August component, you should see the following sensors:

- Keypad Battery

### Presence Detection with Lock Operation

Using the lock operation sensors, you can detect when a user operates a lock and is physically present (not remote). The below automation example (added to `automations.yaml`) will trigger when the user named “John Doe” in August locks or unlocks the door from the keypad (if present), via Bluetooth from their phone, or by auto-unlock. The state of the sensor will be the name of the party operating the lock as returned by August.

{% raw %}

```yaml
- id: '1583706446906'
  alias: joe_doe_front_door_operate
  description: John Doe locks or unlocks the Front Door
  trigger:
  - entity_id: sensor.front_door_operator
    platform: state
    to: John Doe
  condition:
  - condition: template
    value_template: "{{ not state_attr('sensor.front_door_operator', 'remote') }}"
  action:
  - data: {}
    entity_id: camera.inside
    service: camera.turn_off
```

{% endraw %}
