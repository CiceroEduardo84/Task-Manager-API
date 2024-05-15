export const tableTasks = `
  CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR PRIMARY KEY NOT NULL,
    description VARCHAR NOT NULL,
    date DATE NOT NULL,
    status VARCHAR CHECK (status IN ('completed', 'pending')) DEFAULT 'pending',
    id_user VARCHAR NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
  );
`;
