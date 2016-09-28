
function randomFloat(min, max){
  return Math.random() * (max - min) + min
}

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function probable(max){
  return (randomFloat(0,100) < max)
}

function gaussian(min, max, bias, influence) {
    var rnd = Math.random() * (max - min) + min
    var mix = Math.random() * influence
    return rnd * (1 - mix) + bias * mix
}
