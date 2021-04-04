---
title: Leviosa Motor Blinds Zone hub
description: Instructions on how to integrate the Leviosa Zone hub into Home Assistant.
ha_category:
  - Cover
ha_iot_class: Local Push
ha_release: 2021.4
ha_domain: leviosa_shades
ha_codeowners:
  - '@altersis'
ha_config_flow: true
ha_platforms:
  - cover
---

This integration allows you to control [Leviosa Zone hubs](https://leviosashades.com/products/leviosa-zone) from [Leviosa Motor Shades](https://leviosashades.com/).

{% include integrations/config_flow.md %}

## Things to keep in mind

- Each Leviosa Zone manages up to 6 groups of shades.
- If you have more than one Leviosa Zone in your Network, Home Assistant will display a list, with one IP address for each Leviosa Zone discovered, in the same order as they were discovered. Once a Leviosa Zone is configured in Home Assistant, it will not appear in this list. Refer to the next section to find the IP address of each zone group.
- If you have only one Leviosa Zone, then you'll be taken directly to the screen to enter the Leviosa Zone name and shade group names.
- You can name the shade groups as you wish. They do not have to match the names already in the Leviosa App.
- A `cover` entity for each shade group will be ready for you. An additional `cover` entity is created with the name of the zone (prefixed `all_`) to move all groups in a Leviosa Zone at the same time.

## Getting Zone hub IP Addresses from the app

When you have multiple Leviosa Zones, you'll need to know which IP address is associated with each Leviosa Zone hub. The easiest way to do this is to:

- Open the Leviosa App.
- Press and hold on any shade group name. After 1 second, a new screen will appear.
- Select the ‘Name’ tab at the top.
- The screen will show the IP address of the Leviosa Zone that shade group is on.

## Services to move your blinds to intermediate positions

When you want your blinds to go to intermediate positions defined by you, set these intermediate positions with the [Leviosa remote controller](https://cdn.shopify.com/s/files/1/1346/0347/files/Leviosa_Shades_Programming_instructions.pdf?). These intermediate positions are stored in each Leviosa shade motor, and two services in Home Assistant tell shades in each group to move there. If you do not program intermediate points, the shade willfully travels to the upper or lower limit when these services are used. Once the intermediate positions are set, you can:

- Use `leviosa_shades.next_up_pos` to move up to the next intermediate position.
- Use `leviosa_shades.next_down_pos` to move down to the next intermediate position.

Both services need the `entity_id` of the shade group that you want to move

## Troubleshooting

- You cannot use the Home Assistant UI to move your blinds to arbitrary positions, only to completely open/close them. Use the services explained above to move to your pre-set intermediate positions.
- The services above will only fully open or close the blinds if you do not set intermediate positions using a Leviosa remote.
- If Home Assistant cannot find your Leviosa Zone hubs, double check that you can ping your Home Assistant instance as well as your Leviosa Zones from the same node in your network, and the all nodes are on the same subnet. If you have a network switch that can filter multicast packets, ensure it is not filtering SSDP traffic. Home Assistant can only discover your Leviosa Zone hubs if the SSDP advertisements can reach the Home Assistant instance.
