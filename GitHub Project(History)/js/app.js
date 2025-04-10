let allEvents = JSON.parse(localStorage.getItem('events')) || [];

function displayEvents(events) {
    const list = document.getElementById('event-list');
    list.innerHTML = '';
    events.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    events.forEach(event => {
        const item = document.createElement('li');
        item.innerHTML = `
      <strong>${event.year}</strong>: <em>${event.title}</em><br>
      ${event.description}<br>
      ${event.image ? `<img src="${event.image}" alt="${event.title}">` : ''}`;
        list.appendChild(item);
    });
}

function fetchEvents() {
    displayEvents(allEvents);
}

document.addEventListener('DOMContentLoaded', fetchEvents);

document.getElementById('contribute-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const year = document.getElementById('year').value;
    const image = document.getElementById('image').value;

    const newEvent = { title, description, year, image };
    allEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(allEvents));

    alert('Event submitted!');
    fetchEvents();
    document.getElementById('contribute-form').reset();
});

function filterEvents() {
    const filterYear = document.getElementById('filter-year').value;
    if (!filterYear) {
        displayEvents(allEvents);
        return;
    }
    const filtered = allEvents.filter(event => event.year === filterYear);
    displayEvents(filtered);
}