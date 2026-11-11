/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line (here: the line of code that does a job)
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 "badge": "Grade 12 · Unit 4 · Week 10 · Session 4",
 "titleText": "Review Games",
 "warmup": {
  "label": "Warm-up",
  "sub": "Guess today’s lesson"
 },
 "wrapup": {
  "label": "Wrap-up",
  "sub": "Structure Showdown"
 },
 "titleHTML": "<span class=\"c1\">R</span><span class=\"c2\">e</span><span class=\"c3\">v</span><span class=\"c4\">i</span><span class=\"c5\">e</span><span class=\"c1\">w</span><br><span class=\"c2\">G</span><span class=\"c3\">a</span><span class=\"c4\">m</span><span class=\"c5\">e</span><span class=\"c1\">s</span>"
};
window.GAMES = {
 "warmup": {
  "badge": "Unit 4 · Week 10 · Session 4 · Warm-up",
  "name": "Memory Map",
  "titleHTML": "<span class=\"c1\">M</span><span class=\"c2\">e</span><span class=\"c3\">m</span><span class=\"c4\">o</span><span class=\"c5\">r</span><span class=\"c1\">y</span><br><span class=\"c2\">M</span><span class=\"c3\">a</span><span class=\"c4\">p</span>",
  "intro": "Lines, trees and webs: how much do you remember from Sessions 1, 2 and 3? Every correct answer flips letters of today’s mystery topic. Crack it for +200!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the topic early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 40,
  "points": 100,
  "floaters": [
   "🏫",
   "🌳",
   "🗺️",
   "📍",
   "🔗",
   "🧠",
   "🔁",
   "🏁"
  ],
  "topic": "Review",
  "mystery": {
   "label": "Today’s mystery topic",
   "phrase": "REVIEW AND PROJECT",
   "order": [
    2,
    17,
    7,
    0,
    16,
    11,
    12,
    13,
    8,
    4,
    1,
    14,
    15,
    3,
    5,
    9
   ],
   "perCorrect": 3,
   "bonus": 200,
   "accept": [
    "review and project",
    "review & project",
    "review project",
    "review",
    "project",
    "the project",
    "revision and project"
   ],
   "finalQ": "Put all the clues together. What is today’s lesson?",
   "finalOptions": [
    "Sorting Algorithms",
    "Review and Project",
    "Stacks and Queues",
    "Cyber Security"
   ],
   "finalAnswer": 1,
   "finalWhy": "Today we review Sessions 1 to 3, then use trees and graphs in a real project: the MIS School Map."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Session 1",
    "skill": "Remember",
    "q": "Which structure is LINEAR?",
    "options": [
     "Tree",
     "Graph",
     "Queue",
     "Social network"
    ],
    "answer": 2,
    "why": "A queue keeps items in one straight line: first in, first out."
   },
   {
    "type": "bins",
    "ctx": "Line or web?",
    "skill": "Analyze",
    "seconds": 55,
    "q": "One straight path (linear) or branches and links (non-linear)?",
    "bins": [
     "➖ Linear",
     "🕸️ Non-linear"
    ],
    "items": [
     {
      "t": "Canteen queue",
      "b": 0
     },
     {
      "t": "Family tree",
      "b": 1
     },
     {
      "t": "Playlist of songs",
      "b": 0
     },
     {
      "t": "Road map",
      "b": 1
     },
     {
      "t": "Friends online",
      "b": 1
     }
    ],
    "why": "Queues and playlists follow one path. Family trees, road maps and friend networks branch out."
   },
   {
    "type": "mc",
    "ctx": "Session 2",
    "skill": "Remember",
    "q": "In a tree, a node with NO children is called a…",
    "options": [
     "Root",
     "Leaf",
     "Edge",
     "Parent"
    ],
    "answer": 1,
    "why": "Leaves sit at the bottom: they have no children."
   },
   {
    "type": "mc",
    "ctx": "BST",
    "skill": "Apply",
    "q": "Insert 25 into a BST whose root is 50. Where does it go first?",
    "options": [
     "Right of 50",
     "Left of 50",
     "It replaces 50",
     "Anywhere"
    ],
    "answer": 1,
    "why": "25 is smaller than 50, so it goes LEFT."
   },
   {
    "type": "mc",
    "ctx": "Session 3",
    "skill": "Understand",
    "q": "What do we call the links between nodes in a graph?",
    "options": [
     "Leaves",
     "Roots",
     "Edges",
     "Levels"
    ],
    "answer": 2,
    "why": "Vertices (nodes) are joined by edges (links)."
   },
   {
    "type": "mc",
    "ctx": "Search",
    "skill": "Remember",
    "q": "Which search uses a QUEUE and goes layer by layer?",
    "options": [
     "DFS",
     "BFS",
     "In-order",
     "Binary search"
    ],
    "answer": 1,
    "why": "Breadth-first search uses a queue: first in, first out."
   },
   {
    "type": "mc",
    "ctx": "Fastest route",
    "skill": "Evaluate",
    "q": "Route A: 2 stops, 14 min. Route B: 4 stops, 10 min. Which is the shortest path?",
    "options": [
     "Route A",
     "Route B",
     "Both",
     "Neither"
    ],
    "answer": 1,
    "why": "The shortest path has the smallest total weight (minutes), not the fewest stops."
   }
  ],
  "endHTML": "<div class=\"reveal\"><span class=\"pill\">Today's lesson</span><div class=\"big\">Review and Project</div><p class=\"lede\">Trees and graphs at work: the MIS School Map.</p></div>\n<div class=\"recap\"><div><b>Review</b>Sessions 1 to 3</div><div><b>Choose</b>The right structure</div><div><b>Build</b>The school map</div></div>"
 },
 "wrapup": {
  "badge": "Unit 4 · Week 10 · Session 4 · Wrap-up",
  "name": "Structure Showdown",
  "titleHTML": "<span class=\"c1\">S</span><span class=\"c2\">t</span><span class=\"c3\">r</span><span class=\"c4\">u</span><span class=\"c5\">c</span><span class=\"c1\">t</span><span class=\"c2\">u</span><span class=\"c3\">r</span><span class=\"c4\">e</span><br><span class=\"c5\">S</span><span class=\"c1\">h</span><span class=\"c2\">o</span><span class=\"c3\">w</span><span class=\"c4\">d</span><span class=\"c5\">o</span><span class=\"c1\">w</span><span class=\"c2\">n</span>",
  "intro": "Ten challenges from the whole unit: linear and non-linear, trees, BSTs, graphs, BFS, DFS, Dijkstra and the school map. Who is the structure champion?",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards, order tiles and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 45,
  "points": 100,
  "floaters": [
   "🏫",
   "🌳",
   "🗺️",
   "🧭",
   "🐍",
   "🏁",
   "🔗",
   "✓"
  ],
  "topic": "Review",
  "exit": {
   "q": "Pick ONE real problem (printing jobs, folders, friend suggestions or a route finder). Which data structure would you use, and why?",
   "placeholder": "I would use a … because …",
   "model": "Route finder: a weighted graph, because places are vertices, roads are edges with minutes, and Dijkstra finds the shortest path. (Printing jobs: a queue. Folders: a tree. Friend suggestions: a graph.)"
  },
  "questions": [
   {
    "type": "bins",
    "ctx": "Pick it",
    "skill": "Analyze",
    "seconds": 60,
    "q": "Which structure fits each problem best?",
    "bins": [
     "➖ Queue",
     "🌳 Tree",
     "🕸️ Graph"
    ],
    "items": [
     {
      "t": "Print jobs waiting",
      "b": 0
     },
     {
      "t": "Folders inside folders",
      "b": 1
     },
     {
      "t": "Friend suggestions",
      "b": 2
     },
     {
      "t": "Canteen line",
      "b": 0
     },
     {
      "t": "Route between cities",
      "b": 2
     },
     {
      "t": "School staff chart",
      "b": 1
     }
    ],
    "why": "Waiting lines are queues, hierarchies are trees, and networks of links are graphs."
   },
   {
    "type": "mc",
    "ctx": "Trees",
    "skill": "Understand",
    "q": "Which statement about a tree is TRUE?",
    "options": [
     "It can have many roots",
     "It has one root and no loops",
     "Every node has two parents",
     "It always has loops"
    ],
    "answer": 1,
    "why": "A tree has ONE root, every other node has ONE parent, and there are no loops."
   },
   {
    "type": "order",
    "ctx": "BST in-order",
    "skill": "Apply",
    "seconds": 55,
    "q": "A BST holds 50, 30, 70, 20, 40. Put its IN-ORDER walk in order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "50",
     "20",
     "70",
     "40",
     "30"
    ],
    "answer": [
     "20",
     "30",
     "40",
     "50",
     "70"
    ],
    "why": "In-order (left, root, right) gives a BST in sorted order."
   },
   {
    "type": "mc",
    "ctx": "BST search",
    "skill": "Apply",
    "q": "Search for 60 in the BST 50 → (30, 70) → (20, 40, 60, 80). Which path?",
    "options": [
     "50 → 30 → 60",
     "50 → 70 → 60",
     "50 → 60",
     "20 → 40 → 60"
    ],
    "answer": 1,
    "why": "60 > 50 so go right to 70, then 60 < 70 so go left: found in 3 steps."
   },
   {
    "type": "mc",
    "ctx": "Graphs",
    "skill": "Understand",
    "q": "Corridors with walking minutes on them make a…",
    "options": [
     "Directed graph",
     "Weighted graph",
     "Binary tree",
     "Linked list"
    ],
    "answer": 1,
    "why": "Numbers on the edges make it a weighted graph."
   },
   {
    "type": "mc",
    "ctx": "DFS",
    "skill": "Remember",
    "q": "DFS dives deep, then backs up. It uses a…",
    "options": [
     "Queue",
     "Stack",
     "Matrix",
     "Leaf"
    ],
    "answer": 1,
    "why": "Depth-first search uses a stack: last in, first out."
   },
   {
    "type": "mc",
    "ctx": "School map",
    "skill": "Apply",
    "q": "Gate → Office is 2 min, Office → Library 3 min, Library → Lab 4 min. Total?",
    "options": [
     "7 min",
     "8 min",
     "9 min",
     "10 min"
    ],
    "answer": 2,
    "why": "2 + 3 + 4 = 9 minutes: the shortest path to the Lab."
   },
   {
    "type": "line",
    "ctx": "Python",
    "skill": "Analyze",
    "q": "Tap the line that finds a SHORTER route to a neighbour.",
    "code": [
     "def shortest(start):",
     "    dist = {room: 999 for room in school}",
     "    dist[start] = 0",
     "    done = []",
     "    while len(done) < len(school):",
     "        room = min(... not in done ...)",
     "        done.append(room)",
     "        for n, mins in school[room].items():",
     "            if dist[room] + mins < dist[n]:",
     "                dist[n] = dist[room] + mins",
     "    return dist"
    ],
    "answer": 8,
    "why": "if dist[room] + mins < dist[n]: checks whether going through this room is quicker."
   },
   {
    "type": "mc",
    "ctx": "Dijkstra",
    "skill": "Understand",
    "q": "Dijkstra always visits next…",
    "options": [
     "The room with the most corridors",
     "The closest unvisited room",
     "A random room",
     "The last room added"
    ],
    "answer": 1,
    "why": "It picks the closest unvisited place, then updates the neighbours."
   },
   {
    "type": "mc",
    "ctx": "Challenges",
    "skill": "Evaluate",
    "q": "A corridor closes for repairs. What should the map app do?",
    "options": [
     "Crash",
     "Remove the edge and find a new shortest path",
     "Delete every room",
     "Use a queue instead"
    ],
    "answer": 1,
    "why": "Remove the broken link and run Dijkstra again: graphs handle changes like this."
   }
  ],
  "endHTML": "<div class=\"recap\"><div><b>Linear</b>Queue · stack · list</div><div><b>Trees</b>BST · in-order</div><div><b>Graphs</b>BFS · DFS · Dijkstra</div></div>"
 }
};
