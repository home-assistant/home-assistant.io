---
layout: page
title: "AppDaemon"
description: "AppDaemon is a loosely coupled, multithreaded, sandboxed Python execution environment for writing automation apps for Home Assistant"
release_date: 2016-11-27 08:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /ecosystem/appdaemon/
---

AppDaemon is a loosely coupled, multithreaded, sandboxed python execution environment for writing automation apps for Home Assistant.

# Another Take on Automation

AppDaemon is not meant to replace Home Assistant Automations and Scripts, rather complement them. For a lot of things, automations work well and can be very succinct. However, there is a class of more complex automations for which they become harder to use, and appdeamon then comes into its own. It brings quite a few things to the table:

- New paradigm - some problems require a procedural and/or iterative approach, and `AppDaemon` Apps are a much more natural fit for this. Recent enhancements to Home Assistant scripts and templates have made huge strides, but for the most complex scenarios, Apps can do things that Automations can't
- Ease of use - AppDaemon's API is full of helper functions that make programming as easy and natural as possible. The functions and their operation are as "Pythonic" as possible, experienced Python programmers should feel right at home.
- Reuse - write a piece of code once and instantiate it as an app as many times as you need with different parameters e.g. a motion light program that you can use in 5 different places around your home. The code stays the same, you just dynamically add new instances of it in the config file
- Dynamic - AppDaemon has been designed from the start to enable the user to make changes without requiring a restart of Home Assistant, thanks to it's loose coupling. However, it is better than that - the user can make changes to code and AppDaemon will automatically reload the code, figure out which Apps were using it and restart them to use the new code with out the need to restart `AppDaemon` itself. It is also possible to change parameters for an individual or multiple apps and have them picked up dynamically, and for a final trick, removing or adding apps is also picked up dynamically. Testing cycles become a lot more efficient as a result.
- Complex logic - Python's If/Else constructs are clearer and easier to code for arbitrarily complex nested logic
- Durable variables and state - variables can be kept between events to keep track of things like the number of times a motion sensor has been activated, or how long it has been since a door opened
- All the power of Python - use any of Python's libraries, create your own modules, share variables, refactor and re-use code, create a single app to do everything, or multiple apps for individual tasks - nothing is off limits!

It is in fact a testament to Home Assistant's open nature that a component like `AppDaemon` can be integrated so neatly and closely that it acts in all ways like an extension of the system, not a second class citizen. Part of the strength of Home Assistant's underlying design is that it makes no assumptions whatever about what it is controlling or reacting to, or reporting state on. This is made achievable in part by the great flexibility of Python as a programming environment for Home Assistant, and carrying that forward has enabled me to use the same philosophy for `AppDaemon` - it took surprisingly little code to be able to respond to basic events and call services in a completely open ended manner - the bulk of the work after that was adding additonal functions to make things that were already possible easier.

# How it Works

The best way to show what AppDaemon does is through a few simple examples.

## Sunrise/Sunset Lighting

Lets start with a simple App to turn a light on every night at sunset and off every morning at sunrise. Every App when first started will have its `initialize()` function called which gives it a chance to register a callback for AppDaemons's scheduler for a specific time. In this case we are using `run_at_sunrise()` and `run_at_sunset()` to register 2 separate callbacks. The argument `0` is the number of seconds offset from sunrise or sunset and can be negative or positive. For complex intervals it can be convenient to use Python's `datetime.timedelta` class for calculations. When sunrise or sunset occurs, the appropriate callback function, `sunrise_cb()` or `sunset_cb()`  is called which then makes a call to Home Assistant to turn the porch light on or off by activating a scene. The variables `args["on_scene"]` and `args["off_scene"]` are passed through from the configuration of this particular App, and the same code could be reused to activate completely different scenes in a different version of the App.

```python
import homeassistant.appapi as appapi

class OutsideLights(appapi.AppDaemon):

  def initialize(self):
    self.run_at_sunrise(self.sunrise_cb, 0)
    self.run_at_sunset(self.sunset_cb, 0)
    
  def sunrise_cb(self, kwargs):
    self.turn_on(self.args["off_scene"])

  def sunset_cb(self, kwargs):
    self.turn_on(self.args["on_scene"])

```

This is also fairly easy to achieve with Home Assistant automations, but we are just getting started.

## Motion Light

Our next example is to turn on a light when motion is detected and it is dark, and turn it off after a period of time. This time, the `initialize()` function registers a callback on a state change (of the motion sensor) rather than a specific time. We tell AppDaemon that we are only interested in state changes where the motion detector comes on by adding an additional parameter to the callback registration - `new = "on"`. When the motion is detected, the callack function `motion()` is called, and we check whether or not the sun has set using a built-in convenience function: `sun_down()`. Next, we turn the light on with `turn_on()`, then set a timer using `run_in()` to turn the light off after 60 seconds, which is another call to the scheduler to execute in a set time from now, which results in `AppDaemon` calling `light_off()` 60 seconds later using the `turn_off()` call to actually turn the light off. This is still pretty simple in code terms:

```python
import homeassistant.appapi as appapi

class FlashyMotionLights(appapi.AppDaemon):

  def initialize(self):
    self.listen_state(self.motion, "binary_sensor.drive", new = "on")
  
  def motion(self, entity, attribute, old, new, kwargs):
    if self.sun_down():
      self.turn_on("light.drive")
      self.run_in(self.light_off, 60)
  
  def light_off(self, kwargs):
    self.turn_off("light.drive")
```

This is starting to get a little more complex in Home Assistant automations requiring an Automation rule and two separate scripts.

Now lets extend this with a somewhat artificial example to show something that is simple in AppDaemon but very difficult if not impossible using automations. Lets warn someone inside the house that there has been motion outside by flashing a lamp on and off 10 times. We are reacting to the motion as before by turning on the light and setting a timer to turn it off again, but in addition, we set a 1 second timer to run `flash_warning()` which when called, toggles the inside light and sets another timer to call itself a second later. To avoid re-triggering forever, it keeps a count of how many times it has been activated and bales out after 10 iterations.

```python
import homeassistant.appapi as appapi

class MotionLights(appapi.AppDaemon):

  def initialize(self):
    self.listen_state(self.motion, "binary_sensor.drive", new = "on")
  
  def motion(self, entity, attribute, old, new, kwargs):
    if self.self.sun_down():
      self.turn_on("light.drive")
      self.run_in(self.light_off, 60)
      self.flashcount = 0
      self.run_in(self.flash_warning, 1)
  
  def light_off(self, kwargs):
    self.turn_off("light.drive")
    
  def flash_warning(self, kwargs):
    self.toggle("light.living_room")
    self.flashcount += 1
    if self.flashcount < 10:
      self.run_in(self.flash_warning, 1)
```

Of course if I wanted to make this App or its predecessor reusable I would have provide parameters for the sensor, the light to activate on motion, the warning light and even the number of flashes and delay between flashes.

In addition, Apps can write to `AppDaemon`'s logfiles, and there is a system of constraints that allows yout to control when and under what circumstances Apps and callbacks are active to keep the logic clean and simple.

For full installation instructions, see [README.md](https://github.com/home-assistant/appdaemon/blob/dev/README.md) in the `AppDaemon` repository.

There is also full documentation for the API and associated configuration in [API.md](https://github.com/home-assistant/appdaemon/blob/dev/API.md).

