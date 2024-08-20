import useAuthStore from '../../store/authUser';

const HomeScreen = () => {
    const { logout } = useAuthStore();
    return (
        <div>
            HomeScreen
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default HomeScreen;
