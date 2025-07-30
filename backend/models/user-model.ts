//backned/models/user-models.ts

import db from "../utils/database.ts";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
}


// Get a user by email
export function getUserByEmail(email: string): User | null {

    // Returns an array of obj, with the interface
    const result = [...db.queryEntries<User>(
        "SELECT * FROM users WHERE email = ?",
        [email],
    )];

    return result.length > 0 ? result[0] : null;
}



// Create a new user
export function createUser(
    // Takes an obj. as arg. 
    user: { username: string; email: string; password: string; role?: string },
): number {
    const role = user.role ?? "user"; // Default
    db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [user.username, user.email, user.password, role],
    );

    // Last added ID (the new users)
    return db.lastInsertRowId;
}


// Get one user
export function getUserById(id: number): User | null {

    const foundUsers = [...db.queryEntries<User>(
        "SELECT * FROM users WHERE id = ?",
        [id],
    )]

    return foundUsers.length > 0 ? foundUsers[0] : null;
}



