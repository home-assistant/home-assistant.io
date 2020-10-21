---
title: "Quick Bar"
description: "Dialog for quickly accessing entities or running commands."
---

The "Quick Bar" allows you to quickly look up entities or run commands without needing to navigate away from your current view (Similar to the "quick open" feature in VS Code, Chrome Developer Tools, etc).

It can be launched in the frontend using [hotkeys](#hotkeys).

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-demo.gif' alt='Quick Bar'>
  Quick Bar for accessing entities and running commands
</p>

## Hotkeys

Type these from anywhere in the application to launch the dialog.

| Mode  | Hotkey (Windows) | Hotkey (macOS)
| ------------- | ------------- |------------- |
| Entity Filter | Ctrl+P | ⌘+P |
| Command | Ctrl+Shift+P | ⌘+Shift+P |

<div class='note'>
  The application must have "focus" for the hotkey to register. If the dialog doesn't launch, try clicking in an empty area of the application and typing it again.
</div>

## Switching Modes

When the dialog has already been launched, you can switch to other modes without losing your filter text.

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-switch-modes.gif' alt='Quick Bar'>
  Switch modes without losing filter text
</p>

| Current Mode | Action | Switches to Mode |
| ------------- | ------------- | ------------- |
| Entity Filter | Use [hotkey](#hotkeys) (or prepend ">" to input field) | Command
| Command | Use [hotkey](#hotkeys) (or remove ">" from input field) | Entity Filter

## Entity Filter Mode

*Hotkey: Ctrl+P (Windows) or ⌘+P (macOS)*

Similar to Developer Tools -> States view, but more lightweight and accessible from anywhere in the frontend.

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-entity-filter.gif' alt='Quick Bar'>
  Filter for entities in Quick Bar's entity filter mode
</p>

Once launched, start typing your entity id (or ["bits and pieces" of your entity id](#search-by-bits-and-pieces-rather-than-complete-substring)) to get back a filtered list of entities. Clicking on an entity will open the "More Info" dialog for that entity. 

This is helpful when, say, you are in the middle of writing an automation and need some quick insight about an entity but don't want to navigate away to Developer Tools.

## Command Mode

*Hotkey: Ctrl+Shift+P (Windows) or ⌘+Shift+P (macOS)*

Run various commands from anywhere without navigating to another view.

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-command-mode.gif' alt='Quick Bar'>
  Run commands in Quick Bar's "command mode"
</p>

Currently-supported commands:

| Command  | Action | Examples
| ------------- | ------------- | ------------- |
| "Reload {domain}" | Calls `{domain}.reload` | <ul><li>"Reload Scripts" calls `script.reload`</li><li>"Reload Scenes" calls `scene.reload`</li><li>etc...</li></ul> |

## Tips

### Search by "bits and pieces" rather than complete substring

In Developer Tools -> States, if you're trying to find "light.chandelier" you would have to type out a complete, exact substring to match it (e.g., "light.cha" or "chandel").

But the Quick Bar checks *each letter* of your filter, finding entities that contain those letters, _in that order_. So, you can instead use "bits and pieces" of the entity id to narrow down matches more quickly (e.g., "ligcha", "ltlier", or "ltcdl").

This is similar to many modern developer-based applications like Sublime, VSCode, Chrome Developer Tools and GitHub file search do "quick file filter" searches.

This can be really helpful when you have LOTS of entities with the same substring (e.g., "\*.living_room_\*"), but you only care about a particular _domain_. For example, rather than type out "media_player.living_" to narrow down media players in your living room, you can just type, say, "med.livroom" and get back the same set with less typing.
