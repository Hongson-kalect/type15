const baseColor = [
  "red",
  "purple",
  "indigo",
  "orange",
  "blue",
  "green",
  "yellow",
];

const colorValues = {
  red: [255, 0, 0],
  orange: [255, 165, 0],
  yellow: [255, 255, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  indigo: [75, 0, 130],
  purple: [128, 0, 128],
  pink: [255, 192, 203],
};

const generateShades = (color, steps) => {
  const shades = [];

  for (let i = 0; i < steps; i++) {
    const shade = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
      (steps - i) / steps
    })`;
    shades.push(shade);
  }
  return shades;
};

export const colors = [
  "black",
  "white",
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "transparent",
].concat(baseColor.flatMap((color) => generateShades(colorValues[color], 8)));

export const fonts = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Trebuchet MS",
  "Lucida Sans Unicode",
  "Tahoma",
  "Impact",
];
