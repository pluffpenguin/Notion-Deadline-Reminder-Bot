class Schema {
  constructor(data) {
    this.structure = data;
  }

  exclude(objB) {
    let objA = {};
    Object.keys(this.structure).forEach((key) => {
      if (objB?.[key]) objA[key] = this.structure[key](objB[key]);
      else {
        objA[key] = null;
      }
    });

    return objA;
  }
  intersect(objB) {
    let objA = {};
    Object.keys(this.structure).forEach((key) => {
      if (objB?.[key]) objA[key] = this.structure[key](objB[key]);
    });
    return objA;
  }
}

module.exports = { Schema };
