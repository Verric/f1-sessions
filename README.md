# F1 Sessions 2025

A CLI app for F1. This tool lets you quickly check upcoming race weekends, session times in both local and track time, and view the race results

---

## ⚠️ Disclaimer
This project is an **unofficial tool**. It is not affiliated with, endorsed by, or connected to Formula 1, Formula One Management, or any related entities.

Also note, running the -u command will scrape the F1 website, so please be considerate and only use when wanting to retrieve latest race
results

## 🚀 Motivation

This tool was originally written before the latest F1 website updates, none the less the CLI gives me faster access to the info I want
without, ads, cookie banners, and multiple clicks.

* See when the next session starts.
* Check upcoming race weekends at a glance.
* View constructor and driver standings quickly.

---

## ⚡ Usage

After building and linking the CLI (see below), you can run:

```bash
f1-sessions <options>
```

### `-c [raceNumber]`

Display the **constructors’ championship leaderboard** as of a specific race number. If you don’t provide a race number, it will show the **latest available results**.

**Example:**

```bash
f1-sessions -c # show latest constructor standings
f1-sessions -c 10 # show constructor standings after race 10 (Monaco)
```

Shows the constructors’ standings after race 12.

---

### `-d [raceNumber]`

Display the **drivers’ championship leaderboard** as of a specific race number. If no race number is given, it defaults to the latest results.

**Example:**

```bash
f1-sessions -d # show latest driver standings
f1-sessions -d 1 # show driver standings after race 1 (Melbourne)
```

Shows the current drivers’ standings.

---

### `-l`

List all race weekends for the current season with their corresponding **race numbers**.

**Example:**

```bash
f1-sessions -l
```

Outputs a schedule of race weekends.

---

### `-r [raceNumber]`

Display the **results of a given race** by its race number. If no race number is specified, it shows the **most recent race results**.

**Example:**

```bash
f1-sessions -r #show latest race results
f1-sessions -r 5 # show race results of race 5
```

Shows the results of race number 5.

---

### `-u`

Update your local `race.json` file currently it will scrape from the start of the season to the current date. In the future this will make incremental updates to the file so we don't have scrape the F1 results page in bulk

**Example:**

```bash
f1-sessions -u
```

---

## 🔧 Development Setup

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd f1-tui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Link the CLI globally for local testing:

   ```bash
   npm link
   ```

5. Run commands anywhere:

   ```bash
   f1-sessions -l
   f1-sessions -u
   ```

To remove the global link later:

```bash
npm unlink -g f1-tui
```

---

## 📌 Roadmap / TODO

* [ ] Improve `-u` flag to fetch only missing races instead of re-scraping all.
* [ ] Add proper error handling for missing/invalid data files.
* [ ] Add proper cross-terminal color handling (e.g. via `chalk` or `colorette`) 
* [ ] Optionally provide a `--no-color` flag for minimal environments.
* [ ] Add more commands (e.g., qualifying results, driver info).
* [ ] Add config options (timezones, formatting).
* [ ] Add il8n and localisation support.
* [ ] Expand tool so it can scrape/harvest data from all years.

---
