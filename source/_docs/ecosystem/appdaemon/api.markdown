---
title: "AppDaemon API Reference"
description: "AppDaemon API Reference"
redirect_from: /ecosystem/appdaemon/api/
---

## Anatomy of an App

Automations in AppDaemon are performed by creating a piece of code (essentially a Python Class) and then instantiating it as an Object one or more times by configuring it as an App in the configuration file. The App is given a chance to register itself for whatever events it wants to subscribe to, and AppDaemon will then make calls back into the Object's code when those events occur, allowing the App to respond to the event with some kind of action.

The first step is to create a unique file within the apps directory (as defined in the `[AppDaemon]` section of configuration file). This file is in fact a Python module, and is expected to contain one or more classes derived from the supplied `AppDaemon` class, imported from the supplied `homeassistant.appapi` module. The start of an app might look like this:

```python
import homeassistant.appapi as appapi


class MotionLights(appapi.AppDaemon):
    """Motion lights implementation."""
```

When configured as an app in the configuration file (more on that later) the lifecycle of the App begins. It will be instantiated as an object by AppDaemon, and immediately, it will have a call made to its `initialize()` function - this function must appear as part of every app:

```python
  def initialize(self):
      """Perform initialization."""
```

The initialize function allows the app to register any callbacks it might need for responding to state changes, and also any setup activities. When the `initialize()` function returns, the App will be dormant until any of its callbacks are activated.

There are several circumstances under which `initialize()` might be called:

- Initial start of AppDaemon
- Following a change to the Class code
- Following a change to the module parameters
- Following initial configuration of an app
- Following a change in the status of Daylight Savings Time
- Following a restart of Home Assistant

In every case, the App is responsible for recreating any state it might need as if it were the first time it was ever started. If `initialize()` is called, the app can safely assume that it is either being loaded for the first time, or that all callbacks and timers have been canceled. In either case, the APP will need to recreate them. Depending upon the application it may be desirable for the App to establish state such as whether or not a particular light is on, within the `initialize()` function to ensure that everything is as expected or to make immediate remedial action (e.g., turn off a light that might have been left on by mistake when the app was restarted).

After the `initialize()` function is in place, the rest of the app consists of functions that are called by the various callback mechanisms, and any additional functions the user wants to add as part of the program logic. Apps are able to subscribe to 2 main classes of events:

- Scheduled Events
- State Change Events

These, along with their various subscription calls and helper functions, will be described in detail in later sections.

To wrap up this section, here is a complete functioning App (with comments):

```python
import homeassistant.appapi as appapi
import datetime

# Declare Class
class NightLight(appapi.AppDaemon):
    # initialize() function which will be called at startup and reload
    def initialize(self):
        # Create a time object for 7pm
        time = datetime.time(19, 00, 0)
        # Schedule a daily callback that will call run_daily() at 7pm every night
        self.run_daily(self.run_daily_callback, time)

    # Our callback function will be called by the scheduler every day at 7pm
    def run_daily_callback(self, kwargs):
        # Call to Home Assistant to turn the porch light on
        self.turn_on("light.porch")
```

To summarize - an App's lifecycle consists of being initialized, which allows it to set one or more state and/or schedule callbacks. When those callbacks are activated, the App will typically use one of the Service Calling calls to effect some change to the devices of the system and then wait for the next relevant state change. That's all there is to it!

## About the API

The implementation of the API is located in the AppDaemon class that Apps are derived from. The code for the functions is therefore available to the App simply by invoking the name of the function from the object namespace using the `self` keyword, as in the above examples. `self.turn_on()` for example is just a method defined in the parent class and made available to the child. This design decision was made to simplify some of the implementation and hide passing of unnecessary variables during the API invocation.

## Configuration of Apps
Apps are configured by specifying new sections in the configuration file. `[AppDaemon]` is a reserved section, for configuration of AppDaemon itself. The name of the section is the name the App is referred to within the system in log files etc. and must be unique.

To configure a new App you need a minimum of two directives:

- `module` - the name of the module (without the `.py`) that contains the class to be used for this App
- `class` - the name of the class as defined within the module for the APPs code

Although the section/App name must be unique, it is possible to re-use a class as many times as you want, and conversely to put as many classes in a module as you want. A sample definition for a new App might look as follows:

```ini
[newapp]
module = new
class = NewApp
```

When AppDaemon sees the following configuration it will expect to find a class called `NewApp` defined in a module called `new.py` in the apps subdirectory. Apps can be placed at the root of the Apps directory or within a subdirectory, an arbitrary depth down - wherever the App is, as long as it is in some subdirectory of the Apps dir, or in the Apps dir itself, AppDaemon will find it. There is no need to include information about the path, just the name of the file itself (without the `.py`) is sufficient. If names in the subdirectories overlap, AppDir will pick one of them but the exact choice it will make is undefined.

When starting the system for the first time or when reloading an App or Module, the system will log the fact in its main log. It is often the case that there is a problem with the class, maybe a syntax error or some other problem. If that is the case, details will be output to the error log allowing the user to remedy the problem and reload.

## Steps to writing an App

1. Create the code in a new or shared module by deriving a class from AppDaemon, add required callbacks and code
2. Add the App to the configuration file
3. There is no number 3

## Reloading Modules and Classes

Reloading of modules is automatic. When the system spots a change in a module, it will automatically reload and recompile the module. It will also figure out which Apps were using that Module and restart them, causing all of their existing callbacks to be cleared, and their `initialize()` function to be called.

The same is true if changes are made to an App's configuration - changing the class, or arguments (see later) will cause that app to be reloaded in the same way. The system is also capable of detecting if a new app has been added, or if one has been removed, and it will act appropriately, starting the new app immediately and removing all callbacks for the removed app.

The suggested order for creating a new App is to add the module code first and work until it compiles cleanly, and only then add an entry in the configuration file to actually run it. A good workflow is to continuously monitor the error file (using `tail -f` on Linux for instance) to ensure that errors are seen and can be remedied.

## Passing Arguments to Apps

There wouldn't be much point in being able to run multiple versions of an App if there wasn't some way to instruct them to do something different. For this reason it is possible to pass any required arguments to an App, which are then made available to the object at runtime. The arguments themselves can be called anything (apart from `module` or `class`) and are simply added into the section after the 2 mandatory directives like so:

```ini
[MyApp]
module = myapp
class = MyApp
param1 = spam
param2 = eggs
```

Within the Apps code, the 2 parameters (as well as the module and class) are available as a dictionary called `args`, and accessed as follows:

```python
param1 = self.args["param1"]
param2 = self.args["param2"]
```

A use case for this might be an App that detects motion and turns on a light. If you have 3 places you want to run this, rather than hardcoding this into 3 separate Apps, you need only code a single app and instantiate it 3 times with different arguments. It might look something like this:

```ini
[downstairs_motion_light]
module = motion_light
class = MotionLight
sensor = binary_sensor.downstairs_hall
light = light.downstairs_hall
[upstairs_motion_light]
module = motion_light
class = MotionLight
sensor = binary_sensor.upstairs_hall
light = light.upstairs_hall
[garage_motion_light]
module = motion_light
class = MotionLight
sensor = binary_sensor.garage
light = light.garage
```

