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

  filter(fnPredictate:(value:V)=>boolean){
    const result: V[]=[];
    for (let key in this) {
      if(fnPredictate(this.get(key))){
        result.push(this.get(key))
      }
    }
    return result
  }
};
