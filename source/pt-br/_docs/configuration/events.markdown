---
title: "Eventos"
description: "Uma explicação sobre eventos no Home Assistant."
---

Os eventos são a base do Home Assistant. Tudo o que acontece no Home Assistant é representado como um evento. Por exemplo, quando o estado de uma entidade muda, um evento `state_changed` é disparado. Quando uma automação é acionada, um evento `automation_triggered` é disparado.

## Tipos de eventos

Existem muitos tipos diferentes de eventos no Home Assistant, incluindo:

- **state_changed:** Disparado quando o estado de uma entidade muda.
- **call_service:** Disparado quando um serviço é chamado.
- **automation_triggered:** Disparado quando uma automação é acionada.
- **script_started:** Disparado quando um script é iniciado.
- **timer_finished:** Disparado quando um temporizador termina.
- **homeassistant_start:** Disparado quando o Home Assistant é iniciado.
- **homeassistant_stop:** Disparado quando o Home Assistant é parado.

Você pode ver uma lista de todos os eventos que estão sendo disparados em seu sistema usando a ferramenta de desenvolvedor "Eventos".

## Usando eventos em automações

Os eventos podem ser usados para acionar automações. Por exemplo, você poderia criar uma automação que é acionada quando um evento `state_changed` específico é disparado.

Aqui está um exemplo de uma automação que é acionada quando uma luz específica é ligada:

```yaml
- alias: Notificar quando a luz do escritório for ligada
  trigger:
    - platform: event
      event_type: state_changed
      event_data:
        entity_id: light.office_light
        to_state: 'on'
  action:
    - service: notify.notify
      data:
        message: "A luz do escritório foi ligada."
```

## Disparando eventos

Você também pode disparar seus próprios eventos personalizados a partir de automações e scripts. Isso é útil para criar automações mais complexas ou para se comunicar entre diferentes partes do seu sistema Home Assistant.

Para disparar um evento, você pode usar o serviço `event.fire`. Você precisará especificar o `event_type` e quaisquer `event_data` que deseja incluir.

Aqui está um exemplo de como disparar um evento a partir de uma automação:

```yaml
action:
  - service: event.fire
    data:
      event_type: my_custom_event
      event_data:
        some_data: "hello world"
```

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre eventos, incluindo uma lista de todos os eventos integrados e como usar eventos em suas automações.
