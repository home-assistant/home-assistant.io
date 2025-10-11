---
title: "Segredos"
description: "Como usar segredos para armazenar informações confidenciais."
---

Os segredos no Home Assistant permitem que você armazene informações confidenciais, como senhas e chaves de API, em um arquivo separado. Isso ajuda a manter suas informações confidenciais seguras e fora de seus arquivos de configuração principais.

## O arquivo `secrets.yaml`

Os segredos são armazenados no arquivo `secrets.yaml` em seu diretório de configuração. Este arquivo não é criado por padrão, então você precisará criá-lo se ainda não o tiver feito.

O arquivo `secrets.yaml` é um arquivo YAML simples que contém um conjunto de pares chave-valor. A chave é o nome do segredo, e o valor é a informação confidencial.

Aqui está um exemplo de um arquivo `secrets.yaml`:

```yaml
my_password: "my_secret_password"
my_api_key: "1234567890abcdef"
```

## Usando segredos em sua configuração

Depois de criar seu arquivo `secrets.yaml`, você pode usar os segredos em seus arquivos de configuração usando a sintaxe `!secret`.

Por exemplo, para usar o segredo `my_password` em seu arquivo `configuration.yaml`, você usaria o seguinte:

```yaml
some_integration:
  password: !secret my_password
```

Quando o Home Assistant carregar sua configuração, ele substituirá `!secret my_password` pelo valor do segredo `my_password` de seu arquivo `secrets.yaml`.

## Vantagens de usar segredos

Existem várias vantagens em usar segredos:

- **Segurança:** Os segredos ajudam a manter suas informações confidenciais seguras, armazenando-as em um arquivo separado. Isso torna menos provável que você exponha acidentalmente suas senhas ou chaves de API.
- **Compartilhamento:** Os segredos facilitam o compartilhamento de sua configuração com outras pessoas sem compartilhar suas informações confidenciais. Você pode simplesmente compartilhar seus arquivos de configuração e dizer às pessoas para criarem seu próprio arquivo `secrets.yaml`.
- **Organização:** Os segredos ajudam a manter sua configuração organizada, separando suas informações confidenciais de suas configurações principais.

## Não inclua `secrets.yaml` no controle de versão

Se você estiver usando um sistema de controle de versão como o Git para gerenciar seus arquivos de configuração, é importante excluir seu arquivo `secrets.yaml` do controle de versão. Isso evitará que você confirme acidentalmente suas informações confidenciais em seu repositório.

Você pode fazer isso adicionando `secrets.yaml` ao seu arquivo `.gitignore`.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar segredos, incluindo exemplos de como usar segredos com diferentes integrações.
