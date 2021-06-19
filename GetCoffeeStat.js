/*
  CoffeeList is a class that expects an array of coffee shop objects and an integer X. It obtains user's locations, constructs an array of the nearest X shops, and stores this array as an accessible property (nearest) on the coffeelist instance created. Devs can use the method getNearest to access this property's value or they can use getSorted, passing a custom sorting func, to retrieve the nearest X shops sorted in the desired way.
*/

class CoffeeList {
  constructor(coffeeShopData, x) {
    //X is the number of shops returned based on screen size
    this.x = x;
    //Assume coffeeShopData is an array of objects containing demographic data
    this.shops = coffeeShopData;
    //Use member function to calculate nearest X shops
    this.nearest = this.calculateNearest();
  }

  //Not sure if this is necessary
  getUserLocation() {
    const success = (location) => { return location };
    const error = (error) => { console.warn(error) };

    return navigator.geolocation.getCurrentPosition(success, error);
  }

  async calculateNearest() {
    const userLocation = await this.getUserLocation();

    if (userLocation === undefined) {
      console.warn('FAILED TO GET USER LOCATION');
      return;
    }

    const userLat = userLocation.coords.latitude;
    const userLong = userLocation.coords.longitude;

    this.shops.forEach((shop) => {
      const shopLat = shop.latitude // assuming this is in the demographic data;
      const shopLong = shop.longitude;

      //create a new prop current distance on each shop
      shop.currentDistance = CalulateDistance(userLat, userLong, shopLat, shopLong);
    });

    //Sort shops by new currentDistance prop, in ascending order, and return closest X shops;
    return this.shops.sort((a, b) => (a.currentDistance - b.currentDistance)).slice(0, this.x);
  }

  getNearest() {
    return this.nearest;
  }

  getSorted(sortingFunc) {
    return this.nearest.sort(sortingFunc);
  }

  /*EXAMPLE sortingFunc:
    const sortAlphabetically = (a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  */
}