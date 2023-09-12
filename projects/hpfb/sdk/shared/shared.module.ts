import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@hpfb/sdk/ui';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [UtilsService],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class SharedModule {}

// all dependencies needed to forms