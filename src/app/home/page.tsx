import { User } from "firebase/auth";

export interface HomeScreenProps {
    user: User | null;
}

const HomeScreen = ({user}: HomeScreenProps) => {
    return (
        <div>
            <h1>Home</h1>
            {user?.displayName}
        </div>
    );
}

export default HomeScreen;