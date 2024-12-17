let table;
let rows;
let colors;
let yScale0;
let yScale;
let yScale2;
let xScale;
let worldMap;
let countries = [];

function preload() {
  table = loadTable('./mock_dataset.csv', 'csv', 'header');
  worldMap = loadImage('/biennale/world.svg');
}

function setup() {
  createCanvas(innerWidth * 3, windowHeight, SVG);
  rows = table.rows.map(row => row.obj)
  console.log(rows.map(row => row.Geography))
  countries = [...new Set(rows.map(row => row.Geography))]
  yScale0 = d3.scaleOrdinal(countries, [300, 400, 550, 550, 500, 350, 350, 250, 350, 300])
  xScale = d3.scaleOrdinal(countries, [width - 440, width - 250, width - 400, width - 100, width - 600, width - 750, width - 200, width - 750, width - 75, width - 475])
  yScale = d3.scaleLinear([0, rows.length], [10, windowHeight - 10]);
  yScale2 = d3.scaleLinear([0, rows.length], [windowHeight * 0.2, windowHeight - (windowHeight * 0.2)]);
  rows.sort((row1, row2) => row1.Geography < row2.Geography)

  console.log(countries, yScale0("India"), yScale0("USA"), yScale0("China"), yScale0("Germany"), yScale0("South Africa"), yScale0("Japan"), yScale0("Australia"))

  colors = d3.scaleOrdinal(d3.schemeObservable10);

  image(worldMap, 3475, 0)
}

function draw() {

  noFill();
  strokeWeight(0.5);
  for (let i = 0; i < rows.length; i++) {
    stroke(colors(rows[i].Geography))

    const bezierY2 = yScale2(i) - 400
    const bezierY3 = yScale(i) + 300 * setDirection(rows[i].Geography)

    // const bezierY3 = Math.random() >= 0.5 ? yScale(i) * -1 : yScale(i)

    bezier(xScale(rows[i].Geography), yScale0(rows[i].Geography), 2000, bezierY3, 1500, bezierY2, 800, height / 2);
    // bezier(windowWidth - 10, yScale(i), windowWidth - 100, bezierY1, 0 + 300, bezierY2, 200, yScale2(i));
  }


  // TODO: Make new scales for phase 2
  const filtered = rows.filter(() => Math.random() < 0.30)
  console.log(filtered.length)
  for (let i = 0; i < filtered.length; i++) {
    stroke(colors(filtered[i].Geography))

    // const bezierY3 = Math.random() >= 0.5 ? yScale(i) * -1 : yScale(i)

    bezier(800, height / 2, 600, yScale(i), 300, yScale(i) - 300, 100, height / 2);
    // bezier(windowWidth - 10, yScale(i), windowWidth - 100, bezierY1, 0 + 300, bezierY2, 200, yScale2(i));
  }

  noLoop();

}


const setDirection = (country) => {
  //"USA", "UK", "South Africa", "Japan", "India", "Germany", "China", "Canada", "Brazil", "Australia"
  switch (country) {
    case ("USA"):
      return 1; // blue
    case ("UK"):
      return 1; //yellow
    case ("South Africa"):
      return 1; //red
    case ("Japan"):
      return -1; //teal
    case ("India"):
      return 1; //Green
    case ("Germany"):
      return -1; // pink
    case ("China"):
      return 1; //purple
    case ("Canada"):
      return -1; // light blue
    case ("Brazil"):
      return -1; // brown
    case ("Australia"):
      return 1; //grey
  }

}