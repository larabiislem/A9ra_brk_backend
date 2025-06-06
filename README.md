# A9ra_brk -backend

## Peer-to-Peer Knowledge Exchange Platform

In today's educational landscape, many students face significant barriers to quality learning resources. Knowledge remains locked away in expensive institutions, specialized communities, or privileged regions, creating an uneven landscape for learners worldwide. Technology offers us a unique opportunity to break down these walls and revolutionize how knowledge flows between individuals.

**Problem Statement:**  
How can we use technology to make learning open to everyone, connect learners with experts, and build communities where people learn together?

**Technology Inspirations:**  
- Peer Networking Algorithms  
- Video Conferencing Integration  
- Skill Assessment Tools  
- Reputation Systems  
- Collaborative Document Editing

---

## Overview

This repository implements the backend for a peer-to-peer learning platform aiming to democratize access to knowledge. It provides robust APIs for user management, course and playlist creation, real-time video-enabled classrooms, skill tagging, social interactions (following/followers), and assessments.

### Core Features

- **User Management:**  
  - Registration, authentication, password hashing, profile editing, and keyword-based skill tagging.
  - Social graph: users can follow/unfollow each other, see their followers and followees.

- **Course Management:**  
  - Add, retrieve, and manage courses.
  - Courses can be tagged, searched, and organized into playlists.

- **Playlists:**  
  - Users can create playlists to organize their learning paths.
  - Playlists support collaborative learning and course curation.

- **Video Rooms (LiveKit Integration):**  
  - Real-time video conferencing rooms are dynamically created and linked to courses.
  - Access control ensures only authorized users can join course rooms.
  - Uses LiveKit for scalable, low-latency video.

- **Skill Assessment & Exams:**  
  - Users can create, retrieve, and manage exams and assessments.
  - Supports storing exam metadata and results.

- **Keyword & Tagging System:**  
  - Add and retrieve keywords to describe user skills and course topics.
  - Enhance discoverability and personalized learning journeys.

- **Social and Collaborative Features:**  
  - Following/follower relationships.
  - Link playlists and courses for collaborative curation.
  - Reputation and engagement tracking (inspired by modern social platforms).

---

## API Modules

- `models/user_model.js` — User authentication, profile, and skill management.
- `models/cours_model.js` — Course creation, retrieval, and linking to rooms/playlists.
- `models/playlist_model.js` — Playlist creation, management, and user linkage.
- `models/abonement_model.js` — Handles following/unfollowing logic and queries.
- `models/examen_model.js` — Exam storage and retrieval.
- `models/room_model.js` — Room creation, validation, and LiveKit integration.
- `controller/*` — Express.js controllers for all major resources.

---

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- LiveKit server (for video rooms)
- Environment variables for DB and LiveKit credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with database and LiveKit credentials.
4. Run database migrations (if any).
5. Start the server:
   ```
   npm start
   ```

---

## Example API Endpoints

- `POST /api/users` — Register a new user
- `POST /api/cours` — Add a new course
- `POST /api/playlists` — Create a playlist
- `POST /api/rooms` — Create a video room for a course
- `GET /api/abonnes/:userId` — Get followers for a user
- `GET /api/abonnements/:userId` — Get users that a user follows

---

## Contributing

Contributions are welcome! Please submit issues or pull requests to help improve the platform.

---

