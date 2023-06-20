import { users } from "../data/users"

function useUser() {
    function getUserById(userId: string) {
        return users.find(user => user.id === userId)
    }

    function getUserByUsername(username: string) {
        return users.find(user => user.username === username)
    }

    function getAllUsers() {
        return users
    }

    return {
        getUserById,
        getUserByUsername,
        getAllUsers
    }
}

export default useUser