export default class MapX<K,V> extends Map {
  toArray() {
    return Array.from(this, ([k, v]) => v) as V[];
  }

  toObjectArray() {
    return Array.from(this, ([k, v]) => ({key:k,value:v})) as {key:K,value:V}[];
  }

  from(array:[{key:K,value:V}]) {
    array.forEach((array) => this.set(array.key, array.value));
    return this;
  }

  static from(array:{key:any,value:any}[]) {
    const maps = new this();
    array.forEach((array) => maps.set(array.key, array.value));
    return maps;
  }


  filter(fnPredicate:(value:V,key:K)=>boolean): K[]{
    const result: K[]=[];
    this.forEach((v,k)=>{
      if(fnPredicate(v,k)){
        result.push(k)
      }
    })
    return result
  }
};
