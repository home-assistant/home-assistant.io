The `tod` platform supports binary sensors which get their values by checking
if the current time is within defined time ranges.
The time ranges can be provided as absolute local time, or
using the `sunrise` or `sunset` keyword calcuated based on the sun position
for location defined in HA config. The location must be provided in the configuration.

In addition for sun position based ranges the negative or positive offset can 
be configured.


```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tod
    sensors:
      early_morning:
        after: sunrise
        after_offset: '-02:00'
        before: '07:00'
      morning:
        after: sunrise
        before: '12:00'
      late_morning:
        after: '10:00'
        before: '12:00'
      early_afternoon:
        after: '12:00'
        before: '15:00'
      afternoon:
        after: '12:00'
        before: '18:00'
      late_afternoon:
        after: '16:00'
        before: '18:0'
      early_evening:
        after: '17:00'
        before: '19:00'
      evening:
        after: '17:00'
        before: '22:00'
      late_evening:
        after: '20:00'
        before: '22:00'
      middle_of_the_night:
        after: '23:00'
        before: sunrise
        before_offset: '-02:00'
      night:
        after: '22:00'
        before: sunrise
      day:
        after: sunrise
        before: sunset
```

The above configuration generates the set of binary sensors changing the state according to the time changes.

The major purpose of this sensor is to use simple time range definition instead of creating a complex 
templates with references to `sun.sun` component attributes.


The sensor state is ON when this condition `after` + `after_offset` <= `current time` < `before` + `before_offset`.

If `after` time is later than `before` then the next day is considered, i.e.:

```yaml
binary_sensor:
  - plartform: tod
    sensors:
      night:
        after: sunset
        before: sunrise
```

In above example the next day `sunrise` is calculated as a time range end.


