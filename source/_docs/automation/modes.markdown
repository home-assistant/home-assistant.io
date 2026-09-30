---
title: "Automation modes"
description: "Automation modes define what happens when an automation starts while it is still running. Home Assistant has the single, restart, queued, and parallel modes."
---

Sometimes an automation starts again before it has finished its previous run, for example, while it waits in a delay. The mode of the automation tells Home Assistant what to do in that situation: ignore the new start, start over, queue it up, or run another copy in parallel.

Most of the time, the default **Single** mode is what you want. The other modes are there for special cases, like a notification automation that should run a fresh copy for every event, or a long-running sequence that should restart from the top whenever something changes.

To change the mode of an automation, in the automation editor, select **Menu** {% icon "mdi:dots-vertical" %} > **Change mode**. For detailed steps, refer to [changing the mode of an automation](/docs/automation/editor/#changing-the-mode-of-an-automation).

## The modes

- **Single** (`single`): Doesn't start a new run while the automation is running, and logs a warning. This is the default.
- **Restart** (`restart`): Stops the current run, including a delay or a wait that is running, and starts a new run. The automation only restarts if its conditions are met.
- **Queued** (`queued`): Starts the new run after all previous runs have finished. The runs start in the order in which the automation was started. A new run only joins the queue if the conditions of the automation are met at the moment it starts.
- **Parallel** (`parallel`): Starts a new, independent run right away, next to the previous runs.

The following diagram shows an automation with 8 actions. It starts a second time when its first run has just finished action 3. Depending on the mode, the following happens:

- **Single**: The first run continues with actions 4 to 8. The second start doesn't run, and Home Assistant logs a warning.
- **Restart**: The first run stops after action 3. A new run starts right away with action 1, and runs all 8 actions.
- **Queued**: The first run continues with actions 4 to 8. When it has finished, the second run starts with action 1, and runs all 8 actions.
- **Parallel**: The first run continues with actions 4 to 8. At the same time, a second run starts with action 1, and runs all 8 actions.

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg' alt='Diagram of what happens to a second start in each mode: single ignores it with a warning, restart stops the first run and starts over, queued runs it after the first run, and parallel runs both at the same time.'>
</p>

## Setting the maximum number of runs

For the **Queued** and **Parallel** modes, you can set the maximum number of runs. In **Queued** mode, the limit includes the run that is executing and the runs waiting in the queue. In **Parallel** mode, it includes all runs executing at the same time. The default is 10, and the minimum is 2.

To set it in the UI, use **Queue length** or **Max number of parallel runs** when you [change the mode](/docs/automation/editor/#changing-the-mode-of-an-automation). In YAML, use the `max` option.

When the automation starts while the maximum is reached, the new run doesn't start. For the **Single** mode, the maximum is effectively 1.

## Changing the warning in the logs

When a new run can't start, Home Assistant logs a warning. In the **Single** mode, the warning is `Already running`. In the **Queued** and **Parallel** modes, it is `Maximum number of runs exceeded`.

You can log this message at another [log level](/integrations/logger/#log-levels), or not log it at all. The **Change mode** dialog doesn't have this option, so you add it in YAML.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.
2. In the top bar, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Edit in YAML**.
3. Add the `max_exceeded` option, with the log level that you want. To not log the message at all, use `silent`:

   ```yaml
   max_exceeded: silent
   ```

4. Select **Save**.
   - Result: The next time the automation can't start a new run, Home Assistant logs the message at this level, or not at all. The default level is `warning`.

## Example: throttled automation

Some automations should only run once every 5 minutes, even when they are started more often. To do this, use the **Single** mode with a delay at the end, and silence the warning for the ignored starts.

```yaml
automation:
  - mode: single
    max_exceeded: silent
    triggers:
      - ...
    actions:
      - ...
      # Wait 5 minutes before the automation can run again
      - delay:
          minutes: 5
```

## Example: queued automation

Sometimes an automation controls a device that can't handle several commands at the same time. Then, use the **Queued** mode. Each new run waits until the previous runs have finished.

```yaml
automation:
  - mode: queued
    max: 25
    triggers:
      - ...
    actions:
      - ...
```
