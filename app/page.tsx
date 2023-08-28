"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [eventToggles, setEventToggles] = useState({});
  const [colorInput, setColorInput] = useState({});

  const today = dayjs();

  function formatEventTime(startHour, endHour) {
    return `${getTimeString(startHour)} - ${getTimeString(endHour)}`;
}

function getTimeString(hour) {
    const isHalf = hour % 1 === 0.5;
    const isQuarter = hour % 1 === 0.25;
    const minutes = isHalf ? "30" : isQuarter ? "15" : "00";
    return `${Math.floor(hour)}:${minutes}`;
}

  const randomizeOrderlyEvents = () => {
    const workStartOptions = [7, 8, 9, 10]; // Start between 7 AM to 10 AM
    const workEndOptions = [16, 17, 18]; // End between 4 PM to 6 PM

    // Random work days: combinations like Mon-Wed-Fri, Tue-Thu, etc.
    const workDaysOptions = [
      [1, 2, 3, 4, 5], // Mon to Fri
      [1, 3, 5], // Mon, Wed, Fri
      [2, 4], // Tue, Thu
      [1, 2, 3], // Mon to Wed
      [3, 4, 5], // Wed to Fri
      [1, 5], // Mon, Fri
    ];

    const possibleEvents = [
      {
        title: "Work",
        startHour:
          workStartOptions[Math.floor(Math.random() * workStartOptions.length)],
        endHour:
          workEndOptions[Math.floor(Math.random() * workEndOptions.length)],
        description: "Work at XYZ Corp.",
        days: workDaysOptions[
          Math.floor(Math.random() * workDaysOptions.length)
        ],
      },

      // College classes
      {
        title: "PHYS 141",
        startHour: 7.25,
        endHour: 8.5,
        description: "Physics Class",
        days: [1, 3],
      },
      {
        title: "MATH 204",
        startHour: Math.random() > 0.5 ? 10 : 11,
        endHour: Math.random() > 0.5 ? 11 : 12,
        description: "Calculus Class",
        days: [1, 3, 5],
      },
      {
        title: "CS 305",
        startHour: Math.random() > 0.5 ? 13 : 14,
        endHour: Math.random() > 0.5 ? 14 : 15,
        description: "Programming Lab",
        days: [2, 4],
      },

      // Other activities
      {
        title: "Gym",
        startHour: 18,
        endHour: 19,
        description: "Workout Session",
        days: [1, 3, 5],
      },
      {
        title: "Grocery Shopping",
        startHour: Math.random() > 0.5 ? 17 : 18,
        endHour: Math.random() > 0.5 ? 18 : 19,
        description: "Groceries",
        days: [4],
      },
      {
        title: "Book Club",
        startHour: 19,
        endHour: 20,
        description: "Reading Group",
        days: [2],
      },
      {
        title: "Doctor's Appointment",
        startHour: Math.random() > 0.5 ? 10 : 11,
        endHour: Math.random() > 0.5 ? 11 : 12,
        description: "Routine Check-up",
        days: [0],
      },
      {
        title: "Dinner with Friends",
        startHour: 20,
        endHour: 22,
        description: "At Local Diner",
        days: [5],
      },

      // Weekend activities
      {
        title: "Weekend Getaway",
        startHour: 9,
        endHour: 19,
        description: "Trip",
        days: [6],
      },
      {
        title: "Relax",
        startHour: 10,
        endHour: 14,
        description: "Rest at Home",
        days: [7],
      },
    ];

    const selectedEvents = [];

    possibleEvents.forEach((eventTemplate) => {
      eventTemplate.days.forEach((day) => {
        let color;
        do {
          color =
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
        } while (color === "#ffffff" || isCloseToBackgroundColor(color));
        selectedEvents.push({
          day: day,
          startHour: eventTemplate.startHour,
          endHour: eventTemplate.endHour,
          title: eventTemplate.description,
          color,
        });
      });
    });

    setEvents(selectedEvents);
  };

  const randomizeEvents = () => {
    const newEvents = [];
    for (let i = 0; i < 5; i++) {
      const startHour = Math.floor(Math.random() * 20);
      const duration = Math.floor(Math.random() * 7) + 1;
      let color;
      do {
        color =
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"); // Ensure 6 characters for the color
      } while (color === "#ffffff" || isCloseToBackgroundColor(color)); // Prevent white color or colors close to the background
      newEvents.push({
        day: Math.floor(Math.random() * 7),
        startHour,
        endHour: startHour + duration,
        title: `Event ${i + 1}`,
        color,
      });
    }
    setEvents(newEvents);
  };

  const isCloseToBackgroundColor = (color) => {
    // Convert the color to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Define the RGB values of the white and gray background color
    const bgR = 255; // Value for white
    const bgG = 255;
    const bgB = 255;

    const grayR = 220; // Value for gray-200
    const grayG = 220;
    const grayB = 220;

    // Check if the color is close to the background color or white
    // (difference < 20 for this example, adjust as needed)
    const closeToWhite =
      Math.abs(r - bgR) < 20 &&
      Math.abs(g - bgG) < 20 &&
      Math.abs(b - bgB) < 20;

    const closeToGray =
      Math.abs(r - grayR) < 20 &&
      Math.abs(g - grayG) < 20 &&
      Math.abs(b - grayB) < 20;

    return closeToWhite || closeToGray;
  };

  useEffect(() => {
    randomizeEvents();
  }, []);

  const currentTime = dayjs();
  const currentHour = currentTime.hour() + currentTime.minute() / 60;
  const currentDay = currentTime.day();

  const getTextColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? "text-black" : "text-white";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200 font-sans text-gray-800">
      <div className="w-full max-w-6xl p-4 rounded bg-white shadow">
        <Button
          className="mb-4 py-2 px-4 rounded bg-blue-500 text-white"
          onClick={randomizeEvents}
        >
          Randomize events
        </Button>
        <Button
          className="mb-4 ml-4 py-2 px-4 rounded bg-yellow-500 text-white"
          onClick={randomizeOrderlyEvents}
        >
          Randomize events orderly
        </Button>
        {events.map((event, index) => (
  <div key={index} className="mb-2">
    <Label className="mr-4">
      <Input
        type="checkbox"
        checked={eventToggles[event.title] !== false}
        onChange={() => {
          setEventToggles((prev) => ({
            ...prev,
            [event.title]: !prev[event.title],
          }));
        }}
      />
      {event.title}
    </Label>
    <Input
      type="text"
      placeholder="#HEXCOLOR"
      value={colorInput[event.title] || event.color}
      onChange={(e) => {
        const value = e.target.value;
        setColorInput((prev) => ({
          ...prev,
          [event.title]: value,
        }));
      }}
    />
  </div>
))}

        <div className="grid grid-cols-8 gap-4 relative">
          <div className="col-span-1 flex flex-col items-center border-r">
            <div className="h-16 flex items-center justify-center font-bold text-sm">
              HOURS
            </div>
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="h-[40px] w-full flex items-center justify-center text-xs text-gray-500"
              >
                <span className="relative bottom-[20px]">{`${i
                  .toString()
                  .padStart(2, "0")}:00`}</span>
              </div>
            ))}
          </div>

          {Array.from({ length: 7 }, (_, dayIndex) => (
            <div
              key={dayIndex}
              className="col-span-1 flex flex-col border-r relative"
            >
              <div className="h-16 w-full flex flex-col items-center justify-center font-bold text-sm border-b">
                {dayjs().day(dayIndex).format("ddd").toUpperCase()}
                <span
                  className={`${
                    today.day() === dayIndex
                      ? "bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mt-1 text-l"
                      : "mt-1"
                  }`}
                >
                  {dayIndex + 1}
                </span>
              </div>
              {Array.from({ length: 24 }, (_, hourIndex) => (
                <div key={hourIndex} className="h-[40px] border-b"></div>
              ))}
              {events
    .filter((event) => event.day === dayIndex)
    .map((event, index) => (
        <div
            key={index}
            className={`absolute left-1 right-1 rounded flex flex-col ${getTextColor(event.color)}`}
            style={{
                backgroundColor: event.color,
                top: `${16 + (event.startHour + 1) * 40}px`,
                height: `${(event.endHour - event.startHour) * 40}px`,
            }}
        >
            <div className="px-2 py-1 text-xs font-bold">
                {event.title}
            </div>
            <div className="px-2 text-xs opacity-80">{formatEventTime(event.startHour, event.endHour)}</div>
            {/* Any other essential info you want to add for the event can be included here */}
        </div>
    ))
}

              {currentDay === dayIndex && (
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ top: `${(currentHour + 1) * 50}px` }}
                >
                  <div className="absolute left-[-21px] w-3 h-3 bg-red-600 rounded-full transform -translate-y-1/3"></div>
                  <div
                    className="h-1 bg-red-600"
                    style={{ marginLeft: "-12px" }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
