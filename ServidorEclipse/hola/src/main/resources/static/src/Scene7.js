$(window).on("beforeunload", function () {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:8080/conectado",
    //url: "https://lastnightfall-landing.herokuapp.com/conectado",
    data: JSON.stringify({
      usuario: nombreUsuario,
      contrasena: "auxContraseña",
    }),
    processData: false,
    headers: {
      "Content-type": "application/json",
    },
  })
    .done(function (data, textStatus, jqXHR) {})
    .fail(function (data, textStatus, jqXHR) {});

  that2.scene.start("sceneMenu");

  return "string";
});
class Scene7 extends Phaser.Scene {
  constructor() {
    super({ key: "sceneGame2" });
  }

  preload() {}
  create() {
    //connection = new WebSocket("ws://localhost:8080/LastNightFall");
    //connection = new WebSocket('wss://lastnightfall-landing.herokuapp.com/LastNightFall');

    //GRUPO DE LOS ENEMIGOS
    this.enemigos = this.add.group();

    //Audio
    audio1 = this.sound.add("audioScene1", { volume: 0.05, loop: true });
    this.disparoSound = this.sound.add("disparoSound", { volume: 0.02 });
    this.gameOverSound = this.sound.add("gameOverSound", { volume: 0.09 });
    this.perderUnaVidaSound = this.sound.add("perderUnaVidaSound", {
      volume: 0.02,
    });

    if (estadoMusica === true) {
      audio1.play();
      audio1.resume();
    } else {
      audio1.stop();
    }

    this.ronda = 0;
    //  A simple background for our game
    this.cameras.main.fadeIn(1000);
    that2 = this;

    //creamos loop para comprobar estado del server
    this.actualizarServidor = this.time.addEvent({
      delay: 1600,
      callback: servidor,
      callbackScope: this,
      loop: true,
    });

    //RECIBIMOS MENSAJES WEBSOCKET
    connection.onmessage = function (mensaje) {
      var mensajeParsed = JSON.parse(mensaje.data);

      //MENSAJE DE CUENTA ATRAS
      if (mensajeParsed.nombre == "cuentaAtras") {
        if (that2.scene.isActive("sceneGame2")) {
          if (mensajeParsed.t == 0) {
            cuentaAtras.setText("");

            that2.ronda = mensajeParsed.ronda; //actualiza la ronda
            scoreText.setText("ronda " + that2.ronda);
          } else {
            cuentaAtras.setText(mensajeParsed.t);
          }
        }
      } else if (mensajeParsed.nombre == "posJugador") {
        //MENSAJE DE POSICION JUGADOR

        if (that2.scene.isActive("sceneGame2")) {
          xContrario = mensajeParsed.x;
          yContrario = mensajeParsed.y;
          // player2.x = mensajeParsed.x;
          // player2.y = mensajeParsed.y;

          if (jugadorRepresentado == 1) {
            // that2.tweens.add({
            //   targets: player2,
            //   duration: 300,
            //   y: yContrario,
            //   x: xContrario,
            //   ease: 'Linear'
            // });

            player2.x = xContrario;
            player2.y = yContrario;

            estado2 = mensajeParsed.dir;

            if (mensajeParsed.isParado == true) {
              player2.anims.play("turn2", true);
              player2.anims.stop();
            } else {
              if (estado2 == 0) {
                player2.anims.play("left2", true);
              } else {
                player2.anims.play("right2", true);
              }
            }
          } else if (jugadorRepresentado == 2) {
            // that2.tweens.add({
            //   targets: player,
            //   duration: 300,
            //   y: yContrario,
            //   x: xContrario,
            //   ease: 'Linear'
            // });

            player.x = xContrario;
            player.y = yContrario;

            estado = mensajeParsed.dir;

            if (mensajeParsed.isParado == true) {
              try {
                player.anims.play("turn", true);
                player.anims.stop();
              } catch (error) {
                //player no existe
              }
            } else {
              if (estado == 0) {
                try {
                  player.anims.play("left", true);
                } catch (error) {
                  //player no existe
                }
              } else {
                try {
                  player.anims.play("right", true);
                } catch (error) {
                  //player no existe
                }
              }
            }
          }
        }

        //RECIBIMOS QUE EL OTRO JUGADOR ESTA DISPARANDO
      } else if (mensajeParsed.nombre == "disparo") {
        if (that2.scene.isActive("sceneGame2")) {
          if (jugadorRepresentado == 1) {
            that2.disparoSound.play();
            var i = 0;
            while (that2.balas.getChildren()[i].x != -100) {
              //encontramos la bala que usaremos

              i++;
            }
            if (i >= 50 - 1) {
              i = 0;
            }
            that2.balas.getChildren()[i].x = player2.x;
            that2.balas.getChildren()[i].y = player2.y + 25;
            that2.balas.getChildren()[i].setVisible(true);
            that2.balas.getChildren()[i].lanzador = 2;

            if (estado2 == 0) {
              that2.balas.getChildren()[i].anims.play("BalaLeft", true);
              that2.balas.getChildren()[i].body.setVelocityX(-1000);
            } else {
              that2.balas.getChildren()[i].anims.play("BalaRight", true);
              that2.balas.getChildren()[i].body.setVelocityX(1000);
            }
          } else if (jugadorRepresentado == 2) {
            that2.disparoSound.play();
            var i = 0;
            while (that2.balas.getChildren()[i].x != -100) {
              //encontramos la bala que usaremos

              i++;
            }
            if (i >= 50 - 1) {
              i = 0;
            }
            that2.balas.getChildren()[i].x = player.x;
            that2.balas.getChildren()[i].y = player.y + 25;
            that2.balas.getChildren()[i].setVisible(true);
            that2.balas.getChildren()[i].lanzador = 1;

            if (estado == 0) {
              that2.balas.getChildren()[i].anims.play("BalaLeft", true);
              that2.balas.getChildren()[i].body.setVelocityX(-1000);
            } else {
              that2.balas.getChildren()[i].anims.play("BalaRight", true);
              that2.balas.getChildren()[i].body.setVelocityX(1000);
            }
          }
        }

        //RECIBIMOS QUE SE HA CREADO UN ENEMIGO
      } else if (mensajeParsed.nombre == "crearEnem") {
        if (that2.scene.isActive("sceneGame2")) {
          try {
            //EL JUGADOR 2 RECIBE LAS POSICIONES
            new Enemigo(
              that2,
              mensajeParsed.x,
              mensajeParsed.y,
              mensajeParsed.indice
            );
          } catch (error) {
            //error controlado
          }
        }

        // RECIBIMOS LA POSICION DE LOS ENEMIGOS
      } else if (mensajeParsed.nombre == "posEnem") {
        if (that2.scene.isActive("sceneGame2")) {
          for (var i = 0; i < that2.enemigos.getChildren().length; i++) {
            var enem = that2.enemigos.getChildren()[i];

            // if(enem.indice == mensajeParsed.indice){

            //     enem.x= mensajeParsed.x;
            //     enem.y = mensajeParsed.y;

            //   }

            // that2.tweens.add({
            //   targets: enem,
            //   duration: 300,
            //   y: mensajeParsed.y[i],
            //   x: mensajeParsed.x[i],
            //   ease: 'Linear'
            // });

            enem.x = mensajeParsed.x[i];
            enem.y = mensajeParsed.y[i];

            if (mensajeParsed.direccion[i] == 1) {
              enem.anims.play("Enemigoright", true);
            } else if (mensajeParsed.direccion[i] == -1) {
              enem.anims.play("Enemigoleft", true);
            }
          }
        }
      } else if (mensajeParsed.nombre == "caidaEnem") {
        that2.physics.world.removeCollider(that2.colliderEnemPlat);
        that2.physics.world.removeCollider(that2.colliderEnemEscaleras1);
        that2.physics.world.removeCollider(that2.colliderEnemEscaleras2);
        that2.physics.world.removeCollider(that2.colliderEnemEscaleras3);
        colliderEnemigosEliminado = 1;

        that2.time.delayedCall(1600, that2.zombiesPlatF, [], that2);
      } else if (mensajeParsed.nombre == "quitarVida") {
        if (that2.scene.isActive("sceneGame2")) {
          if (jugadorRepresentado == 1) {
            if (player2.vidas == 1) {
              player2.setTint(0xff0000);
              player2.vivo = false;
              player2.setVelocityX(0);
              that2.gameOverSound.play();
              player2.vidas--;
            } else if (player2.vidas <= 0) {
            } else {
              that2.perderUnaVidaSound.play();
              player2.vidas--;
              player2.inmortalidad = true;
            }
            setTimeout(function () {
              player2.inmortalidad = false;
            }, 2000);
          } else if (jugadorRepresentado == 2) {
            if (player.vidas == 1) {
              player.setTint(0xff0000);
              player.vivo = false;
              player.setVelocityX(0);
              that2.gameOverSound.play();
              player.vidas--;
            } else if (player.vidas <= 0) {
            } else {
              that2.perderUnaVidaSound.play();
              player.vidas--;
              player.inmortalidad = true;
            }
            setTimeout(function () {
              player.inmortalidad = false;
            }, 2000);
          }
        }
      } else if (mensajeParsed.nombre == "matarEnem") {
        if (that2.scene.isActive("sceneGame2")) {
          var enem;

          for (var i = 0; i < that2.enemigos.getChildren().length; i++) {
            if (
              that2.enemigos.getChildren()[i].indice == mensajeParsed.indice
            ) {
              enem = that2.enemigos.getChildren()[i];
            }
          }

          try{
            enem.destroy();
          }catch(error){

          }

          that2.balas.getChildren()[mensajeParsed.nBala].matarBala();
        }
      } else if (mensajeParsed.nombre == "pausa") {
        if (that2.scene.isActive("sceneGame2")) {
          //CAMBIAMOS DE ESCENEÇAA
          that2.scene.pause("sceneGame2");
          that2.scene.launch("scenePause2");
          if (listaJugAbierta == true) {
            that2.scene.stop("listaJugadores");
            listaJugAbierta = false;
          }
        }

        //MENSAJE DE CUENTA ATRAS
      } else if (mensajeParsed.nombre == "noPausa") {
        if (that2.scene.isVisible("scenePause2") ) {



          that4.scene.resume("sceneGame2");
          vueltaAlJuego = true;
          that4.scene.stop("scenePause2");

        }

        //SE RE·CONECTA JUGADOR2
      } else if (mensajeParsed.nombre == "conec2") {
        that2.enemigos.clear(true);

        for (var i = 0; i < mensajeParsed.numZombies; i++) {
          //EL JUGADOR 2 RECIBE LAS POSICIONES
          new Enemigo(that2, 0, 0, mensajeParsed.indicesZ[i]);
        }

        player.vidas = mensajeParsed.viditas1;
        player2.vidas = mensajeParsed.viditas2;
        that2.ronda = mensajeParsed.ronditas;
        scoreText.setText("ronda " + that2.ronda);



        
      }
    };

    this.time.addEvent({
      delay: 30,
      callback: function () {
        //ENVIAMOS POSICION JUGADOR WEBSOCKET!
        if (jugadorRepresentado == 1) {
          if (player != undefined) {
            var mensaje = {
              nombre: "posJugador",
              x: player.x,
              y: player.y,
              dir: estado,
              isParado: parado,
            };

            try {
              if (connection.readyState === connection.OPEN) {
                connection.send(JSON.stringify(mensaje));
              }
            } catch (error) {
    
            }
          }
        } else if (jugadorRepresentado == 2) {
          if (player2 != undefined) {
            var mensaje = {
              nombre: "posJugador",
              x: player2.x,
              y: player2.y,
              dir: estado2,
              isParado: parado2,
            };

            try {
              if (connection.readyState === connection.OPEN) {
                connection.send(JSON.stringify(mensaje));
              }
            } catch (error) {
          
            }
          }
        }
      },
      callbackScope: this,
      loop: true,
    });

    //ENVIAMOS LA POSICION DE TODOS LOS ZOMBIES
    this.time.addEvent({
      delay: 30,
      callback: function () {
        if (jugadorRepresentado == 1) {
          var indiceX = 0;
          var indiceY = 0;
          var indiceIndices = 0;
          var indiceDireccion = 0;

          var arrayX = new Array();
          var arrayY = new Array();
          var arrayIndices = new Array();
          var arrayDireccion = new Array();

          for (var i = 0; i < this.enemigos.getChildren().length; i++) {
            var enem = this.enemigos.getChildren()[i];

            arrayX[indiceX] = enem.x;
            indiceX++;
            arrayY[indiceY] = enem.y;
            indiceY++;
            arrayIndices[indiceIndices] = enem.indice;
            indiceIndices++;

            if (enem.body.velocity.x > 0) {
              arrayDireccion[indiceDireccion] = 1;
            } else if (enem.body.velocity.x <= 0) {
              arrayDireccion[indiceDireccion] = -1;
            }

            indiceDireccion++;
          }

          var mensaje = {
            nombre: "posEnem",
            x: arrayX,
            y: arrayY,
            indice: arrayIndices,
            direccion: arrayDireccion,
          };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
          
          }
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 500,
      callback: function () {
        //GET PARA LOS MENSAJES++++++++++++++++++++++++++++++++++++++++++++
        $.ajax({
          url: "http://localhost:8080/conectado",
          //url: "https://lastnightfall-landing.herokuapp.com/conectado",
        }).then(function (data) {
          //EL JUGADOR1 EXISTE
          if (data[0] != null) {
            estaConectadoPlayer1 = true;

            if (estaConectadoPlayer1 != estaConectadoPlayer1aux) {
              if (jugadorRepresentado == 2) {
                alert("Se ha conectado Jugador 1: " + data[0].usuario);
              }
            }
            estaConectadoPlayer1aux = true;

            //EL JUGADOR1 NO EXISTE
          } else {
            estaConectadoPlayer1 = false;

            if (estaConectadoPlayer1 != estaConectadoPlayer1aux) {
              alert("Se ha desconectado Jugador 1, se cierra la partida");

              that2.sound.removeByKey("audioScene1");
              rondaFinal = that2.ronda;
              game.scene.stop("chatScene");
              game.scene.stop("sceneGame2");
              var element = document.getElementById("divChat");
              element.style.display = "none";
              if (listaJugAbierta == true) {
                that2.scene.stop("listaJugadores");
                listaJugAbierta = false;
              }

              game.scene.start("sceneGameOver");
            }
            estaConectadoPlayer1aux = false;
          }

          //EL JUGADOR2 EXISTE

          if (data[1] != null) {
            estaConectadoPlayer2 = true;
            if (jugadorRepresentado == 1) {
              that2.ready = true;
            }
            player2.setVisible(true);
            if (estaConectadoPlayer2 != estaConectadoPlayer2aux) {
              if (jugadorRepresentado == 1) {
                var arrayIndices = new Array();
                var indice = 0;

                for (var i = 0; i < that2.enemigos.getChildren().length; i++) {
                  var enem = that2.enemigos.getChildren()[i];

                  arrayIndices[indice] = enem.indice;
                  indice++;
                }

                var mensaje = {
                  nombre: "conec2",
                  numZombies: that2.enemigos.getChildren().length,
                  viditas1: player.vidas,
                  viditas2: player2.vidas,
                  ronditas: that2.ronda,
                  indicesZ: arrayIndices,
                };

                try {
                  if (connection.readyState === connection.OPEN) {
                    connection.send(JSON.stringify(mensaje));
                  }
                } catch (error) {
             
                }

                alert("Se ha conectado Jugador 2: " + data[1].usuario);
              }
            }
            estaConectadoPlayer2aux = true;

            //EL JUGADOR2 NO EXISTE
          } else {
            estaConectadoPlayer2 = false;
            if (estaConectadoPlayer2 != estaConectadoPlayer2aux) {
              alert("Se ha desconectado Jugador 2");
            }
            estaConectadoPlayer2aux = false;
          }
        }); //FIN GETT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      },
      callbackScope: this,
      loop: true,
    });

    //se añade a la lista de jugadores
    $.ajax({
      method: "PUT",
      url: "http://localhost:8080/conectado",
      // url: "https://lastnightfall-landing.herokuapp.com/conectado",
      data: JSON.stringify({
        usuario: nombreUsuario,
        contrasena: "auxContraseña",
      }),
      processData: false,
      headers: {
        "Content-type": "application/json",
      },
    })
      .done(function (data, textStatus, jqXHR) {
       if (data == 1) {
          //entra como el jugador 1
          jugadorRepresentado = 1;
    
            player2.body.setAllowGravity(false);

           
        } else {
          //entra como el jugador 2
          jugadorRepresentado = 2;

          player.body.setAllowGravity(false);
       
        }
      })
      .fail(function (data, textStatus, jqXHR) {
        alert("Servidor actualmente lleno");
        that2.scene.stop("sceneGame2");
        that2.scene.start("sceneMenu");
      });

    this.bg = this.add.image(config.width / 2, config.height / 2, "fondo");

    this.add.image(250, 50, "icono2");
    this.add.image(250, 125, "icono1");

    // this.sueloMapa =this.physics.add.staticImage(config.width/2, config.height/1.02, 'sueloMapa');
    this.sueloMapa = this.physics.add.staticGroup();
    this.sueloMapa.create(config.width / 2.35, config.height / 1.08, "suelo");
    this.sueloMapa.create(config.width / 2.35, config.height / 1.075, "suelo");
    this.sueloMapa.create(config.width / 2.35, config.height / 1.07, "suelo");

    this.sueloMapa.create(config.width / 1.6, config.height / 1.08, "suelo");
    this.sueloMapa.create(config.width / 1.1, config.height / 1.05, "suelo");
    this.sueloMapa.create(config.width / 2, config.height / 0.99, "sueloMapa");
    this.sueloMapa.create(config.width / 2, config.height / 0.98, "sueloMapa");
    this.sueloMapa.create(config.width / 2, config.height / 0.97, "sueloMapa");
    this.sueloMapa.create(config.width / 2, config.height / 0.96, "sueloMapa");
    this.sueloMapa.create(config.width / 2, config.height / 0.95, "sueloMapa");

    //( The platforms group contains the ground and the 2 ledges we can jump on

    platforms = this.physics.add.staticGroup();
    platformsz = this.physics.add.staticGroup();
    platformsd = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)

    //platforms.create(config.width/2.07, config.height/1.09, 'suelo');
    //SUELO DEL MEDIO
    platforms.create(config.width / 1.48, config.height / 1.6, "sueloMedio2");
    platforms.create(config.width / 2.97, config.height / 1.535, "sueloMedio");
    platforms.create(config.width / 1.22, config.height / 2.72, "sueloTejado");
    platforms.create(config.width / 0.97, config.height / 1.525, "sueloMedio2");
    platforms.create(config.width / 18, config.height / 1.9, "sueloMedio2");

    platforms.create(config.width / 6, config.height / 3.8, "sueloTejado");
    platforms.create(config.width / 4, config.height / 3.8, "sueloTejado");

    //platforms.create(config.width/2.07, config.height/1.09, 'suelo');
    //SUELO DEL MEDIO
    platformsz.create(config.width / 1.48, config.height / 1.6, "sueloMedio2");
    platformsz.create(config.width / 2.97, config.height / 1.535, "sueloMedio");
    platformsz.create(config.width / 1.22, config.height / 2.72, "sueloTejado");
    platformsz.create(
      config.width / 0.97,
      config.height / 1.525,
      "sueloMedio2"
    );
    platformsz.create(config.width / 18, config.height / 1.9, "sueloMedio2");

    platformsz.create(config.width / 6, config.height / 3.8, "sueloTejado");
    platformsz.create(config.width / 4, config.height / 3.8, "sueloTejado");

    //platforms.create(config.width/2.07, config.height/1.09, 'suelo');
    //SUELO DEL MEDIO
    platformsd.create(config.width / 1.48, config.height / 1.6, "sueloMedio2");
    platformsd.create(config.width / 2.97, config.height / 1.535, "sueloMedio");
    platformsd.create(config.width / 1.22, config.height / 2.72, "sueloTejado");
    platformsd.create(
      config.width / 0.97,
      config.height / 1.525,
      "sueloMedio2"
    );
    platformsd.create(config.width / 18, config.height / 1.9, "sueloMedio2");

    platformsd.create(config.width / 6, config.height / 3.8, "sueloTejado");
    platformsd.create(config.width / 4, config.height / 3.8, "sueloTejado");

    //GRUPO DE LAS PRIMERAS ESCALERAS
    escaleras = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escalerasz = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escalerasd = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escaleras1z = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escaleras1d = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escaleras2z = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    escaleras2d = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    //Phaser.Actions.PlaceOnLine(escaleras.getChildren(), new Phaser.Geom.Line(config.width/8.34, config.height/1.13,config.width/4.04,config.height/1.550));
    Phaser.Actions.PlaceOnLine(
      escaleras.getChildren(),
      new Phaser.Geom.Line(
        config.width / 20,
        config.height / 1.06,
        config.width / 3.6,
        config.height / 1.54
      )
    );
    escaleras.refresh();

    //GRUPO ESCALERAS A LA PLANTA SUPERIOR
    escaleras1 = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 500,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras1.getChildren(),
      new Phaser.Geom.Line(
        config.width / 2.7,
        config.height / 1.54,
        config.width / 1.7,
        config.height / 2.7
      )
    );
    escaleras1.refresh();

    //GRUPO ESCALERAS PLANTA DE ABAJO
    escaleras2 = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 400,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras2.getChildren(),
      new Phaser.Geom.Line(
        config.width / 1.4,
        config.height / 1.08,
        config.width / 1.07,
        config.height / 1.525
      )
    );
    escaleras2.refresh();

