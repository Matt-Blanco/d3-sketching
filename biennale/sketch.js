let table;
let rows;
let colors;
let yScale
let yScale2
let xScale;

function preload() {
  table = loadTable('./mock_dataset.csv', 'csv', 'header');
}

function setup() {
  rows = table.rows.map(row => row.obj).slice(0, 300)
  console.log(rows)
  yScale = d3.scaleLinear([0, rows.length], [10, windowHeight - 10]);
  yScale2 = d3.scaleLinear([0, rows.length], [windowHeight * 0.10, windowHeight - (windowHeight * 0.10)]);
  console.log(table, rows)
  rows.sort((row1, row2) => row1.Geography < row2.Geography)

  let countries = [...new Set(rows.map(row => row.Geography))]
  xScale = d3.scaleOrdinal(countries, [innerWidth, innerWidth - 42, innerWidth - 85, innerWidth - 40, innerWidth - 178, innerWidth - 351, innerWidth - 64, innerWidth - 295, innerWidth - 604, innerWidth - 490])

  colors = d3.scaleOrdinal(d3.schemeObservable10);

  createCanvas(windowWidth, windowHeight, SVG);
}

function draw() {

  noFill();
  strokeWeight(0.5);
  for (let i = 0; i < rows.length; i++) {
    stroke(colors(rows[i].Geography))

    const bezierY1 = yScale(i) > innerHeight / 2 ? yScale(i) + 1000 : yScale(i) + 1000
    const bezierY2 = yScale(i) > innerHeight / 2 ? yScale2(i) - 100 : yScale2(i) - 100
    const bezierY3 = yScale(i) + 425 > innerHeight ? yScale(i) - 800 : yScale(i) + 1000

    bezier(xScale(rows[i].Geography), yScale(i), windowWidth - 100, bezierY3, 0 + 300, bezierY2, 200, yScale2(i));
    // bezier(windowWidth - 10, yScale(i), windowWidth - 100, bezierY1, 0 + 300, bezierY2, 200, yScale2(i));
  }

  noLoop();

}