## Callback Constraints

Callback constraints are a feature of AppDaemon that removes the need for repetition of some common coding checks. Many Apps will wish to process their callbacks only when certain conditions are met, e.g., someone is home, and it's after sunset. These kinds of conditions crop up a lot, and use of callback constraints can significantly simplify the logic required within callbacks.

Put simply, callback constraints are one or more conditions on callback execution that can be applied to an individual App. An App's callbacks will only be executed if all of the constraints are met. If a constraint is absent it will not be checked for.

For example, the presence callback constraint can be added to an App by adding a parameter to its configuration like this:

```ini
[some_app]
module = some_module
class = SomeClass
constrain_presence = noone
```

Now, although the `initialize()` function will be called for MyClass, and it will have a chance to register as many callbacks as it desires, none of the callbacks will execute, in this case, until everyone has left. This could be useful for an interior motion detector App for instance. There are several different types of constraints:

- input_boolean
- input_select
- presence
- time

An App can have as many or as few as are required. When more than one constraint is present, they must all evaluate to true to allow the callbacks to be called. Constraints becoming true are not an event in their own right, but if they are all true at a point in time, the next callback that would otherwise been blocked due to constraint failure will now be called. Similarly, if one of the constraints becomes false, the next callback that would otherwise have been called will be blocked.

They are described individually below.

### input_boolean
By default, the input_boolean constraint prevents callbacks unless the specified input_boolean is set to "on". This is useful to allow certain Apps to be turned on and off from the user interface. For example:

```ini
[some_app]
module = some_module
class = SomeClass
constrain_input_boolean = input_boolean.enable_motion_detection
```

If you want to reverse the logic so the constraint is only called when the input_boolean is off, use the optional state parameter by appending ",off" to the argument, e.g.:

```ini
[some_app]
module = some_module
class = SomeClass
constrain_input_boolean = input_boolean.enable_motion_detection,off
```

### input_select
The input_select constraint prevents callbacks unless the specified input_select is set to one or more of the nominated (comma separated) values. This is useful to allow certain Apps to be turned on and off according to some flag, e.g., a house mode flag.

```ini
# Single value
constrain_input_select = input_select.house_mode,Day
# or multiple values
constrain_input_select = input_select.house_mode,Day,Evening,Night
```

### presence
The presence constraint will constrain based on presence of device trackers. It takes 3 possible values:
- `noone` - only allow callback execution when no one is home
- `anyone` - only allow callback execution when one or more person is home
- `everyone` - only allow callback execution when everyone is home

```ini
constrain_presence = anyone
# or
constrain_presence = someone
# or
constrain_presence = noone
```

### time
The time constraint consists of 2 variables, `constrain_start_time` and `constrain_end_time`. Callbacks will only be executed if the current time is between the start and end times.
- If both are absent no time constraint will exist
- If only start is present, end will default to 1 second before midnight
- If only end is present, start will default to midnight

The times are specified in a string format with one of the following formats:
- HH:MM:SS - the time in Hours Minutes and Seconds, 24 hour format.
- `sunrise`|`sunset` [+|- HH:MM:SS]- time of the next sunrise or sunset with an optional positive or negative offset in Hours Minutes and seconds

The time based constraint system correctly interprets start and end times that span midnight.

```ini
# Run between 8am and 10pm
constrain_start_time = 08:00:00
constrain_end_time = 22:00:00
# Run between sunrise and sunset
constrain_start_time = sunrise
constrain_end_time = sunset
# Run between 45 minutes before sunset and 45 minutes after sunrise the next day
constrain_start_time = sunset - 00:45:00
constrain_end_time = sunrise + 00:45:00
```

### days
The day constraint consists of as list of days for which the callbacks will fire, e.g.

```ini
constrain_days = mon,tue,wed
```

Callback constraints can also be applied to individual callbacks within Apps, see later for more details.

## A Note on Threading

AppDaemon is multithreaded. This means that any time code within an App is executed, it is executed by one of many threads. This is generally not a particularly important consideration for this application; in general, the execution time of callbacks is expected to be far quicker than the frequency of events causing them. However, it should be noted for completeness, that it is certainly possible for different pieces of code within the App to be executed concurrently, so some care may be necessary if different callback for instance inspect and change shared variables. This is a fairly standard caveat with concurrent programming, and if you know enough to want to do this, then you should know enough to put appropriate safeguards in place. For the average user however this shouldn't be an issue. If there are sufficient use cases to warrant it, I will consider adding locking to the function invocations to make the entire infrastructure threadsafe, but I am not convinced that it is necessary.

An additional caveat of a threaded worker pool environment is that it is the expectation that none of the callbacks tie threads up for a significant amount of time. To do so would eventually lead to thread exhaustion, which would make the system run behind events. No events would be lost as they would be queued, but callbacks would be delayed which is a bad thing.

Given the above, NEVER use Python's `time.sleep()` if you want to perform an operation some time in the future, as this will tie up a thread for the period of the sleep. Instead use the scheduler's `run_in()` function which will allow you to delay without blocking any threads.

## State Operations

### A note on Home Assistant State

State within Home Assistant is stored as a collection of dictionaries, one for each entity. Each entity's dictionary will have some common fields and a number of entity type specific fields The state for an entity will always have the attributes:

- `last_updated`
- `last_changed`
- `state`

Any other attributes such as brightness for a lamp will only be present if the entity supports them, and will be stored in a sub-dictionary called `attributes`. When specifying these optional attributes in the `get_state()` call, no special distinction is required between the main attributes and the optional ones - `get_state()` will figure it out for you.

Also bear in mind that some attributes such as brightness for a light, will not be present when the light is off.

In most cases, the attribute `state` has the most important value in it, e.g., for a light or switch this will be `on` or `off`, for a sensor it will be the value of that sensor. Many of the AppDaemon API calls and callbacks will implicitly return the value of state unless told to do otherwise.

### get_state()

#### Synopsis

```python
get_state(entity=None, attribute=None)
```

`get_state()` is used to query the state of any integration within Home Assistant. State updates are continuously tracked so this call runs locally and does not require AppDaemon to call back to Home Assistant and as such is very efficient.

#### Returns

`get_state()` returns a `dictionary` or single value, the structure of which varies according to the parameters used.

#### Parameters

All parameters are optional, and if `get_state()` is called with no parameters it will return the entire state of Home Assistant at that given time. This will consist of a dictionary with a key for each entity. Under that key will be the standard entity state information.

##### entity

This is the name of an entity or device type. If just a device type is provided, e.g., `light` or `binary_sensor`, `get_state()` will return a dictionary of all devices of that type, indexed by the entity_id, containing all the state for each entity.

If a fully qualified `entity_id` is provided, `get_state()` will return the state attribute for that entity, e.g., `on` or `off` for a light.

##### attribute

Name of an attribute within the entity state object. If this parameter is specified in addition to a fully qualified `entity_id`, a single value representing the attribute will be returned, or `None` if it is not present.

The value `all` for attribute has special significance and will return the entire state dictionary for the specified entity rather than an individual attribute value.

#### Examples

