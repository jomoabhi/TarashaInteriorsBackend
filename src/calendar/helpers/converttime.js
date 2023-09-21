function addEventsAsAvailableSlots(events) {
  const availableSlots = [];

  for (const event of events) {
    const eventStartTime = new Date(event.start.dateTime);
    const eventEndTime = new Date(event.end.dateTime);

    // Convert event times to 12-hour format
    const formattedStartTime = eventStartTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const formattedEndTime = eventEndTime.toLocaleString('en-US', {
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
