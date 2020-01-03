class Apple {
  _location: Number[]
  _color: String
  constructor(color = 'red') {
    this._color = color
    this._location = null
  }

  get location() {
    return this._location
  }
  
  set location(loc) {
    this._location = loc
  }


}

export default Apple
