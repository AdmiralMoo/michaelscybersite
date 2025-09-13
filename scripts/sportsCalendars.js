async function loadNextJaysGame() {
  const response = await fetch("./assets/data/jays2025.ics");
  const icsText = await response.text();

  const events = icsText.split("BEGIN:VEVENT").slice(1);

  const games = events.map(event => {
    const start = event.match(/DTSTART.*:(\d{8}T\d{6})/)[1];
    const summary = event.match(/SUMMARY:(.*)/)[1].trim();
    const location = event.match(/LOCATION:(.*)/)[1].trim();

    const year = start.substring(0,4);
    const month = start.substring(4,6);
    const day = start.substring(6,8);
    const hour = start.substring(9,11);
    const min = start.substring(11,13);
    const sec = start.substring(13,15);
    const date = new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}Z`);

    return { start: date, summary, location };
  })
  // Filter out ECAL promos
  .filter(g => !g.summary.includes("Welcome") && !g.location.includes("ECAL"));

  const now = new Date();
  const next = games.filter(g => g.start > now).sort((a, b) => a.start - b.start)[0];

    document.getElementById("next-game").innerHTML = `
        <strong>Next Game:</strong> ${next.summary}<br>
        ${next.start.toLocaleString()} at ${next.location}
    `;
}

async function loadNextF1Race() {

}