    //GRUPO DE LAS PRIMERAS ESCALERAS PARA ZOMBIES
    escalerasd = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    //Phaser.Actions.PlaceOnLine(escaleras.getChildren(), new Phaser.Geom.Line(config.width/8.34, config.height/1.13,config.width/4.04,config.height/1.550));
    Phaser.Actions.PlaceOnLine(
      escalerasd.getChildren(),
      new Phaser.Geom.Line(
        config.width / 20,
        config.height / 1.06,
        config.width / 3.6,
        config.height / 1.54
      )
    );
    escalerasd.refresh();

    //GRUPO ESCALERAS A LA PLANTA SUPERIOR PARA ZOMBIES
    escaleras1d = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 500,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras1d.getChildren(),
      new Phaser.Geom.Line(
        config.width / 2.7,
        config.height / 1.54,
        config.width / 1.7,
        config.height / 2.7
      )
    );
    escaleras1d.refresh();

    //GRUPO ESCALERAS PLANTA DE ABAJO PARA ZOMBIES
    escaleras2d = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 400,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras2d.getChildren(),
      new Phaser.Geom.Line(
        config.width / 1.4,
        config.height / 1.08,
        config.width / 1.07,
        config.height / 1.525
      )
    );
    escaleras2d.refresh();
    //GRUPO DE LAS PRIMERAS ESCALERAS PARA ZOMBIES
    escalerasz = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 300,
    });
    //Phaser.Actions.PlaceOnLine(escaleras.getChildren(), new Phaser.Geom.Line(config.width/8.34, config.height/1.13,config.width/4.04,config.height/1.550));
    Phaser.Actions.PlaceOnLine(
      escalerasz.getChildren(),
      new Phaser.Geom.Line(
        config.width / 20,
        config.height / 1.06,
        config.width / 3.6,
        config.height / 1.54
      )
    );
    escalerasz.refresh();

    //GRUPO ESCALERAS A LA PLANTA SUPERIOR PARA ZOMBIES
    escaleras1z = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 500,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras1z.getChildren(),
      new Phaser.Geom.Line(
        config.width / 2.7,
        config.height / 1.54,
        config.width / 1.7,
        config.height / 2.7
      )
    );
    escaleras1z.refresh();

    //GRUPO ESCALERAS PLANTA DE ABAJO PARA ZOMBIES
    escaleras2z = this.physics.add.staticGroup({
      key: "tejado",
      frameQuantity: 400,
    });
    Phaser.Actions.PlaceOnLine(
      escaleras2z.getChildren(),
      new Phaser.Geom.Line(
        config.width / 1.4,
        config.height / 1.08,
        config.width / 1.07,
        config.height / 1.525
      )
    );
    escaleras2z.refresh();

    // JUGADORES
    player = this.physics.add.sprite(config.width / 2.1, 700, "dude");
    player2 = this.physics.add.sprite(config.width / 2.1, 700, "dude");
    player2.setVisible(false);

    //jugador1

    player.setCollideWorldBounds(true);
    player.vidas = 3;
    player.vivo = true;
    player.inmortalidad = false;
    //jugador2

    player2.setCollideWorldBounds(true);
    player2.vidas = 3;
    player2.vivo = true;
    player2.inmortalidad = false;

    //BOTON PAUSE
    this.gameButtonPause = this.add
      .sprite(
        config.width - config.height * 0.06,
        config.height * 0.05,
        "botonPausa"
      )
      .setInteractive();

    this.gameButtonPause.on(
      "pointerdown",
      function (pointer) {
        //ENVIAMOS QUE HEMOS PAUSAO
        var mensaje = { nombre: "pausa" };

        try {
          if (connection.readyState === connection.OPEN) {
            connection.send(JSON.stringify(mensaje));
          }
        } catch (error) {
       
        }

        //CAMBIAMOS DE ESCENEÇAA
        this.scene.pause("sceneGame2");
        this.scene.launch("scenePause2");
        if (listaJugAbierta == true) {
          this.scene.stop("listaJugadores");
          listaJugAbierta = false;
        }
      }.bind(this)
    );

    speed = Phaser.Math.GetSpeed(300, 1);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("mainchizq", {
        start: 0,
        end: 16,
      }),
      frameRate: 27,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("mainch", { start: 0, end: 16 }),
      frameRate: 27,
      repeat: -1,
    });
    player.anims.play("right");

    this.anims.create({
      key: "left2",
      frames: this.anims.generateFrameNumbers("mainchizq2", {
        start: 0,
        end: 16,
      }),
      frameRate: 27,
      repeat: -1,
    });

    this.anims.create({
      key: "right2",
      frames: this.anims.generateFrameNumbers("mainch2", { start: 0, end: 16 }),
      frameRate: 27,
      repeat: -1,
    });
    player2.anims.play("right2");

    this.anims.create({
      key: "Enemigoleft",
      frames: this.anims.generateFrameNumbers("zombieLeft"),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "Enemigoright",
      frames: this.anims.generateFrameNumbers("zombieRight"),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "BalaLeft",
      frames: this.anims.generateFrameNumbers("balaLeft"),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "BalaRight",
      frames: this.anims.generateFrameNumbers("balaRight"),
      frameRate: 5,
      repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

    //VIDAS
    vidasText2 = this.add.bitmapText(16, 16, "fuentes3", "vidas        : ", 40);
    vidasText = this.add.bitmapText(16, 76, "fuentes3", "vidas        : ", 40);

    //incluimjos el texto que contiene el estado del servidor
    textEstadoServidor = this.add.bitmapText(
      0,
      config.height - 30,
      "fuentes3",
      "",
      15
    );

    //  The score

    scoreText = this.add.bitmapText(
      config.width / 2.2,
      16,
      "fuentes3",
      "ronda 0",
      40
    );

    //CUENTA ATRAS TEXTO
    if (jugadorRepresentado == 1) {
      this.ready = false; //indica que el jugador ha tenido tiempo de prepararse
    }
    this.indiceEnem = 0;
    this.enemigosSpawn = false;
    cuentaAtras = this.add.bitmapText(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      "fuentes3",
      "5",
      100
    );
    if (jugadorRepresentado == 2) {
      cuentaAtras.setText("");
    }
    this.contadorTimeMedido = false;
    this.inicioContador = 0;
    this.contadorEnEjecucion = false;
    this.tiempo = 0;
    //tiempo en el que empiezan a aparecer los enemigos
    this.tiempoEnemigo = 99999999;

    //COLLIDERS DE LAS PLATAFORMAS CON EL JUGADOR 1
    this.colliderPlats = this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, this.sueloMapa);

    this.colliderEscaleras = this.physics.add.collider(player, escaleras);
    this.colliderEscaleras1 = this.physics.add.collider(player, escaleras1);
    this.colliderEscaleras2 = this.physics.add.collider(player, escaleras2);
    this.physics.add.collider(player, tejas);
    this.physics.add.collider(player, tejas2);

    //COLLIDERS DE LAS PLATAFORMAS CON EL JUGADOR 2
    this.colliderPlats2 = this.physics.add.collider(player2, platformsd);
    this.physics.add.collider(player2, this.sueloMapa);

    this.colliderEscaleras_2 = this.physics.add.collider(player2, escalerasd);
    this.colliderEscaleras1_2 = this.physics.add.collider(player2, escaleras1d);
    this.colliderEscaleras2_2 = this.physics.add.collider(player2, escaleras2d);
    this.physics.add.collider(player2, tejas);
    this.physics.add.collider(player2, tejas2);

    //GRUPO DE LAS BALAS
    this.balas = this.add.group();
    for (var i = 0; i < 50; i++) {
      //inicializamos 50 balas

      this.balas.getChildren()[i] = new Bala(this, i);
    }

    //COLLIDER DE LOS ENEMIGOS
    this.colliderEnemPlat = this.physics.add.collider(this.enemigos, platforms);
    this.physics.add.collider(this.enemigos, this.sueloMapa);
    this.colliderEnemEscaleras1 = this.physics.add.collider(
      this.enemigos,
      escaleras
    );
    this.colliderEnemEscaleras2 = this.physics.add.collider(
      this.enemigos,
      escaleras1
    );
    this.colliderEnemEscaleras3 = this.physics.add.collider(
      this.enemigos,
      escaleras2
    );
    this.colliderEnemTejas1 = this.physics.add.collider(this.enemigos, tejas);
    this.colliderEnemTejas2 = this.physics.add.collider(this.enemigos, tejas2);
    //  this.physics.add.collider(this.enemigos);//enemigos chocan con enemigos

    //COLLIDERS MAS GENERALES
    this.physics.add.collider(
      this.balas,
      this.enemigos,
      this.matarEnemigos,
      null,
      this
    ); //balas chocan con enemigos
    this.physics.add.overlap(
      player,
      this.enemigos,
      this.quitarVida,
      null,
      this
    ); //jugador choca con enemigo
    this.physics.add.overlap(
      player2,
      this.enemigos,
      this.quitarVida,
      null,
      this
    ); //jugador2 choca con enemigo

    //DISPARO JUGADOR ESPACIO

    this.input.keyboard.on("keydown_SPACE", () => {
      if (jugadorRepresentado == 1) {
        //pulsar el boton de disparo

        if (player.vivo) {
          this.disparoSound.play();
          var i = 0;
          while (this.balas.getChildren()[i].x != -100) {
            //encontramos la bala que usaremos

            i++;
          }
          if (i >= 50 - 1) {
            i = 0;
          }
          this.balas.getChildren()[i].x = player.x;
          this.balas.getChildren()[i].y = player.y + 25;
          this.balas.getChildren()[i].setVisible(true);
          this.balas.getChildren()[i].lanzador = 1;

          if (estado == 0) {
            this.balas.getChildren()[i].anims.play("BalaLeft", true);
            this.balas.getChildren()[i].body.setVelocityX(-1000);
          } else {
            this.balas.getChildren()[i].anims.play("BalaRight", true);
            this.balas.getChildren()[i].body.setVelocityX(1000);
          }

          //ENVIAMOS A OTRO CLIENTE QUE HEMOS DIÑSPARADO
          var mensaje = { nombre: "disparo" };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
           
          }
        }
      } else if (jugadorRepresentado == 2) {
        //pulsar el boton de disparo

        if (player2.vivo) {
          this.disparoSound.play();
          var i = 0;
          while (this.balas.getChildren()[i].x != -100) {
            //encontramos la bala que usaremos

            i++;
          }
          if (i >= 50 - 1) {
            i = 0;
          }
          this.balas.getChildren()[i].x = player2.x;
          this.balas.getChildren()[i].y = player2.y + 25;
          this.balas.getChildren()[i].setVisible(true);
          this.balas.getChildren()[i].lanzador = 2;

          if (estado2 == 0) {
            this.balas.getChildren()[i].anims.play("BalaLeft", true);
            this.balas.getChildren()[i].body.setVelocityX(-1000);
          } else {
            this.balas.getChildren()[i].anims.play("BalaRight", true);
            this.balas.getChildren()[i].body.setVelocityX(1000);
          }

          //ENVIAMOS A OTRO CLIENTE QUE HEMOS DIÑSPARADO
          var mensaje = { nombre: "disparo" };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
           
          }
        }
      }
    });

    //Deteccion de teclas del movimiento del jugador 2
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    var esp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //TOCAR TAB PARA ABRIR LISTAJUGADORES

    this.input.keyboard.on("keydown_CTRL", () => {
      if (listaJugAbierta == false) {
        this.scene.launch("listaJugadores");
        listaJugAbierta = true;
      } else if (listaJugAbierta == true) {
        this.scene.stop("listaJugadores");
        listaJugAbierta = false;
      }
    });

    //TOCAR ESC PARA ABRIR EL CHAT

    this.input.keyboard.on("keydown_ESC", () => {
      if (chatAbierto == false) {
        this.scene.launch("chatScene");
        chatAbierto = true;

        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      } else if (chatAbierto == true) {
        this.scene.stop("chatScene");
        chatAbierto = false;
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      }
    });

    this.servidorEstado = false;
  }

  update(time, delta) {
    this.tiempo += delta;

    //ACTUALIZAR VIDAS
    vidasText.setText("vidas   : " + player.vidas);
    vidasText2.setText("vidas   : " + player2.vidas);

    //CONDICION DE DERROTA
    if (!player.vivo && !player2.vivo) {
      this.sound.removeByKey("audioScene1");
      rondaFinal = this.ronda;
      game.scene.stop("chatScene");
      game.scene.stop("sceneGame2");
      var element = document.getElementById("divChat");
      element.style.display = "none";
      if (listaJugAbierta == true) {
        this.scene.stop("listaJugadores");
        listaJugAbierta = false;
      }

      game.scene.start("sceneGameOver");
    }

    //AJUSTAR CUENTA ATRAS
    //ajustamos el tiempo del temporizador para reiniciarse si viene del menu de pausa
    if (vueltaAlJuego == true && this.contadorEnEjecucion) {
      this.reiniciarContador(this);
      vueltaAlJuego = false;
    }

    if (jugadorRepresentado == 1) {
      if (!this.contadorTimeMedido && this.ready) {
        //ajusta el momento en el que empieza la escena
        this.inicioContador = this.tiempo;
        this.contadorTimeMedido = true;
      }

      if (!this.enemigosSpawn && this.ready) {
        this.contadorEnEjecucion = true;
        this.cuentaAtrasFunc(
          5,
          cuentaAtras,
          this.tiempo,
          this.inicioContador,
          delta,
          this
        ); //crea la cuenta atras que empieza en el numero 5 introducido en la funcion
      }
    }

    if (
      this.tiempo - this.tiempoEnemigo >= 15000 &&
      this.tiempo - this.tiempoEnemigo <= 15000 + delta &&
      this.enemigosSpawn
    ) {
      //la ronda ha acabado
      this.enemigosSpawn = false;
      setTimeout(this.reiniciarContador, 4000, this);
    }

    //UPDATE BALAS
    for (var i = 0; i < this.balas.getChildren().length; i++) {
      var balita = this.balas.getChildren()[i];
      balita.update();
    }

    //EL JUGADOR 1 CONTROLA LA CAIDA DE LOS ZOMBIES
    if (jugadorRepresentado == 1) {
      //UPDATE ENEMIGOS

      for (var i = 0; i < this.enemigos.getChildren().length; i++) {
        var enem = this.enemigos.getChildren()[i];
        enem.update(player.x, player2.x, player.vivo, player2.vivo);
      }

      //ENEMIGOS BAJAN PLATAFORMAS
      var probabilidadBajarEscaleras = 0.0017;
      var bajanEscaleras = Math.random() * (1 - 0) + 0; //numero aleatorio del 0 al 1

      if (
        bajanEscaleras < probabilidadBajarEscaleras &&
        colliderEnemigosEliminado == 0
      ) {
        this.physics.world.removeCollider(this.colliderEnemPlat);
        this.physics.world.removeCollider(this.colliderEnemEscaleras1);
        this.physics.world.removeCollider(this.colliderEnemEscaleras2);
        this.physics.world.removeCollider(this.colliderEnemEscaleras3);
        colliderEnemigosEliminado = 1;

        this.time.delayedCall(1600, this.zombiesPlatF, [], this);
      }
    }

    //APARICION ENEMIGOS
    var tiempoEntreZombies = 5000 / this.ronda;

    if (
      this.enemigosSpawn &&
      this.tiempo - this.tiempoEnemigo >= 0 &&
      (this.tiempo - this.tiempoEnemigo) % tiempoEntreZombies < delta
    ) {
      new Enemigo(
        this,
        this.sys.game.config.width,
        this.sys.game.config.height / 2,
        this.indiceEnem
      );
      //ENVIAMOS QUE SE HA CREADO NUEVO ENEMIGO
      var mensaje = {
        nombre: "crearEnem",
        x: this.sys.game.config.width,
        y: this.sys.game.config.height / 2,
        indice: this.indiceEnem,
      };

      try {
        if (connection.readyState === connection.OPEN) {
          connection.send(JSON.stringify(mensaje));
        }
      } catch (error) {
       
      }

      this.indiceEnem++;

      new Enemigo(this, 0, 0, this.indiceEnem);
      var mensaje = {
        nombre: "crearEnem",
        x: 0,
        y: 0,
        indice: this.indiceEnem,
      };

      try {
        if (connection.readyState === connection.OPEN) {
          connection.send(JSON.stringify(mensaje));
        }
      } catch (error) {
       
      }

      this.indiceEnem++;
    }

    // EScLERAS POR LA DERECHA JUGADOR 1
    this.colliderEscalerasEliminadoAux = 0;
    for (var i = 0; i < escaleras.getChildren().length; i++) {
      var enem = escaleras.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player.body.touching.left &&
          player.vivo) ||
        (enem.body.touching.right && player.body.touching.top && player.vivo)
      ) {
        this.colliderEscalerasEliminadoAux = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux == 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras.getChildren().length; i++) {
        var enem = escaleras.getChildren()[i];

        enem.disableBody(true, false);
      }
    }
    // EScLERAS1 POR LA DERECHA JUGADOR 1
    this.colliderEscalerasEliminadoAux = 0;
    for (var i = 0; i < escaleras1.getChildren().length; i++) {
      var enem = escaleras1.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player.body.touching.left &&
          player.vivo) ||
        (enem.body.touching.right && player.body.touching.top && player.vivo)
      ) {
        this.colliderEscalerasEliminadoAux = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux == 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras1.getChildren().length; i++) {
        var enem = escaleras1.getChildren()[i];

        enem.disableBody(true, false);
      }
    }

    // EScLERAS2 POR LA DERECHA JUGADOR 1
    this.colliderEscalerasEliminadoAux = 0;
    for (var i = 0; i < escaleras2.getChildren().length; i++) {
      var enem = escaleras2.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player.body.touching.left &&
          player.vivo) ||
        (enem.body.touching.right && player.body.touching.top && player.vivo)
      ) {
        this.colliderEscalerasEliminadoAux = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux === 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras2.getChildren().length; i++) {
        var enem = escaleras2.getChildren()[i];

        enem.disableBody(true, false);
      }
    }

    //CONTROLES JUGADOR WASD
    //Pulsar tecla izquierda
    if (Phaser.Input.Keyboard.DownDuration(this.a)) {
      if (jugadorRepresentado == 1 && player.vivo) {
        player.setVelocityX(-260);

        player.anims.play("left", true);

        estado = 0;
        parado = false;
      } else if (jugadorRepresentado == 2 && player2.vivo) {
        player2.setVelocityX(-260);

        player2.anims.play("left2", true);

        estado2 = 0;
        parado2 = false;
      }
    }
    //Pulsar tecla derecha
    else if (Phaser.Input.Keyboard.DownDuration(this.d)) {
      if (jugadorRepresentado == 1 && player.vivo) {
        player.setVelocityX(260);

        player.anims.play("right", true);

        estado = 1;
        parado = false;
      } else if (jugadorRepresentado == 2 && player2.vivo) {
        player2.setVelocityX(260);

        player2.anims.play("right2", true);

        estado2 = 1;
        parado2 = false;
      }
    }
    //Pulsar ninguna tecla
    else if (player.vivo || player2.vivo) {
      if (player.vivo) {
        if (jugadorRepresentado == 1) {
          try {
            player.setVelocityX(0);
            player.anims.play("turn", true);
            parado = true;
          } catch (error) {
            //pñlayer no existe
          }
        }
      }

      if (player2.vivo) {
        if (jugadorRepresentado == 2) {
          try {
            player2.setVelocityX(0);
            player2.anims.play("turn", true);
            parado2 = true;
          } catch (error) {
            //pñlayer no existe
          }
        }
      }
    }

    if (jugadorRepresentado == 1) {
      if (player.vivo) {
        //Pulsar tecla arriba
        if (
          Phaser.Input.Keyboard.DownDuration(this.w) &&
          player.body.touching.down
        ) {
          player.setVelocityY(-400);
          player.anims.stop();
        }

        //Pulsar tecla abajo(eliminar collider)
        if (
          Phaser.Input.Keyboard.DownDuration(this.s) &&
          player.body.touching.down
        ) {
          //este for sirve paara eliminar los colliders
          for (var i = 0; i < platforms.getChildren().length; i++) {
            var enem = platforms.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escaleras.getChildren().length; i++) {
            var enem = escaleras.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escaleras1.getChildren().length; i++) {
            var enem = escaleras1.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escaleras2.getChildren().length; i++) {
            var enem = escaleras2.getChildren()[i];

            enem.disableBody(true, false);
          }
        } // FIN PULSAR TECLA ABAJO
      } // FIN PULSAR TECLA ABAJO mas o menos
    } else if (jugadorRepresentado == 2) {
      if (player2.vivo) {
        //Pulsar tecla arriba
        if (
          Phaser.Input.Keyboard.DownDuration(this.w) &&
          player2.body.touching.down
        ) {
          player2.setVelocityY(-400);
          player.anims.stop();
        }

        //Pulsar tecla abajo(eliminar collider)
        if (
          Phaser.Input.Keyboard.DownDuration(this.s) &&
          player2.body.touching.down
        ) {
          //este for sirve paara eliminar los colliders
          for (var i = 0; i < platformsd.getChildren().length; i++) {
            var enem = platformsd.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escalerasd.getChildren().length; i++) {
            var enem = escalerasd.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escaleras1d.getChildren().length; i++) {
            var enem = escaleras1d.getChildren()[i];

            enem.disableBody(true, false);
          }

          //este for sirve paara eliminar los colliders
          for (var i = 0; i < escaleras2d.getChildren().length; i++) {
            var enem = escaleras2d.getChildren()[i];

            enem.disableBody(true, false);
          }
        } // FIN PULSAR TECLA ABAJO
      } // FIN PULSAR TECLA ABAJO mas o menos
    }

    // EScLERAS POR LA DERECHA  JUGADOR 2
    this.colliderEscalerasEliminadoAux2 = 0;
    for (var i = 0; i < escalerasd.getChildren().length; i++) {
      var enem = escalerasd.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player2.body.touching.left &&
          player2.vivo) ||
        (enem.body.touching.right && player2.body.touching.top && player2.vivo)
      ) {
        this.colliderEscalerasEliminadoAux2 = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux2 == 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escalerasd.getChildren().length; i++) {
        var enem = escalerasd.getChildren()[i];

        enem.disableBody(true, false);
      }
    }
    // EScLERAS1 POR LA DERECHA JUGADOR 2
    this.colliderEscalerasEliminadoAux2 = 0;
    for (var i = 0; i < escaleras1d.getChildren().length; i++) {
      var enem = escaleras1d.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player2.body.touching.left &&
          player2.vivo) ||
        (enem.body.touching.right && player2.body.touching.top && player2.vivo)
      ) {
        this.colliderEscalerasEliminadoAux2 = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux2 == 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras1d.getChildren().length; i++) {
        var enem = escaleras1d.getChildren()[i];

        enem.disableBody(true, false);
      }
    }

    // EScLERAS2 POR LA DERECHA JUGADOR2
    this.colliderEscalerasEliminadoAux2 = 0;
    for (var i = 0; i < escaleras2d.getChildren().length; i++) {
      var enem = escaleras2d.getChildren()[i];

      if (
        (enem.body.touching.right &&
          player2.body.touching.left &&
          player2.vivo) ||
        (enem.body.touching.right && player2.body.touching.top && player2.vivo)
      ) {
        this.colliderEscalerasEliminadoAux2 = 1;
      }
    }
    if (this.colliderEscalerasEliminadoAux2 == 1) {
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras2d.getChildren().length; i++) {
        var enem = escaleras2d.getChildren()[i];

        enem.disableBody(true, false);
      }
    }

    //SIRVE PARA CREAR DE NUEVO LOS COLLIDER SI SE ELIMINAN Y YA NO ESTAS TOCANDO (false si no estas tocando)
    //  overlapPlataformasBool = false;
    // overlapEscalerasBool = false;

    //OVERLAP CON PLATAFORMAS????????????????????????????????????????????????????
    for (var i = 0; i < platforms.getChildren().length; i++) {
      var escalerillas = platforms.getChildren()[i];

      if (checkOverlap(player, escalerillas)) {
        this.auxoverlapchoca = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS????????????????????????????????????????????????????
    for (var i = 0; i < escaleras.getChildren().length; i++) {
      var escalerillas = escaleras.getChildren()[i];

      if (checkOverlap(player, escalerillas)) {
        this.auxoverlapchoca = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS1????????????????????????????????????????????????????
    for (var i = 0; i < escaleras1.getChildren().length; i++) {
      var escalerillas = escaleras1.getChildren()[i];

      if (checkOverlap(player, escalerillas)) {
        this.auxoverlapchoca = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS2????????????????????????????????????????????????????
    for (var i = 0; i < escaleras2.getChildren().length; i++) {
      var escalerillas = escaleras2.getChildren()[i];

      if (checkOverlap(player, escalerillas)) {
        this.auxoverlapchoca = true;
      }
    } //fin for

    //CREAMOS COLISIONES DE NUEVO++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (this.auxoverlapchoca === true) {
      //
    } else {
      //EN ESTOS FOR ESTAMOS CREANDO LAS COLISIONES (EN VERDAD SE ACTIVA EL BODY)
      for (var i = 0; i < platforms.getChildren().length; i++) {
        var enem = platforms.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras.getChildren().length; i++) {
        var enem = escaleras.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras1.getChildren().length; i++) {
        var enem = escaleras1.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras2.getChildren().length; i++) {
        var enem = escaleras2.getChildren()[i];

        enem.enableBody(false, false);
      }
    } //FIN ELSE

    this.auxoverlapchoca = false;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //SIRVE PARA CREAR DE NUEVO LOS COLLIDER SI SE ELIMINAN Y YA NO ESTAS TOCANDO (false si no estas tocando)
    //  overlapPlataformasBool = false;
    // overlapEscalerasBool = false;

    //OVERLAP CON PLATAFORMAS????????????????????????????????????????????????????
    for (var i = 0; i < platformsd.getChildren().length; i++) {
      var escalerillas = platformsd.getChildren()[i];

      if (checkOverlap(player2, escalerillas)) {
        this.auxoverlapchoca2 = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS????????????????????????????????????????????????????
    for (var i = 0; i < escalerasd.getChildren().length; i++) {
      var escalerillas = escalerasd.getChildren()[i];

      if (checkOverlap(player2, escalerillas)) {
        this.auxoverlapchoca2 = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS1????????????????????????????????????????????????????
    for (var i = 0; i < escaleras1d.getChildren().length; i++) {
      var escalerillas = escaleras1d.getChildren()[i];

      if (checkOverlap(player2, escalerillas)) {
        this.auxoverlapchoca2 = true;
      }
    } //fin for
    //OVERLAP CON ESCALERAS2????????????????????????????????????????????????????
    for (var i = 0; i < escaleras2d.getChildren().length; i++) {
      var escalerillas = escaleras2d.getChildren()[i];

      if (checkOverlap(player2, escalerillas)) {
        this.auxoverlapchoca2 = true;
      }
    } //fin for

    //CREAMOS COLISIONES DE NUEVO++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (this.auxoverlapchoca2 === true) {
      //
    } else {
      //EN ESTOS FOR ESTAMOS CREANDO LAS COLISIONES (EN VERDAD SE ACTIVA EL BODY)
      for (var i = 0; i < platformsd.getChildren().length; i++) {
        var enem = platformsd.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escalerasd.getChildren().length; i++) {
        var enem = escalerasd.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras1d.getChildren().length; i++) {
        var enem = escaleras1d.getChildren()[i];

        enem.enableBody(false, false);
      }
      //este for sirve paara eliminar los colliders
      for (var i = 0; i < escaleras2d.getChildren().length; i++) {
        var enem = escaleras2d.getChildren()[i];

        enem.enableBody(false, false);
      }
    } //FIN ELSE

    this.auxoverlapchoca2 = false;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  } //FIN UPDATE

  matarEnemigos(bala, enemigo) {
    if (jugadorRepresentado == 1 && bala.lanzador == 1) {
      var mensaje = {
        nombre: "matarEnem",
        indice: enemigo.indice,
        nBala: bala.indice,
      };
      bala.matarBala();
      enemigo.destroy();

      try {
        if (connection.readyState === connection.OPEN) {
          connection.send(JSON.stringify(mensaje));
        }
      } catch (error) {
       
      }
    }

    if (jugadorRepresentado == 2 && bala.lanzador == 2) {
      var mensaje = {
        nombre: "matarEnem",
        indice: enemigo.indice,
        nBala: bala.indice,
      };
      bala.matarBala();
      enemigo.destroy();

      try {
        if (connection.readyState === connection.OPEN) {
          connection.send(JSON.stringify(mensaje));
        }
      } catch (error) {
       
      }
    }
  }
  quitarVida(_player) {
    if (!_player.inmortalidad) {
      //si no es considerado inmortal (conrol realizado para respetetar un tiempo entre daño y daño)

      if (jugadorRepresentado == 1) {
        if (_player == player) {
          if (_player.vidas == 1) {
            _player.setTint(0xff0000);
            _player.vivo = false;
            this.gameOverSound.play();
            _player.vidas--;
          } else if (_player.vidas <= 0) {
          } else {
            this.perderUnaVidaSound.play();
            _player.vidas--;
            _player.inmortalidad = true;
          }
          setTimeout(function () {
            _player.inmortalidad = false;
          }, 2000);

          var mensaje = { nombre: "quitarVida" };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
          
          }
        }
      }

      if (jugadorRepresentado == 2) {
        if (_player == player2) {
          if (_player.vidas == 1) {
            _player.setTint(0xff0000);
            _player.vivo = false;
            this.gameOverSound.play();
            _player.vidas--;
          } else if (_player.vidas <= 0) {
          } else {
            this.perderUnaVidaSound.play();
            _player.vidas--;
            _player.inmortalidad = true;
          }
          setTimeout(function () {
            _player.inmortalidad = false;
          }, 2000);

          var mensaje = { nombre: "quitarVida" };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
      
          }
        }
      }
    }
  }

  cuentaAtrasFunc(num, cuentaAtras, tiempo, inicioContador, delta, scene) {
    if (jugadorRepresentado == 1) {
      num++;

      for (var i = 0; i <= num; i++) {
        if (
          tiempo > i * 1000 + inicioContador - delta / 2 &&
          tiempo < i * 1000 + inicioContador + delta / 2
        ) {
          if (num - i - 1 == 0) {
            //la cuenta atras ya ha terminado
            cuentaAtras.setText("");
            scene.enemigosSpawn = true; //se activa que emiecen a aparecer enemigos
            scene.tiempoEnemigo = tiempo; //se guarda el tiempo en el que se activa su aparicion
            if (jugadorRepresentado == 1) {
              scene.ready = false; //El jugador al incio de la siguiente ronda no estara preparado
            }

            this.contadorEnEjecucion = false; //finaliza la cuenta atras

            cuentaAtras.setText("");
            scene.ronda++; //actualiza la ronda
            scoreText.setText("ronda " + this.ronda);
          } else {
            cuentaAtras.setText(num - i - 1);
          }

          //ENVIAMOS A OTRO CLIENTE POR DONDE VA LA CUENTA
          var mensaje = {
            nombre: "cuentaAtras",
            t: num - i - 1,
            ronda: this.ronda,
          };

          try {
            if (connection.readyState === connection.OPEN) {
              connection.send(JSON.stringify(mensaje));
            }
          } catch (error) {
           
          }
        }
      }
    }
  }

  reiniciarContador(scene) {
    scene.contadorTimeMedido = false;
    if (jugadorRepresentado == 1) {
      scene.ready = true;
    }
  }

  zombiesPlatF() {
    if (colliderEnemigosEliminado === 1) {
      this.colliderEnemPlat = this.physics.add.collider(
        this.enemigos,
        platformsz
      );
      this.physics.world.removeCollider(this.colliderEnemEscaleras1);
      this.physics.world.removeCollider(this.colliderEnemEscaleras2);
      this.physics.world.removeCollider(this.colliderEnemEscaleras3);
      this.colliderEnemEscaleras1 = this.physics.add.collider(
        this.enemigos,
        escalerasz
      );
      this.colliderEnemEscaleras2 = this.physics.add.collider(
        this.enemigos,
        escaleras1z
      );
      this.colliderEnemEscaleras3 = this.physics.add.collider(
        this.enemigos,
        escaleras2z
      );

      colliderEnemigosEliminado = 0;
    }
  }

  centerButton(gameObject, offsetw = 0, offseth = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2 - offsetw * 100,
        config.height / 2 - offseth * 100,
        config.width,
        config.height
      )
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}

function servidor() {
  //Actualiza el estado del servidor
  $.ajax({
    url: "http://localhost:8080/juego",
    //url: "https://lastnightfall-landing.herokuapp.com/juego",
  })
    .then(function (data) {
      if (data == true) {
        textEstadoServidor.setText("Servidor conectado");
        //that2.textoEstadoServidor.addColor("008F39",20);
        that2.servidorEstado = true;
      }
    })
    .fail(function (data, textStatus, jqXHR) {
      textEstadoServidor.setText("Servidor desconectado");
      //that2.textoEstadoServidor.addColor("FF000",20);
    });
}
