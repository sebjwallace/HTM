
function SparseArray(length,sparsity,indeces){

  this.length = length || 256
  this.sparsity = sparsity || 0.04
  this.limit = Math.round(this.length * this.sparsity)

  this.indeces = indeces || {}

}

SparseArray.prototype.union = function(sdr,asObj){
  var union = {}
  for(var i in this.indeces)
    union[this.indeces[i]] = true
  for(var i in sdr.indeces)
    union[sdr.indeces[i]] = true
  return asObj ? this.fromObj(union) : union
}

SparseArray.prototype.overlap = function(sdr,asObj){
  var overlap = {}
  for(var i in sdr.indeces)
    if(this.indeces[i])
      overlap[i] = true
  return asObj ? this.fromObj(overlap) : overlap
}

SparseArray.prototype.overlapScore = function(sdr,test){
  var score = 0
  var alt = function(){return 1}
  for(var i in sdr.indeces)
    if(this.indeces[i])
      if((test || alt)(i))
        score++
  return score
}

SparseArray.prototype.match = function(sdr,threshold){
  return this.overlapScore(sdr) >= threshold ? true : false
}

SparseArray.prototype.randomFill = function(){
  for(var i = 0; i < this.limit; i++)
    this.indeces[randomInt(0,this.length-1)] = true
}

SparseArray.prototype.fromObj = function(obj,length,sparsity){
  var clone = new SparseArray(length,sparsity)
  for(var i in obj)
    clone.indeces[i] = obj[i]
  return clone
}

SparseArray.prototype.clone = function(){
  var clone = new SparseArray(this.length,this.sparsity)
  for(var i in this.indeces)
    clone.indeces[i] = this.indeces[i]
  return clone
}
