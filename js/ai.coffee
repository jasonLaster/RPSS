bigram = [[0.3742, 0.3462, 0.2796], [0.3274, 0.3408, 0.3318], [0.3388, 0.3107, 0.3505]]
trigram = [ [[0.4080, 0.2500, 0.2923], [0.3630, 0.3487, 0.3784], [0.3448, 0.3985, 0.3400]],  [[0.3506, 0.3500, 0.3615], [0.2603, 0.3355, 0.2905], [0.4276, 0.3383, 0.2867]],  [[0.2414, 0.4000, 0.3462], [0.3767, 0.3158, 0.3311], [0.2276, 0.2632, 0.3733]]]



win_move = (pred_mov) ->
  return (pred_mov % 3) + 1



# play
next = (prev) ->
  console.log('prev => ', prev)
  if ((prev == -1) || (prev == undefined) || (prev == null) || (prev == NaN))
    return randomize()
  else
    return markov(prev)



# strategies

rejection = (prev) -> 
  prev = prev - 1
  dis = bigram[prev]
  max_prob = _.max(dis)
  mov = _.indexOf(dis, max_prob) + 1
  return mov


markov = (prev) -> 
  dis = bigram[prev]
  
  # calculate cdf
  cdf = []
  cdf[0] = dis[0]
  cdf[1] = cdf[0] + dis[1]
  cdf[2] = cdf[1] + dis[2]
  
  # determine next move
  r = Math.random()
  p = _.chain(cdf).filter((p) -> p > r).first().value()
  mov = _.indexOf(cdf, p)
  console.log "move: ", mov
  return mov
  

randomize = ->
  rand = Math.random()*3
  mov = Math.floor(rand)
  return mov