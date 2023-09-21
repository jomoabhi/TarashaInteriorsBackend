const { addEventsAsAvailableSlots } = require('../helpers/converttime');
const { google } = require('googleapis');
const key = require('../../../alien-baton-398417-f4b5637b3920.json');
const moment = require('moment-timezone');

const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

jwtClient.authorize(function (err) {
  if (err) {
    console.error('JWT authorization error:', err);
    return;
  }
});
const calendar = google.calendar({ version: 'v3', auth: jwtClient });
const timetoIndian = (inputDateTimeString) => {
  //   const parsedDate = moment(inputDateString, 'MM-DD-YYYY');
  const parsedDateTime = moment(inputDateTimeString, 'MM-DD-YYYY HH:mm:ss');

  // Set the timezone to Indian Standard Time (IST)
  parsedDateTime.tz('Asia/Kolkata');

  // Format the datetime in the desired format
  const indianDateTime = parsedDateTime.format('YYYY-MM-DD HH:mm:ss');
  return indianDateTime;
};

const getEventsByDate = async (req, res) => {
  try {
    const date = req.body.date;
    console.log('date' + date);
    const selectedDate = new Date(date);

    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59
    );
    console.log(startOfDay.toISOString(), endOfDay.toISOString());
    calendar.events.list(
      {
        calendarId:
          'f4c1d8c9e874a95f898fb4bbc9c1b58e91186beb58212b5e17fdd20906aee4df@group.calendar.google.com',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        q: 'Free Slot',
        orderBy: 'startTime',
        timeZone: 'Asia/Kolkata',
      },
      (err, data) => {
        if (err) {
          console.error('Error fetching events:', err);
          res.json({ success: false, error: 'Error in getting slots' });
        }
        const events = data.data.items;
        console.log('Events on the selected date:', events);
        const freeSlots = addEventsAsAvailableSlots(events);
        res.json({ success: true, slotAvailable: freeSlots });
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error in getting slots' });
  }
};

async function updateEventSummary(eventId, newSummary) {
  const calendarId =
    'f4c1d8c9e874a95f898fb4bbc9c1b58e91186beb58212b5e17fdd20906aee4df@group.calendar.google.com'; // Use 'primary' for the user's primary calendar

  // Retrieve the event you want to update
  calendar.events.get({ calendarId, eventId }, (err, event) => {
    if (err) {
      console.error('Error retrieving event:', err);
      return;
    }

    // Modify the event summary (title)
    event.data.summary = newSummary;

    // Update the event
    calendar.events.update(
      {
        calendarId,
        eventId,
        resource: event.data,
      },
      (err, updatedEvent) => {
        if (err) {
          console.error('Error updating event:', err);
          return;
        }
        console.log('Event summary updated:', updatedEvent.data.summary);
      }
    );
  });
}

module.exports = { getEventsByDate, updateEventSummary };
