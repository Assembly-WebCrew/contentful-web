import { ContentTypesModule } from './content-types/content-types.module';
import { ContentComponent } from './content/content.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
		component: ContentComponent,
		data: {
			content: {
				type: 'Frontpage',
				title: 'Frontpage'
			}
		}
  }
];

@NgModule({
  imports: [
		RouterModule.forRoot(routes),
		ContentTypesModule
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
