
var cortex = new Cortex()

var input = new SparseArray(1024,0.1)

for(var i = 400; i < 500; i++)
  input.indeces[i] = 1

var root = Math.sqrt(input.length)

var output = cortex.spatialPooler.pool(input)
output = cortex.spatialPooler.pool(input)

console.log(output)

var selected = 0
var scale = root / 2
var display = new Display('input',root*scale)
display.strokeColor = 'rgb(200,200,200)'

function renderInput(){
  display.clear()
  for(var i = 0; i < input.length; i++){
    var y = Math.floor(i / root)
    var x = i - (y * root)
    display.fillColor = input.indeces[i] ? 'rgba(20,80,240,0.7)' : 'rgba(0,0,0,0.07)'
    display.rect(x*scale,y*scale,scale-1,scale-1)
    var neuron = cortex.columns[selected].neurons.indeces[i]
    if(neuron){
      display.fillColor = neuron > 0.1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)'
      display.fillColor = input.indeces[i] && neuron > 0.1 ? 'rgb(50,240,10)' : display.fillColor
      display.circle(x*scale+(scale/2),y*scale+(scale/2),scale/4)
    }
  }
}

renderInput()


function renderColsDisplay(){
  var container = document.createElement('div')
  var sqr = root * scale
  container.setAttribute('style','float:left;height:'+sqr+'px;width:'+sqr+'px;')
  for(var y = 0; y < root; y++){
    for(var x = 0; x < root; x++){
      var btn = document.createElement('div')
      btn.setAttribute('style','border:1px solid white;float:left;height:'+(scale-2)+'px;width:'+(scale-2)+'px;background:lightGray;')
      if(output.indeces[(y*root) + x])
        btn.style.background = 'grey'
      btn.id = y * root + x
      btn.onmouseover = function(e){selected = parseInt(e.target.id); renderInput()}
      container.appendChild(btn)
    }
  }
  document.body.appendChild(container)
}

renderColsDisplay()
