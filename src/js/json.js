import { unfilterJSON, isJSON, evalJSON } from '../utils'

let text = `/*-secure-\n{"name": "Haines", "age": 27, "goal": "be a excellent web developer"}\n*/`

let result  = unfilterJSON(text)

let json = evalJSON(result)

console.log(json.goal)

console.log(result)

console.log(isJSON(result))

