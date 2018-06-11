import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    slots: 24,
    start: 0,
    end: 10
  };
  onDragOver = e => {
    e.preventDefault();
  };
  onDragStart = e => {
    this.sliderType = e.target.dataset.slider;
  };
  onDrop = (e, target) => {
    let source = this.sliderType;
    let slot = Number(e.target.dataset.slot);

    console.log(`dropped on slot ${slot}`);
    if (isNaN(slot)) return;

    if (source === "min") {
      if (slot >= this.state.end) return;
      this.setState({ start: slot });
    } else if (source === "max") {
      if (slot <= this.state.start) return;
      this.setState({ end: slot });
    }
    this.sliderType = null;
  };

  render() {
    let scale = [];
    let slider = [];
    let currentScale = [];
    for (let i = 0; i <= this.state.slots; i++) {
      scale.push(
        <div key={i} className="slot-scale">
          {i === 0 || i === 12 || i === 24 ? i : ""}
        </div>
      );

      currentScale.push(
        <div key={i} className="slot-scale">
          {i === this.state.start || i === this.state.end ? i : ""}
        </div>
      );

      slider.push(
        <div
          data-slot={i}
          onDragOver={this.onDragOver}
          onTouchMove={this.onDragOver}
          onTouchEnd={this.onDrop}
          onDrop={this.onDrop}
          key={i}
          className="slot"
        >
          <div
            data-slot={i}
            className={
              i >= this.state.start && i < this.state.end
                ? "line line-selected"
                : "line"
            }
          />
          <span className="scale-mark" />
          {i === this.state.start ? (
            <div
              data-slider="min"
              onDragStart={this.onDragStart}
              onTouchStart={this.onDragStart}
              onDrag={this.onDrag}
              draggable
              className="slider-thumb slider-thumb-min"
            />
          ) : null}
          {i === this.state.end ? (
            <div
              data-slider="max"
              onDragStart={this.onDragStart}
              onTouchStart={this.onDragStart}
              onDrag={this.onDrag}
              draggable
              className="slider-thumb slider-thumb-max"
            />
          ) : null}
        </div>
      );
    }
    return (
      <div>
        <h2>React Slider</h2>
        <div className="example-1">
          <div className="slider-container">
            <div className="slider-scale">{scale}</div>
            <div className="slider">{slider}</div>
            <div className="slider-selected-scale">{currentScale}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