```python
# Return state for the entire system
state = self.get_state()

# Return state for all switches in the system
state = self.get_state("switch")

# Return the state attribute for light.office_1
state = self.get_state("light.office_1")

# Return the brightness attribute for light.office_1
state = self.get_state("light.office_1", attribute="brightness")

# Return the entire state for light.office_1
state = self.get_state("light.office_1", attribute="all")
```

### set_state()

`set_state()` will make a call back to Home Assistant and make changes to the internal state of Home Assistant. This is not something that you would usually want to do and the applications are limited however the call is included for completeness. Note that for instance, setting the state of a light to `on` won't actually switch the device on, it will merely change the state of the device in Home Assistant so that it no longer reflects reality. In most cases, the state will be corrected the next time Home Assistant polls the device or someone causes a state change manually. To effect actual changes of devices use one of the service call functions.

One possible use case for `set_state()` is for testing. If for instance you are writing an App to turn on a light when it gets dark according to a luminance sensor, you can use `set_state()` to temporarily change the light level reported by the sensor to test your program. However this is also possible using the developer tools.

At the time of writing, it appears that no checking is done as to whether or not the entity exists, so it is possible to add entirely new entries to Home Assistant's state with this call.

#### Synopsis

```python
set_state(entity_id, **kwargs)
```

#### Returns

`set_state()` returns a dictionary representing the state of the device after the call has completed.

#### Parameters

##### entity_id

Entity id for which the state is to be set, e.g., `light.office_1`.

##### values

A list of keyword values to be changed or added to the entities state. e.g., `state = "off"`. Note that any optional attributes such as colors for bulbs etc, need to reside in a dictionary called `attributes`; see the example.

#### Examples

```python
status = self.set_state("light.office_1", state="on", attributes={"color_name": "red"})
```

### About Callbacks

A large proportion of home automation revolves around waiting for something to happen and then reacting to it; a light level drops, the sun rises, a door opens etc. Home Assistant keeps track of every state change that occurs within the system and streams that information to AppDaemon almost immediately.

An individual App however usually doesn't care about the majority of state changes going on in the system; Apps usually care about something very specific, like a specific sensor or light. Apps need a way to be notified when a state change happens that they care about, and be able to ignore the rest. They do this through registering callbacks. A callback allows the App to describe exactly what it is interested in, and tells AppDaemon to make a call into its code in a specific place to be able to react to it - this is a very familiar concept to anyone familiar with event-based programming.

There are 3 types of callbacks within AppDaemon:

- State Callbacks - react to a change in state
- Scheduler Callbacks - react to a specific time or interval
- Event Callbacks - react to specific Home Assistant and AppDaemon events.

All callbacks allow the user to specify additional parameters to be handed to the callback via the standard Python `**kwargs` mechanism for greater flexibility.

### About Registering Callbacks

Each of the various types of callback have their own function or functions for registering the callback:

- `listen_state()` for state callbacks
- Various scheduler calls such as `run_once()` for scheduler callbacks
- `listen_event()` for event callbacks.

Each type of callback shares a number of common mechanisms that increase flexibility.

#### Callback Level Constraints

When registering a callback, you can add constraints identical to the Application level constraints described earlier. The difference is that a constraint applied to an individual callback only affects that callback and no other. The constraints are applied by adding Python keyword-value style arguments after the positional arguments. The parameters themselves are named identically to the previously described constraints and have identical functionality. For instance, adding:

`constrain_presence="everyone"`

to a callback registration will ensure that the callback is only run if the callback conditions are met and in addition everyone is present although any other callbacks might run whenever their event fires if they have no constraints.

For example:

`self.listen_state(self.motion, "binary_sensor.drive", constrain_presence="everyone")`

#### User Arguments

Any callback has the ability to allow the App creator to pass through arbitrary keyword arguments that will be presented to the callback when it is run. The arguments are added after the positional parameters just like the constraints. The only restriction is that they cannot be the same as any constraint name for obvious reasons. For example, to pass the parameter `arg1 = "home assistant"` through to a callback you would register a callback as follows:

`self.listen_state(self.motion, "binary_sensor.drive", arg1="home assistant")`

Then in the callback you could use it as follows:

```python
def motion(self, entity, attribute, old, new, **kwargs):
    self.log("Arg1 is {}".format(kwargs["arg1"]))
```

### State Callbacks

AppDaemons's state callbacks allow an App to listen to a wide variety of events, from every state change in the system, right down to a change of a single attribute of a particular entity. Setting up a callback is done using a single API call `listen_state()` which takes various arguments to allow it to do all of the above. Apps can register as many or as few callbacks as they want.

### About State Callback Functions

When calling back into the App, the App must provide a class function with a known signature for AppDaemon to call. The callback will provide various information to the function to enable the function to respond appropriately. For state callbacks, a class defined callback function should look like this:

```python
def my_callback(self, entity, attribute, old, new, **kwargs):
    """Handle state callback."""
    # do some useful work here
```

You can call the function whatever you like - you will reference it in the `listen_state()` call, and you can create as many callback functions as you need.

The parameters have the following meanings:

#### self

A standard Python object reference.

#### entity

Name of the entity the callback was requested for or `None`.

#### attribute

Name of the attribute the callback was requested for or `None`.

#### old

The value of the state before the state change.

#### new

The value of the state after the state change.

`old` and `new` will have varying types depending on the type of callback.

#### \*\*kwargs

A dictionary containing any constraints and/or additional user specific keyword arguments supplied to the `listen_state()` call.

### listen_state()

`listen_state()` allows the user to register a callback for a wide variety of state changes.

#### Synopsis

```python
handle = listen_state(callback, entity=None, **kwargs)
```

#### Returns

A unique identifier that can be used to cancel the callback if required. Since variables created within object methods are local to the function they are created in, and in all likelihood the cancellation will be invoked later in a different function, it is recommended that handles are stored in the object namespace, e.g., `self.handle`.

#### Parameters

All parameters except `callback` are optional, and if `listen_state()` is called with no additional parameters it will subscribe to any state change within Home Assistant.

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard State Callback format documented above.

##### entity

This is the name of an entity or device type. If just a device type is provided, e.g., `light` or `binary_sensor`, `listen_state()` will subscribe to state changes of all devices of that type. If a fully qualified `entity_id` is provided, `listen_state()` will listen for state changes for just that entity.

When called, AppDaemon will supply the callback function, in old and new, with the state attribute for that entity, e.g., `on` or `off` for a light.

##### attribute (optional)

Name of an attribute within the entity state object. If this parameter is specified in addition to a fully qualified `entity_id`, `listen_state()` will subscribe to changes for just that attribute within that specific entity. The new and old parameters in the callback function will be provided with a single value representing the attribute.

The value `all` for attribute has special significance and will listen for any state change within the specified entity, and supply the callback functions with the entire state dictionary for the specified entity rather than an individual attribute value.

##### new = <value> (optional)

If `new` is supplied as a parameter, callbacks will only be made if the state of the selected attribute (usually `state`) in the new state match the value of `new`.

##### old =  <value> (optional)

If `old` is supplied as a parameter, callbacks will only be made if the state of the selected attribute (usually `state`) in the old state match the value of `old`.

Note: `old` and `new` can be used singly or together.

##### duration =  <seconds> (optional)

