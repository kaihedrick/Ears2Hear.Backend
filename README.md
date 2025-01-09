# Ears2Hear Music App - Milestone 3

**Author**: Kai Hedrick  
**Course**: CST-391  
**Instructor**: Instructor Sparks  
**Date**: 11/02/2024  

## Overview

Ears2Hear is a Christian music app designed to help users discover and enjoy a variety of Christian music genres. Inspired by biblical expressions of praise, this app aims to provide a platform for listening, managing, and organizing tracks and playlists.

This milestone focuses on the **Express REST API** for backend development, enabling CRUD operations for managing tracks and playlists. Future milestones will integrate the frontend with the backend for a complete user experience.

---

## Video Links

- [Full Demo (PowerPoint, Postman, Code Review)](https://vimeo.com/1026014877?share=copy)  
- [Postman Demo Only](https://vimeo.com/1026025295?share=copy)  

---

## Key Updates (Milestone 3)

| **Update Type**         | **Description**                                                                                           | **Status**     | **Known Issues**                            |
|--------------------------|-----------------------------------------------------------------------------------------------------------|----------------|---------------------------------------------|
| **Project Initialization** | Set up a new Express app and integrated required libraries (TypeScript, MySQL, mysql2, Express).          | Completed      | None                                        |
| **Database Integration** | Configured MySQL database (`ears2hear`) and connected using mysql2/promise.                              | Completed      | None                                        |
| **CRUD Operations**      | Implemented Create, Read, Update, and Delete operations for the tracks entity.                           | Completed      | None                                        |
| **Postman Testing**      | Tested CRUD operations using Postman; documented API endpoints.                                          | Completed      | None                                        |
| **API Design Consistency** | Ensured REST API standards are met for backend structure.                                               | In Progress    | Frontend integration pending                |
| **Error Handling**       | Basic error handling added for CRUD operations.                                                         | Completed      | Improved error messages planned            |

---

## Features and User Stories

### User Stories and Routes

| **User Story**                                                                                 | **Route**                              | **Description**                                                                                       |
|------------------------------------------------------------------------------------------------|----------------------------------------|-------------------------------------------------------------------------------------------------------|
| View all tracks                                                                                | `GET /tracks`                          | Fetches a list of all tracks available in the database.                                               |
| Add a track to a playlist                                                                      | `POST /playlists/:playlist_id/tracks/:track_id` | Adds a specific track to a specific playlist.                                                        |
| Play a specific track                                                                          | `GET /tracks/{trackId}/play`           | Plays a specified track by its ID.                                                                   |
| Manage user favorites                                                                          | `POST /users/:user_id/tracks/:track_id`, `DELETE /users/:user_id/tracks/:track_id` | Adds or removes a track from the user's favorites.                                                   |
| View all playlists                                                                             | `GET /playlists`                       | Fetches all playlists created by the user.                                                           |
| View a playlist by ID                                                                          | `GET /playlists/{id}`                  | Fetches the details of a specific playlist by its ID.                                                |
| Create a new playlist                                                                          | `POST /playlists`                      | Allows users to create a new playlist.                                                              |
| Update a playlist name                                                                         | `PUT /playlists/{id}`                  | Updates the name of an existing playlist.                                                           |
| Delete a playlist                                                                              | `DELETE /playlists/{id}`               | Deletes a playlist by ID.                                                                           |

---

## Design Updates

- **Focus**: Simplified scope to ensure functionality within the project timeline.
- Removed features like online song search; updated to support database search instead.
- Added CRUD operations for playlist and track management.
- Future focus: Full frontend-backend integration for seamless user experience.

---

## Risks and Unknowns

- Integration of track files into the database is an ongoing challenge.
- Creating a reliable music player involves many variables and potential risks.
- UI integration with account management in the navbar remains a priority.

---

## Resources

- [Postman API Documentation](https://documenter.getpostman.com/view/36796918/2sAY4xC2bP)
- [BibleGateway: New International Version](http://www.biblegateway.com/versions/New-International-Version-NIV-Bible/#booklist)

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ears2hear.git
