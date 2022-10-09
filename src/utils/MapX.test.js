import MapX from "./MapX"

describe("class MapX",()=>{
  const map=new MapX()
  map.set(1,'satu')
  map.set(2,'dua')
  test("filter function",()=>{
    expect(map.filter((v)=>v==='satu').join()).toBe('1')
  })

  test("key value array to MapX",()=>{
    const map=new MapX([
      [1,"satu"],
      [2, "dua"]
    ])
    expect(map.toArray().join(",")).toBe("satu,dua")
  })
})
