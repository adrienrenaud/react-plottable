/*
 * A Plottable Bar Chart in react
 */
import "bootstrap/dist/css/bootstrap.css";
import "plottable/plottable.css";

import * as Plottable from "plottable";
import * as React from "react";

export type BarChartData = {
  x: number;
  y: number;
  label?: string;
};

export interface IPlotProps {
  data: BarChartData[];
}

export class BarChart extends React.Component<IPlotProps> {
  constructor(props) {
    super(props);
    this.updatePlotData = this.updatePlotData.bind(this);
    this.redrawPlot = this.redrawPlot.bind(this);
    this.barDoubleClickHandler = this.barDoubleClickHandler.bind(this);
  }

  private plotDivRef = React.createRef<HTMLDivElement>();

  private xScale = new Plottable.Scales.Linear();
  private yScale = new Plottable.Scales.Linear();
  private xAxis = new Plottable.Axes.Numeric(this.xScale, "bottom");
  private yAxis = new Plottable.Axes.Numeric(this.yScale, "left");
  private plot = new Plottable.Plots.Bar()
    .x((d: BarChartData) => d.x, this.xScale)
    .y((d: BarChartData) => d.y, this.yScale);
  private chart = new Plottable.Components.Table([
    [this.yAxis, this.plot],
    [null, this.xAxis],
  ]);

  private barDoubleClick = new Plottable.Interactions.Click()
    .attachTo(this.plot)
    .onDoubleClick((p) => this.barDoubleClickHandler(p));

  private drawChartToElement(el: HTMLDivElement) {
    this.chart.renderTo(el);
  }
  private updatePlotData() {
    this.plot.datasets([new Plottable.Dataset(this.props.data)]);
  }
  private redrawPlot() {
    this.plot.redraw();
  }
  private barDoubleClickHandler(p) {
    if (this.plot.entitiesAt(p)[0] !== undefined) {
      const selectedPoint = this.plot.entitiesAt(p)[0];
      console.log(selectedPoint.datum);
    }
  }

  async componentDidUpdate() {
    this.updatePlotData();
    this.redrawPlot();
  }
  async componentDidMount() {
    if (this.plotDivRef.current) {
      this.drawChartToElement(this.plotDivRef.current);
      this.updatePlotData();
      this.redrawPlot();
      window.addEventListener("resize", () => this.redrawPlot());
    }
  }

  public render() {
    return (
      <div>
        <div
          ref={this.plotDivRef}
          style={{ height: "180px", width: "100%" }}
        />
      </div>
    );
  }
}
