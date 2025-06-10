-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Jun-2025 às 01:33
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` bigint(20) NOT NULL,
  `id_especie` bigint(20) DEFAULT NULL,
  `nome_cliente` varchar(20) DEFAULT NULL,
  `satisfacao_atual` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_especie`, `nome_cliente`, `satisfacao_atual`) VALUES
(1, 1, 'Alina', NULL),
(2, 2, 'Orlok', NULL),
(3, 3, 'Aurius', NULL),
(4, 4, 'Kright', NULL),
(5, 5, 'Lancelot', NULL),
(6, 6, 'Kayph', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `especie`
--

CREATE TABLE `especie` (
  `id_especie` bigint(20) NOT NULL,
  `nome_especie` varchar(10) DEFAULT NULL,
  `satisfacao_minima` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `especie`
--

INSERT INTO `especie` (`id_especie`, `nome_especie`, `satisfacao_minima`) VALUES
(1, 'Bruxa', 80),
(2, 'Orc', 30),
(3, 'Serafim', 65),
(4, 'Goblin', 78),
(5, 'Elfo', 55),
(6, 'Kobold', 100);

-- --------------------------------------------------------

--
-- Estrutura da tabela `estoque`
--

CREATE TABLE `estoque` (
  `id_estoque` bigint(20) NOT NULL,
  `id_produto` bigint(20) NOT NULL,
  `id_jogador` bigint(20) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `preco_cliente` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogador`
--

CREATE TABLE `jogador` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(10) DEFAULT NULL,
  `senha` varchar(128) DEFAULT NULL,
  `dinheiro` decimal(5,2) DEFAULT NULL,
  `chances` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `jogador`
--

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `pergunta`
--

CREATE TABLE `pergunta` (
  `id_pergunta` bigint(20) NOT NULL,
  `texto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pergunta`
--

INSERT INTO `pergunta` (`id_pergunta`, `texto`) VALUES
(1, 'Isso tudo se citrinos? Tem certeza?'),
(2, 'Tantos citrinos assim? Prateleira mostrava outra coisa.'),
(3, 'Muito movimento hoje?'),
(4, 'Poderia me dar um desconto?'),
(5, 'Sua loja é muito bonita');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id_produto` bigint(20) NOT NULL,
  `nome_produto` varchar(100) DEFAULT NULL,
  `preco` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `nome_produto`, `preco`) VALUES
(1, 'adaga', 99.99),
(2, 'asas de morcego', 99.99),
(3, 'caldeirão', 99.99),
(4, 'frascos', 30.00),
(5, 'olhos de serpente', 99.99),
(6, 'crânio de tiefling', 99.99),
(7, 'dente de orc', 70.00),
(8, 'chifre de minotauro', 99.99),
(9, 'anis estrelado', 99.99),
(10, 'escama de kobold', 90.00),
(11, 'escudo', 99.99),
(12, 'flechas', 70.00);

-- --------------------------------------------------------

--
-- Estrutura da tabela `resposta`
--

CREATE TABLE `resposta` (
  `id_resposta` bigint(20) NOT NULL,
  `id_pergunta` bigint(20) DEFAULT NULL,
  `texto` varchar(20) DEFAULT NULL,
  `peso_satisfacao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `resposta`
--

INSERT INTO `resposta` (`id_resposta`, `id_pergunta`, `texto`, `peso_satisfacao`) VALUES
(1, 1, 'Certeza absoluta.', 5),
(2, 1, 'Eu não cometo erros.', -20),
(3, 1, 'Sim', 10),
(4, 2, 'Não vou cair em seus', -30),
(5, 2, 'Conta outra.', -25),
(6, 2, 'Acho que você viu er', -20),
(7, 3, 'Não é da sua conta.', -50),
(8, 3, 'Sim! hoje teve basta', 20),
(9, 3, 'Na verdade não.', 10),
(10, 4, 'Hoje não.', 0),
(11, 4, 'Posso te dar um desc', 50),
(12, 4, 'Nunca!', -30),
(13, 5, 'Obrigado! Fico feliz', 20),
(14, 5, 'Eu não lembro de ter', -40),
(15, 5, 'Péssimo gosto.', -25);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `id_especie` (`id_especie`);

--
-- Índices para tabela `especie`
--
ALTER TABLE `especie`
  ADD PRIMARY KEY (`id_especie`);

--
-- Índices para tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`id_estoque`),
  ADD KEY `id_jogador` (`id_jogador`),
  ADD KEY `id_produto` (`id_produto`);

--
-- Índices para tabela `jogador`
--
ALTER TABLE `jogador`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pergunta`
--
ALTER TABLE `pergunta`
  ADD PRIMARY KEY (`id_pergunta`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`);

--
-- Índices para tabela `resposta`
--
ALTER TABLE `resposta`
  ADD PRIMARY KEY (`id_resposta`),
  ADD KEY `id_pergunta` (`id_pergunta`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `especie`
--
ALTER TABLE `especie`
  MODIFY `id_especie` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `id_estoque` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `jogador`
--
ALTER TABLE `jogador`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `pergunta`
--
ALTER TABLE `pergunta`
  MODIFY `id_pergunta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `resposta`
--
ALTER TABLE `resposta`
  MODIFY `id_resposta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id_especie`);

--
-- Limitadores para a tabela `estoque`
--
ALTER TABLE `estoque`
  ADD CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`id_jogador`) REFERENCES `jogador` (`id`),
  ADD CONSTRAINT `estoque_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`);

--
-- Limitadores para a tabela `resposta`
--
ALTER TABLE `resposta`
  ADD CONSTRAINT `resposta_ibfk_1` FOREIGN KEY (`id_pergunta`) REFERENCES `pergunta` (`id_pergunta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
