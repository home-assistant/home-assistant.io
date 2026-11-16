---
description: Run Python code inside Home Assistant, to develop and debug its live internals.
ha_release: 2026.11
ha_domain: debug_console
---

The **Debug console** {% term integration %} adds a Python console to Home Assistant, much like the console in the developer tools of a web browser. You can run Python code inside your running Home Assistant, with full access to its live internals.

It is meant for development and for debugging problems in Home Assistant and its integrations. You do not need it for everyday use.

{% warning %}
Before you enable the debug console, be aware that:

- People who ask you to run or paste code in the console may be trying to take over your Home Assistant or steal your data.
- Code runs with the same access as Home Assistant itself. It can read and change everything, including your configuration, passwords, and tokens.
- There are no safety checks. Code can change or delete data, and blocking code freezes Home Assistant until it finishes.
- Everything that runs in the console is written to the Home Assistant log.

Never run code you do not understand yourself.
{% endwarning %}

## Prerequisites

- You need an administrator account. The debug console is not available to other users.

## Configuration

To enable the debug console, add the following to your {% term "`configuration.yaml`" %} file, and restart Home Assistant afterwards:

```yaml
# Example configuration.yaml entry
debug_console:
```

The debug console can only be enabled this way, not from the Home Assistant user interface. That way, code running in your web browser, like a custom card, cannot enable it for you.

Each administrator also sees a warning the first time they open the console. The warning explains the risks, and you can only continue after reading it for a few seconds and confirming that you understand them. Everything that runs in the console is written to the Home Assistant log, together with who ran it.

## Supported functionality

Once enabled, you find the console under **Settings** > **Tools** > **Debug console**.

Type Python code at the prompt and press <kbd>Enter</kbd> to run it. The `hass` object is available, along with anything you assign or import.

- When your code is not complete yet, such as after `for state in hass.states.async_all():`, <kbd>Enter</kbd> starts a new line. Like the Python REPL, an empty line ends an indented block.
- <kbd>Shift</kbd>+<kbd>Enter</kbd> always starts a new line, and <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>Cmd</kbd>+<kbd>Enter</kbd> on macOS) always runs the code.
- You can use `await` directly, without wrapping your code in a function.
- The value of the last expression shows below your code, and is available as `_` afterwards.
- Objects, lists, and dictionaries can be expanded to explore their contents. Properties show as `(...)` and only run when you select them, because reading them can have side effects.
- `print()` works like `console.log` in a web browser: objects you print can be expanded too.
- The console completes names, attributes, imports, and keyword arguments while you type. Inside a call, it shows the signature of the function you are calling.
- Use the arrow keys to go back through code you ran before.
- Code that waits, like `await event.wait()`, does not hold up the console. You can run more code meanwhile, and its result shows once it is done. While code runs, **Stop** stops it, and so does <kbd>Ctrl</kbd>+<kbd>C</kbd> when no text is selected.
- Pasting is blocked until you type `allow pasting` and press <kbd>Enter</kbd>, like in the console of a web browser. This protects against people who try to trick you into pasting code.

Variables and imports are kept per browser tab, also when you reload the page. Going to another page and back keeps what the console showed as well; reloading the page starts with an empty console. A session is removed 30 minutes after its browser tab disconnected, and when Home Assistant restarts.

## Examples

### Look at the state of an entity

```python
hass.states.get("sun.sun")
```

### Call an action and wait for it to finish

```python
await hass.services.async_call(
    "homeassistant", "check_config", blocking=True
)
```

## Known limitations

- Code runs in the event loop of Home Assistant. Blocking calls, like `time.sleep()` or slow file access, freeze Home Assistant until they finish, and **Stop** cannot stop them. Use `await` with asynchronous functions instead, or run blocking work with `await hass.async_add_executor_job(...)`.

## Disabling the debug console

To disable the debug console, remove `debug_console:` from your {% term "`configuration.yaml`" %} file, and restart Home Assistant.

Disabling the debug console does not remove what stays behind elsewhere: the code you ran before is kept in your web browser, so you can go back to it with the arrow keys, and the Home Assistant log keeps what was logged.
