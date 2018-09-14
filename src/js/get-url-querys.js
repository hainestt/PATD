import { getQuery } from '../utils'


let url = 'https://cn.bing.com/search?q=web+%E5%89%8D%E7%AB%AF%E8%B6%8B%E5%8A%BF&qs=n&form=QBRE&sp=-1&pq=web+%E5%89%8D%E7%AB%AF%E8%B6%8B%E5%8A%BF&sc=0-8&sk=&cvid=982DB9D672A9404FABD09A6EACBFD2D1'
let result = getQuery(url, 'q')

console.log('query', result)
