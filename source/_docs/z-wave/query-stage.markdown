---
title: "Z-Wave Query Stage"
description: "What are the Query Stages."
---

<div class='note'>

This Z-Wave integration is deprecated and replaced with a [new implementation based on Z-Wave JS](/integrations/zwave_js); it's currently in beta, and you can [try it now](/integrations/zwave_js/).

</div>

When the Z-Wave mesh is first started, the controller will go through all the following stages for every device on the mesh. This is a slow process, and to complete requires that the devices be awake. While devices that are mains or USB powered are always awake, battery-powered devices spend most of their time asleep. Because of this, you can expect that after startup your battery powered devices will spend time in `Initializing (CacheLoad)` - how long depends on the device.

Your devices will still function normally while marked as `Initializing`.

| Stage                 | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| None                  | Query process hasn't started for this node                             |
| ProtocolInfo          | Retrieve protocol information                                          |
| Probe                 | Ping device to see if alive                                            |
| WakeUp                | Start wake up process if a sleeping node                               |
| ManufacturerSpecific1 | Retrieve manufacturer name and product ids if ProtocolInfo lets us     |
| NodeInfo              | Retrieve info about supported, controlled command classes              |
| NodePlusInfo          | Retrieve Z-Wave+ info and update device classes                        |
| SecurityReport        | Retrieve a list of Command Classes that require Security               |
| ManufacturerSpecific2 | Retrieve manufacturer name and product ids                             |
| Versions              | Retrieve version information                                           |
| Instances             | Retrieve information about multiple command class instances            |
| Static                | Retrieve static information (doesn't change)                           |
| CacheLoad             | Ping a device upon restarting with cached configuration for the device |
| Associations          | Retrieve information about associations                                |
| Neighbors             | Retrieve node neighbor list                                            |
| Session               | Retrieve session information (changes infrequently)                    |
| Dynamic               | Retrieve dynamic information (changes frequently)                      |
| Configuration         | Retrieve configurable parameter information (only done on request)     |
| Complete              | Query process is completed for this node                               |
