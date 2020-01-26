import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ZodiacComponent} from './pages/zodiac/zodiac.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'zodiac', component: ZodiacComponent},
  {
    path: '',
    redirectTo: '/zodiac',
    pathMatch: 'full'
  },
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
