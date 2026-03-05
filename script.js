const matches = [
    { venue: 'Kainakari, Alappuzha', date: '19-09-2025', startTime: '14:30', endTime: '19:00', winners: ['Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)', 'Niranam (Niranam Boat Club)'] },
    { venue: 'Thazhathangadi, Kottayam', date: '27-09-2025', startTime: '14:30', endTime: '17:00', winners: ['Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)','Nadubhagam (Punnamada Boat Club)'] },
    { venue: 'Dharmadom, Kannur', date: '02-10-2025', startTime: '14:30', endTime: '19:00', winners: [], isSnakeboatRace: false },
    { venue: 'Piravom, Ernakulam', date: '04-10-2025', startTime: '14:30', endTime: '17:00', winners: [ 'Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)','Nadubhagam (Punnamada Boat Club)']  },
    { venue: 'Beypore, Kozhikode', date: '12-10-2025', startTime: '14:30', endTime: '17:00', winners: [], isSnakeboatRace: false },
    { venue: 'Marine Drive, Ernakulam', date: '17-10-2025', startTime: '14:30', endTime: '17:00', winners: [], isSnakeboatRace: true ,isPostponed: true},
    { venue: 'Cheruvathoor, Kasaragod', date: '19-10-2025', startTime: '14:30', endTime: '19:00', winners: [], isSnakeboatRace: false },
    { venue: 'Kottappuram, Thrissur', date: '25-10-2025', startTime: '14:30', endTime: '19:00', winners: ['Veeyapuram (Village Boat Club)','Nadubhagam (Punnamada Boat Club)','Melpadam (Pallathuruthi Boat Club)'] },
    { venue: 'Pulinkunnu, Alappuzha', date: '01-11-2025', startTime: '14:30', endTime: '17:45',  winners: ['Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)', 'Niranam (Niranam Boat Club)']},
    { venue: 'Karuvatta, Alappuzha', date: '08-11-2025', startTime: '14:30', endTime: '17:00', winners:['Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)','Nadubhagam (Punnamada Boat Club)'] },
    { venue: 'Pandanad, Chengannur', date: '15-11-2025', startTime: '14:30', endTime: '16:57', winners: ['Veeyapuram (Village Boat Club)', 'Niranam (Niranam Boat Club)','Melpadam (Pallathuruthi Boat Club)' ]},
    { venue: 'Kayamkulam, Alappuzha', date: '22-11-2025', startTime: '14:30', endTime: '19:00', winners: ['Veeyapuram (Village Boat Club)', 'Naduvileparamban (Emmanuael Boat Club)','Niranam (Niranam Boat Club)' ] },
    { venue: 'Kallada, Kollam', date: '29-11-2025', startTime: '14:30', endTime: '19:00', winners: ['Veeyapuram (Village Boat Club)', 'Melpadam (Pallathuruthi Boat Club)', 'Niranam (Niranam Boat Club)'] },
    { venue: "President's Trophy, Kollam", date: '06-12-2025', startTime: '14:30', endTime: '19:00', winners: [], isSnakeboatRace: true ,isPostponed: true }
];

const boatClubs = [
    { club: 'Village Boat Club, Kainakary', team: 'Pride Chasers', boat: 'Veeyapuram', points: 80 },
    { club: 'Pallathuruthi Boat Club, Alappuzha', team: 'Tropical Titans', boat: 'Melpadam', points: 68 },
    { club: 'Niranam Boat Club', team: 'Backwater Kings', boat: 'Niranam', points: 58 },
    { club: 'Punnamada Boat Club', team: 'Ripple Breakers', boat: 'Nadubhagam', points: 60 },
    { club: 'Emmanuael Boat Club', team: 'Chundan Warriers', boat: 'Naduvileparamban', points: 54 },
    { club: 'Kumarakam Town Boat Club', team: 'Backwater Warriors', boat: 'Payippadan', points: 31 },
    { club: 'Thekkekara Boat Club', team: 'BackWater Chargers', boat: 'Cheruthana', points: 32 },
    { club: 'Karichal Chundan Boat Club', team: 'Thunder Oars', boat: 'Karichal', points: 33 },
    { club: 'Changanaserry Boat Club', team: 'Wave Gliders', boat: 'Champakulam', points: 16 }
];

function checkMatchStatus(matchDate, startTime, endTime, isPostponed) {
    const today = new Date();
    // Use the current real date from system: 2026-03-05
    const [day, month, year] = matchDate.split('-');
    const endDateTime = new Date(`${year}-${month}-${day}T${endTime}:00`);
    const startDateTime = new Date(`${year}-${month}-${day}T${startTime}:00`);

    if (isPostponed) return { text: 'Postponed', class: 'badge-postponed' };
    if (today > endDateTime) return { text: 'Completed', class: 'badge-completed' };
    if (today >= startDateTime && today <= endDateTime) return { text: 'In Progress', class: 'badge-inprogress' };
    return { text: 'Upcoming', class: 'badge-upcoming' };
}

function displaySchedule() {
    const scheduleBody = document.getElementById('schedule-body');
    
    matches.forEach((match, index) => {
        const status = checkMatchStatus(match.date, match.startTime, match.endTime, match.isPostponed);
        
        let winnersDisplay = '';
        if (match.isPostponed) {
            winnersDisplay = `<span class="empty-state">TBA (Postponed)</span>`;
        } else if (match.isSnakeboatRace === false) {
            winnersDisplay = `<span class="empty-state">Not for Snakeboats</span>`;
        } else if (status.text === 'Completed' && match.winners && match.winners.length > 0) {
            winnersDisplay = `
                <div class="winner-block">
                    <div class="medal-entry"><span class="medal-icon">🥇</span><span class="medal-text">${match.winners[0]}</span></div>
                    <div class="medal-entry"><span class="medal-icon">🥈</span><span class="medal-text">${match.winners[1]}</span></div>
                    <div class="medal-entry"><span class="medal-icon">🥉</span><span class="medal-text">${match.winners[2]}</span></div>
                </div>
            `;
        } else {
            winnersDisplay = `<span class="empty-state">TBA</span>`;
        }

        const row = document.createElement('tr');
        // Add staggered animation delay
        row.style.animationDelay = `${index * 0.05}s`;
        
        row.innerHTML = `
            <td><strong>${match.venue}</strong></td>
            <td>${match.date}</td>
            <td><span class="badge ${status.class}">${status.text}</span></td>
            <td>${winnersDisplay}</td>
        `;
        scheduleBody.appendChild(row);
    });
}

function displayPointsTable() {
    const pointsTableBody = document.getElementById('points-table-body');
    const sortedClubs = boatClubs.sort((a, b) => b.points - a.points);
    
    sortedClubs.forEach((club, index) => {
        const row = document.createElement('tr');
        const rank = index + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        
        row.innerHTML = `
            <td><span class="rank-badge ${rankClass}">${rank}</span></td>
            <td><strong>${club.club}</strong></td>
            <td>${club.team}</td>
            <td>${club.boat}</td>
            <td>${club.points}</td>
        `;
        pointsTableBody.appendChild(row);
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const obsvr = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        obsvr.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displaySchedule();
    displayPointsTable();
    initScrollAnimations();
    
    // Trigger the initial animations right away for visible sections 
    // since both tables are likely above the fold on large screens
    setTimeout(() => {
        document.querySelectorAll('.fade-in-section').forEach(section => {
            section.classList.add('is-visible');
        });
    }, 100);
});
