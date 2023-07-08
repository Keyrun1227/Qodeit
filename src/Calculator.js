import React from "react";
import Select from "react-select";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calculator() {
  // State variables
  const [startDate, setStartDate] = useState(new Date()); // Stores the selected date
  const [tin, utin] = useState(0); // Stores the index of the selected top tier option
  const [midin, umidin] = useState(0); // Stores the index of the selected mid tier option
  const [quantity, uquantity] = useState(1); // Stores the quantity input value
  const [pages, upages] = useState(true); // Indicates whether the quantity input is in pages or words

  // Data for top and mid tiers
  const topTier = [
    {
      title: "Academic",
      hs: 12,
      ug: 15,
      b: 21,
      p: 25,
    },
    {
      title: "Editing",
      hs: 3,
      ug: 5,
      b: 7,
      p: 13,
    },
    {
      title: "Calculations",
      hs: 18,
      ug: 23,
      b: 32,
      p: 38,
    },
  ];
  const midTier = ["hs", "ug", "b", "p"];

  // Refs to DOM elements
  const midtierDiv = useRef();
  const toptierDiv = useRef();

  // Options for the select input
  const options = [
    { value: "Research paper", label: "Research paper" },
    { value: "Research proposal", label: "Research proposal" },
    { value: "Speech", label: "Speech" },
    { value: "Thesis", label: "Thesis" },
    { value: "Thesis proposal", label: "Thesis proposal" },
    { value: "Thesis statement", label: "Thesis statement" },
  ];

  // Event handler for top tier button clicks
  function tophandleClick(e) {
    const tierDivChildren = toptierDiv.current.childNodes;

    // Remove highlight from all top tier buttons
    for (let i = 0; i < tierDivChildren.length; ++i) {
      tierDivChildren[i].classList.remove("highlight");
    }

    // Set the selected top tier option and add highlight to the clicked button
    if (e.target.getAttribute("data-id")) {
      utin(e.target.getAttribute("data-id"));
      e.target.classList.add("highlight");
    }

    if (e.target.parentElement.getAttribute("data-id")) {
      utin(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.classList.add("highlight");
    }
  }

  // Event handler for mid tier button clicks
  function midhandleClick(e) {
    const tierDivChildren = midtierDiv.current.childNodes;

    // Remove highlight from all mid tier buttons
    for (let i = 0; i < tierDivChildren.length; ++i) {
      tierDivChildren[i].classList.remove("highlight");
    }

    // Set the selected mid tier option and add highlight to the clicked button
    if (e.target.getAttribute("data-id")) {
      umidin(e.target.getAttribute("data-id"));
      e.target.classList.add("highlight");
    }

    if (e.target.parentElement.getAttribute("data-id")) {
      umidin(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.classList.add("highlight");
    }
  }

  // Event handler for toggling between pages and words input
  function handlePW(e) {
    upages((p) => !p);
  }

  return (
    <div className="calculator-c">
      <div className="calculator">
        {/* Top tier buttons */}
        <div
          id="top-tier"
          className="tier"
          onClick={tophandleClick}
          ref={toptierDiv}
        >
          <div data-id={0} className="btn-tier highlight">
            <p>Academic writing</p>
          </div>
          <div data-id={1} className="btn-tier">
            <p>Editing and proofreading</p>
          </div>
          <div data-id={2} className="btn-tier">
            <p>Calculations</p>
          </div>
        </div>

        {/* Mid tier buttons */}
        <div
          id="mid-tier"
          className="tier"
          onClick={midhandleClick}
          ref={midtierDiv}
        >
          <div data-id={0} className="btn-tier  highlight">
            <p>High school</p>
          </div>
          <div data-id={1} className="btn-tier">
            <p>Undergraduate</p>
          </div>
          <div data-id={2} className="btn-tier">
            <p> Bachelor</p>
          </div>
          <div data-id={3} className="btn-tier">
            <p>Professional</p>
          </div>
        </div>

        {/* Select input for paper type */}
        <div className="paper-select">
          <p>Type of paper</p>
          <label>
            <Select className={"select-box"} options={options} loading />
          </label>
        </div>

        {/* Quantity and pages/words input */}
        <div className="quantity-c">
          <div className="pw-ip-c">
            <div>
              <p>Quantity</p>
              <div className="quantity">
                <label>
                  <input
                    type="number"
                    onChange={(e) => {
                      if (e.target.value !== 0 && e.target.value <= 100)
                        uquantity(e.target.value);
                    }}
                    value={pages ? quantity : quantity * 275}
                  ></input>
                </label>
              </div>
            </div>
            <div className="pw-c">
              <div className={pages ? "highlight" : ""} onClick={handlePW}>
                Pages
              </div>
              <div className={!pages ? "highlight" : ""} onClick={handlePW}>
                Words
              </div>
            </div>
          </div>

          {/* Deadline date picker */}
          <div className="calen-c">
            <p>Deadline</p>
            <div className="calen">
              <label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Price display and order button */}
        <div className="price-c">
          <div className="price-main">
            <p>Approx. Price</p>
            <div className="price">
              <h2>${quantity * topTier[tin][midTier[midin]]}</h2>
            </div>
          </div>
          <div className="order-btn">
            <button>PROCEED TO ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
