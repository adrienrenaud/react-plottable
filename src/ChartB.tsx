/*
* A Plottable Bar Chart in react
*/

import 'plottable/plottable.css';

import * as Plottable from 'plottable';
import * as React from "react";

export type BarChartData = {
    x: number;
    y: number;
    label?: string;
}

export interface IPlotProps {
    data: BarChartData[];
}

export class ChartB extends React.Component<IPlotProps>{
    constructor(props) {
        super(props);
        this.updatePlotData = this.updatePlotData.bind(this);
        this.redrawPlot = this.redrawPlot.bind(this);
        this.barDoubleClickHandler = this.barDoubleClickHandler.bind(this);
      }

    private el: HTMLDivElement = document.createElement('div');

    private xScale = new Plottable.Scales.Linear();
    private yScale = new Plottable.Scales.Linear();
    private xAxis = new Plottable.Axes.Numeric(this.xScale, "bottom");
    private yAxis = new Plottable.Axes.Numeric(this.yScale, "left");
    private plot = new Plottable.Plots.Bar()
        .x((d: BarChartData) => d.x, this.xScale)
        .y((d: BarChartData) => d.y, this.yScale)
    private chart = new Plottable.Components.Table([
        [this.yAxis, this.plot],
        [null, this.xAxis]
    ]);


    private barDoubleClick = new Plottable.Interactions.Click()
        .attachTo(this.plot)
        .onClick(this.barDoubleClickHandler);


    private barDoubleClickHandler(this, p) {
        console.log("Clicked")
        console.log(p)
        console.log(this)
        if (this.plot.entitiesAt(p)[0] !== undefined) {
            const selectedPoint = this.plot.entitiesAt(p)[0]
            console.log(selectedPoint)
        }
    }

    private updatePlotData() {
        this.plot.datasets([new Plottable.Dataset(this.props.data)]);
    }
    private redrawPlot() {
        this.plot.redraw();
    }

    private drawChartToElement(el: HTMLDivElement) {
        this.chart.renderTo(el);
    }

    async componentDidUpdate() {
        this.updatePlotData();
        this.redrawPlot();
    }
    async componentDidMount() {
        this.drawChartToElement(this.el);
        this.updatePlotData();
        this.redrawPlot();
        window.addEventListener("resize", this.redrawPlot);
    }

    public render() {
        return (
            <div>
                <div
                    ref={el => (el ? (this.el = el) : null)}
                    style={{ height: '180px', width: '100%'}}
                />
            </div>
        );
    }
}