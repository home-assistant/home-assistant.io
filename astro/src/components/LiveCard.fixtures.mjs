// Fixtures for the LiveCard proof of concept. Each variant is a card
// configuration plus the example entities it shows. The entity data is
// adapted from the Home Assistant frontend gallery
// (gallery/src/pages/lovelace/ in the frontend repository).
const livingRoomLight = {
  entity_id: "light.living_room",
  state: "on",
  attributes: {
    friendly_name: "Living room light",
    supported_color_modes: ["hs", "color_temp"],
    color_mode: "hs",
    brightness: 180,
    hs_color: [30, 60],
  },
};

const blinds = {
  entity_id: "cover.living_room_blinds",
  state: "open",
  attributes: {
    friendly_name: "Living room blinds",
    device_class: "blind",
    current_position: 100,
    // Open, close, set position and stop.
    supported_features: 15,
  },
};

const tvOutlet = {
  entity_id: "switch.tv_outlet",
  state: "off",
  attributes: { friendly_name: "TV outlet", device_class: "outlet" },
};

export default {
  title: "Live card",
  description:
    "A real Home Assistant dashboard card running on example data. Select it to try it out.",
  variants: [
    {
      name: "tile card",
      props: {
        config: {
          type: "tile",
          entity: "light.living_room",
          features: [{ type: "light-brightness" }],
        },
        entities: [livingRoomLight],
      },
    },
    {
      name: "tile card, dark theme",
      props: {
        colorScheme: "dark",
        config: {
          type: "tile",
          entity: "light.living_room",
          features: [{ type: "light-brightness" }],
        },
        entities: [livingRoomLight],
      },
    },
    {
      name: "tile card with buttons",
      props: {
        config: {
          type: "tile",
          entity: "cover.living_room_blinds",
          features_position: "inline",
          features: [{ type: "cover-open-close" }],
        },
        entities: [blinds],
      },
    },
    {
      name: "entities card",
      props: {
        config: {
          type: "entities",
          title: "Living room",
          entities: [
            "light.living_room",
            "switch.tv_outlet",
            "lock.front_door",
          ],
        },
        entities: [
          livingRoomLight,
          tvOutlet,
          {
            entity_id: "lock.front_door",
            state: "locked",
            attributes: { friendly_name: "Front door", device_class: "lock" },
          },
        ],
      },
    },
    {
      name: "thermostat card",
      props: {
        config: { type: "thermostat", entity: "climate.hallway" },
        entities: [
          {
            entity_id: "climate.hallway",
            state: "heat",
            attributes: {
              friendly_name: "Hallway",
              current_temperature: 19.5,
              temperature: 21,
              min_temp: 7,
              max_temp: 30,
              target_temp_step: 0.5,
              hvac_modes: ["heat", "off"],
              hvac_action: "heating",
              // Target temperature, turn on and turn off.
              supported_features: 385,
            },
          },
        ],
      },
    },
    // Three separate cards in one group share their example data:
    // changing the light or the blinds in one card changes the others.
    {
      name: "shared state: light",
      props: {
        group: "living-room",
        config: {
          type: "tile",
          entity: "light.living_room",
          features: [{ type: "light-brightness" }],
        },
        entities: [livingRoomLight, blinds, tvOutlet],
      },
    },
    {
      name: "shared state: blinds",
      props: {
        group: "living-room",
        config: {
          type: "tile",
          entity: "cover.living_room_blinds",
          features_position: "inline",
          features: [{ type: "cover-open-close" }],
        },
      },
    },
    {
      name: "shared state: living room",
      props: {
        group: "living-room",
        config: {
          type: "entities",
          title: "Living room",
          entities: [
            "light.living_room",
            "cover.living_room_blinds",
            "switch.tv_outlet",
          ],
        },
      },
    },
  ],
};
