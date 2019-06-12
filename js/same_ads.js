'use strict';

var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var MAP_HEIGHT = map.offsetHeight;
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var sameAds = [];
var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];

var getRandomNumber = function (maxRange) {
  var randomNumber = Math.floor(Math.random() * maxRange);
  return randomNumber;
};

var compareNumberWithLimits = function (n, min, max) {
  if (n < min) {
    n = min;
  } else if (n > max) {
    n = max;
  }
  return n;
};

for (var i = 0; i < 8; i++) {
  var ad = {
    author: {
      avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
    },
    offer: {
      type: accomodationTypes[getRandomNumber(accomodationTypes.length)]
    },
    location: {
      x: compareNumberWithLimits(getRandomNumber(MAP_WIDTH) - (MAP_PIN_WIDTH / 2), MAP_PIN_WIDTH / 2, MAP_WIDTH - (MAP_PIN_WIDTH / 2)),
      y: compareNumberWithLimits((getRandomNumber(MAP_HEIGHT) - MAP_PIN_HEIGHT), 130, 630)
    }
  };
  sameAds[i] = ad;
}
