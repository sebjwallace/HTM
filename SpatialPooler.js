
function SpatialPooler(columns){

  this.columns = columns
  this.step = 0

}

/*
  Each column SDR compares its overlap score with the input SDR.
  The columns are sorted in order of the highest overlap scores.
  The number of active columns are reduced by the output SDR limit.
*/

SpatialPooler.prototype.selectColumns = function(inputSDR,outputSDR){
  var selected = [].concat(this.columns)
  selected.sort(function(col1,col2){
    return col2.overlapScore(inputSDR) - col1.overlapScore(inputSDR)
  }).splice(outputSDR.limit)
  return selected
}

/*
  To encourage activity in all columns, boost those that are recently inactive.
  This encourages competition between columns to learn a pattern.
*/

SpatialPooler.prototype.boostColumns = function(){
  for(var i = 0; i < this.columns.length; i++){
    var column = this.columns[i]
    if(column.lastActive < this.step)
      column.boost = this.step - column.lastActive
    column.lastActive = this.step
  }
}

/*
  The pooler selects the most active columns given an input SDR.
  The output SDR is the top most active columns.
  All the permanances in the active columns are modified for learning.
*/

SpatialPooler.prototype.pool = function(input){

  var output = new SparseArray(this.columns.length,0.02)
  var activeColumns = this.selectColumns(input,output)

  for(var i = 0; i < activeColumns.length; i++){
    output.setBit(activeColumns[i].index,1)
    activeColumns[i].updateWeights(input)
  }

  this.boostColumns()

  this.step++
  return output
}
