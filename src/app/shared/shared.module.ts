import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import {  DialogService} from 'primeng/dynamicdialog';
import { ToolbarNavegationComponent } from './components/toolbar-navegation/toolbar-navegation.component';


@NgModule({
  declarations: [
    ToolbarNavegationComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, ToolbarModule, CardModule, ButtonModule
  ],
  exports:[ToolbarNavegationComponent],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
