export const tableTasks = `
  CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    date DATE NOT NULL,
    status VARCHAR CHECK (status IN ('completed', 'pending')) DEFAULT 'pending',
    user_id VARCHAR NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;
