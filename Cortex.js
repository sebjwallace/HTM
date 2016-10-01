
function Cortex(){

  this.columns = []
  this.spatialPooler = new SpatialPooler(this.columns)

  this.init()

}

Cortex.prototype.init = function(){
  var columns = 1024
  for(var i = 0; i < columns; i++)
    this.columns[i] = new Column(i,columns,0.4)
}

Cortex.prototype.feedforward = function(input){
  var activeColumns = this.spatialPooler.pool(input)
  return activeColumns
}
