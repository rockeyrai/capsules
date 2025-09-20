"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import {
  Engine,
  Runner,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  World,
  Events,
  Vector,
} from "matter-js";
import "./FooterModule.css";

const Page = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const animateOnScroll = true;

    const config = {
      gravity: { x: 0, y: 1, scale: 0.001 },
      restitution: 0.5,
      friction: 0.15,
      frictionAir: 0.02,
      density: 0.002,
      wallThickness: 200,
      mouseStiffness: 0.6,
    };

    let engine: Engine;
    let runner: Runner;
    let mouseConstraint: MouseConstraint;
    let topWall: Body | null = null;

    const bodies: {
      body: Body;
      element: HTMLElement;
      width: number;
      height: number;
    }[] = [];

    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    const initPhysics = (container: HTMLElement) => {
      // Clear any existing physics first
      if (engine) {
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
        bodies.length = 0;
      }

      engine = Engine.create();
      engine.gravity = config.gravity;
      engine.constraintIterations = 10;
      engine.positionIterations = 20;
      engine.velocityIterations = 16;
      engine.timing.timeScale = 1;
      console.log("✅ initPhysics called");

      const containerRect = container.getBoundingClientRect();
      const wallThickness = config.wallThickness;

      // Create walls
      const walls = [
        // Bottom wall
        Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        ),
        // Left wall
        Bodies.rectangle(
          -wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
        // Right wall
        Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
      ];
      World.add(engine.world, walls);

      const objects = container.querySelectorAll<HTMLElement>(".object");
      console.log(`Found ${objects.length} objects`);

      objects.forEach((obj, index) => {
        const objRect = obj.getBoundingClientRect();
        // const containerBounds = container.getBoundingClientRect();
        
        // Calculate relative position within container
        const relativeRect = {
          width: objRect.width,
          height: objRect.height
        };

        const startX =
          Math.random() * (containerRect.width - relativeRect.width) +
          relativeRect.width / 2;
        
        // Start objects above the container but not too far
        const startY = -100 - index * 50;
        const startRotation = (Math.random() - 0.5) * Math.PI;

        const body = Bodies.rectangle(
          startX,
          startY,
          relativeRect.width,
          relativeRect.height,
          {
            restitution: config.restitution,
            friction: config.friction,
            frictionAir: config.frictionAir,
            density: config.density,
          }
        );

        console.log(`Object ${index}: width=${relativeRect.width}, height=${relativeRect.height}, startX=${startX}, startY=${startY}`);

        Body.setAngle(body, startRotation);

        bodies.push({
          body,
          element: obj,
          width: relativeRect.width,
          height: relativeRect.height,
        });

        World.add(engine.world, body);
      });

      // Add top wall after a delay to let objects fall in
      setTimeout(() => {
        topWall = Bodies.rectangle(
          containerRect.width / 2,
          -wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        );
        World.add(engine.world, topWall);
      }, 2000); // Increased delay

      // Mouse interaction setup
      const mouse = Mouse.create(container);
      // mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      // mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });

      mouseConstraint.mouse.element.oncontextmenu = () => false;

      let dragging: Body | null = null;
      let originalInertia: number | null = null;

      Events.on(mouseConstraint, "startdrag", (event) => {
        const { body } = event as unknown as { body: Body };
        dragging = body;
        if (dragging) {
          originalInertia = dragging.inertia;
          Body.setInertia(dragging, Infinity);
          Body.setVelocity(dragging, { x: 0, y: 0 });
          Body.setAngularVelocity(dragging, 0);
        }
      });

      Events.on(mouseConstraint, "enddrag", () => {
        if (dragging) {
          Body.setInertia(dragging, originalInertia || 1);
          dragging = null;
          originalInertia = null;
        }
      });

      Events.on(engine, "beforeUpdate", () => {
        if (dragging) {
          const found = bodies.find((b) => b.body === dragging);
          if (found) {
            const minX = found.width / 2;
            const maxX = containerRect.width - found.width / 2;
            const minY = found.height / 2;
            const maxY = containerRect.height - found.height / 2;

            Body.setPosition(dragging, {
              x: clamp(dragging.position.x, minX, maxX),
              y: clamp(dragging.position.y, minY, maxY),
            });

            Body.setVelocity(dragging, {
              x: clamp(dragging.velocity.x, -20, 20),
              y: clamp(dragging.velocity.y, -20, 20),
            });
          }
        }
      });

      container.addEventListener("mouseleave", () => {
        if (mouseConstraint.constraint) {
          mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = Vector.create(0, 0);
        }
      });

      document.addEventListener("mouseup", () => {
        if (mouseConstraint.constraint) {
          mouseConstraint.constraint.bodyB = null;
          mouseConstraint.constraint.pointB = Vector.create(0, 0);;
        }
      });

      World.add(engine.world, mouseConstraint);

      runner = Runner.create();
      Runner.run(runner, engine);
      console.log("Physics engine started");

      // Position update loop
      const updatePositions = () => {
        bodies.forEach(({ body, element, width, height }) => {
          const x = clamp(
            body.position.x - width / 2,
            0,
            containerRect.width - width
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 2, // Allow objects to go slightly above viewport
            containerRect.height - height
          );

          element.style.left = x + "px";
          element.style.top = y + "px";
          element.style.transform = `rotate(${body.angle}rad)`;
          
          // Debug: log first object position occasionally
          if (body === bodies[0]?.body && Math.random() < 0.01) {
            console.log(`Object position: x=${x.toFixed(2)}, y=${y.toFixed(2)}, bodyY=${body.position.y.toFixed(2)}`);
          }
        });
        requestAnimationFrame(updatePositions);
      };
      updatePositions();
    };

    // Cleanup function
    const cleanup = () => {
      if (runner) Runner.stop(runner);
      if (engine) {
        World.clear(engine.world, false);
        Engine.clear(engine);
      }
      ScrollTrigger.killAll();
      lenis.destroy();
    };

    if (animateOnScroll) {
      document.querySelectorAll("section").forEach((section) => {
        const container = section.querySelector(
          ".object-container"
        ) as HTMLElement | null;
        if (container) {
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            once: true,
            onEnter: () => {
              console.log("ScrollTrigger activated");
              if (!engine) {
                initPhysics(container);
              }
            },
          });
        }
      });
    } else {
      window.addEventListener("load", () => {
        const container = document.querySelector(
          ".object-container"
        ) as HTMLElement | null;
        if (container) {
          initPhysics(container);
        }
      });
    }

    // Cleanup on unmount
    return cleanup;
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Scroll down to break the laws of web designers</h1>
      </section>
      <section className="footer">
        <div className="object-container">
          <div className="object">
            <p>Codegrid</p>
          </div>
          <div className="object">
            <p>Rockey</p>
          </div>
          <div className="object">
            <p>Chamling</p>
          </div>
          <div className="object">
            <p>Rai</p>
          </div>
          <div className="object">
            <p>helko</p>
          </div>
          <div className="object">
            <p>test</p>
          </div>
          <div className="object">
            <p>test drive</p>
          </div>
          <div className="object">
            <p>WebGl</p>
          </div>
        </div>
        <div className="footer-content">
          <h1>Because why list when you can play?</h1>
        </div>
      </section>
    </div>
  );
};

export default Page;