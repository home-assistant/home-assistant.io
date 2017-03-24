This component implement the [pilight hub](https://github.com/home-assistant/home-assistant.github.io/source/_components/pilight.markdown)  binary sensor functionality.
Two type of pilight binary sensor configuration available. A normal sensor which send the on and off state cyclicaly and a trigger sensor which send only a trigger when an event happend (for example lost of cheap PIR motion detector) (see example configuration below).


## Example entry for `configuration.yaml`:
```yaml
binary_sensor:
  - platform: pilight
    name: 'Motion'
    variable: 'state'
    payload:
      unitcode: 371399
    payload_on: 'closed'
    disarm_after_trigger: 'yes'  <-- use this if you have trigger type sensor
```
