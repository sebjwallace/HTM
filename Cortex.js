
function Cortex(){

  this.columns = []
  this.step = 0

  this.init()

}

Cortex.prototype.init = function(){
  var columns = 1024
  for(var i = 0; i < columns; i++)
    this.columns[i] = new Column(i,columns,0.5)
}

Cortex.prototype.feed = function(input){
  this.spatialPooler(input)
  this.step++
}

Cortex.prototype.spatialPooler = function(input){
  var output = new SparseArray(this.columns.length,0.04)
  var activeColumns = [].concat(this.columns)
  activeColumns.sort(function(col1,col2){
    return col1.overlapScore(input) - col2.overlapScore(input)
  }).reverse().splice(output.limit)
  for(var i = 0; i < activeColumns.length; i++){
    var activeColumn = activeColumns[i]
    activeColumn.updateWeights(input)
    if(activeColumn.lastActive < this.step)
      activeColumn.boost = this.step - activeColumn.lastActive
    activeColumn.lastActive = this.step
    output.indeces[activeColumn.index] = 1
  }
  return output
}

Cortex.prototype.temporalSequencer = function(sdr){}
