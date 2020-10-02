export const getDeltaRegion = function (points) {

  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX) * 1.3;
  const deltaY = (maxY - minY) * 1.3;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}

export const getDeliverySLA = function (begin, end) {

  var lat1 = parseFloat(begin.latitude);
  var lon1 = parseFloat(begin.longitude);
  var lat2 = parseFloat(end.latitude);
  var lon2 = parseFloat(end.longitude);

  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  var s = stringToTime(d / 50);
  return s;
}

export const stringToTime = function (value) {
  let time = parseFloat(value);
  let hour = parseInt(time);
  let min = time - hour;
  let minC = parseInt(min * 60);
  let secC = parseInt((parseInt(minC) - min)*60);

  let hourS = '';
  if (hour < 10) {
    hourS = '0' + hour;
  } else {
    hourS = hour + '';
  }

  let minS = '';
  if (minC < 10) {
    minS = '0' + minC;
  } else {
    minS = minC + '';
  }

  let secS = '';
  if ((secC % 60) < 10) {
    secS = '0' + (secC % 60);
  } else {
    secS = (secC % 60) + '';
  }

  let r = hourS + ':' + minS + ':' + secS;

  if (isNaN(hourS) || isNaN(minS) || isNaN(secS)) {
    return '00:00:00';
  }

  return r;
}


function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

const DIGIT = '9';
const OPTIONAL = '?';

const toFixed = (value) => {
  if (isNumber(value)) return Number(value).toFixed(2);
  return Number(0).toFixed(2);
};

const maskCurrency = (value, decimalSeparator = '.') => {
  const thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
  const withDecimal = toFixed(value);
  const justDigits = removeNonDigits(withDecimal);

  const reversedArray = justDigits.split('').reverse();
  let result = '';
  reversedArray.map((char, index) => {
    if (index == 2) {
      result = decimalSeparator + result;
    } else if (index >= 5 && (index + 1) % 3 === 0) {
      result = thousandsSeparator + result;
    }
    result = char + result;
  });
  return result;
};

const maskDate = (value, format = 'en-US') => {
  if (format === 'en-US') {
    return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
  }
  return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
};

const isNumber = (value) => {
  return !isNaN(value);
};

const removeNonDigits = (value) => {
  return value.toString().replace(/\D/g, '');
};

export const removeSpacialDigits = (value) => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function maskJs(mask, value) {
  value = (value || '');
  const justNumbers = value.replace(/\D/g, '');
  const inputArray = justNumbers.split('');
  const digitsEntered = inputArray
    .map((char, index) => (isNumber(char) ? 1 : 0))
    .reduce((prev, next) => (prev + next), 0);
  if (digitsEntered == 0) return '';

  const inputLength = justNumbers.length;
  mask = mask || '';
  const maskArray = mask.split('');
  const indexes = maskArray.map((char, index) => (char === OPTIONAL ? index : '')).filter(String);

  // counts 9s in the mask
  const digitPlaces = maskArray
    .map((char, index) => (char === DIGIT ? 1 : 0))
    .reduce((prev, next) => (prev + next), 0);

  const maskedValue = maskArray;

  let nextElement = 0;
  let jump = false;
  let lengthDiff = digitPlaces - inputLength;
  maskArray.map((char, index) => {
    if (jump) {
      lengthDiff--;
      jump = false;
      maskedValue[index] = '';
      return;
    }
    if (char === OPTIONAL) {
      jump = lengthDiff > 0;
      maskedValue[index] = '';
      return;
    }
    if (char === DIGIT && inputLength > nextElement) {
      const isNum = isNumber(justNumbers[nextElement]);
      if (isNum) {
        maskedValue[index] = justNumbers[nextElement];
        nextElement++;
        return;
      }
      while (inputLength > nextElement && !isNumber(justNumbers[nextElement])) {
        nextElement++;
      }
      maskedValue[index] = isNumber(justNumbers[nextElement]) ? justNumbers[nextElement] : '';
      nextElement++;
    } else if (inputLength <= nextElement) {
      maskedValue[index] = '';
    }
  });
  return maskedValue.join("");
}

export function isCpfCnpj(val) {
  if (val.length == 14 || val.length == 11) {
    var cpf = val.trim();

    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] != cpf[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
      v1 = 0;
    }

    if (v1 != cpf[9]) {
      return false;
    }

    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
      v2 = 0;
    }

    if (v2 != cpf[10]) {
      return false;
    } else {
      return true;
    }
  } else if (val.length == 18 || val.length == 14) {
    var cnpj = val.trim();

    cnpj = cnpj.replace(/\./g, '');
    cnpj = cnpj.replace('-', '');
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cnpj.length > i; i++) {
      if (cnpj[i - 1] != cnpj[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += cnpj[i] * p1;
      } else {
        v1 += cnpj[i] * p2;
      }
    }

    v1 = (v1 % 11);

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = (11 - v1);
    }

    if (v1 != cnpj[12]) {
      return false;
    }

    for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += cnpj[i] * p1;
      } else {
        v2 += cnpj[i] * p2;
      }
    }

    v2 = (v2 % 11);

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = (11 - v2);
    }

    if (v2 != cnpj[13]) {

      return false;

    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function getDateFormatBR(date) {

  if (date != undefined && date.length > 9) {
    var day = date.substring(8, 10);
    var month = date.substring(5, 7);
    var year = date.substring(0, 4);

    return (day + '/' + month + '/' + year);
  } else {
    return 'Não possui';
  }
}

export function getDay() {
  var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}

export function isEmptyPoint(value) {
  if (value != undefined && !isNaN(value) && value != '' && value != 0) {
    return false;
  } else {
    return true;
  }
}

export function getNowString() {
  var date = new Date();
  var day = date.getDate();
  day = (day < 10) ? '0' + day : day;
  var month = (date.getMonth + 1);
  month = (month < 10) ? '0' + month : month;
  var year = date.getFullYear();
  var hour = date.getHours();
  hour = (hour < 10) ? '0' + hour : hour;
  var minute = date.getMinutes();
  minute = (minute < 10) ? '0' + minute : minute;
  var seconds = date.getSeconds();
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + seconds;
}

export function priceCalc(full, off) {
  var f_full = parseFloat(full)/100;
  var f_off = parseFloat(off)/100;
  var f_final = f_full - f_off;
  var s_final = parseFloat(f_final).toFixed(2) + '';
  s_final = s_final.replace(/\./g, ',');
  return s_final;
}

export function arrayRemove(array,index) {
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export function normalizeString(string) {
  var text = string.toUpperCase();
  text = retira_acentos(text);
  text = removeSpacialDigits(text);
  return text;
}

export function retira_acentos(str) 
{
    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    novastr="";
    for(i=0; i<str.length; i++) {
        troca=false;
        for (a=0; a<com_acento.length; a++) {
            if (str.substr(i,1)==com_acento.substr(a,1)) {
                novastr+=sem_acento.substr(a,1);
                troca=true;
                break;
            }
        }
        if (troca==false) {
            novastr+=str.substr(i,1);
        }
    }
    return novastr;
} 

export function sortData(array){
  
}