If duration is supplied as a parameter, the callback will not fire unless the state listened for is maintained for that number of seconds. This makes the most sense if a specific attribute is specified (or the default os `state` is used), an in conjunction with the `old` or `new` parameters, or both. When the callback is called, it is supplied with the values of `entity`, `attr`, `old` and `new` that were current at the time the actual event occurred, since the assumption is that none of them have changed in the intervening period.

```python
def my_callback(self, **kwargs):
    """Handle state change."""
    # do some useful work here
```

(Scheduler callbacks are documented in detail later in this document)

##### \*\*kwargs

Zero or more keyword arguments that will be supplied to the callback when it is called.

#### Examples

```python
# Listen for any state change and return the state attribute
self.handle = self.listen_state(self.my_callback)

# Listen for any state change involving a light and return the state attribute
self.handle = self.listen_state(self.my_callback, "light")

# Listen for a state change involving light.office1 and return the state attribute
self.handle = self.listen_state(self.my_callback, "light.office_1")

# Listen for a state change involving light.office1 and return the entire state as a dict
self.handle = self.listen_state(self.my_callback, "light.office_1", attribute="all")

# Listen for a state change involving the brightness attribute of light.office1
self.handle = self.listen_state(
    self.my_callback, "light.office_1", attribute="brightness"
)

# Listen for a state change involving light.office1 turning on and return the state attribute
self.handle = self.listen_state(self.my_callback, "light.office_1", new="on")

# Listen for a state change involving light.office1 changing from brightness 100 to 200 and return the state attribute
self.handle = self.listen_state(
    self.my_callback, "light.office_1", old="100", new="200"
)

# Listen for a state change involving light.office1 changing to state on and remaining on for a minute
self.handle = self.listen_state(
    self.my_callback, "light.office_1", new="on", duration=60
)
```

### cancel_listen_state()

Cancel a `listen_state()` callback. This will mean that the App will no longer be notified for the specific state change that has been canceled. Other state changes will continue to be monitored.

#### Synopsis

```python
cancel_listen_state(handle)
```

#### Returns

Nothing

#### Parameters

##### handle

The handle returned when the `listen_state()` call was made.

#### Examples

```python
self.cancel_listen_state(self.office_light_handle)
```

### info_listen_state()

Get information on state a callback from its handle.

#### Synopsis

```python
entity, attribute, kwargs = self.info_listen_state(self.handle)
```

#### Returns

entity, attribute, kwargs - the values supplied when the callback was initially created.

#### Parameters

##### handle

The handle returned when the `listen_state()` call was made.

#### Examples

```python
entity, attribute, kwargs = self.info_listen_state(self.handle)
```

## Scheduler

AppDaemon contains a powerful scheduler that is able to run with 1 second resolution to fire off specific events at set times, or after set delays, or even relative to sunrise and sunset. In general, events should be fired less than a second after specified but under certain circumstances there may be short additional delays.

### About Schedule Callbacks

As with State Change callbacks, Scheduler Callbacks expect to call into functions with a known and specific signature and a class defined Scheduler callback function should look like this:

```python
def my_callback(self, **kwargs):
    """Handle scheduler callback."""
    # do some useful work here
```

You can call the function whatever you like; you will reference it in the Scheduler call, and you can create as many callback functions as you need.

The parameters have the following meanings:

#### self
A standard Python object reference

#### \*\*kwargs

A dictionary containing Zero or more keyword arguments to be supplied to the callback.

### Creation of Scheduler Callbacks

Scheduler callbacks are created through use of a number of convenience functions which can be used to suit the situation.

#### run_in()

Run the callback in a defined number of seconds. This is used to add a delay, for instance a 60 second delay before a light is turned off after it has been triggered by a motion detector. This callback should always be used instead of `time.sleep()` as discussed previously.

#### Synopsis

```python
self.handle = self.run_in(callback, delay, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### vcallback %}

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### delay

Delay, in seconds before the callback is invoked.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
self.handle = self.run_in(self.run_in_c)
self.handle = self.run_in(self.run_in_c, title="run_in5")
```
#### run_once()

Run the callback once, at the specified time of day. If the time of day is in the past, the callback will occur on the next day.

#### Synopsis

```python
self.handle = self.run_once(callback, time, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### time

A Python `time` object that specifies when the callback will occur. If the time specified is in the past, the callback will occur the next day at the specified time.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run at 4pm today, or 4pm tomorrow if it is already after 4pm
import datetime

...
runtime = datetime.time(16, 0, 0)
handle = self.run_once(self.run_once_c, runtime)
```

#### run_at()

Run the callback once, at the specified date and time.

#### Synopsis

```python
self.handle = self.run_at(callback, datetime, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer. `run_at()` will raise an exception if the specified time is in the past.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### datetime

A Python `datetime` object that specifies when the callback will occur.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run at 4pm today
import datetime

...
runtime = datetime.time(16, 0, 0)
today = datetime.date.today()
event = datetime.datetime.combine(today, runtime)
handle = self.run_once(self.run_once_c, event)
```
#### run_daily()

Execute a callback at the same time every day. If the time has already passed, the function will not be invoked until the following day at the specified time.

#### Synopsis

```python
self.handle = self.run_daily(callback, time, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### time

A Python `time` object that specifies when the callback will occur. If the time specified is in the past, the callback will occur the next day at the specified time.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run daily at 7pm
import datetime

...
time = datetime.time(19, 0, 0)
self.run_daily(self.run_daily_c, runtime)
```

#### run_hourly()

Execute a callback at the same time every hour. If the time has already passed, the function will not be invoked until the following hour at the specified time.

#### Synopsis

```python
self.handle = self.run_hourly(callback, time=None, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### time

A Python `time` object that specifies when the callback will occur, the hour integration of the time object is ignored. If the time specified is in the past, the callback will occur the next hour at the specified time. If time is not supplied, the callback will start an hour from the time that `run_hourly()` was executed.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run every hour, on the hour
import datetime

...
time = datetime.time(0, 0, 0)
self.run_daily(self.run_daily_c, runtime)
```
#### run_minutely()

Execute a callback at the same time every minute. If the time has already passed, the function will not be invoked until the following minute at the specified time.

#### Synopsis

```python
self.handle = self.run_minutely(callback, time=None, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### time

A Python `time` object that specifies when the callback will occur, the hour and minute components of the time object are ignored. If the time specified is in the past, the callback will occur the next hour at the specified time. If time is not supplied, the callback will start a minute from the time that `run_minutely()` was executed.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run Every Minute on the minute
import datetime

...
time = datetime.time(0, 0, 0)
self.run_minutely(self.run_minutely_c, time)
```

#### run_every()

Execute a repeating callback with a configurable delay starting at a specific time.

#### Synopsis

```python
self.handle = self.run_every(callback, time, repeat, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### time

A Python `time` object that specifies when the initial callback will occur.

##### repeat

After the initial callback has occurred, another will occur every `repeat` seconds.

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Run every 17 minutes starting in 2 hours time
import datetime

...
self.run_every(self.run_every_c, time, 17 * 60)
```

#### cancel_timer()
Cancel a previously created timer

#### Synopsis

```python
self.cancel_timer(handle)
```

#### Returns

None

#### Parameters

##### handle

A handle value returned from the original call to create the timer.

