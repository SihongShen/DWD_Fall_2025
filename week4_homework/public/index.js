document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entryForm');
    const textarea = document.getElementById('entryText');
    const entriesContainer = document.getElementById('entries');

    // Render an array of entry objects into the #entries container.
    // Each entry object is expected to have { text, time }
    function renderEntries(entries) {
        entriesContainer.innerHTML = '';
        if (!entries || entries.length === 0) {
            entriesContainer.innerHTML = '<p>No entries yet.</p>';
            return;
        }

        entries.forEach(entry => {
            const el = document.createElement('div');
            el.className = 'diary-entry';

            // main text
            const p = document.createElement('p');
            p.textContent = entry.text;

            // time (convert ISO to local string)
            const small = document.createElement('small');
            const date = new Date(entry.time);
            small.textContent = date.toLocaleString();

            el.appendChild(p);
            el.appendChild(small);
            entriesContainer.appendChild(el);
        });
    }

    // Fetch entries from the server. The supplement-style endpoint returns
    // { entries: [...] } so we normalize that shape before rendering.
    function fetchEntries() {
        fetch('/entries')
            .then(res => res.json())
            .then(data => renderEntries(data.entries || data))
            .catch(err => {
                console.error('Failed to fetch entries', err);
                entriesContainer.innerHTML = '<p>Failed to load entries.</p>';
            });
    }

    // Intercept form submit to call the API and update the list without a full
    // page reload. We still preventDefault so the form action is not used.
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = textarea.value.trim();
        if (!text) return; // don't submit empty entries

        // POST the entry text as JSON. Server expects `entryText` (supplement style)
        fetch('/addEntry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entryText: text })
        })
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(resp => {
            // Clear the input and render the updated list the server returns.
            textarea.value = '';
            renderEntries(resp.entries || resp);
        })
        .catch(err => {
            console.error('Failed to save entry', err);
            alert('Failed to save entry');
        });
    });

    // initial load
    fetchEntries();
});