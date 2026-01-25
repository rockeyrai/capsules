import Lenis from "@studio-freight/lenis/types";
import React from "react";
import styles from "./Feature.module.css"


const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0% ,0% 0%)",
    "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
    "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
    "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
    "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
    "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
    "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
    "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
    "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
]

const finalClipPaths=[
    "polygon(33% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
    "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
    "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
    "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
    "polygon(33% 33%, 66.5% 33%, 100% 66%, 66% 66.5%)",
    "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
    "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
    "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
    "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
]

const Feature15 = () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000)
    });

    gsap.ticker.lagSmoothing(0)


    function createMasks(){
        const imgs = document.querySelectorAll(".img");
        imgs.forEach((img,imgIndex)=>{
            for(let i =0; i <=9; i++){
                const mask = document.createElement("div");
                mask.classList.add("mask",`m-${i}`);
                img.appendChild(mask)
            }
        })
    }

    createMasks();

    const rows = gsap.utils.toArray(".row");

    rows.forEach((row)=>{
        const imgs  = row.querySelectorAll(".img");

        imgs.forEach((img)=>{
            const masks = img.querySelectorAll(".mask");

            masks.forEach((mask,index)=>{
                gsap.set(mask,{
                    clipPath:initialClipPaths[index]
                })
            })
        });

        const tl= gsap.timeline({
            scrollTrigger:{
                trigger:row,
                start:"top 75%"
            }
        })

        const animationOrder =[
            [".m-1"],
            [".m-2",".m-4"],
            [".m-3",".m-5",".m-7"],
            [".m-6","m-8"],
            [".m-9"]
        ]

        animationOrder.forEach((targets,index)=>{
            tl.to(targets.map((cls)=>img.querySelectorAll(cls)),{
                clipPath:(i,el)=> finalClipPaths[Array.from(masks).indexOf(el)],
                duration:0.5,
                ease:"power2.out",
                stagger:0.1,
            },
        index*0.125)
        })
    })



  return (
    <div>
      <section className="heroImgs">
        <div className="row">
          <div className="img img-1"></div>
          <div className="img img-2"></div>
        </div>
      </section>
      <section className="clients">
        <div className="col">
          <p>selected clients</p>
        </div>
        <div className="col">
          <div className="clients-list">
            <p>ames</p>
            <p>amefas</p>
            <p>amefdas</p>
            <p>jaf</p>
            <p>fads</p>
            <p>fdasf</p>
          </div>
          <div className="clients-list">
            <p>amfwes</p>
            <p>amfaefas</p>
            <p>amghefdas</p>
            <p>jafa</p>
            <p>has</p>
            <p>sfs</p>
          </div>
        </div>
      </section>
      <section className="clients-imgs">
        <div className="row">
          <div className="img img-3"> </div>
        </div>
      </section>

      <section className="product-filters">
        <div className="col">
          <p>all</p>
          <p>lighjts</p>
          <p>furituner</p>
          <p>accessoryse</p>
        </div>
        <div className="col"></div>
      </section>
      <section className="products">
        <div className="row">
          <div className="img"></div>
          <div className="img img-4"></div>
          <div className="img img-5"></div>
          <div className="img"></div>
        </div>
        <div className="row">
          <div className="img img-6"></div>
          <div className="img"></div>
          <div className="img"></div>
          <div className="img img-7"></div>
        </div>{" "}
        <div className="row">
          <div className="img"></div>
          <div className="img img-8"></div>
          <div className="img"></div>
          <div className="img img-9"></div>
        </div>{" "}
      </section>
      <section className="about">
        <p>randingasfdasfads</p>
        <p>randingasfdasfads</p>
        <p>randingasfdasfads</p>
      </section>
      <section className="about-imgs">
        <div className="row">
            <div className="img img-10"></div>
            <div className="img img-11"></div>
        </div>
      </section>
      <section className="outro">
        <div className="row">
            <div className="img img-12"></div>
            <div className="img img-13"></div>
            <div className="img img-14"></div>
        </div>
      </section>
    </div>
  );
};

export default Feature15;
