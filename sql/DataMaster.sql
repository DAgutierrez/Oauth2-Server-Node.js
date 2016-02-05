-- table OauthClient --
CREATE TABLE `OauthClients` (
  `ClientId` varchar(11) NOT NULL DEFAULT '',
  `ClientSecret` varchar(11) DEFAULT NULL,
  `RedirectUri` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`ClientId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO OauthClients (ClientID,ClientSecret,RedirectUri) values ('s6BhdRkqt4','gX4fBat3bV','/private');


-- table Users --

CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
