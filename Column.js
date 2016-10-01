
function Column(index,pool,sparsity){

  this.index = index
  this.threshold = 0.1
  this.boost = 1
  this.lastActive = 0

  this.receptiveFieldSize = pool / 10
  this.neurons = new SparseArray(this.receptiveFieldSize,sparsity || 0.5)
  this.initReceptiveField(pool)

}

/*
  A column has feedforward connections from the input.
  The connections form a 2D field with varying permanances.
  The receptive field is an aggregate of all the cells proximal dendrites.
*/

Column.prototype.initReceptiveField = function(pool){
  var potentialPool = this.neurons.limit
  var connectionRatio = 50
  var threshold = this.threshold
  function perm()
    {return probable(connectionRatio) ? threshold + 0.01 : threshold - 0.01}
  this.neurons.indeces[this.index] = threshold + 0.01
  var dist = 2
  var root = Math.round(Math.sqrt(pool))
  var pos = this.index - root - 1
  for(var i = 0; i < potentialPool; i+=dist*4){
    for(var n = 0; n < dist; n++)
      this.neurons.indeces[pos] = perm(pos++)
    for(var n = 0; n < dist; n++)
      this.neurons.indeces[pos] = perm(pos+=root)
    for(var n = 0; n < dist; n++)
      this.neurons.indeces[pos] = perm(pos--)
    for(var n = 0; n < dist; n++)
      this.neurons.indeces[pos] = perm(pos-=root)
    pos -= 1 + root
    dist += 2
  }
}

Column.prototype.activate = function(index){
  return this.neurons.indeces[index] * this.boost > this.threshold
}

Column.prototype.overlapScore = function(sdr){
  return this.neurons.overlapScore(sdr,this.activate.bind(this))
}

Column.prototype.updateWeights = function(sdr){
  for(var i in this.neurons.indeces)
    if(sdr.indeces[i])
      this.neurons.indeces[i] += 0.01
    else this.neurons.indeces[i] -= 0.01
}
