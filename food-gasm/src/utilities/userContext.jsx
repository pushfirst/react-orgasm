import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: {
        name: "SS"
    }
});

export default UserContext;