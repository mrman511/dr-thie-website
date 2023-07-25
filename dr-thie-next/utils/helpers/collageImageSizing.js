// create random Number between 1 and variable 
function rand(int){
  return Math.floor(Math.random() * int)
}

// create size object for collage Images
export default function collageImageSizing(image){
  const maxSmallWidth = 320
  const maxWidth = 500
  const largeMaxWidth = 700
  const smallScale = Math.floor((Math.random() * 0.25 + 0.75) * 100 ) / 100;
  const scale = Math.floor((Math.random() * 0.3 + 0.7) * 100 ) / 100;
  const largeScale = Math.floor((Math.random() * 0.4 + 0.6) * 100 ) / 100;
  const imageWidth = image.default.width;
  const imageHeight = image.default.height;
  const posNeg = Math.random() < .5 ? 1 : -1
  let rotation = Math.floor(Math.random() * 10) < 2 ? 0 : 0; // rand(45) * posNeg;

  const sizeObj = {
    small: {
      width: maxSmallWidth * smallScale,
      height: imageHeight * ((maxSmallWidth * smallScale) / imageWidth) * smallScale,
      marginTop:rand(-25),
      marginLeft: rand(-25),
      marginRight: rand(-25),
      marginBottom: rand(-25),
      zIndex: rand(5)
    },
    med: {
      width: maxWidth * scale,
      height: imageHeight * ((maxWidth * scale) / imageWidth) * scale,
      marginTop:rand(-50),
      marginLeft: rand(-50),
      marginRight: rand(-50),
      marginBottom: rand(-50),
      zIndex: rand(5)
    },
    large: {
      width: largeMaxWidth * largeScale,
      height: imageHeight * ((largeMaxWidth * largeScale) / imageWidth) * largeScale,
      marginTop:rand(-75),
      marginLeft: rand(-50),
      marginRight: rand(-50),
      marginBottom: rand(-75),
      zIndex: rand(5)
    },
    rotation: rotation,
  }

  return sizeObj;
}