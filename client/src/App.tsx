import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UIAppLayout } from './components/UI';
import { Start } from './scenes/Start';
import { Room } from './scenes/Room';

export const App = () => {
  return (
    <UIAppLayout>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/:roomId" exact component={Room} />
      </Switch>
    </UIAppLayout>
  );
};
