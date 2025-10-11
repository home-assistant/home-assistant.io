---
title: "Modos de Automação"
description: "Como usar modos para controlar como suas automações são executadas."
---

Os modos de automação permitem que você controle como suas automações são executadas quando são acionadas várias vezes em um curto período de tempo.

## Modos disponíveis

Existem vários modos de automação disponíveis:

- **single:** (Padrão) Este modo não iniciará uma nova execução da automação se a automação já estiver em execução.
- **restart:** Este modo iniciará uma nova execução da automação e interromperá a execução anterior.
- **queued:** Este modo enfileirará uma nova execução da automação se a automação já estiver em execução. A nova execução será iniciada assim que a execução anterior for concluída.
- **parallel:** Este modo iniciará uma nova execução da automação em paralelo com a execução anterior.

## Escolhendo um modo

O modo que você escolher dependerá do que sua automação faz.

- **single:** Este é um bom modo padrão para a maioria das automações. Ele evita que a automação seja executada várias vezes desnecessariamente.
- **restart:** Este modo é útil para automações que precisam ser reiniciadas se forem acionadas novamente. Por exemplo, você pode ter uma automação que liga uma luz por 5 minutos. Se a automação for acionada novamente antes que os 5 minutos terminem, você desejará reiniciar o temporizador.
- **queued:** Este modo é útil para automações que precisam ser executadas em ordem. Por exemplo, você pode ter uma automação que envia uma série de notificações. Você desejará enfileirar as notificações para que sejam enviadas na ordem correta.
- **parallel:** Este modo é útil para automações que podem ser executadas com segurança em paralelo. Por exemplo, você pode ter uma automação que liga várias luzes. Você pode executar essas ações em paralelo para ligar as luzes mais rapidamente.

## Definindo o modo

Você pode definir o modo para uma automação no editor de automação ou em seu arquivo `automations.yaml`.

No editor de automação, você pode selecionar o modo no menu suspenso "Modo".

Em seu arquivo `automations.yaml`, você pode definir o modo usando a chave `mode`:

```yaml
- alias: Exemplo de automação
  trigger:
    ...
  action:
    ...
  mode: restart
```

## Máximo de execuções em paralelo

Ao usar o modo `parallel`, você pode especificar o número máximo de execuções que podem ser executadas em paralelo usando a chave `max`:

```yaml
- alias: Exemplo de automação
  trigger:
    ...
  action:
    ...
  mode: parallel
  max: 5
```

Isso limitará o número de execuções em paralelo a 5. Se a automação for acionada novamente quando já houver 5 execuções em execução, a nova execução será enfileirada.
