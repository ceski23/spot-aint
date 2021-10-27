import { Button } from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, logout } from "store/user";

export const HomePage = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  }

  return (
    <div>
      <h1>Witaj {userInfo.display_name}!</h1>
      <Button onClick={handleClick}>Wyloguj</Button>
    </div>
  );
}