#### Examples

```python
self.cancel_timer(handle)
```

### info_timer()

Get information on a scheduler event from its handle.

#### Synopsis

```python
time, interval, kwargs = self.info_timer(handle)
```

#### Returns

time - datetime object representing the next time the callback will be fired

interval - repeat interval if applicable, `0` otherwise.

kwargs - the values supplied when the callback was initially created.

#### Parameters

##### handle

The handle returned when the scheduler call was made.

#### Examples

```python
time, interval, kwargs = self.info_timer(handle)
```

### Scheduler Randomization

All of the scheduler calls above support 2 additional optional arguments, `random_start` and `random_end`. Using these arguments it is possible to randomize the firing of callbacks to the degree desired by setting the appropriate number of seconds with the parameters.

- `random_start` - start of range of the random time
- `random_end` - end of range of the random time

`random_start` must always be numerically lower than `random_end`, they can be negative to denote a random offset before and event, or positive to denote a random offset after an event. The event would be an absolute or relative time or sunrise/sunset depending on which scheduler call you use and these values affect the base time by the specified amount. If not specified, they will default to `0`.

For example:

```python
# Run a callback in 2 minutes minus a random number of seconds between 0 and 60, e.g., run between 60 and 120 seconds from now
self.handle = self.run_in(callback, 120, random_start=-60, **kwargs)
# Run a callback in 2 minutes plus a random number of seconds between 0 and 60, e.g., run between 120 and 180 seconds from now
self.handle = self.run_in(callback, 120, random_end=60, **kwargs)
# Run a callback in 2 minutes plus or minus a random number of seconds between 0 and 60, e.g., run between 60 and 180 seconds from now
self.handle = self.run_in(callback, 120, random_start=-60, random_end=60, **kwargs)
```

## Sunrise and Sunset

