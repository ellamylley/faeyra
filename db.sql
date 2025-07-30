-- Criação do banco
CREATE DATABASE IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db`;

-- Tabela especie
CREATE TABLE `especie` (
  `id_especie` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome_especie` varchar(10) DEFAULT NULL,
  `satisfacao_minima` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_especie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `especie` (`id_especie`, `nome_especie`, `satisfacao_minima`) VALUES
(1, 'Bruxa', 80),
(2, 'Orc', 30),
(3, 'Serafim', 65),
(4, 'Goblin', 78),
(5, 'Elfo', 55),
(6, 'Kobold', 100);

-- Tabela cliente
CREATE TABLE `cliente` (
  `id_cliente` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_especie` bigint(20) DEFAULT NULL,
  `nome_cliente` varchar(20) DEFAULT NULL,
  `satisfacao_atual` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `id_especie` (`id_especie`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id_especie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cliente` (`id_cliente`, `id_especie`, `nome_cliente`, `satisfacao_atual`) VALUES
(1, 1, 'Alina', NULL),
(2, 2, 'Orlok', NULL),
(3, 3, 'Aurius', NULL),
(4, 4, 'Kright', NULL),
(5, 5, 'Lancelot', NULL),
(6, 6, 'Kayph', NULL),
(7, 7, 'Rubens', NULL);

-- Tabela jogador
CREATE TABLE `jogador` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(10) DEFAULT NULL,
  `senha` varchar(128) DEFAULT NULL,
  `dinheiro` decimal(5,2) DEFAULT NULL,
  `chances` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `jogador` (`id`, `nome`, `senha`, `dinheiro`, `chances`) VALUES
(1, 'Manu', '100', 3.00, NULL),
(2, 'rubinho', '12345', 3.00, NULL),
(3, 'rubinho', '5578', 3.00, NULL),
(4, 'lala', '123', 3.00, NULL),
(5, 'lala', '123', 100.00, 3),
(6, 'rubinho', '273624', 100.00, 3),
(7, 'rubinho', '465756', 100.00, 3),
(8, 'jonas', '483743774', 100.00, 3),
(9, 'lalau', 'miiii', 100.00, 3),
(10, 'mi', 'e437085', 100.00, 3),
(11, 'rubinho', 'asjjkjd', 100.00, 3),
(12, 'rubinho', 'ntgt', 100.00, 3),
(13, 'eu', '1234', 100.00, 3);

-- Tabela produto
CREATE TABLE `produto` (
  `id_produto` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(100) DEFAULT NULL,
  `preco` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `produto` (`id_produto`, `nome_produto`, `preco`) VALUES
(1, 'adaga', 46),
(2, 'asas de morcego', 32),
(3, 'caldeirão', 50),
(4, 'frascos', 19),
(5, 'olhos de serpente', 70),
(6, 'crânio de tiefling', 55),
(7, 'dente de orc', 20),
(8, 'chifre de minotauro', 86),
(9, 'anis estrelado', 10),
(10, 'escama de kobold', 34),
(11, 'escudo', 97),
(12, 'flechas', 15);

-- Tabela estoque
CREATE TABLE `estoque` (
  `id_estoque` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_produto` bigint(20) NOT NULL,
  `id_jogador` bigint(20) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `preco_cliente` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_estoque`),
  KEY `id_produto` (`id_produto`),
  KEY `id_jogador` (`id_jogador`),
  CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`id_jogador`) REFERENCES `jogador` (`id`),
  CONSTRAINT `estoque_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela pergunta
CREATE TABLE `pergunta` (
  `id_pergunta` bigint(20) NOT NULL AUTO_INCREMENT,
  `texto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_pergunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pergunta` (`id_pergunta`, `texto`) VALUES
(1, 'Isso tudo se citrinos? Tem certeza?'),
(2, 'Tantos citrinos assim? Prateleira mostrava outra coisa.'),
(3, 'Muito movimento hoje?'),
(4, 'Poderia me dar um desconto?'),
(5, 'Sua loja é muito bonita');

-- Tabela resposta
CREATE TABLE `resposta` (
  `id_resposta` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_pergunta` bigint(20) DEFAULT NULL,
  `texto` varchar(100) DEFAULT NULL,
  `peso_satisfacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_resposta`),
  KEY `id_pergunta` (`id_pergunta`),
  CONSTRAINT `resposta_ibfk_1` FOREIGN KEY (`id_pergunta`) REFERENCES `pergunta` (`id_pergunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `resposta` (`id_resposta`, `id_pergunta`, `texto`, `peso_satisfacao`) VALUES
(1, 1, 'Certeza absoluta.', 5),
(2, 1, 'Eu não cometo erros.', -20),
(3, 1, 'Sim.', 10),
(4, 2, 'Não vou cair em seus truques.', -30),
(5, 2, 'Conta outra.', -25),
(6, 2, 'Acho que você viu errado.', -20),
(7, 3, 'Não é da sua conta.', -50),
(8, 3, 'Sim! Hoje teve bastante gente.', 20),
(9, 3, 'Na verdade não.', 10),
(10, 4, 'Hoje não.', 0),
(11, 4, 'Posso te dar um desconto.', 50),
(12, 4, 'Nunca!', -30),
(13, 5, 'Obrigado! Fico feliz.', 20),
(14, 5, 'Eu não lembro de ter decorado...', -40),
(15, 5, 'Péssimo gosto.', -25);
