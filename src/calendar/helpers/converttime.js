// function addEventsAsAvailableSlots(events) {
//   const availableSlots = [];

//   for (const event of events) {
//     const eventStartTime = new Date(event.start.dateTime);
//     const eventEndTime = new Date(event.end.dateTime);

//     // Convert event times to 12-hour format
//     const formattedStartTime = eventStartTime.toLocaleString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//     const formattedEndTime = eventEndTime.toLocaleString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });

//     availableSlots.push({
//       start: formattedStartTime,
//       end: formattedEndTime,
//       eventId: event.id,
//     });
//   }

//   return availableSlots;
// }
// module.exports = { addEventsAsAvailableSlots };

function addEventsAsAvailableSlots(events) {
  const availableSlots = [];

  for (const event of events) {
    const eventStartTime = new Date(event.start.dateTime);
    const eventEndTime = new Date(event.end.dateTime);

    // Set time zone to Indian Standard Time (IST)
    const timeZone = 'Asia/Kolkata';

    // Convert event times to 12-hour format in IST
    const formattedStartTime = eventStartTime.toLocaleString('en-US', {
      timeZone: timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const formattedEndTime = eventEndTime.toLocaleString('en-US', {
      timeZone: timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    availableSlots.push({
      start: formattedStartTime,
      end: formattedEndTime,
      eventId: event.id,
    });
  }

  return availableSlots;
}

module.exports = { addEventsAsAvailableSlots };
