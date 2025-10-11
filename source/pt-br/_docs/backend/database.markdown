---
title: "Banco de Dados"
description: "Como configurar o banco de dados para o Home Assistant."
---

O Home Assistant usa um banco de dados para armazenar o histórico de seus dispositivos e entidades. Por padrão, o Home Assistant usa um banco de dados SQLite, que é um banco de dados simples baseado em arquivo.

## Usando um banco de dados diferente

Para instalações maiores ou para melhor desempenho, você pode querer usar um banco de dados diferente. O Home Assistant suporta vários bancos de dados diferentes, incluindo:

- **MySQL**
- **MariaDB**
- **PostgreSQL**

Para usar um banco de dados diferente, você precisará configurar a integração `recorder` em seu arquivo `configuration.yaml`. Você precisará especificar a URL do banco de dados, que inclui o tipo de banco de dados, o nome de usuário, a senha e o nome do banco de dados.

## Otimizando seu banco de dados

Se você estiver armazenando muitos dados em seu banco de dados, ele pode ficar grande e lento com o tempo. Existem várias coisas que você pode fazer para otimizar seu banco de dados:

- **Excluir entidades:** Você pode excluir entidades do registrador para evitar que seus dados sejam armazenados no banco de dados. Isso é útil para entidades que mudam com frequência ou que você não precisa acompanhar ao longo do tempo.
- **Limpar seu banco de dados:** Você pode usar o serviço `recorder.purge` para limpar dados antigos de seu banco de dados. Isso pode ajudar a reduzir o tamanho do seu banco de dados e melhorar o desempenho.
- **Manutenção do banco de dados:** Se você estiver usando um banco de dados como MySQL ou PostgreSQL, pode ser necessário executar tarefas de manutenção regulares para manter seu banco de dados funcionando sem problemas.

## O sensor de banco de dados

O sensor de banco de dados permite que você monitore o tamanho do seu banco de dados. Isso pode ser útil para acompanhar o crescimento do seu banco de dados ao longo do tempo.

Para usar o sensor de banco de dados, você precisará configurar a integração `sql` em seu arquivo `configuration.yaml`.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como configurar o banco de dados, incluindo exemplos de configuração para diferentes tipos de banco de dados.
