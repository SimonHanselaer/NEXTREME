import React, {Component} from "react";
import withAuthentication from "../components/auth/WithAuthentication";
import { observer, inject } from "mobx-react";
import {useParams, useHistory} from "react-router-dom";

import Phaser from "phaser";
import KortrijkImage from "../assets/img/Kortrijk.jpg";
import item1 from "../assets/img/item1.jpg";
import item2 from "../assets/img/item2.png";
import item3 from "../assets/img/item3.png";


const Challenge4 = () => {
  let history = useHistory();

    let config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: {
        preload: preload,
        init: init,
        create: create
      },
      backgroundColor: '#FFF'
    }

    const game = new Phaser.Game(config);

  function preload() {
    console.log('preload');
    this.load.image(`kortrijk`, KortrijkImage);
    this.load.image(`item1`, item1);
    this.load.image(`item2`, item1);
    this.load.image(`item3`, item1);
    this.load.image(`item4`, item2);
    this.load.image(`item5`, item2);
    this.load.image(`item6`, item2);
    this.load.image(`item7`, item3);
    this.load.image(`item8`, item3);
    this.load.image(`item9`, item3);
  }

  function init() {
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;
    this.score = 0;
  }

  function create() {
    //Load in City
    this.city = this.add.image(game.config.width / 2, 100, 'kortrijk').setScale(.06);

    //Load in items
    this.itemX = 20;

    for (let i = 1;i < 10;i ++) {
      this.itemHeight = this.screenHeight - 200
      this.item = this.add.image(this.itemX, this.itemHeight, `item${i}`).setScale(.1).setInteractive(); 
      this.input.setDraggable(this.item);
      this.itemX += 80;
    }

    //Set dropzone
    const zone = this.add.zone(this.screenWidth / 2, 100, 280, 200).setRectangleDropZone(280, 200);
    zone.setOrigin(.5);

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    //Listen for input
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.setScale(.2);

      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      gameObject.setScale(.1);
    });

    this.input.on('drop', (pointer, gameObject, dropzone) => {

      if (gameObject.texture.key[gameObject.texture.key.length - 1] < 4) {
        this.score += 1;
        this.scoreText.setText(`score: ${this.score}`);

        if (this.score === 3) {
          this.sys.game.destroy(true);
          history.push("/");
        }
      }

      gameObject.setScale(.1);

      gameObject.x = dropzone.x + (dropzone.width / 2);
      gameObject.y = dropzone.y + (dropzone.height / 2);

      gameObject.input.enabled = false;
      gameObject.destroy();
    });

    this.scoreText = this.add.text(this.screenWidth / 2, 230, 'score: 0', {
      fontsize: '36px',
      color: '#000'
    });
    this.scoreText.setOrigin(.5);
  }


  
  return (
      <>
        <h1>Challenge 4 </h1>
      </>
  )
}

// export default inject(`databaseStore`)(withAuthentication(observer(Challenge4)));
export default Challenge4;
