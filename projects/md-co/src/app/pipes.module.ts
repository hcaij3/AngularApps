import { NgModule } from '@angular/core';
import { ReversePipe } from 'projects/common/src/app/pipes/reverse.pipe';

@NgModule({
  declarations: [
    ReversePipe
  ],
  exports: [
    ReversePipe
  ],
})
export class PipesModule {}



