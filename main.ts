enum RadioMessage {
    message1 = 49434,
    KillEnemy = 61199,
    BulletShot = 65259,
    DEDBLT = 29485
}
radio.onReceivedMessage(RadioMessage.DEDBLT, function () {
    IsBullet = false
})
radio.onReceivedMessage(RadioMessage.BulletShot, function () {
    IsBullet = true
})
input.onButtonPressed(Button.A, function () {
    if (PlayerXYD[2] == 0) {
        PlayerXYD[1] = PlayerXYD[1] - 1
    }
    if (PlayerXYD[2] == 90) {
        PlayerXYD[0] = PlayerXYD[0] + 1
    }
    if (PlayerXYD[2] == 180) {
        PlayerXYD[1] = PlayerXYD[1] + 1
    }
    if (PlayerXYD[2] == 270) {
        PlayerXYD[0] = PlayerXYD[0] - 1
    }
})
radio.onReceivedMessage(RadioMessage.KillEnemy, function () {
    Player.delete()
    basic.showString("U LOSE")
})
input.onButtonPressed(Button.AB, function () {
    IsBullet = true
    radio.sendMessage(RadioMessage.BulletShot)
    Bullet = game.createSprite(PlayerXYD[0], PlayerXYD[1])
    Bullet.set(LedSpriteProperty.Direction, PlayerXYD[2])
    while (!(Bullet.isTouchingEdge())) {
        Bullet.move(1)
        radio.sendValue("BX", Bullet.get(LedSpriteProperty.X))
        radio.sendValue("BY", Bullet.get(LedSpriteProperty.Y))
        if (Bullet.isTouching(Enemy)) {
            Enemy.delete()
            Bullet.delete()
            radio.sendMessage(RadioMessage.KillEnemy)
            basic.showString("U WIn")
        }
        basic.pause(200)
    }
    IsBullet = false
    radio.sendMessage(RadioMessage.DEDBLT)
    Bullet.delete()
})
input.onButtonPressed(Button.B, function () {
    if (PlayerXYD[2] >= 360) {
        PlayerXYD[2] = 0
    } else {
        PlayerXYD[2] = PlayerXYD[2] + 90
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "EX") {
        EnemyXY[0] = value
    }
    if (name == "EY") {
        EnemyXY[1] = value
    }
    if (name == "BX") {
        EnemyBulletXY[0] = value
    }
    if (name == "BY") {
        EnemyBulletXY[1] = value
    }
})
let EnemyBullet: game.LedSprite = null
let Enemy: game.LedSprite = null
let Bullet: game.LedSprite = null
let Player: game.LedSprite = null
let IsBullet = false
let EnemyBulletXY: number[] = []
let EnemyXY: number[] = []
let PlayerXYD: number[] = []
PlayerXYD = [0, 0, 0]
EnemyXY = [0, 0]
EnemyBulletXY = [0, 0]
basic.forever(function () {
    Player = game.createSprite(PlayerXYD[0], PlayerXYD[1])
    Enemy = game.createSprite(EnemyXY[0], EnemyXY[1])
    radio.sendValue("EX", PlayerXYD[0])
    radio.sendValue("EY", PlayerXYD[1])
    if (IsBullet == true) {
        EnemyBullet = game.createSprite(EnemyBulletXY[0], EnemyBulletXY[1])
        basic.pause(100)
        EnemyBullet.delete()
    }
    basic.pause(100)
    Player.delete()
    Enemy.delete()
})
