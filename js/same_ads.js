'use strict';

var map = document.querySelector('.map');
var MAP_WIDTH = map.offsetWidth;
var MAP_HEIGHT = map.offsetHeight;
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin--main');
var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;
var adForm = document.querySelector('.ad-form');
var inputFields = adForm.querySelectorAll('input');
var selectFields = document.querySelectorAll('select');
var addressField = adForm.querySelector('#address');
var priceField = adForm.querySelector('#price');
var typeField = adForm.querySelector('#type');
var arriveField = adForm.querySelector('#timein');
var departureField = adForm.querySelector('#timeout');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var sameAds = [];
var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];
var accommodationPrices = [10000, 1000, 5000, 0];

// активация карты

var setAtributeToElement = function (arr, atribut) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('' + atribut, '' + atribut);
  }
  return arr;
};
var removeAtributeFromElement = function (arr, atribut) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('' + atribut);
  }
  return arr;
};

var activateMap = function () {
  removeAtributeFromElement(inputFields, 'disabled');
  removeAtributeFromElement(selectFields, 'disabled');
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPinsBlock.appendChild(fragment);
};

setAtributeToElement(inputFields, 'disabled');
setAtributeToElement(selectFields, 'disabled');


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

var createSameAdPin = function (arr) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';
  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.type;
  return pinElement;
};
for (var j = 0; j < sameAds.length; j++) {
  var pin = createSameAdPin(sameAds[j]);
  fragment.appendChild(pin);
}
// заполнение формы объявления

var onAccommodationTypeClick = function () {
  var checkedType = typeField.querySelector('option:checked');
  for (var k = 0; k < accomodationTypes.length; k++) {
    if (checkedType.value === accomodationTypes[k]) {
      priceField.min = accommodationPrices[k];
      priceField.placeholder = '' + accommodationPrices[k];
    }
  }
};

var synchronizeTwoFields = function (field1, field2) {
  var field1CheckedOption = field1.querySelector('option:checked');
  var field2Options = field2.querySelectorAll('option');
  for (var k = 0; k < field2Options.length; k++) {
    field2Options[k].removeAttribute('selected');
    if (field1CheckedOption.value === field2Options[k].value) {
      field2Options[k].selected = true;
    }
  }
};

typeField.addEventListener('click', onAccommodationTypeClick);
arriveField.addEventListener('click', function () {
  synchronizeTwoFields(arriveField, departureField);
});
departureField.addEventListener('click', function () {
  synchronizeTwoFields(departureField, arriveField);
});

// Перетаскивание метки карты

mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var pinPosition = {
    x: evt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft,
    y: compareNumberWithLimits(evt.pageY - MAP_PIN_HEIGHT, 130, 630)
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    pinPosition = {
      x: moveEvt.pageX - MAP_PIN_WIDTH * 0.5 - map.offsetLeft,
      y: compareNumberWithLimits(moveEvt.pageY - MAP_PIN_HEIGHT, 130, 630)
    };
    activateMap();
    mapPin.style = 'top: ' + pinPosition.y + 'px;' + 'left: ' + pinPosition.x + 'px;';
    addressField.value = pinPosition.x + ',' + pinPosition.y;
  };
  var onMouseUp = function () {
    map.removeEventListener('mousemove', onMouseMove);
    map.removeEventListener('mouseup', onMouseUp);
  };
  map.addEventListener('mousemove', onMouseMove);
  map.addEventListener('mouseup', onMouseUp);
});
