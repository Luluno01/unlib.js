import G from './Generators'

for(let i of G.range(10)) {
  console.log(i)
}

console.log(G.newRange(G.range(10), G.randSeq([1, 2, 'rua!'], 5)))