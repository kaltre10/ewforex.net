-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2021 a las 20:37:15
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ewforexdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bancos`
--

CREATE TABLE `bancos` (
  `id_banco` int(11) NOT NULL,
  `nom_banco` varchar(90) NOT NULL,
  `n_banco` varchar(50) NOT NULL,
  `tip_banco` int(11) NOT NULL,
  `mon_banco` int(11) NOT NULL,
  `rut_banco` text NOT NULL,
  `use_banco` varchar(100) NOT NULL,
  `sta_banco` int(11) NOT NULL,
  `tit_banco` varchar(150) NOT NULL,
  `doc_banco` varchar(10) NOT NULL,
  `n_doc_banco` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`id_banco`, `nom_banco`, `n_banco`, `tip_banco`, `mon_banco`, `rut_banco`, `use_banco`, `sta_banco`, `tit_banco`, `doc_banco`, `n_doc_banco`) VALUES
(26, 'CITIBANK', '311233232', 0, 0, 'CITIBANK.png', 'MnXzSNip49WNFhWBQEAxlgdHV5H3', 0, '', '', '0'),
(27, 'FINANCIERO', '12313', 0, 0, 'FINANCIERO.png', '1IwoPV8bMieC7St3xWc5FQKZ6o53', 0, '', '', '0'),
(28, 'SCOTIABANK', '2147483647', 1, 0, 'SCOTIABANK.png', 'ws6fMddKlqX73vQmMft8KB5MZgm1', 0, '', '', '0'),
(31, 'INTERBANK', '123412424', 0, 0, 'INTERBANK.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(32, 'BCP', '234234', 0, 0, 'BCP.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(33, 'BBVA', '3434', 0, 0, 'BBVA.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(34, 'BANBIF', '234', 0, 0, 'BANBIF.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(35, 'SCOTIABANK', '34', 0, 1, 'SCOTIABANK.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(36, 'CITIBANK', '24234', 0, 0, 'CITIBANK.png', '4P6EazXUvYc0hueQ60YUvr74TnT2', 0, '', '', '0'),
(39, 'CITIBANK', '123333', 0, 0, '', '', 0, '', '', '0'),
(40, 'BANBIF', '12341', 0, 0, 'BANBIF.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 'Jason Hernandez ', 'PASS', '149889214'),
(41, 'FINANCIERO', '1234', 0, 0, 'FINANCIERO.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 1, '', '', '0'),
(47, 'BCP', '19211504858067', 0, 0, 'BCP.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 0, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(48, 'BCP', '19395069534130', 0, 1, 'BCP.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 0, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(49, 'INTERBANCK', '4873001564130', 1, 0, 'INTERBANK.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 0, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(50, 'INTERBANCK', '4873001564180', 1, 1, 'INTERBANK.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 1, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(51, 'SCOTIABANK', '3980035327', 0, 0, 'SCOTIABANK.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 0, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(52, 'SCOTIABANK', '3980035336', 0, 1, 'SCOTIABANK.png', 'jhw1CqidroccEXQQUtEAw6D6UWq2', 0, 'Raúl Fernando Luna Toro', 'DNI', '06478226'),
(53, 'BBVA', '12334322', 0, 0, 'BBVA.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 'Jason Hernandez', 'PASS', '149889214'),
(54, 'BANBIF', '122333', 0, 1, 'BANBIF.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 'Jason Hernandez', 'PASS', '149889214'),
(57, 'INTERBANK', '122222', 0, 0, 'INTERBANK.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 'Jason Hernandez', 'PASS', '149889214'),
(59, 'banbif', '321321321', 0, 1, 'banbif.png', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 1, 'Jason Hernandez', 'DNI', '123123123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigo`
--

