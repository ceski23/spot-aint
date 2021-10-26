import s from './App.module.scss';
import { LoginPage } from './LoginPage';

const App = () => {
  return (
    <div className={s.container}>
      <LoginPage />
    </div>
  );
}

export default App;
