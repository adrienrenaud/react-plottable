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
    private el: HTMLDivElement = document.createElement('div');

    private clearElementBeforeUpdate(el: HTMLDivElement) {
        el.innerHTML = '';
    }

    private drawChartToElement(el: HTMLDivElement) {
        const xScale = new Plottable.Scales.Linear();
        const yScale = new Plottable.Scales.Linear();
        var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
        var yAxis = new Plottable.Axes.Numeric(yScale, "left");

        const plot = new Plottable.Plots.Bar()
            .addDataset(new Plottable.Dataset(this.props.data))
            .x((d: BarChartData) => d.x, xScale)
            .y((d: BarChartData) => d.y, yScale)
            // .animated(true) // FIXME: crashes "d3.transition is not a function"

        var chart = new Plottable.Components.Table([
            [yAxis, plot],
            [null, xAxis]
        ]);
        chart.renderTo(el);
    }

    async componentDidUpdate() {
        this.clearElementBeforeUpdate(this.el);
        this.drawChartToElement(this.el)
    }
    async componentDidMount() {
        this.drawChartToElement(this.el)
    }

    public render() {
        return (
            <div>
                <div
                    ref={el => (el ? (this.el = el) : null)}
                    style={{ height: '180px', width: '300px'}}
                />
            </div>
        );
    }
}