---
title: "Executando Ações"
description: "Como executar ações em seus scripts."
---

As ações são o coração dos seus scripts. Elas são as tarefas que o Home Assistant executa quando o script é executado.

## Tipos de ações

Existem muitos tipos diferentes de ações que você pode usar em seus scripts, incluindo:

- **Chamar um serviço:** A ação mais comum é chamar um serviço. Os serviços são funções que os componentes do Home Assistant expõem.
- **Atraso:** Pausa a execução do script por um período de tempo especificado.
- **Espera:** Pausa a execução do script até que uma determinada condição seja atendida.
- **Condição:** Executa ações apenas se uma determinada condição for atendida.
- **Evento:** Dispara um evento.
- **Escolha:** Executa diferentes sequências de ações com base em uma condição.
- **Repetir:** Executa uma sequência de ações várias vezes.
- **Cena:** Ativa uma cena.
- **Script:** Executa outro script.

## Chamando um serviço

Para chamar um serviço, você precisa especificar o nome do serviço e quaisquer dados que o serviço exija.

Por exemplo, para ligar uma luz, você chamaria o serviço `light.turn_on` e especificaria o `entity_id` da luz que deseja ligar.

```yaml
- service: light.turn_on
  target:
    entity_id: light.office_light
```

## Usando várias ações

Você pode usar várias ações em um script. As ações serão executadas em ordem, uma após a outra.

```yaml
- sequence:
  - service: light.turn_on
    target:
      entity_id: light.office_light
  - delay:
      seconds: 5
  - service: light.turn_off
    target:
      entity_id: light.office_light
```

Neste exemplo, o script primeiro ligará a luz do escritório, depois esperará 5 segundos e, em seguida, desligará a luz.

## Passando dados para ações

Você pode passar dados para ações usando a chave `data`. Por exemplo, para definir o brilho de uma luz, você usaria a seguinte ação:

```yaml
- service: light.turn_on
  target:
    entity_id: light.office_light
  data:
    brightness: 255
```

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como executar ações em seus scripts, incluindo uma lista de todos os tipos de ação disponíveis.
