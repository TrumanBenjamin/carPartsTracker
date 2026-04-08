import { Component } from '@angular/core';
import { PartListComponent } from './part-list/part-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PartListComponent],
  template: '<app-part-list></app-part-list>',
})
export class AppComponent {}
