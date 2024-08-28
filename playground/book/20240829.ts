enum Flippable {
 Burger,
 Chair,
 Cup,
 Skateboard,
 Table
}
function flip(f: Flippable) {
 return 'flipped it'
}
flip(Flippable.Chair) // 'flipped it'
flip(Flippable.Cup) // 'flipped it'
flip(12) 