CREATE TABLE `codigo` (
  `id_codigo` int(11) NOT NULL,
  `num_codigo` varchar(50) NOT NULL,
  `cot_codigo` decimal(6,2) NOT NULL,
  `tip_codigo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `codigo`
--

INSERT INTO `codigo` (`id_codigo`, `num_codigo`, `cot_codigo`, `tip_codigo`) VALUES
(8, 'MICODIGO', '3.60', 'COMPRA'),
(10, 'OTRO', '4.00', 'VENTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisas`
--

CREATE TABLE `divisas` (
  `id_divisa` int(11) NOT NULL,
  `des_divisa` varchar(40) NOT NULL,
  `cod_divisa` varchar(3) NOT NULL,
  `com_divisa` decimal(6,2) NOT NULL,
  `ven_divisa` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `divisas`
--

INSERT INTO `divisas` (`id_divisa`, `des_divisa`, `cod_divisa`, `com_divisa`, `ven_divisa`) VALUES
(1, 'dolar', 'USD', '4.09', '4.12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE `operaciones` (
  `id_operaciones` int(11) NOT NULL,
  `tip_operacion` varchar(10) DEFAULT NULL,
  `can_operacion` varchar(50) NOT NULL,
  `cot_operacion` decimal(6,2) NOT NULL,
  `rec_operacion` varchar(50) NOT NULL,
  `n_operacion` varchar(45) NOT NULL,
  `fec_operacion` varchar(15) NOT NULL,
  `use_operacion` varchar(100) NOT NULL,
  `sta_operacion` int(11) NOT NULL,
  `ban_use_operacion` int(11) NOT NULL,
  `ban_admin_operacion` int(11) NOT NULL,
  `codigo_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`id_operaciones`, `tip_operacion`, `can_operacion`, `cot_operacion`, `rec_operacion`, `n_operacion`, `fec_operacion`, `use_operacion`, `sta_operacion`, `ban_use_operacion`, `ban_admin_operacion`, `codigo_usuario`) VALUES
(41, 'COMPRA', '250 Dólares', '4.09', '1022.50 Soles', '2', '2021-10-04 13:0', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 53, 52, 'No aplica'),
(42, 'COMPRA', '10 Dólares', '4.09', '40.90 Soles', '1234', '2021-10-04 13:1', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 53, 48, 'No aplica'),
(43, 'COMPRA', '100 Dólares', '4.09', '409.00 Soles', '10221', '2021-10-04 17:2', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 57, 50, 'No aplica'),
(44, 'COMPRA', '100 Dólares', '4.09', '409.00 Soles', '4321', '2021-10-05 16:1', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 40, 50, 'No aplica'),
(45, 'COMPRA', '10 Dólares', '4.09', '40.90 Soles', '1', '2021-10-05 16:3', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 53, 52, 'No aplica'),
(46, 'COMPRA', '100 Dólares', '4.09', '409.00 Soles', '1232', '2021-10-18 16:5', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 53, 52, 'No aplica'),
(47, 'COMPRA', '100 Dólares', '4.09', '409.00 Soles', '1212', '2021-10-19 11:0', 'vOoW7GHO20XAcZcjXdj7qljRC1H3', 0, 40, 52, 'No aplica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `nom_user` varchar(100) DEFAULT NULL,
  `doc_user` varchar(40) DEFAULT NULL,
  `n_user` varchar(40) DEFAULT NULL,
  `tel_user` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user`, `email`, `nom_user`, `doc_user`, `n_user`, `tel_user`) VALUES
(1, 'jhw1CqidroccEXQQUtEAw6D6UWq2', '', 'Jason', '', '149889214', '917545622'),
(2, 'MnXzSNip49WNFhWBQEAxlgdHV5H3', '', 'Jason Hernandez', 'PASS', '149889214', '0141'),
(7, '4P6EazXUvYc0hueQ60YUvr74TnT2', '', 'JASON HERNANDEZ', 'DNI', '23605893', '917545622'),
(8, 'vOoW7GHO20XAcZcjXdj7qljRC1H3', '', 'wefdc', 'DNI', '1231', '1234'),
(9, 'VMj3duFPRHa5quTFNQ6xevHrzuy1', 'correo@gmail.com', NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bancos`
--
ALTER TABLE `bancos`
  ADD PRIMARY KEY (`id_banco`);

--
-- Indices de la tabla `codigo`
--
ALTER TABLE `codigo`
  ADD PRIMARY KEY (`id_codigo`);

--
-- Indices de la tabla `divisas`
--
ALTER TABLE `divisas`
  ADD PRIMARY KEY (`id_divisa`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`id_operaciones`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bancos`
--
ALTER TABLE `bancos`
  MODIFY `id_banco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `codigo`
--
ALTER TABLE `codigo`
  MODIFY `id_codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `divisas`
--
ALTER TABLE `divisas`
  MODIFY `id_divisa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `id_operaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
