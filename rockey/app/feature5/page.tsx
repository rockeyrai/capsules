import React from "react";

const Page = () => {
  return (
    <div>
      <nav>
        <img src="/hero/image1.jpg" alt="logo" />
      </nav>
      <section className="intro">
        <div className="header">
          <h1>Awaken the Scroll</h1>
        </div>
      </section>
      <section className="spotlighjt">
        <div className="header">
          <h1>Where frames fade Into Fate</h1>
        </div>
        <div className="spolight-images">
          <div className="row">
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
          </div>
          <div className="row">
            <div className="img"></div>
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"></div>
          </div>
          <div className="row">
            <div className="img"></div>
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"></div>
            <div className="img"><img src="/home/image1.jpg"/></div>
          </div>
          <div className="row">
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"></div>
            <div className="img"><img src="/home/image1.jpg"/></div>
            <div className="img"></div>
          </div>
        </div>
        <div className="mask-container">
            <div className="mask-img">
                <img src="/home/image3.jpg" alt="3rd logo"/>
            </div>
            <div className="header">
                <h1>The Last Frame Hits Hard</h1>
            </div>
        </div>
      </section>
      <section className="outro">
        <div className="header">
          <h1>end of Act one</h1>
        </div>
      </section>
    </div>
  );
};

export default Page;
