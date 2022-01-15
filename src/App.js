import React, { useEffect, useState } from "react";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import { data } from "./data";

const App = () => {
  const [courses, setCourses] = useState(data);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const lastValue = courses.length - 1;
    if (value < 0) {
      setValue(lastValue);
    }
    if (value > lastValue) {
      setValue(0);
    }
  }, [value, courses]);

  useEffect(() => {
    let slider = setInterval(() => {
      setValue(value + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [value]);

  return (
    <section className="section">
      <h1 className="section-title">Course Slider</h1>
      <div className="section-center">
        {data.map((course, index) => {
          let position = "nextSlide";
          if (index === value) {
            position = "activeSlide";
          }
          if (
            index === value - 1 ||
            (value === 0 && course === courses.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={`card ${position} `} key={course.id}>
              <div className="card__header">
                <img
                  src={course.img}
                  className="header__img"
                  alt={course.title}
                />
                <div className="header__btns">
                  <button type="button" className="btn-1">
                    Join Course
                  </button>
                  <button type="button" className="btn-2">
                    More Details
                  </button>
                </div>
              </div>
              <div className="card__info">
                <h2>{course.title}</h2>
                <p>{course.desc}</p>
              </div>
            </article>
          );
        })}
        <button className="prev" onClick={() => setValue(value - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setValue(value + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default App;
