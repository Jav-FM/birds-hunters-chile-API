const { Pool } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/birdshunterschile";

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({ connectionString });

const createUserDB = async ({
  userTypeId,
  names,
  firstLastName,
  secondLastName,
  rut,
  adress,
  phoneNumber,
  email,
  hashPassword,
}) => {
  const client = await pool.connect();

  const query = {
    text: "INSERT INTO users (user_type_id, names, first_lastname, second_lastname, rut, adress, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    values: [
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
      hashPassword,
    ],
  };
  try {
    const response = await client.query(query);
    const { id } = response.rows[0];
    return {
      ok: true,
      id,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const getUserByEmailDB = async (email) => {
  const client = await pool.connect();

  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
  try {
    const response = await client.query(query);
    if (!response.rows[0]) {
      return {
        ok: false,
        error: "No existe ese usuario en nuestra base de datos.",
      };
    }
    return {
      ok: true,
      data: response.rows[0],
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const getUserByIdDB = async (id) => {
  const client = await pool.connect();
  const query = {
    text: "SELECT id, user_type_id, names, first_lastname, second_lastname, rut, adress, phone_number, email FROM users WHERE id = $1",
    values: [Number(id)],
  };
  try {
    const response = await client.query(query);

    return {
      ok: true,
      data: response.rows[0],
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const editUserDB = async ({
  id,
  userTypeId,
  names,
  firstLastName,
  secondLastName,
  rut,
  adress,
  phoneNumber,
  email,
}) => {
  const client = await pool.connect();

  const query = {
    text: "UPDATE users SET user_type_id = $2, names = $3, first_lastname = $4, second_lastname = $5, rut = $6, adress = $7, phone_number = $8, email = $9 WHERE id = $1",
    values: [
      Number(id),
      userTypeId,
      names,
      firstLastName,
      secondLastName,
      rut,
      adress,
      phoneNumber,
      email,
    ],
  };
  try {
    await client.query(query);
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const deleteUserDB = async (id) => {
  const client = await pool.connect();
  const deletePhotosQuery = {
    text: 'DELETE FROM photos WHERE user_id = $1',
    values: [Number(id)],
  };
  const deleteUserQuery = {
    text: "DELETE FROM users WHERE id = $1",
    values: [Number(id)],
  };
  try {
      await client.query("BEGIN");
      await client.query(deletePhotosQuery);
      await client.query(deleteUserQuery);
      await client.query("COMMIT");
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const createPhotoDB = async ({
  pathPhoto,
  user_id,
  bird_id,
  place,
  date,
  order,
  name,
}) => {
  const client = await pool.connect();

  const query = {
    text: 'INSERT INTO photos (photo, user_id, bird_id, place, "date", "order", name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [pathPhoto, user_id, bird_id, place, date, order, name],
  };
  try {
    const response = await client.query(query);
    const { id } = response.rows[0];
    return {
      ok: true,
      id,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const getPhotosByUserDB = async (id) => {
  const client = await pool.connect();
  const query = {
    text: "SELECT * FROM photos WHERE user_id = $1",
    values: [Number(id)],
  };
  try {
    const response = await client.query(query);

    return {
      ok: true,
      data: response.rows,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const replacePhotoDB = async ({
  photoid,
  pathPhoto,
  user_id,
  bird_id,
  place,
  date,
  order,
  name
}) => {
  const client = await pool.connect();
  const insertPhotoQuery = {
    text: 'INSERT INTO photos (photo, user_id, bird_id, place, "date", "order", name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [pathPhoto, user_id, bird_id, place, date, order, name],
  };
  const deletePhotoQuery = {
    text: "DELETE FROM photos WHERE id = $1",
    values: [Number(photoid)],
  };
  try {
      await client.query("BEGIN");
      await client.query(insertPhotoQuery);
      await client.query(deletePhotoQuery);
      await client.query("COMMIT");
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

const deletePhotoDB = async (id) => {
  const client = await pool.connect();
  const query = {
    text: "DELETE FROM photos WHERE id = $1",
    values: [Number(id)],
  };
  try {
    await client.query(query);
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  } finally {
    client.release();
  }
};

module.exports = {
  createUserDB,
  getUserByEmailDB,
  getUserByIdDB,
  editUserDB,
  deleteUserDB,
  createPhotoDB,
  getPhotosByUserDB,
  replacePhotoDB,
  deletePhotoDB,
};
