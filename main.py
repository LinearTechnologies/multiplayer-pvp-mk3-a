def on_button_pressed_a():
    list2: List[number] = []
    if list2[2] == 0:
        PlayerXYD[1] = PlayerXYD[0] - 1
    if list2[2] == 90:
        PlayerXYD[0] = PlayerXYD[0] + 1
    if list2[2] == 180:
        PlayerXYD[1] = PlayerXYD[0] + 1
    if list2[2] == 270:
        PlayerXYD[0] = PlayerXYD[0] - 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    if PlayerXYD[2] == 0 or PlayerXYD[2] == 90 or PlayerXYD[2] == 180 and PlayerXYD[2] == 270:
        PlayerXYD[2] = PlayerXYD[2] + 90
    else:
        PlayerXYD[2] = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    if name == "EX":
        EnemyXY[0] = value
    if name == "EY":
        EnemyXY[1] = value
radio.on_received_value(on_received_value)

Enemy: game.LedSprite = None
Player: game.LedSprite = None
EnemyXY: List[number] = []
PlayerXYD: List[number] = []
PlayerXYD = [0, 0, 0]
EnemyXY = [0, 0]

def on_forever():
    global Player, Enemy
    Player = game.create_sprite(PlayerXYD[0], PlayerXYD[1])
    Enemy = game.create_sprite(EnemyXY[0], EnemyXY[1])
    radio.send_value("EX", PlayerXYD[0])
    radio.send_value("EY", PlayerXYD[1])
    basic.pause(100)
    Player.delete()
    Enemy.delete()
basic.forever(on_forever)
