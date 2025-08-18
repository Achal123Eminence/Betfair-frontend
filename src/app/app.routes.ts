import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { CEvent } from './components/cevent/cevent';
import { Cmarkets } from './components/cmarkets/cmarkets';
import { Football } from './components/football/football';
import { FEvents } from './components/fevents/fevents';
import { FMarkets } from './components/fmarkets/fmarkets';
import { Tennis } from './components/tennis/tennis';
import { TEvents } from './components/tevents/tevents';
import { TMarkets } from './components/tmarkets/tmarkets';
import { CricketEventsList } from './components/cricket-events-list/cricket-events-list';
import { SoccerEventsList } from './components/soccer-events-list/soccer-events-list';
import { TennisEventsList } from './components/tennis-events-list/tennis-events-list';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:Login},
    {path:'cricket',component:Home},
    {path:'c-event',component:CEvent},
    {path:'c-market',component:Cmarkets},
    {path:'soccer',component:Football},
    {path:'s-event',component:FEvents},
    {path:'s-market',component:FMarkets},
    {path:'tennis',component:Tennis},
    {path:'t-event',component:TEvents},
    {path:'t-market',component:TMarkets},
    {path:'cricket-events',component:CricketEventsList},
    {path:'soccer-events',component:SoccerEventsList},
    {path:'tennis-events',component:TennisEventsList}
];
