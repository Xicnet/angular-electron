import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControlService {
  public configObservable = new Subject<number>();
  goUp: Observable<any>;
  goDown: Observable<any>;
  pollInterval;

  constructor() {
    console.log("Controller instantiated");
    //this.init();
    if (!('ongamepadconnected' in window)) {
      // No gamepad events available, poll instead.
       this.pollInterval = setInterval(() => this.pollGamepad(), 120);
     }
  }

  init() {
    console.log("control inited");
    //this.pollGamepadLoop();
    //this.pollInterval = setInterval(() => this.pollGamepad(), 300); // Will alert every second.
  }

  pollGamepad() {
    var gp = navigator.getGamepads()[0];
    if (!gp) return;

    for (var i = 0; i < gp.buttons.length; i++) {
      if (gp.buttons[i].pressed) {
        console.log("pressed ", i);
        this.configObservable.next(i);
      }
    }

    for (var i = 0; i < gp.axes.length; i += 2) {
      //console.log("Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]);
    }
  }

}
