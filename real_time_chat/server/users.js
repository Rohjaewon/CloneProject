const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name)
    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name, room };
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const idx = users.findIndex((user) => user.id === id);
    if (idx !== -1) {
        return users.splice(idx, 1)[0];
    }
}

const getUser = (id) => {
    let user = users.find((user) => user.id === id);
    return user
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };