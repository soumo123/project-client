import React, { useState, useEffect } from "react";

const CountdownItem = ({ startDate, endDate }) => {
  const [countdown, setCountdown] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const startCountdown = () => {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const saleStartDate = new Date(startDate);
        const saleEndDate = new Date(endDate);

        if (currentTime < saleStartDate) {
          const timeUntilStart = saleStartDate - currentTime;

          const daysUntilStart = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
          const hoursUntilStart = Math.floor(
            (timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutesUntilStart = Math.floor(
            (timeUntilStart % (1000 * 60 * 60)) / (1000 * 60)
          );
          const secondsUntilStart = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

          setCountdown(
            `${daysUntilStart}d ${hoursUntilStart}h ${minutesUntilStart}m ${secondsUntilStart}s`
          );
          setMessage("Sale starts in:");
        } else if (currentTime >= saleStartDate && currentTime <= saleEndDate) {
          const remainingTime = saleEndDate - currentTime;

          const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const remainingMinutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

          setCountdown(
            `${remainingDays}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`
          );
          setMessage("Sale ends in:");
        } else {
          setMessage("The sale has ended.");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval
    };

    startCountdown();
  }, [startDate, endDate]);

  return <p>{message} {countdown}</p>;
};

export default CountdownItem;