AppDaemon has a number of features to allow easy tracking of sunrise and sunset as well as a couple of scheduler functions. Note that the scheduler functions also support the randomization parameters described above, but they cannot be used in conjunction with the `offset` parameter`.

### run_at_sunrise()

Run a callback at or around sunrise.

#### Synopsis

```python
self.handle = self.run_at_sunrise(callback, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### offset = <seconds>

The time in seconds that the callback should be delayed after sunrise. A negative value will result in the callback occurring before sunrise. This parameter cannot be combined with `random_start` or `random_end`

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
import datetime

# ...

# Run 45 minutes before sunset
self.run_at_sunrise(self.sun, offset=datetime.timedelta(minutes=-45).total_seconds())
# or you can just do the math yourself
self.run_at_sunrise(self.sun, offset=30 * 60)  # Sunrise +30 mins
# Run at a random time +/- 60 minutes from sunrise
self.run_at_sunrise(self.sun, random_start=-60 * 60, random_end=60 * 60)
# Run at a random time between 30 and 60 minutes before sunrise
self.run_at_sunrise(self.sun, random_start=-60 * 60, random_end=30 * 60)
```

### run_at_sunset()

Run a callback at or around sunset.

#### Synopsis

```python
self.handle = self.run_at_sunset(callback, offset, **kwargs)
```

#### Returns

A handle that can be used to cancel the timer.

#### Parameters

##### callback

Function to be invoked when the requested state change occurs. It must conform to the standard Scheduler Callback format documented above.

##### offset = <seconds>

The time in seconds that the callback should be delayed after sunrise. A negative value will result in the callback occurring before sunrise. This parameter cannot be combined with `random_start` or `random_end`

##### \*\*kwargs

Arbitrary keyword parameters to be provided to the callback function when it is invoked.

#### Examples

```python
# Example using timedelta
import datetime

# ...

self.run_at_sunset(
    self.sun, datetime.timedelta(minutes=-45).total_seconds()
)  # Sunset -45 mins
# or you can just do the math yourself
self.run_at_sunset(self.sun, 30 * 60)  # Sunset +30 mins
# Run at a random time +/- 60 minutes from sunset
self.run_at_sunset(self.sun, random_start=-60 * 60, random_end=60 * 60)
# Run at a random time between 30 and 60 minutes before sunset
self.run_at_sunset(self.sun, random_start=-60 * 60, random_end=30 * 60)
```
### sunrise()

Return the time that the next Sunrise will occur.

#### Synopsis

```python
self.sunrise()
```

#### Returns

A Python datetime that represents the next time Sunrise will occur.

#### Examples

```python
rise_time = self.sunrise()
```
### sunset()

Return the time that the next Sunset will occur.

#### Synopsis

```python
self.sunset()
```

#### Returns

A Python datetime that represents the next time Sunset will occur.

#### Examples

```python
set_time = self.sunset()
```
### sun_up()

A function that allows you to determine if the sun is currently up.

#### Synopsis

```python
result = self.sun_up()
```

#### Returns

`True` if the sun is up, False otherwise.

#### Examples

```python
if self.sun_up():
    do_something()
```

### sun_down()

A function that allows you to determine if the sun is currently down.

#### Synopsis

```python
result = self.sun_down()
```

#### Returns

`True` if the sun is down, False otherwise.

#### Examples

```python
if self.sun_down():
    do_something()
```

## Calling Services

### About Services

Services within Home Assistant are how changes are made to the system and its devices. Services can be used to turn lights on and off, set thermostats and a whole number of other things. Home Assistant supplies a single interface to all these disparate services that take arbitrary parameters. AppDaemon provides the `call_service()` function to call into Home Assistant and run a service. In addition, it also provides convenience functions for some of the more common services making calling them a little easier.

### call_service()

Call service is the basic way of calling a service within AppDaemon. It can call any service and provide any required parameters. Available services can be found using the developer tools in the UI. For listed services, the part before the first period is the domain, and the part after is the service name. For instance, `light.turn_on` has a domain of `light` and a service name of `turn_on`.

#### Synopsis

```python
self.call_service(service, **kwargs)
```

#### Returns

None

#### Parameters

##### service

The service name, e.g., `light/turn_on`.

##### \*\*kwargs

Each service has different parameter requirements. This argument allows you to specify a comma separated list of keyword value pairs, e.g., `entity_id = light.office_1`. These parameters will be different for every service and can be discovered using the developer tools. Most if not all service calls require an `entity_id` however, so use of the above example is very common with this call.

#### Examples

```python
self.call_service("light/turn_on", entity_id="light.office_lamp", color_name="red")
self.call_service("notify/notify", title="Hello", message="Hello World")
```
### turn_on()

This is a convenience function for the `homeassistant.turn_on` function. It is able to turn on pretty much anything in Home Assistant that can be turned on or run:

- Lights
- Switches
- Scenes
- Scripts

And many more.

#### Synopsis

```python
self.turn_on(entity_id, **kwargs)
```

#### Returns

None

#### Parameters

##### entity_id

Fully qualified entity_id of the thing to be turned on, e.g., `light.office_lamp` or ```scene.downstairs_on```

##### \*\*kwargs

A comma separated list of key value pairs to allow specification of parameters over and above `entity_id`.

#### Examples

```python
self.turn_on("switch.patio_lights")
self.turn_on("scene.bedroom_on")
self.turn_on("light.office_1", color_name="green")
```

### turn_off()

This is a convenience function for the `homeassistant.turn_off` function. Like `homeassistant.turn_on`, it is able to turn off pretty much anything in Home Assistant that can be turned off.

#### Synopsis

```python
self.turn_off(entity_id)
```

#### Returns

None

#### Parameters

##### entity_id

Fully qualified entity_id of the thing to be turned off, e.g., `light.office_lamp` or `scene.downstairs_on`.

#### Examples

```python
self.turn_off("switch.patio_lights")
self.turn_off("light.office_1")
```

### toggle()

This is a convenience function for the `homeassistant.toggle` function. It is able to flip the state of pretty much anything in Home Assistant that can be turned on or off.

#### Synopsis

```python
self.toggle(entity_id)
```

#### Returns

None

#### Parameters

##### entity_id

Fully qualified entity_id of the thing to be toggled, e.g., `light.office_lamp` or `scene.downstairs_on`.

#### Examples

```python
self.toggle("switch.patio_lights")
self.toggle("light.office_1", color_name="green")
```

### select_value()

This is a convenience function for the `input_number.select_value` function. It is able to set the value of an input_number in Home Assistant.

#### Synopsis

```python
self.select_value(entity_id, value)
```

#### Returns

None

#### Parameters

##### entity_id

Fully qualified entity_id of the input_number to be changed, e.g., `input_number.alarm_hour`.

##### value

The new value to set the input number to.

#### Examples

```python
self.select_value("input_number.alarm_hour", 6)
```

### select_option()

This is a convenience function for the `input_select.select_option` function. It is able to set the value of an input_select in Home Assistant.

#### Synopsis

```python
self.select_option(entity_id, option)
```

#### Returns

None

#### Parameters

##### entity_id

Fully qualified entity_id of the input_select to be changed, e.g., `input_select.mode`.

##### value

The new value to set the input number to.

#### Examples

```python
self.select_option("input_select.mode", "Day")
```

### notify()

This is a convenience function for the `notify.notify` service. It will send a notification to your default notification service. If you have more than one, use `call_service()` to call the specific notification service you require instead.

#### Synopsis

```python
notify(message, title=None)
```
#### Returns

None

#### Parameters

##### message

Message to be sent to the notification service.

##### title

Title of the notification - optional.

#### Examples

```python
self.notify("", "Switching mode to Evening")
```

## Events

### About Events

Events are a fundamental part of how Home Assistant works under the covers. HA has an event bus that all integrations can read and write to, enabling integrations to inform other integrations when important events take place. We have already seen how state changes can be propagated to AppDaemon - a state change however is merely an example of an event within Home Assistant. There are several other event types, among them are:

- `homeassistant_start`
- `homeassistant_stop`
- `state_changed`
- `service_registered`
- `call_service`
- `service_executed`
- `platform_discovered`
- `component_loaded`

Using AppDaemon, it is possible to subscribe to specific events as well as fire off events.

In addition to the Home Assistant supplied events, AppDaemon adds 2 more events. These are internal to AppDaemon and are not visible on the Home Assistant bus:

- `appd_started` - fired once when AppDaemon is first started and after Apps are initialized
- `ha_started` - fired every time AppDaemon detects a Home Assistant restart

### About Event Callbacks

As with State Change and Scheduler callbacks, Event Callbacks expect to call into functions with a known and specific signature and a class defined Scheduler callback function should look like this:

```python
def my_callback(self, event_name, data, kwargs):
    """Handle event callback."""
    # do some useful work here
```

You can call the function whatever you like - you will reference it in the Scheduler call, and you can create as many callback functions as you need.

The parameters have the following meanings:

#### self

A standard Python object reference.

#### event_name

Name of the event that was called, e.g., `call_service`.

#### data

Any data that the system supplied with the event as a dict.

#### kwargs

A dictionary containing Zero or more user keyword arguments to be supplied to the callback.

### listen_event()

Listen event sets up a callback for a specific event, or any event.

#### Synopsis

```python
handle = listen_event(function, event=None, **kwargs)
```
#### Returns

A handle that can be used to cancel the callback.

#### Parameters

##### function

The function to be called when the event is fired.

##### event

Name of the event to subscribe to. Can be a standard Home Assistant event such as `service_registered` or an arbitrary custom event such as `"MODE_CHANGE"`. If no event is specified, `listen_event()` will subscribe to all events.

##### \*\*kwargs (optional)

One or more keyword value pairs representing App specific parameters to supply to the callback. If the keywords match values within the event data, they will act as filters, meaning that if they don't match the values, the callback will not fire.

As an example of this, a Minimote controller when activated will generate an event called `zwave.scene_activated`, along with 2 pieces of data that are specific to the event - `entity_id` and `scene`. If you include keyword values for either of those, the values supplied to the `listen_event()` call must match the values in the event or it will not fire. If the keywords do not match any of the data in the event they are simply ignored.

Filtering will work with any event type, but it will be necessary to figure out the data associated with the event to understand what values can be filtered on. This can be achieved by examining Home Assistant's logfiles when the event fires.

#### Examples

```python
self.listen_event(self.mode_event, "MODE_CHANGE")
# Listen for a minimote event activating scene 3:
self.listen_event(self.generic_event, "zwave.scene_activated", scene_id=3)
# Listen for a minimote event activating scene 3 from a specific minimote:
self.listen_event(
    self.generic_event, "zwave.scene_activated", entity_id="minimote_31", scene_id=3
)
```

### cancel_listen_event()

Cancels callbacks for a specific event.

#### Synopsis

```python
cancel_listen_event(handle)
```
#### Returns

None.

#### Parameters

##### handle

A handle returned from a previous call to `listen_event()`.

#### Examples

```python
self.cancel_listen_event(handle)
```

### info_listen_event()

Get information on an event callback from its handle.

#### Synopsis

```python
service, kwargs = self.info_listen_event(handle)
```

#### Returns

service, kwargs - the values supplied when the callback was initially created.

#### Parameters

##### handle

The handle returned when the `listen_event()` call was made.

#### Examples

```python
service, kwargs = self.info_listen_event(handle)
```


### fire_event()

Fire an event on the Home Assistant bus, for other integrations to hear.

#### Synopsis

```python
fire_event(event, **kwargs)
```

#### Returns

None.

#### Parameters

##### event

Name of the event. Can be a standard Home Assistant event such as `service_registered` or an arbitrary custom event such as `"MODE_CHANGE"`.

##### \*\*kwargs

Zero or more keyword arguments that will be supplied as part of the event.

#### Examples

```python
self.fire_event("MY_CUSTOM_EVENT", jam="true")
```

### Event Callback Function Signature

Functions called as an event callback will be supplied with 2 arguments:

```python
def service(self, event_name, data):
    """Handle event."""
```

#### event_name

The name of the event that caused the callback, e.g., `"MODE_CHANGE"` or `call_service`.

#### data

A dictionary containing any additional information associated with the event.

### Use of Events for Signaling between Home Assistant and AppDaemon

Home Assistant allows for the creation of custom events and existing integrations can send and receive them. This provides a useful mechanism for signaling back and forth between Home Assistant and AppDaemon. For instance, if you would like to create a UI Element to fire off some code in Home Assistant, all that is necessary is to create a script to fire a custom event, then subscribe to that event in AppDaemon. The script would look something like this:

```yaml
alias: Day
sequence:
- event: MODE_CHANGE
  event_data:
    mode: Day
```

The custom event `MODE_CHANGE` would be subscribed to with:

```python
self.listen_event(self.mode_event, "MODE_CHANGE")
```

Home Assistant can send these events in a variety of other places - within automations, and also directly from Alexa intents. Home Assistant can also listen for custom events with its automation component. This can be used to signal from AppDaemon code back to Home Assistant. Here is a sample automation:

```yaml
automation:
  trigger:
    platform: event
    event_type: MODE_CHANGE
    ...
    ...
```

This can be triggered with a call to AppDaemon's fire_event() as follows:

```python
self.fire_event("MODE_CHANGE", mode="Day")
```

## Presence

Presence in Home Assistant is tracked using Device Trackers. The state of all device trackers can be found using the `get_state()` call, however AppDaemon provides several convenience functions to make this easier.

### get_trackers()

Return a list of all device trackers. This is designed to be iterated over.

#### Synopsis

```python
tracker_list = get_trackers()
```
#### Returns

An iterable list of all device trackers.

#### Examples

```python
trackers = self.get_trackers()
for tracker in trackers:
    do_something(tracker)
```

### get_tracker_state()

Get the state of a tracker. The values returned depend in part on the configuration and type of device trackers in the system. Simpler tracker types like `Locative` or `Nmap` will return one of 2 states:

- `home`
- `not_home`

Some types of device tracker are in addition able to supply locations that have been configured as Geofences, in which case the name of that location can be returned.

#### Synopsis

```python
location = self.get_tracker_state(tracker_id)
```

#### Returns

A string representing the location of the tracker.

#### Parameters

##### tracker_id

Fully qualified entity_id of the device tracker to query, e.g., `device_tracker.andrew`.

#### Examples

```python
trackers = self.get_trackers()
for tracker in trackers:
    self.log("{} is {}".format(tracker, self.get_tracker_state(tracker)))
```

### everyone_home()

A convenience function to determine if everyone is home.

#### Synopsis

```python
result = self.everyone_home()
```
#### Returns

Returns `True` if everyone is at home, `False` otherwise.

#### Examples

```python
if self.everyone_home():
    do_something()
```
### anyone_home()

A convenience function to determine if one or more person is home.

#### Synopsis

```python
result = self.anyone_home()
```

#### Returns

Returns `True` if anyone is at home, `False` otherwise.

#### Examples

```python
if self.anyone_home():
    do_something()
```
### noone_home()

A convenience function to determine if no people are at home.

#### Synopsis

```python
result = self.noone_home()
```

#### Returns

Returns `True` if no one is home, `False` otherwise.

#### Examples

```python
if self.noone_home():
    do_something()
```

## Miscellaneous Helper Functions

### time()

Returns a Python `time` object representing the current time. Use this in preference to the standard Python ways to discover the current time, especially when using the "Time Travel" feature for testing.

#### Synopsis

```python
time()
```

#### Returns

A localized Python time object representing the current AppDaemon time.

#### Parameters

None

#### Example

```python
now = self.time()
```

### date()

Returns a Python `date` object representing the current date. Use this in preference to the standard Python ways to discover the current date, especially when using the "Time Travel" feature for testing.

#### Synopsis

```python
date()
```

#### Returns

A localized Python time object representing the current AppDaemon date.

#### Parameters

None

#### Example

```python
today = self.date()
```

### datetime()

Returns a Python `datetime` object representing the current date and time. Use this in preference to the standard Python ways to discover the current time, especially when using the "Time Travel" feature for testing.

#### Synopsis

```python
datetime()
```

#### Returns

A localized Python datetime object representing the current AppDaemon date and time.

#### Parameters

None

#### Example

```python
now = self.datetime()
```


### convert_utc()

Home Assistant provides timestamps of several different sorts that may be used to gain additional insight into state changes. These timestamps are in UTC and are coded as ISO 8601 Combined date and time strings. `convert_utc()` will accept one of these strings and convert it to a localized Python datetime object representing the timestamp

#### Synopsis

```python
convert_utc(utc_string)
```

#### Returns

`convert_utc(utc_string)` returns a localized Python datetime object representing the timestamp.

#### Parameters

##### utc_string

An ISO 8601 encoded date and time string in the following format: `2016-07-13T14:24:02.040658-04:00`

#### Example

###parse_time()

Takes a string representation of a time, or sunrise or sunset offset and converts it to a `datetime.time` object.

#### Synopsis

```python
parse_time(time_string)
```

#### Returns

A `datetime.time` object, representing the time given in the `time_string` argument.

#### Parameters

##### time_string

A representation of the time in a string format with one of the following formats:

- HH:MM:SS - the time in Hours Minutes and Seconds, 24 hour format.
- sunrise &#124; sunset [+ &#124; - HH:MM:SS]- time of the next sunrise or sunset with an optional positive or negative offset in Hours Minutes and seconds

#### Example

```python
time = self.parse_time("17:30:00")
time = self.parse_time("sunrise")
time = self.parse_time("sunset + 00:30:00")
time = self.parse_time("sunrise + 01:00:00")
```

### now_is_between()

Takes two string representations of a time, or sunrise or sunset offset and returns true if the current time is between those 2 times. `now_is_between()` can correctly handle transitions across midnight.

#### Synopsis

```python
now_is_between(start_time_string, end_time_string)
```

#### Returns

`True` if the current time is within the specified start and end times, `False` otherwise.

#### Parameters

##### start_time_string, end_time_string

A representation of the start and end time respectively in a string format with one of the following formats:

- HH:MM:SS - the time in Hours Minutes and Seconds, 24 hour format.
- sunrise &#124; sunset [+ &#124; - HH:MM:SS]- time of the next sunrise or sunset with an optional positive or negative offset in Hours Minutes and seconds

#### Example

```python
if self.now_is_between("17:30:00", "08:00:00"):
    do_something()
if self.now_is_between("sunset - 00:45:00", "sunrise + 00:45:00"):
    do_something_else()
```

### friendly_name()

`friendly_name()` will return the Friendly Name of an entity if it has one.

#### Synopsis

```python
Name = self.friendly_name(entity_id)
```

#### Returns

The friendly name of the entity if it exists or the entity id if not.

#### Example

```python
tracker = "device_tracker.andrew"
self.log(
    "{}  ({}) is {}".format(
        tracker, self.friendly_name(tracker), self.get_tracker_state(tracker)
    )
)
```

### split_entity()

`split_entity()` will take a fully qualified entity id of the form `light.hall_light` and split it into 2 values, the device and the entity, e.g., `light` and `hall_light`.

#### Synopsis

```python
device, entity = self.split_entity(entity_id)
```

#### Parameters

##### entity_id

Fully qualified entity id to be split.

#### Returns

A list with 2 entries, the device and entity respectively.

#### Example

```python
device, entity = self.split_entity(entity_id)
if device == "scene":
    do_something_specific_to_scenes()
```


### get_app()

`get_app()` will return the instantiated object of another app running within the system. This is useful for calling functions or accessing variables that reside in different apps without requiring duplication of code.

#### Synopsis

```python
get_app(self, name)
```
#### Parameters

##### name

Name of the app required. This is the name specified in header section of the configuration file, not the module or class.

#### Returns

An object reference to the class.

#### Example
```python
MyApp = self.get_app("MotionLights")
MyApp.turn_light_on()
```

### split_device_list()

`split_device_list()` will take a comma separated list of device types (or anything else for that matter) and return them as an iterable list. This is intended to assist in use cases where the App takes a list of entities from an argument, e.g., a list of sensors to monitor. If only one entry is provided, an iterable list will still be returned to avoid the need for special processing.

#### Synopsis

```python
devices = split_device_list(list)
```

#### Returns

A list of split devices with 1 or more entries.

#### Example

```python
for sensor in self.split_device_list(self.args["sensors"]):
    do_something(sensor)  # e.g.,  make a state subscription
```


### Writing to Logfiles

AppDaemon uses 2 separate logs - the general log and the error log. An AppDaemon App can write to either of these using the supplied convenience methods `log()` and `error()`, which are provided as part of parent `AppDaemon` class, and the call will automatically pre-pend the name of the App making the call. The `-D` option of AppDaemon can be used to specify what level of logging is required and the logger objects will work as expected.

### log()

#### Synopsis

```python
log(message, level="INFO")
```

#### Returns

Nothing

#### Parameters

##### Message

The message to log.

##### level

The log level of the message - takes a string representing the standard logger levels.

#### Examples

```python
self.log("Log Test: Parameter is {}".format(some_variable))
self.log("Log Test: Parameter is {}".format(some_variable), level="ERROR")
```

### error()

#### Synopsis

```python
error(message, level="WARNING")
```
#### Returns

Nothing

#### Parameters

##### Message

The message to log.

##### level

The log level of the message - takes a string representing the standard logger levels.

#### Examples

```python
self.error("Some Warning string")
self.error("Some Critical string", level="CRITICAL")
```

## Sharing information between Apps

Sharing information between different Apps is very simple if required. Each app gets access to a global dictionary stored in a class attribute called `self.global_vars`. Any App can add or read any key as required. This operation is not however threadsafe so some car is needed.

In addition, Apps have access to the entire configuration if required, meaning they can access AppDaemon configuration items as well as parameters from other Apps. To use this, there is a class attribute called `self.config`. It contains a `ConfigParser` object, which is similar in operation to a `Dictionary`. To access any apps parameters, simply reference the ConfigParser object using the Apps name (form the configuration file) as the first key, and the parameter required as the second, for instance:

```python
other_apps_arg = self.config["some_app"]["some_parameter"]
```

To get AppDaemon's configuration parameters, use the key "AppDaemon", e.g.:

```python
app_timezone = self.config["AppDaemon"]["time_zone"]
```

And finally, it is also possible to use the AppDaemon as a global area for sharing parameters across Apps. Simply add the required parameters to the AppDaemon section of your configuration:

```ini
[AppDaemon]
ha_url = <some url>
ha_key = <some key>
...
global_var = hello world
```

Then access it as follows:

```python
my_global_var = conf.config["AppDaemon"]["global_var"]
```

## Development Workflow

Developing Apps is intended to be fairly simple but is an exercise in programming like any other kind of Python programming. As such, it is expected that apps will contain syntax errors and will generate exceptions during the development process. AppDaemon makes it very easy to iterate through the development process as it will automatically reload code that has changed and also will reload code if any of the parameters in the configuration file change as well.

The recommended workflow for development is as follows:

- Open a window and tail the `appdaemon.log` file
- Open a second window and tail the `error.log` file
- Open a third window or the editor of your choice for editing the App

With this setup, you will see that every time you write the file, AppDaemon will log the fact and let you know it has reloaded the App in the `appdaemon.log` file.

If there is an error in the compilation or a runtime error, this will be directed to the `error.log` file to enable you to see the error and correct it. When an error occurs, there will also be a warning message in `appdaemon.log` to tell you to check the error log.

## Time Travel

OK, time travel sadly isn't really possible but it can be very useful when testing Apps. For instance, imagine you have an App that turns a light on every day at sunset. It might be nice to test it without waiting for Sunset - and with AppDaemon's "Time Travel" features you can.

### Choosing a Start Time

Internally, AppDaemon keeps track of its own time relative to when it was started. This make is possible to start AppDaemon with a different start time and date to the current time. For instance to test that sunset App, start AppDaemon at a time just before sunset and see if it works as expected. To do this, simply use the "-s" argument on AppDaemon's command line. e,g,:

```bash
$ appdaemon -s "2016-06-06 19:16:00"
2016-09-06 17:16:00 INFO AppDaemon Version 1.3.2 starting
2016-09-06 17:16:00 INFO Got initial state
2016-09-06 17:16:00 INFO Loading Module: /export/hass/appdaemon_test/conf/test_apps/sunset.py
...
```

Note the timestamps in the log - AppDaemon believes it is now just before sunset and will process any callbacks appropriately.

### Speeding things up

Some Apps need to run for periods of a day or two for you to test all aspects. This can be time consuming, but Time Travel can also help here in two ways. The first is by speeding up time. To do this, simply use the `-t` option on the command line. This specifies the amount of time a second lasts while time traveling. The default of course is 1 second, but if you change it to `0.1` for instance, AppDaemon will work 10x faster. If you set it to `0`, AppDaemon will work as fast as possible and, depending in your hardware, may be able to get through an entire day in a matter of minutes. Bear in mind however, due to the threaded nature of AppDaemon, when you are running with `-t 0` you may see actual events firing a little later than expected as the rest of the system tries to keep up with the timer. To set the tick time, start AppDaemon as follows:

```bash
$ appdaemon -t 0.1
```

AppDaemon also has an interval flag - think of this as a second multiplier. If the flag is set to 3600 for instance, each tick of the scheduler will jump the time forward by an hour. This is good for covering vast amounts of time quickly but event firing accuracy will suffer as a result. For example:

```bash
$ appdaemon -e 3600
```

### Automatically stopping

AppDaemon can be set to terminate automatically at a specific time. This can be useful if you want to repeatedly rerun a test, for example to test that random values are behaving as expected. Simply specify the end time with the `-e` flag as follows:

```bash
$ appdaemon -e "2016-06-06 10:10:00"
2016-09-06 17:16:00 INFO AppDaemon Version 1.3.2 starting
2016-09-06 17:16:00 INFO Got initial state
2016-09-06 17:16:00 INFO Loading Module: /export/hass/appdaemon_test/conf/test_apps/sunset.py
...
```

The `-e` flag is most useful when used in conjunction with the -s flag and optionally the `-t` flag. For example, to run from just before sunset, for an hour, as fast as possible:

```bash
$ appdaemon -s "2016-06-06 19:16:00" -s "2016-06-06 20:16:00" -t 0
```


### A Note on Times

Some Apps you write may depend on checking times of events relative to the current time. If you are time traveling this will not work if you use standard Python library calls to get the current time and date etc. For this reason, always use the AppDamon supplied `time()`, `date()` and `datetime()` calls, documented earlier. These calls will consult with AppDaemon's internal time rather than the actual time and give you the correct values.
