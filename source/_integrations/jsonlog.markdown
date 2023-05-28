---
title: JSON Log
description: Summary of errors and warnings in Home Assistant during runtime.
ha_category:
  - Utility
ha_release: 2023.6
ha_codeowners:
  - '@janw'
ha_quality_scale: internal
ha_integration_type: system
ha_domain: jsonlog
---

The `jsonlog` integration lets you emit JSON-formatted log messages into a dedicated log file for consumption by external systems.

To enable the `jsonlog` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
jsonlog:
```

The log file will be stored in your [configuration](/docs/configuration/) folder by default (in `jsonlog.log`). Each log message will be a serialized JSON object, emitted to the file as a single line. The payload would look similar to

```json
{
  "asctime": "2023-05-28T12:39:44.715+00:00",
  "created": 1685277584.715271,
  "filename": "setup.py",
  "funcName": "_async_setup_component",
  "levelname": "INFO",
  "levelno": 20,
  "lineno": 277,
  "message": "Setup of domain jsonlog took 0.0 seconds",
  "module": "setup",
  "msecs": 715,
  "name": "homeassistant.setup",
  "pathname": "/usr/src/homeassistant/homeassistant/setup.py",
  "processName": "MainProcess",
  "process": 24568,
  "relativeCreated": 698.6510753631592,
  "threadName": "MainThread",
  "thread": 8324162816
}
```

where each key represents one of the log record's attributes. The attributes match those of the [Python LogRecord class](https://docs.python.org/3/library/logging.html#logrecord-attributes). If log records define their own custom attributes, they will be included in the output as well.

If the log record pertains to an error in the context of an exception, the `exc_info` attribute will contain a stringified version of the exception traceback, similar to this:

```json
{
  "levelname": "ERROR",
  "exc_info": "Traceback (most recent call last):\n (…) \nOSError: [Errno 48] Address already in use",
  …
}
```

{% configuration %}
filename:
  description: Filename and path of the log file. If it's a relative path, it is assumed relative to your [configuration](/docs/configuration/) folder (e.g. `/config`).
  required: false
  type: string
  default: jsonlog.log
attributes:
  description: Attributes of the log records that should be included in the log output. The attributes match those of the [Python LogRecord class](https://docs.python.org/3/library/logging.html#logrecord-attributes). If log records define their own custom attributes, they will always be included in the output.
  required: false
  type: list
  default: [asctime, created, filename, funcName, levelname, levelno, lineno, message, module, msecs, name, pathname, processName, process, relativeCreated, threadName, thread]
  Note:
  keys:
    asctime:
      description: Timestamp of when the log record was created in ISO8601 format, e.g. `2023-05-28T12:39:44.715+00:00`
    created:
      description: Unix timestamp of when the log record was created, e.g. `1685277584.715271`
    exc_info:
      description: Exception traceback if an exception did occur. The attribute will always be included in the output if it's present on the log record.
    filename:
      description: Filename portion of the [`pathname` attribute](#pathname)
    funcName:
      description: Name of the function containing the logging call.
    levelname:
      description: Name of the log level for the message, one of `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`.
    levelno:
      description: Numeric representation of the log level.
    lineno:
      description: Source line number where the logging call was issued.
    message:
      description: The logged message.
    module:
      description: Module (name portion of the [`filename` attribute](#filename)).
    msecs:
      description: Millisecond portion of the time when the log record was created.
    name:
      description: Name of the logger used to create the log record, e.g. `homeassistant.core.recorder`.
    pathname:
      description: Full path of the source file where the logging call was issued.
    process:
      description: Process ID.
    processName:
      description: Process name.
    relativeCreated:
      description: Time in milliseconds when the log record was created, relative to the time the logging module was loaded.
    stack_info:
      description: If available, stack frame information from the bottom of the stack in the current thread, up to and including the stack frame of the logging call which resulted in the creation of this record.
    thread:
      description: Thread ID.
    threadName:
      description: Thread name.
{% endconfiguration %}

## Services

### Service `rotate`

To manually rotate the log file, call this service.


## Examples

In this section, you will find some real-life examples of how to use this component.

### Custom log location

This will create the log file in a different location:

```yaml
jsonlog:
  filename: /var/log/homeassistant.log
```

### Custom set of attributes to log

This will create log records with only the `asctime`, `message`, and `levelname` attributes:

```yaml
jsonlog:
  attributes:
    - asctime
    - message
    - levelname

```
