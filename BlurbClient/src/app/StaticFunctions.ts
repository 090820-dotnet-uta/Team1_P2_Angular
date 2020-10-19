export function CalcBkgColor(scoreOutOfTen: number) {
  var red = 0;
  var green = 0;
  var blue = 0;
  var redLow = 0;
  var greenLow = 0;
  var blueLow = 0;
  var redHigh = 0;
  var greenHigh = 0;
  var blueHigh = 0;
  var colorString = '';
  if (scoreOutOfTen == 10) {
    colorString = 'rgba(0, 185, 140, 1)';
  } else if (scoreOutOfTen < 9) {
    if (scoreOutOfTen < 8) {
      if (scoreOutOfTen < 7) {
        if (scoreOutOfTen < 6) {
          if (scoreOutOfTen < 5) {
            if (scoreOutOfTen < 4) {
              if (scoreOutOfTen < 3) {
                if (scoreOutOfTen < 2) {
                  if (scoreOutOfTen < 1) {
                    // 0 - 1
                    redLow = 160;
                    greenLow = 70;
                    blueLow = 120;
                    redHigh = 200;
                    greenHigh = 80;
                    blueHigh = 120;
                    red = redLow + scoreOutOfTen * (redHigh - redLow);
                    green = greenLow + scoreOutOfTen * (greenHigh - greenLow);
                    blue = blueLow + scoreOutOfTen * (blueHigh - blueLow);
                    colorString =
                      'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
                  }
                  //1 - 2
                  else {
                    redLow = 200;
                    greenLow = 80;
                    blueLow = 120;
                    redHigh = 230;
                    greenHigh = 100;
                    blueHigh = 140;
                    red = redLow + (scoreOutOfTen - 1) * (redHigh - redLow);
                    green =
                      greenLow + (scoreOutOfTen - 1) * (greenHigh - greenLow);
                    blue = blueLow + (scoreOutOfTen - 1) * (blueHigh - blueLow);
                    colorString =
                      'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
                  }
                }
                // 2 - 3
                else {
                  redLow = 230;
                  greenLow = 100;
                  blueLow = 140;
                  redHigh = 250;
                  greenHigh = 140;
                  blueHigh = 150;
                  red = redLow + (scoreOutOfTen - 2) * (redHigh - redLow);
                  green =
                    greenLow + (scoreOutOfTen - 2) * (greenHigh - greenLow);
                  blue = blueLow + (scoreOutOfTen - 2) * (blueHigh - blueLow);
                  colorString =
                    'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
                }
              }
              // 3 - 4
              else {
                redLow = 250;
                greenLow = 140;
                blueLow = 150;
                redHigh = 255;
                greenHigh = 178;
                blueHigh = 150;
                red = redLow + (scoreOutOfTen - 3) * (redHigh - redLow);
                green = greenLow + (scoreOutOfTen - 3) * (greenHigh - greenLow);
                blue = blueLow + (scoreOutOfTen - 3) * (blueHigh - blueLow);
                colorString =
                  'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
              }
            }
            // 4 - 5
            else {
              redLow = 255;
              greenLow = 178;
              blueLow = 150;
              redHigh = 250;
              greenHigh = 250;
              blueHigh = 170;
              red = redLow + (scoreOutOfTen - 4) * (redHigh - redLow);
              green = greenLow + (scoreOutOfTen - 4) * (greenHigh - greenLow);
              blue = blueLow + (scoreOutOfTen - 4) * (blueHigh - blueLow);
              colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
            }
          }
          // 5 - 6
          else {
            redLow = 250;
            greenLow = 250;
            blueLow = 170;
            redHigh = 200;
            greenHigh = 250;
            blueHigh = 150;
            red = redLow + (scoreOutOfTen - 5) * (redHigh - redLow);
            green = greenLow + (scoreOutOfTen - 5) * (greenHigh - greenLow);
            blue = blueLow + (scoreOutOfTen - 5) * (blueHigh - blueLow);
            colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
          }
        }
        // 6 - 7
        else {
          redLow = 200;
          greenLow = 250;
          blueLow = 150;
          redHigh = 141;
          greenHigh = 230;
          blueHigh = 120;
          red = redLow + (scoreOutOfTen - 6) * (redHigh - redLow);
          green = greenLow + (scoreOutOfTen - 6) * (greenHigh - greenLow);
          blue = blueLow + (scoreOutOfTen - 6) * (blueHigh - blueLow);
          colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
        }
      }
      // 7 - 8
      else {
        redLow = 141;
        greenLow = 230;
        blueLow = 120;
        redHigh = 102;
        greenHigh = 204;
        blueHigh = 120;
        red = redLow + (scoreOutOfTen - 7) * (redHigh - redLow);
        green = greenLow + (scoreOutOfTen - 7) * (greenHigh - greenLow);
        blue = blueLow + (scoreOutOfTen - 7) * (blueHigh - blueLow);
        colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
      }
    }
    // 8 - 9
    else {
      redLow = 102;
      greenLow = 204;
      blueLow = 120;
      redHigh = 50;
      greenHigh = 200;
      blueHigh = 120;
      red = redLow + (scoreOutOfTen - 8) * (redHigh - redLow);
      green = greenLow + (scoreOutOfTen - 8) * (greenHigh - greenLow);
      blue = blueLow + (scoreOutOfTen - 8) * (blueHigh - blueLow);
      colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
    }
  }
  // 9 - 10
  else {
    redLow = 50;
    greenLow = 200;
    blueLow = 120;
    redHigh = 0;
    greenHigh = 185;
    blueHigh = 140;
    red = redLow + (scoreOutOfTen - 9) * (redHigh - redLow);
    green = greenLow + (scoreOutOfTen - 9) * (greenHigh - greenLow);
    blue = blueLow + (scoreOutOfTen - 9) * (blueHigh - blueLow);
    colorString = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
    colorString = 'rgba(50, 200, 120, 1)';
  }
  return colorString;
}

export function GetTypeIcon(type: number): string {
  if (type == 0) {
    return 'movie';
  } else if (type == 1) {
    return 'sports_esports';
  } else if (type == 2) {
    return 'menu_book';
  } else {
    return 'tv';
  }
}

export function TypeSelectedTxt(selectedType: number, type: number) {
  if (selectedType == type) {
    return 'selected';
  }
  return '';
}

export function ScoreSelectedTxt(selectedScore: number, score: number) {
  if (selectedScore == score) {
    return 'selected';
  }
  return '';
}

export function PrivacySelectedTxt(selectedPrivacy: number, privacy: number) {
  if (selectedPrivacy == privacy) {
    return 'checked';
  }
  return '';
}
