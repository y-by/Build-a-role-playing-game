import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from "./utils.js"

function Character(data) {
  Object.assign(this, data)
  
  this.diceHtml = getDicePlaceholderHtml(this.diceCount)

  this.maxHealth = this.health

  this.getDiceHtml = function() {
    this.currentDiceScore = getDiceRollArray(this.diceCount)
    this.diceHtml = this.currentDiceScore.map((num) => 
        `<div class="dice">${num}</div>`).join("")
  }

  this.takeDamage = function(attackScoreArray) {
    const tottalAttackScore = attackScoreArray.reduce((total, num) =>  total + num)
    this.health -= tottalAttackScore
    if(this.health <= 0) {
      this.dead = true
      this.health = 0
    }
    // *********************************DELETE soon***************************************
    // console.log("percentage: " + this.name + " " + getPercentage(this.health, this.maxHealth))
    // console.log(`${this.name} current health: ${this.health} 
    //            hit: ${attackScoreArray} (total hit: ${tottalAttackScore}) is dead: ${this.dead}`)
  }

  this.getHealthBarHtml = function getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth)
    console.log(`life: ${this.name} ${percent}%`)
    return `
      <div class="health-bar-outer">
          <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
          style="width: ${percent}%;">
          </div>
      </div>`
  }

  this.getCharacterHtml = function () {
      const { elementId, name, avatar, health, diceCount, diceHtml } = this;
      const healthBar = this.getHealthBarHtml()
          return `<div class="character-card">
          <h4 class="name"> ${name} </h4>
          <img class="avatar" src="${avatar}" />
          <div class="health">health: <b> ${health} </b></div>
          ${healthBar}
          <div class="dice-container">    
              ${diceHtml}
          </div>
      </div>`

  }

}

export default Character