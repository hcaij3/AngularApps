import { Injectable } from '@angular/core';
import { Enrollment } from '../models/Enrollment';
import { AbstractBridgeService, InstructionService } from '@hpfb/sdk/ui';

@Injectable()
export class GlobalService implements AbstractBridgeService{

  constructor( private instructionService : InstructionService) {
    // super();
    console.log ("===>in globalservice constructor ")
  }

  private appVersion: string;
  private isInternal: boolean;
  private helpIndex: { [key: string]: number }; 
  private currLanguage: string;
  private enrollment : Enrollment;

  setAppVersion(appVersion: string) {
    this.appVersion = appVersion;
  }

  getAppVersion(){
    return this.appVersion;
  }

  public get $isInternal(): boolean {
		return this.isInternal;
	}

	public set $isInternal(value: boolean) {
		this.isInternal = value;
	}

  setHelpIndex(helpIndex: string[]) {
    this.helpIndex = this.instructionService.getHelpTextIndex(helpIndex);
    console.log ("===>in globalservice setHelpIndex() " + JSON.stringify(this.helpIndex))
  }

  getHelpIndex() {
    console.log ("===>in globalservice getHelpIndex() " + JSON.stringify(this.helpIndex))
    return this.helpIndex;
  }

  setCurrLanguage(language: string) {
    this.currLanguage = language;
  }

  getCurrLanguage(){
    return this.currLanguage;
  }

  setEnrollment(enrollment: Enrollment) {
    this.enrollment = enrollment;
  }

  getEnrollment(){
    return this.enrollment;
  }

}
