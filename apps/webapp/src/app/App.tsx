import React from 'react';
import { ReactComponent as BrandLogo } from '../assets/logo.svg';
import style from './App.module.css';
import { ReferralList } from './pages/ReferralList';
import { RegisterFormPage } from './pages/RegisterForm';
import { IconButton } from '../app/components/IconButton';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

export const App = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <BrandLogo className={style.logo} />
      </div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ReferralList}></Route>
          <Route path="/registerUser" component={RegisterFormPage}></Route>
          <Route path="/updateUser" component={RegisterFormPage}></Route>
        </Switch>
      </BrowserRouter>
      {/* <div className={style.listItem}>
        <ReferralList />
      </div>
      <div>
        <RegisterFormPage />
      </div> */}
    </div>
  );
};

export default App;
